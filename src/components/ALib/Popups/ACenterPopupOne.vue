<template>
    <ACenterPopupBase v-model:visible="visible" ref="popupBase">
        <ACenterPopupLayout :title="title" :body="body">
            <ASubmitButton :value="accept_text" class="max-w-sm" @click="accept"/>
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
    props: ['title', 'body', 'accept'],
    emits: ['accepted'],
    methods: {
        accept() {
            this.$emit('accepted')
            this.$refs.popupBase.close()
        },
        show() {
            this.visible = true
        }
    },
    computed: {
        accept_text() {
            if(this.accept)
                return this.accept
            else 
                return "accept"
        }
    }
}

</script>