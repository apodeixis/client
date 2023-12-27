<template>
  <router-link :to="{ name: name }" class="flex flex-row items-center mx-1 flex-none">
    <div class="w-0.5 transition-[height] ease-out duration-200 rounded-xl"
      :class="{ 'h-4/5': highlighted, 'h-1/5': !highlighted, 'bg-transparent': !highlighted, 'bg-violet-300': highlighted }">
    </div>
    <div :class="{ 'text-white': !(highlighted || active), 'text-cyan-500': highlighted || active }"
      @mouseover="() => hovered = true" class="flex-none text-2xl px-2 py-2 font-serif"
      @mouseleave="() => hovered = false">
      <slot></slot>
    </div>
    <div class="w-0.5 transition-[height] ease-out duration-200 rounded-xl"
      :class="{ 'h-4/5': highlighted, 'h-1/5': !highlighted, 'bg-transparent': !highlighted, 'bg-violet-300': highlighted }">
    </div>
  </router-link>
</template>

<script>
export default {
  props: ['name'],
  data() {
    return {
      hovered: false
    }
  },
  computed: {
    highlighted() {
      return this.hovered
    },
    active() {
      let paths = this.$route.fullPath.split("/")
      return paths[1] == this.name
    }
  }
}
</script>