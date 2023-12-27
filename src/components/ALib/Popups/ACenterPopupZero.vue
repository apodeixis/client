<template>
    <ACenterPopupBase :closable="true" v-model:visible="visible">
        <ACenterPopupLayout :title="title" :body="body">
        </ACenterPopupLayout>
    </ACenterPopupBase>
</template>


<script>
import ACenterPopupBase from './ACenterPopupBase.vue';
import ACenterPopupLayout from './ACenterPopupLayout.vue';

export default {
    components: {
        ACenterPopupBase,
        ACenterPopupLayout
    },
    data() {
        return {
            visible: false
        }
    },
    methods: {
        show() {
            this.visible = true
        }
    },
    props: ['title', 'body']
}

</script>