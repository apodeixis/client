<template>
  <div
    class="text-2xl px-3 py-1 border rounded-3xl hover:text-yellow-300 hover:border-yellow-300 cursor-pointer hover:scale-110 transition-spacing duration-200"
    :class="{ 'scale-110': active, 'text-yellow-300': active, 'border-yellow-300': active }">
    <slot></slot>
  </div>
</template>

<script>

export default {
  props: ['active']
}
</script>