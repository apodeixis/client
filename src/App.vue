<template>
  <router-view />
</template>

<script>
import { loadUserData } from '@/common/dataLoaders';
import config from '@/config';
import { refreshTokens } from './common/refreshToken';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({ 'userData': 'getUserData' }),
  },
  created() {
    refreshTokens()
    document.title = config.APP_NAME
    try {
      loadUserData()
        .then(() => {
          this.$i18n.locale = this.userData.locale
        })
    } catch (error) {
      console.log("User not found", error)
    }
  }
}
</script>
