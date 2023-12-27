<template>
  <button @click="handleAuth"
    class="flex flex-row items-center transition-colors  w-11/12 text-2xl py-2 rounded-3xl text-white bg-transparent hover:bg-white hover:text-black border border-white">
    <img src="@/assets/google-icon.svg" class="h-8 block mx-3" alt="google icon" />
    <div class="mx-3">
      <slot></slot>
    </div>
  </button>
</template>

<script>
import axiosClient from '@/axiosClient';


export default {
  props: {
    auth: String, // login, register
  },
  methods: {
    handleAuth() {
      if (this.auth == 'login')
        this.handleLogin()
      else if (this.auth == 'signup')
        this.handleRegister()
    },
    handleLogin() {
      axiosClient.post('/auth/oauth2/google')
      .then(response => {
        window.location.href = response.data.data.attributes.url
      })
    },
    handleRegister() {
      axiosClient.post('/auth/oauth2/google')
      .then(response => {
        window.location.href = response.data.data.attributes.url
      })
    }
  }

}

</script>