import axios from "axios";
import config from '@/config.js';
import store from "@/store";

export const refreshTokens = async () => {
  try {
    const response = await axios.patch(config.API_URL + "/auth/refresh", {}, {
      withCredentials: true,
      credentials: 'include'
    });

    const accessToken = response.data.data.attributes.access;

    store.commit('setAccessToken', accessToken)
  } catch (error) {
    store.commit('setAccessToken', '')
  }
};