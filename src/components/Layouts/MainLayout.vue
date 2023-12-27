<template>
  <section
    class="back-color h-screen flex flex-col justify-between bg-fixed bg-cover bg-center"
    :style="background_with_image">
    <header
      class="bg-gradient-to-r from-gray-900 via-black to-gray-900 shadow-xl flex py-1 justify-between items-stretch">
      <div class="flex mx-auto max-w-full sm:hidden">
        <vue-horizontal class="w-full" snap="center" :button="false">
          <menu-element name="Home">{{ $t('A_Home') }}</menu-element>
          <menu-element name="Posts">{{ $t('A_Posts') }}</menu-element>
          <menu-element name="StarredPosts" v-if="authorized">{{ $t('A_Starred') }}</menu-element>
          <menu-element name="CreatePost" v-if="authorized">{{ $t('A_CreatePost') }}</menu-element>
          <menu-element name="Profile" v-if="authorized">{{ $t('A_Profile') }}</menu-element>
          <menu-element name="Login" v-if="!authorized">{{ $t('A_Login') }}</menu-element>
          <menu-element name="SignUp" v-if="!authorized">{{ $t('A_SignUp') }}</menu-element>
        </vue-horizontal>
      </div>
      <div class="gap-1 mx-auto hidden sm:flex">
        <menu-element name="Home">{{ $t('A_Home') }}</menu-element>
        <menu-element name="Posts">{{ $t('A_Posts') }}</menu-element>
        <menu-element name="StarredPosts" v-if="authorized">{{ $t('A_Starred') }}</menu-element>
        <menu-element name="CreatePost" v-if="authorized">{{ $t('A_CreatePost') }}</menu-element>
        <menu-element name="Profile" v-if="authorized">{{ $t('A_Profile') }}</menu-element>
        <menu-element name="Login" v-if="!authorized">{{ $t('A_Login') }}</menu-element>
        <menu-element name="SignUp" v-if="!authorized">{{ $t('A_SignUp') }}</menu-element>
      </div>
    </header>
    <section class="flex flex-col flex-1 overflow-y-scroll main-text-color">
      <router-view></router-view>
    </section>
  </section>
</template>

<script>
import MenuElement from '@/components/MenuElement.vue'
import bg_image from '@/assets/images/backgrounds/main_bg.jpg';
import VueHorizontal from 'vue-horizontal'
import { mapGetters } from 'vuex';

export default {
  components: { MenuElement, VueHorizontal },
  computed: {
    ...mapGetters(['authorized']),
    background_with_image() {
      return {
        backgroundImage: `url('${bg_image}')`
      }
    }
  }
}

</script>