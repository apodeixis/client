<template>
    <div class="text-2xl hover:text-yellow-300 cursor-pointer py-2"
        :class="{ 'scale-110': active, 'text-yellow-300': active, 'border-yellow-300': active }">
        <slot></slot>
    </div>
</template>
  
<script>
export default {
    props: ['active']
}
</script>