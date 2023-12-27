<template>
    <AuthLayoutSection>
        <div class="flex flex-col items-center">
            <AInput :label="$t('A_EnterYourEmail')" :placeholder="$t('A_EmailPlaceholder')" :validators="emailValidators"
                v-model="email" @error="$event => email_error = $event" />
            <ASubmitButton class="my-2" :value="$t('A_Update')" @click="handle" />
        </div>
        <ACenterPopupZero ref="popup" :title="$t('A_PasswordRecovery')" :body="$t('A_PleaseCheckYourMailToContinue')" />
    </AuthLayoutSection>
</template>


<script>
import AuthLayoutSection from '@/components/AuthLayoutSection.vue';
import AInput from '@/components/ALib/Fields/AInput.vue';
import ACenterPopupZero from '@/components/ALib/Popups/ACenterPopupZero.vue';
import { emailValidators } from '@/components/ALib/Fields/Validators.js';
import ASubmitButton from '@/components/ALib/Buttons/ASubmitButton.vue';
import axiosClient from '@/axiosClient';

export default {
    components: {
        AuthLayoutSection,
        AInput,
        ACenterPopupZero,
        ASubmitButton
    },
    data() {
        return {
            emailValidators,
            email: '',
            email_error: true,
            disabled: false
        }
    },
    methods: {
        handle() {
            if (this.email_error || this.disabled)
                return
            this.disabled = true
            const payload = JSON.stringify({
                data: {
                    type: "recover-password-email",
                    attributes: {
                        email: this.email
                    }
                }
            })
            axiosClient.post('/auth/recover/password/email', payload)
                .then(response => {
                    this.$refs.popup.show()
                })
                .catch(error => {
                    console.log(error)
                })
        }
    },
    mounted() {

    }
}

</script>