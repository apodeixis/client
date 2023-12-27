<template>
  <div class="w-[21rem] text-white">
    <div class="ml-5 mb-1 text-xl font-bold" v-if="label">{{ label }}</div>
    <div class="w-full relative">
      <input @input="checkInput" :placeholder="placeholder" :type="hiddenType" ref="field" @blur="accept"
        @keyup.enter="accept" :value="modelValue"
        class="box-border bg-gray-700 text-white w-full h-12 px-4 py-2 rounded-3xl border-blue-300 text-xl focus:border-2 focus:outline-none focus:border-yellow-300"
        :class="{ 'border-2': errorMessage, 'border': !errorMessage, 'border-red-500': errorMessage, 'pr-12': eye }" />
      <div class="h-full grid content-center absolute bottom-0 right-3">
        <font-awesome-icon @click.prevent.stop="toggleVisibility" :icon="eyeIcon" size="lg" v-if="eye"
          class="text-center p-1 hover:cursor-pointer" />
      </div>
    </div>
    <div class="h-5 ml-5 mt-1 text-red-500">{{ errorMessage }}</div>
  </div>
</template>

<script>
import getUniqueId from '@/common/UniqueIdGenerator'

export default {
  props: {
    label: String,
    validators: Array,
    placeholder: String,
    eye: Boolean,
    hidden: Boolean,
    modelValue: String
  },
  emits: ['update:modelValue', 'error', 'accepted'],
  inject: ['validator'],
  data() {
    return {
      id: 0,
      errorMessage: "",
      eyeIcon: "eye",
      hiddenType: '',
      eyeIconMap: new Map([
        [true, 'eye'],
        [false, 'eye-slash']
      ]),
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
    },
    toggleVisibility() {
      if (this.eyeIcon == this.eyeIconMap.get(true)) {
        this.hiddenType = 'password'
        this.eyeIcon = this.eyeIconMap.get(false)
      }
      else {
        this.hiddenType = ''
        this.eyeIcon = this.eyeIconMap.get(true)
      }
    }
  },
  mounted() {
    this.id = getUniqueId()
    this.validator?.setState(this.id, true)
    if (this.hidden)
      this.toggleVisibility()
  }
}

</script>