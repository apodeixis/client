<template>
  <div class="w-full px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 xxl:px-64 min-h-full">
    <div class="flex-down w-full section-bg-color min-h-full">
      <h1 class="text-center text-3xl p-4 highlighted-text-color-1 font-serif hidden sm:block">{{ $t('A_ProfileTitle') }}
      </h1>
      <div class="main-post-bg-color simple-text-color-1 mx-1 my-2 rounded-xl sm:mx-8 md:mx-20 lg:mx-44 py-4 px-8">
        <div class="">
          <div class="flex flex-row justify-between text-3xl my-2 mb-1 post-heading-color">
            <div>{{ $t('A_Author') }}</div>
            <div>{{ userData.name }}</div>
          </div>
          <div class="flex flex-row justify-between text-xl my-1 mb-1">
            <div>{{ $t('A_AuthorId') }}</div>
            <CopyText :payload="userData.author_id" />
          </div>
          <div class="flex flex-row justify-between text-xl my-1 mb-1">
            <div>{{ $t('A_Email') }}</div>
            <div>{{ userData.email }}</div>
          </div>
          <div class="flex flex-row justify-between text-xl my-1 mb-1">
            <div>{{ $t('A_Language') }}</div>
            <div>
              <ASingleOptionChooser :valuesArray="languageNames" :listenersArray="languageListeners"
                v-slot="{ active, value }">
                <ALanguageOptionElement :active="active">{{ value }}</ALanguageOptionElement>
              </ASingleOptionChooser>
            </div>
          </div>
        </div>
        <div class="flex flex-row justify-between items-center">
          <ASingleOptionChooser :enableNotActive="true" :valuesArray="editNames" :listenersArray="editListeners"
            v-slot="{ active, value }">
            <AOptionElement :active="active">{{ value }}</AOptionElement>
          </ASingleOptionChooser>
          <ARedButton :value="$t('A_Logout')" class="w-32" @click="Logout" />
        </div>
      </div>
      <div class="mx-1 sm:mx-8 md:mx-20 lg:mx-44 mt-14">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import axiosClient from '@/axiosClient';
import router from '@/router';
import CopyText from '@/components/CopyText.vue';
import AInput from '@/components/ALib/Fields/AInput.vue';
import ASubmitButton from '@/components/ALib/Buttons/ASubmitButton.vue';
import ASingleOptionChooser from '@/components/ALib/OptionChoosers/ASingleOptionChooser.vue';
import ARedButton from '@/components/ALib/Buttons/ARedButton.vue';
import { mapGetters, mapMutations } from 'vuex';
import AOptionElement from '@/components/ALib/OptionChoosers/AOptionElement.vue';
import ALanguageOptionElement from '@/components/ALib/OptionChoosers/ALanguageOptionElement.vue';

export default {
  components: {
    CopyText,
    AInput,
    ASubmitButton,
    ASingleOptionChooser,
    ARedButton,
    AOptionElement,
    ALanguageOptionElement
  },
  data() {
    return {
      editListeners: [false, false],
      idxComponentName: ['EditName', 'EditPassword'],
      languageListeners: [false, false],
      languageNames: ['en', 'ua'],
    }
  },
  methods: {
    ...mapMutations(["setAccessToken", "setUserLocale"]),
    Logout() {
      axiosClient.post("/auth/logout")
        .then(() => {
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          this.setAccessToken('')
          router.push({ name: "Authorization" });
        })
    }
  },
  watch: {
    editListeners: {
      handler(newListeners) {
        const idx = newListeners.findIndex(el => el)
        let name = this.idxComponentName[idx]
        name = name ? name : 'Profile'
        this.$router.push({ name: name })
      },
      deep: true
    },
    languageListeners: {
      handler(newListeners) {
        const idx = newListeners.findIndex(el => el)
        if (idx == -1)
          return
        this.$i18n.locale = this.languageNames[idx]
        this.setUserLocale(this.$i18n.locale)
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters({
      userData: "getUserData"
    }),
    editNames() {
      return [this.$t('A_ChangeName'), this.$t('A_ChangePassword')]
    }
  },
  mounted() {
    for (let i = 0; i < this.languageNames.length; i++) {
      if (this.languageNames[i] == this.userData.locale) {
        this.languageListeners[i] = true
        break
      }
    }
  }
}
</script>