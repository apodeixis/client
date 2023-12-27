<template>
  <div class="lg:mx-64 md:mx-28 sm:mx-10 mx-1 simple-text-color-1">
    <div class="main-post-bg-color w-full p-4 my-2 rounded-xl">
      <div class="flex flex-row justify-between text-3xl my-2 mb-1 post-heading-color">
        <div>{{ $t('A_Author') }}</div>
        <div>{{ post.name }}</div>
      </div>
      <div class="text-xl flex flex-row justify-between">
        <div>{{ $t('A_AuthorId') }}</div>
        <CopyText :payload="post.authorId" />
      </div>
      <div class="text-xl flex flex-row justify-between">
        <div>{{ $t('A_CreationDate') }}</div>
        <div>{{ post.date }}</div>
      </div>
      <div class="text-xl flex flex-row justify-between">
        <div>{{ $t('A_TransactionHash') }}</div>
        <a :href="'https://mumbai.polygonscan.com/tx/' + post.txHash" target="_blank"
          class="hover:text-yellow-300 w-36 sm:w-40 md:w-40 lg:w-64 xl:w-[32rem]">
          <div class="truncate">{{ post.txHash }}</div>
        </a>
      </div>
    </div>
    <div class="w-full p-4 rounded-xl main-post-bg-color">
      <div class="flex flex-row ">
        <StaringIcon :starred="post.starred" @toggle="toggleStarred" size="2x" />
        <PostStatus v-if="userIsPostCreator" :status="post.status" />
      </div>
      <div class="text-3xl mb-4 text-center font-serif post-heading-color">{{ post.title
      }}</div>
      <div class="text-2xl my-4 font-serif whitespace-pre-line whitespace-break-spaces break-words">{{ post.body }}</div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import axiosClient from '@/axiosClient';
import PostStatus from '@/components/PostStatus.vue';
import { getPostData } from '@/common/APIConverters';
import { mapGetters, mapMutations } from 'vuex';
import { togglePostStarred } from '@/common/commonTools';
import StaringIcon from '@/components/StaringIcon.vue';
import CopyText from '@/components/CopyText.vue';

export default {
  components: {
    PostStatus,
    StaringIcon,
    CopyText
  },
  data() {
    return {
      post: {},
    }
  },
  computed: {
    userIsPostCreator() {
      if (!this.post.id)
        return false
      return this.getUserIsPostCreator(this.post);
    },
    ...mapGetters([
      "getUserIsPostCreator"
    ])
  },
  methods: {
    ...mapMutations([

    ]),
    toggleStarred() {
      togglePostStarred(this.post.id, this.post.starred, () => {
        this.post.starred = !this.post.starred
      }, (error) => {
        if (error.response.status == 409)
          this.post.starred = !this.post.starred
      })
    }
  },
  mounted() {
    const postId = useRoute().params.id
    axiosClient.get(`/posts/${postId}`)
      .then(response => {
        this.post = getPostData(response.data.data, response.data.included)
      })
      .catch(error => {
        console.log(error)
      })
  }
}

</script>