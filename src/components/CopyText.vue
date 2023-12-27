<template>
  <div class="flex items-center">
    <div class="mr-3">{{ payload }}</div>
    <font-awesome-icon @click.prevent.stop="copy_payload" icon="copy" size="sm"
      :class="copied ? 'text-white' : 'text-gray-500'"
      class="content-center hover:cursor-pointer" />
  </div>
</template>

<script>

export default {
  props: ["payload"],
  data() {
    return {
      copied: false
    }
  },
  methods: {
    copy_payload() {
      this.copied = true
      navigator.clipboard.writeText(this.payload)
    }
  }
}

</script>