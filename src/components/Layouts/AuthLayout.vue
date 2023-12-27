<template>
  <section class="min-h-screen flex flex-col bg-fixed bg-cover bg-center"
    :style="background_with_image">
    <header class="w-screen drop-shadow-md flex text-white items-center bg-black">
      <p class="mx-auto p-4 text-4xl font-serif text-grey-800">
        Apodeixis
      </p>
    </header>
    <div class="flex flex-grow items-center">
      <router-view />
    </div>
  </section>
</template>

<script>
import bg_image from '@/assets/images/backgrounds/auth_bg.jpg';

export default {
  computed: {
    background_with_image() {
      return {
        backgroundImage: `url('${bg_image}')`
      }
    }
  }
}

</script>