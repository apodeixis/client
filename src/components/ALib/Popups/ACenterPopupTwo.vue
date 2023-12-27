<template>
    <ACenterPopupBase v-model:visible="visible" ref="popupBase">
        <ACenterPopupLayout :title="title" :body="body">
            <div class="flex flex-col sm:flex-row w-full sm:space-x-3 space-y-3 sm:space-y-0 justify-center">
                <ASubmitButton :value="left_text" @click="left" class="mx-auto" />
                <ASubmitButton :value="right_text" @click="right" class="mx-auto" />
            </div>
        </ACenterPopupLayout>
    </ACenterPopupBase>
</template>


<script>
import ACenterPopupBase from './ACenterPopupBase.vue';
import ACenterPopupLayout from './ACenterPopupLayout.vue';
import ASubmitButton from '../Buttons/ASubmitButton.vue';

export default {
    data() {
        return {
            visible: false
        }
    },
    components: {
        ACenterPopupBase,
        ACenterPopupLayout,
        ASubmitButton
    },
    props: ['title', 'body', 'left_label', 'right_label'],
    emits: ['left', 'right'],
    methods: {
        left() {
            this.$emit('left')
            this.$refs.popupBase.close()
        },
        right() {
            this.$emit('right')
            this.$refs.popupBase.close()
        },
        show() {
            this.visible = true
        }
    },
    computed: {
        left_text() {
            if (this.left_label)
                return this.left_label
            else
                return "left"
        },
        right_text() {
            if (this.right_label)
                return this.right_label
            else
                return "right"
        }
    }
}

</script>