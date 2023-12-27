<template>
    <Transition name="fade">
        <div v-if="visible" class="fixed top-0 left-0 w-screen h-screen popup-background-color flex flex-col justify-center"
            :class="closable ? 'hover:cursor-pointer' : ''" @click="close_internal">
            <div class="text-white text-2xl max-w-[95%] sm:max-w-[60%] lg:max-w-[30%] mx-auto hover:cursor-auto"
                @click.prevent.stop>
                <slot></slot>
            </div>
        </div>
    </Transition>
</template>

<script>

export default {
    props: ['visible', 'closable'],
    emits: ['closed', 'update:visible'],
    methods: {
        close_internal() {
            if (this.closable)
                this.close()
        },
        close() {
            this.$emit('update:visible', false)
            this.$emit('closed')
        }
    }
}

</script>

<style>
.popup-background-color {
    background-color: rgba(0, 0, 0, 0.49);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>