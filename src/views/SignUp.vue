<template>
  <AuthLayoutSection>
    <form @submit.prevent="SignUp">
      <CompoundValidator ref="validator">
        <AuthInput :label="$t('A_EnterYourName')" :validators="nameValidators" v-model="name_str"
          :placeholder="$t('A_NamePlaceholder')" />
        <AuthInput :label="$t('A_EnterYourEmail')" :validators="emailValidators" v-model="email_str"
          :placeholder="$t('A_EmailPlaceholder')" />
        <AuthInput :label="$t('A_EnterYourPassword')" :validators="passwordValidators" v-model="password_str"
          :placeholder="$t('A_PasswordPlaceholder')" eye hidden />
        <AuthInput :label="$t('A_RepeatYourPassword')" :validators="password2_validators" v-model="password2_str"
          :placeholder="$t('A_PasswordPlaceholder')" eye hidden />
      </CompoundValidator>
      <error-field>{{ error_str }}</error-field>
      <div class="flex justify-center">
        <ASubmitButton :value="$t('A_SignUp')" />
      </div>
    </form>
    <div class="flex justify-center mt-3">
      <AuthWithGoogleButton auth="signup" class="text-lg sm:text-xl">{{ $t('A_ContinueWithGoogle') }}
      </AuthWithGoogleButton>
    </div>
    <div class="flex justify-center w-full">
      <div class="mt-2 text-white w-f">{{ $t('A_IfYouAlreadyHaveAnAccountYouCan') }}<router-link :to="{ name: 'Login' }"
          class="text-sky-400 hover:text-sky-700">{{ $t('A_LoginHere') }}</router-link>
      </div>
    </div>
    <div class="flex justify-center w-full">
      <div class="mt-2 text-white w-f">{{ $t('A_ForgotPasswordYouCanResotoreIt') }}<router-link
          :to="{ name: 'RestorePassword' }" class="text-sky-400 hover:text-sky-700">{{ $t('A_Here') }}</router-link>
      </div>
    </div>
    <ACenterPopupOne ref="popup" accept="ok" :closable="true" :title="confirm_email_title" :body="confirm_email_body" />
  </AuthLayoutSection>
</template>

<script>
import axiosClient from '@/axiosClient';
import ASubmitButton from '@/components/ALib/Buttons/ASubmitButton.vue';
import { mapMutations } from 'vuex';
import AuthWithGoogleButton from '@/components/AuthWithGoogleButton.vue';
import ACenterPopupOne from '@/components/ALib/Popups/ACenterPopupOne.vue';
import AuthInput from '@/components/AuthInput.vue';
import ErrorField from '@/components/ErrorField.vue';
import { passwordValidator, passwordValidators, emailValidators, nameValidators, createSamePasswordValidator } from '@/components/ALib/Fields/Validators.js';
import CompoundValidator from '@/components/ALib/Fields/CompoundValidator.vue';
import AuthLayoutSection from '@/components/AuthLayoutSection.vue';

export default
  {
    components: {
      ASubmitButton,
      AuthWithGoogleButton,
      AuthInput,
      ErrorField,
      ACenterPopupOne,
      CompoundValidator,
      AuthLayoutSection
    },
    data() {
      return {
        nameValidators,
        emailValidators,
        passwordValidators,
        name_str: '',
        email_str: '',
        password_str: '',
        password2_str: '',
        error_str: '',
        confirm_email_title: 'Email confirmation',
        confirm_email_body: 'Please check your mail to confirm your email',
      }
    },
    methods: {
      ...mapMutations([
        "setCredentials",
        "setUserData",
        "setAccessToken"
      ]),
      SignUp() {
        this.setCredentials({
          name: this.name_str
        });
        if (!this.$refs.validator.allFieldsValid()) {
          this.showError("Enter correctly all fields")
          return
        }

        const payload = JSON.stringify({
          data:
          {
            attributes:
            {
              email: this.email_str,
              password: this.password_str,
              name: this.name_str
            }
          }
        })

        axiosClient.post('/auth/sign-up', payload)
          .then(resposne => {
            this.$refs.popup.show()
          })
          .catch(error => {
            if (error.response?.status == 409) {
              this.showError(error.response.data.errors[0].detail)
            }
            this.showError("Bad credentials")
          })
      },
      showError(err) {
        this.error_str = err
      }
    },
    computed: {
      password2_validators() {
        return [passwordValidator, createSamePasswordValidator(this.password_str)]
      }
    }
  }


</script>