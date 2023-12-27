import { applyAuthTokenInterceptor, setAuthTokens } from 'axios-jwt';
import axios from 'axios'
import { refreshTokens } from '@/common/refreshToken';
import config from '@/config.js'
import store from './store';

const BASE_URL = config.API_URL

axios.defaults.withCredentials = true

const axiosClient = axios.create({
  baseURL: BASE_URL,
})

axiosClient.interceptors.request.use(
  async (config) => {
    const accessToken = store.getters.getAccessToken
    if (accessToken) {
      config.headers.Authorization = "Bearer " + accessToken
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;
    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;
      await refreshTokens();
      const accessToken = store.getters.getAccessToken;

      if (accessToken) {
        config.headers.Authorization = "Bearer " + accessToken
      }

      return axios(config);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;