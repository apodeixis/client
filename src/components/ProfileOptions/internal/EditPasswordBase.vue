<template>
    <div class="inline-block">
        <CompoundValidator ref="validator">
            <AInput ref="newPasswordInput" v-model="password_str" :placeholder="$t('A_NewPassword')"
                :validators="passwordValidators" />
            <AInput ref="newPasswordInput2" v-model="password2_str" :placeholder="$t('A_RepeatNewPassword')"
                :validators="password2_validators" />
        </CompoundValidator>

        <div class="flex justify-center">
            <ASubmitButton :value="$t('A_Update')" @click="changePassword" />
        </div>
        <ACenterPopupOne ref='popup' body="Here we go" />
    </div>
</template>

<script>
import ASubmitButton from '@/components/ALib/Buttons/ASubmitButton.vue';
import AInput from '@/components/ALib/Fields/AInput.vue';
import { passwordValidator, passwordValidators, createSamePasswordValidator } from '@/components/ALib/Fields/Validators';
import { mapMutations, mapGetters } from 'vuex';
import CompoundValidator from '@/components/ALib/Fields/CompoundValidator.vue';
import ACenterPopupOne from '@/components/ALib/Popups/ACenterPopupOne.vue';

export default {
    components: {
        ASubmitButton,
        AInput,
        CompoundValidator,
        ACenterPopupOne
    },
    emits: ['newPassword'],
    data() {
        return {
            passwordValidators,
            password_str: '',
            password2_str: '',
        }
    },
    methods: {
        ...mapMutations(["setUserData"]),
        changePassword() {
            if (!this.$refs.validator.allFieldsValid()) {
                this.$refs.popup.show()
                return
            }

            this.$emit('newPassword', this.password_str)

            // this.$refs.newPasswordInput.reset()
            // this.$refs.newPasswordInput2.reset()


        },
    },
    computed: {
        ...mapGetters({
            userData: "getUserData"
        }),
        password2_validators() {
            return [passwordValidator, createSamePasswordValidator(this.password_str)]
        }

    }
}

</script>