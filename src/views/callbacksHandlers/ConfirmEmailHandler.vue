<template>
  <InfiniteLoadingLayout label="Waiting for verification..." />
</template>
  
<script>
import axiosClient from '@/axiosClient';
import { mapMutations } from 'vuex';
import { getUserData } from '@/common/APIConverters';
import InfiniteLoadingLayout from '@/components/Layouts/InfiniteLoadingLayout.vue';

export default {
  components: {
    InfiniteLoadingLayout
  },
  methods: {
    ...mapMutations(['setUserData', 'setAccessToken'])
  },
  mounted() {
    const payload = {
      data: {
        attributes: {
          token: this.$route.query.token
        }
      }
    }

    axiosClient.patch('auth/sign-up/callback', payload)
      .then(response => {
        const userData = getUserData(response.data.data)
        this.setUserData(userData)
        this.$router.push({ name: 'Login' })
      })
  }
}

</script>