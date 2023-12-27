<template>
    <EditPasswordBase @new-password="handleNewPassword"/>
</template>

<script>
import EditPasswordBase from './internal/EditPasswordBase.vue';

export default {
    components: {
        EditPasswordBase
    },
    methods: {
        handleNewPassword() {

        }
    }

}
</script>