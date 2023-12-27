import store from "@/store";
import axiosClient from "@/axiosClient";
import { getUserData } from "@/common/APIConverters";

export function loadUserData() {
  const user_locale = localStorage.getItem("user_locale")
  if (user_locale !== null) {
    store.commit('setUserLocale', JSON.parse(user_locale))
  }

  const user_id_str = localStorage.getItem("user_id");
  if (user_id_str === null) {
    throw Error("can't find user id in local storage")
  }
  const user_id = JSON.parse(user_id_str)
  store.commit("setUserData", { id: user_id })
  return axiosClient.get(`/users/${user_id}`)
    .then(response => {
      const userData = getUserData(response.data.data)
      store.commit("setUserData", userData)
    })
    .catch(error => {
      console.log(error)
    })
}