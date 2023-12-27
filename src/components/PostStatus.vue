<template>
  <div class="flex items-center">
    <div :class="statusColor" v-if="statusColor"
      class="rounded-xl font-semibold block">
      {{ statusText }}
    </div>
  </div>
</template>

<script>

export default {
  props: ["status"],
  data() {
    return {
      statusColorMap: new Map([
        ["new", "text-white"],
        ["pending", "text-yellow-500"],
        ["confirmed", "text-green-300"],
        ["failed", "text-red-600"]
      ]),
      statusNameMap: new Map([
        ["new", this.$t('A_StatusNew')],
        ["pending", this.$t('A_StatusPending')],
        ["confirmed", this.$t('A_StatusConfirmed')],
        ["failed", this.$t('A_StatusFailed')],
      ])
    }
  },
  computed: {
    statusColor() {
      return this.statusColorMap.get(this.status)
    },
    statusText() {
      return this.statusNameMap.get(this.status)
    }
  }
}

</script>