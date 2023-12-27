<template>
  <div class="w-full px-0 sm:px-12 md:px-16 lg:px-38 xl:px-72 min-h-full">
    <div class="my-0 py-2 min-h-full sm:px-8 md:px-16 lg:px-26 section-bg-color ">
      <ul>
        <li v-for="postId of starredPosts" class="my-2 mx-2">
          <router-link :to="{ name: 'PostDetails', params: { id: postId } }">
            <PostElement :id="postId" />
          </router-link>
        </li>
      </ul>
      <PostsEmpty v-if="!starredPosts.length && loadingPostsEmpty" />
      <infinite-loading class="mx-auto" @infinite="loadMorePosts" />
      <div class="h-3">
      </div>
    </div>
  </div>
</template>

<script>
import PostElement from '@/components/PostElement.vue';
import { mapMutations, mapGetters } from 'vuex';
import PostsLoader from '@/common/PostsLoader';
import InfiniteLoading from 'v3-infinite-loading'
import PostsEmpty from '@/components/PostsEmpty.vue'
//uncomment to see spinner
//import "v3-infinite-loading/lib/style.css"


export default {
  components: {
    InfiniteLoading,
    PostElement,
    PostsEmpty
  },
  data() {
    return {
      postsLoader: new PostsLoader({
        apiPostsUrl: "/user/posts/starred/headers",
        postsLoadedCallback: this.onPostsLoaded,
        postsErrorCallback: () => this.loadingPostsEmpty = true,
      }),
      loadingPostsEmpty: false
    }
  },
  methods: {
    loadMorePosts() {
      const userId = this.userData?.id
      if (!userId)
        return
      this.postsLoader.loadMorePosts({
        "sorting": "desc"
      })
    },
    onPostsLoaded(posts) {
      this.addStarredPosts(posts)
    },
    ...mapMutations([
      "clearStarredPosts",
      "addStarredPosts",
    ])
  },
  computed: {
    ...mapGetters({
      starredPosts: "getStarredPosts",
      postById: "getPostWithId",
      userData: "getUserData"
    })
  },
  unmounted() {
    this.clearStarredPosts()
  }
}
</script>