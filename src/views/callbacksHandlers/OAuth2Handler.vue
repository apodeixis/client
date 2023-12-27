<template>
  <InfiniteLoadingLayout label="Waiting for verification..."/>
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
        type: "oauth2-google-callback",
        attributes: {
          code: this.$route.query.code,
          state: this.$route.query.state
        }
      }
    }
    axiosClient.patch('/auth/oauth2/google/callback', JSON.stringify(payload))
      .then(response => {
        this.setAccessToken(response.data.included[0].attributes.access)

        const userData = getUserData(response.data.data)
        this.setUserData(userData)
        this.$router.push({ name: 'Home' })
      })
      .catch(error => {
        console.log(error)
        this.$router.push({ name: 'Authorization' })
      })
  }
}

</script>