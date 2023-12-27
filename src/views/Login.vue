<template>
  <AuthLayoutSection>
    <form @submit.prevent="Login" class="">
      <CompoundValidator ref="validator">
        <AuthInput :label="$t('A_EnterYourEmail')" :validators="emailValidators" v-model="email_str"
          :placeholder="$t('A_EmailPlaceholder')" class="w-auto" />
        <AuthInput :label="$t('A_EnterYourPassword')" :validators="passwordValidators" v-model="password_str"
          :placeholder="$t('A_PasswordPlaceholder')" eye hidden class="w-auto" />
      </CompoundValidator>
      <error-field>{{ error_str }}</error-field>
      <div class="flex justify-center">
        <ASubmitButton :value="$t('A_Login')" />
      </div>
    </form>
    <div class="flex justify-center mt-3">
      <AuthWithGoogleButton auth="login" class="text-lg sm:text-xl">{{ $t('A_ContinueWithGoogle') }}
      </AuthWithGoogleButton>
    </div>
    <div class="flex justify-center w-full">
      <div class="mt-2 text-white w-full text-center">{{ $t('A_IfYouDoNotHaveAnAccountYouCan') }}<router-link
          :to="{ name: 'SignUp' }" class="text-sky-400 hover:text-sky-700">{{ $t('A_SignUpHere') }}</router-link>
      </div>
    </div>
    <div class="flex justify-center w-full">
      <div class="mt-2 text-white w-f">{{ $t('A_ForgotPasswordYouCanResotoreIt') }}<router-link
          :to="{ name: 'RestorePassword' }" class="text-sky-400 hover:text-sky-700">{{ $t('A_Here') }}</router-link>
      </div>
    </div>
  </AuthLayoutSection>
</template>

<script>
import router from '@/router/index.js'
import ASubmitButton from '@/components/ALib/Buttons/ASubmitButton.vue';
import axiosClient from '@/axiosClient';
import { mapMutations } from 'vuex';
import { getUserData } from '@/common/APIConverters';
import AuthWithGoogleButton from '@/components/AuthWithGoogleButton.vue';

import AuthInput from '@/components/AuthInput.vue';
import ErrorField from '@/components/ErrorField.vue';
import { passwordValidators, emailValidators } from '@/components/ALib/Fields/Validators.js';
import CompoundValidator from '@/components/ALib/Fields/CompoundValidator.vue';
import AuthLayoutSection from '@/components/AuthLayoutSection.vue';



export default {
  components: {
    ASubmitButton,
    AuthWithGoogleButton,
    AuthInput,
    ErrorField,
    CompoundValidator,
    AuthLayoutSection
  },
  data() {
    return {
      passwordValidators,
      emailValidators,
      email_str: '',
      password_str: '',
      error_str: ''
    }
  },
  methods: {
    ...mapMutations([
      "setCredentials",
      "setUserData",
      "setAccessToken"
    ]),
    showError(error) {
      this.error_str = error
    },
    Login() {
      this.setCredentials({
        name: this.email_str
      });
      if (!this.$refs.validator.allFieldsValid()) {
        this.showError("Enter correctly all fields")
        return
      }
      const payload = JSON.stringify({ data: { attributes: { email: this.email_str, password: this.password_str } } })
      axiosClient.post('/auth/login', payload, {
        withCredentials: true
      })
        .then(response => {
          this.setAccessToken(response.data.included[0].attributes.access)

          const userData = getUserData(response.data.data)

          this.setUserData(userData)

          router.push({ name: 'Home' })
        })
        .catch(error => {
          this.error_str = "incorrect credentials"
          this.show_err = true
        })
    }
  }
}
</script>