<template>
  <div class="flex space-x-6">
    <div v-for="(value, index) in valuesArray" :key="index" @click="() => toggleActiveValue(index)">
      <slot :active="listenersArray[index]" :value="value"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['valuesArray', 'listenersArray', 'enableNotActive'],
  data() {
    return {
      lastActiveIndex: 0
    }
  },
  methods: {
    toggleActiveValue(index) {
      if (this.listenersArray[index] && this.enableNotActive) {
        this.listenersArray[index] = false
        return
      }
      this.listenersArray[this.lastActiveIndex] = false
      this.lastActiveIndex = index
      this.listenersArray[index] = true;
    }
  }
}

</script>