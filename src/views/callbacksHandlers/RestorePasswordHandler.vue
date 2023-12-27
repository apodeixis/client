<template>
    <AuthLayoutSection>
        <EditPasswordBase @new-password="handleNewPassword" />
    </AuthLayoutSection>
</template>


<script>
import EditPasswordBase from '@/components/ProfileOptions/internal/EditPasswordBase.vue';
import AuthLayoutSection from '@/components/AuthLayoutSection.vue';
import axiosClient from '@/axiosClient';

export default {
    components: {
        EditPasswordBase,
        AuthLayoutSection
    },
    data() {
        return {
            token: ''
        }
    },
    methods: {
        handleNewPassword(newPassword) {
            const payload = JSON.stringify({
                data: {
                    type: "recover-password",
                    attributes: {
                        token: this.token,
                        new_password: newPassword
                    }
                }
            })
            axiosClient.patch('/auth/recover/password', payload)
                .then(response => {
                    this.$router.push({ name: 'Login' })
                })
        }
    },
    mounted() {
        this.token = this.$route.query.token
    }
}

</script>