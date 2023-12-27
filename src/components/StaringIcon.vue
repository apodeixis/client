<template>
  <font-awesome-icon @click.prevent.stop="toggle" icon="star" :size="size"
    :class="starred ? 'text-yellow-400' : 'text-gray-500'" class="text-center p-1 hover:cursor-pointer"
    style="--fa-animation-iteration-count: 1;--fa-animation-duration: 2s;--fa-beat-scale: 1.2;" />
</template>


<script>

export default
{
  emits: ['toggle'],
  props: ['starred', 'size'],
  methods: {
    toggle(event)
    {
      this.$emit('toggle')
    }
  }
}
</script>