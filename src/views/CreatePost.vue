<template>
  <div class="w-full px-0 sm:px-12 md:px-16 lg:px-38 xl:px-72 min-h-full">
    <div class="my-0 py-2 px-2 sm:px-8 md:px-16 lg:px-26 section-bg-color min-h-full">
      <div>
        <div class="hidden sm:block text-center text-3xl p-4 highlighted-text-color-1 font-serif w-full">
          {{ $t('A_CreateYourPost') }}
        </div>
        <form @submit.prevent="CreatePost" class="w-full">
          <CompoundValidator ref="validator">
            <AInput ref="titleInput" class="w-full" :placeholder="$t('A_TitlePlaceholder')" v-model="userPost.title"
              :validators="titleValidators" />
            <AInputArea ref="bodyInput" class="w-full" :placeholder="$t('A_BodyPlaceholder')" v-model="userPost.text"
              :validators="textValidators" />
          </CompoundValidator>
          <error-field>{{ error_str }}</error-field>
          <div class="flex justify-center">
            <ASubmitButton :value="$t('A_SendPost')" class="w-96" />
          </div>
        </form>
        <div>
          <div class="h-12 sm:h-24"></div>
          <div class="hidden sm:block text-center text-4xl p-4 highlighted-text-color-1 font-serif w-full">
            {{ $t('A_Created') }}</div>
          <div class="w-full h-0.5 bg-green-500 mb-4 rounded-xl"></div>
          <ul>
            <li v-for="postId of userPosts" class="my-2 mx-2">
              <router-link :to="{ name: 'PostDetails', params: { id: postId } }">
                <PostElement :id="postId" :showStatus="true" />
              </router-link>
            </li>
          </ul>
        </div>
        <PostsEmpty v-if="!userPosts.length && loadingPostsEmpty" />
        <infinite-loading class="mx-auto" @infinite="loadMorePosts" />
      </div>
    </div>
  </div>
</template>

<script>
import ASubmitButton from '@/components/ALib/Buttons/ASubmitButton.vue'
import PostElement from '@/components/PostElement.vue';
import axiosClient from '@/axiosClient';
import { mapMutations, mapGetters } from 'vuex';
import { getPostData } from '@/common/APIConverters';
import PostsLoader from '@/common/PostsLoader';
import InfiniteLoading from 'v3-infinite-loading'
import PostsEmpty from '@/components/PostsEmpty.vue'
import AInput from '@/components/ALib/Fields/AInput.vue';
import AInputArea from '@/components/ALib/Fields/AInputArea.vue';
import ErrorField from '@/components/ErrorField.vue';
import CompoundValidator from '@/components/ALib/Fields/CompoundValidator.vue';

import { createMaxLengthValidator, emptyValidator } from '@/components/ALib/Fields/Validators.js'

//uncomment to see spinner
//import "v3-infinite-loading/lib/style.css"


export default {
  components: {
    ASubmitButton,
    InfiniteLoading,
    PostElement,
    PostsEmpty,
    AInput,
    AInputArea,
    ErrorField,
    CompoundValidator
  },
  data() {
    return {
      postsLoader: new PostsLoader({
        apiPostsUrl: "/user/posts/headers",
        postsLoadedCallback: this.onPostsLoaded,
        postsErrorCallback: () => this.loadingPostsEmpty = true
      }),
      loadingPostsEmpty: false,
      postData: {
        title: '',
        text: '',
      },
      titleValidators: [emptyValidator, createMaxLengthValidator(80)],
      textValidators: [emptyValidator, createMaxLengthValidator(2000)],
      error_str: ''
    }
  },
  methods: {
    CreatePost() {
      if (!this.$refs.validator.allFieldsValid()) {
        this.showError("Enter conrrectly all fields")
        return
      }

      const requestPayload = JSON.stringify({ data: { type: "create-post", attributes: { title: this.postData.title, body: this.postData.text } } })

      axiosClient.post("/posts", requestPayload)
        .then(response => {
          const post = getPostData(response.data.data, response.data.included)
          this.addUserPost(post)
          this.$refs.titleInput.reset()
          this.$refs.bodyInput.reset()
          this.postData.text = ''
          this.setUserPost(this.postData)
          this.hideError()
          this.resetErrors()
        })
        .catch(error => {
          console.log(error)
        })
    },
    loadMorePosts() {
      const userId = this.userData?.id
      if (!userId || this.loadingPostsEmpty) {
        return
      }
      this.postsLoader.loadMorePosts({
        "sorting": "desc",
        "user[id]": userId
      })
    },
    onPostsLoaded(posts) {
      this.addUserPosts(posts)
    },
    ...mapMutations([
      "setUserPost",
      "addUserPost",
      "clearUserPosts",
      "addUserPosts"
    ]),
    showError(error) {
      this.error_str = error
    },
    hideError() {
      this.error_str = ''
    },
    resetErrors() {
      this.title_error = true
      this.text_error = true
    }
  },
  computed: {
    ...mapGetters({
      userPosts: "getUserPosts",
      userPost: "getUserPost",
      postById: "getPostWithId",
      userData: "getUserData"
    })
  },
  mounted() {
    this.postData = this.userPost
    this.loadMorePosts()
  },
  unmounted() {
    this.setUserPost(this.postData)
    this.clearUserPosts()
  }
}
</script>

<style>
textarea::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background-color: red;
}
</style>