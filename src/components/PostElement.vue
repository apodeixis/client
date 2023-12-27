<template>
  <section
    class="flex flex-col w-full py-1 main-post-bg-color rounded-md box-border hover:border-yellow-300 border-2 border-transparent">
    <div
      class="flex flex-row justify-between px-3 pb-1 text-xl post-heading-color items-center">
      <div>{{ post.name }}</div>
      <div class="flex flex-row items-center">
        <PostStatus v-if="showStatus" :status="post.status"
          class="hidden lg:block text-2xl mx-4" />
        <div class="pr-3 hidden lg:block">{{ post.date }}</div>
        <StaringIcon :starred="post.starred" @toggle="toggleStarred" class="text-2xl"
          size="1x" />
      </div>
    </div>
    <div class="text-xl px-3 pd-0 pt-0 simple-text-color-1 ">
      {{ post.title }}
    </div>
    <div
      class="flex flex-row-reverse justify-between px-3 pb-1 text-xl post-heading-color items-center">
      <div class="flex">
        <PostStatus v-if="showStatus" :status="post.status"
          class="text-xl block lg:hidden mx-4" />
        <div class="pr-3 block lg:hidden">{{ post.date }}</div>
      </div>
    </div>
  </section>
</template>

<script>
import PostStatus from '@/components/PostStatus.vue';
import { mapGetters } from 'vuex';
import { togglePostStarred } from '@/common/commonTools';
import StaringIcon from '@/components/StaringIcon.vue';

export default {
  components: {
    PostStatus,
    StaringIcon
  },
  props: ['id', 'showStatus'],
  methods: {
    toggleStarred() {
      togglePostStarred(this.id, this.post.starred)
    }
  },
  computed: {
    post() {
      return this.postById(this.id)
    },
    ...mapGetters({
      postById: "getPostWithId",
    })
  }
}

</script>
