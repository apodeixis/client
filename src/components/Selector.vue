<template>
  <div>
    <select @change="$event => $emit('update:modelValue', $event.target.value)"
      class="box-border bg-gray-700 text-white w-full h-12 px-4 py-2 rounded-3xl border-blue-300 text-xl focus:border-2 focus:outline-none focus:border-yellow-300 hover:cursor-pointer">
      <option v-for="opt of options" :key="opt" :selected="opt == defaultOption">
        {{ opt }}
      </option>
    </select>
  </div>
</template>

<script>

export default {
  props: ['options', 'modelValue', 'defaultOption'],
  emits: ['update:modelValue']
}
</script>