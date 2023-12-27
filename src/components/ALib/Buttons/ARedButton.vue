<template>
  <button
    class="transition-colors w-11/12 text-3xl py-1 rounded-3xl text-red-500 bg-transparent hover:bg-red-500 hover:text-white border border-red-500 ">{{
      value }}</button>
</template>

<script>

export default {
  props: ['value']
}

</script>