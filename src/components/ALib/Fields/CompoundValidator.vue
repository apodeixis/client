<template>
    <slot></slot>
</template>


<script>
import CompoundValidatorCollector from './CompoundValidatorCollector';

export default {
    data() {
        return {
            validator: new CompoundValidatorCollector()
        }
    },
    provide() {
        return {
            validator: this.validator
        }
    },
    methods: {
        allFieldsValid() {
            return this.validator.allFieldsValid()
        },
        reset() {
            this.validator.reset()
        }
    }
}

</script>