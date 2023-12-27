<template>
  <div class="w-[21rem] text-white">
    <div class="ml-5 pb-1 text-xl font-bold">{{ label }}</div>
    <textarea @input="checkInput" :placeholder="placeholder" :value="modelValue" rows="6"
      :class="{ 'border-2': errorMessage, 'border': !errorMessage, 'border-red-500': errorMessage }"
      class="box-border bg-gray-700 text-white w-full h-44 px-4 py-2 rounded-2xl border-blue-300 text-xl focus:border-2 focus:outline-none focus:border-yellow-300 scrollbar-thin scrollbar-thumb-gray-200"></textarea>
    <div class="h-5 ml-5 text-red-500">{{ errorMessage }}</div>
  </div>
</template>

<script>
import getUniqueId from '@/common/UniqueIdGenerator'

export default {
  props: {
    label: String,
    validators: Array,
    placeholder: String,
    modelValue: String
  },
  emits: ['update:modelValue', 'error'],
  inject: ['validator'],
  data() {
    return {
      id: 0,
      errorMessage: "",
      inputFocus: false,
      resetting: false,
    }
  },
  watch: {
    modelValue(newValue) {
      if (this.resetting) {
        this.resetting = false
        this.validator?.setState(this.id, true)
        return
      }
      this.validateInput(newValue)
    }
  },
  methods: {
    reset() {
      this.resetting = true
      this.$emit('update:modelValue', '')
      this.errorMessage = ''
    },
    accept() {
      this.$refs.field.blur()
      this.$emit('accepted')
    },
    checkInput(inputEvent) {
      const value = inputEvent.target.value
      this.$emit('update:modelValue', value)
    },
    validateInput(value) {
      let error = false
      for (let i = 0; i < this.validators.length; i++) {
        const validator = this.validators[i]
        const error_msg = validator(value)
        if (error_msg) {
          this.errorMessage = error_msg
          error = true
          break
        }
      }
      this.validator?.setState(this.id, error)
      this.$emit('error', error)
      if (!error)
        this.errorMessage = ""
    }
  },
  mounted() {
    this.id = getUniqueId()
    this.validator?.setState(this.id, true)
  }
}

</script>