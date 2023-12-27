<template>
  <div class="w-full px-0 sm:px-12 md:px-16 lg:px-38 xl:px-72 min-h-full">
    <div class="my-0 py-2 sm:px-8 md:px-16 lg:px-26 bg-gray-100 min-h-full section-bg-color">
      <div class="mx-2 mt-2 flex space-x-4">
        <font-awesome-icon @click.prevent.stop="resetFilters" icon="undo"
          class="text-center mt-3 ml-1 hover:cursor-pointer text-gray-500 hover:text-yellow-400 text-3xl" />
        <selector :options="sortOptions" v-model="filters.sortOrder" :defaultOption="filters.sortOrder"
          @update:modelValue="onFiltersChanged" class="w-32" />
        <AInput ref="idInput" v-model="rawAuthorId" @error="event => user_id_error = event" :validators="userIdValidators"
          @accepted="onFiltersChanged" :placeholder="$t('A_AuthorIdPlaceholder')" class="w-[9rem]" />
      </div>
      <div @click="onFiltersChanged" v-if="loadNewPostsNotification && filters.sortOrder == 'Newer'"
        class="text-white flex justify-center">
        <button
          class="post-heading-color text-2xl px-4 py-2 bg-gray-700 rounded-3xl hover:bg-white transition-colors hover:text-black">{{
            $t('A_LoadNewPosts') }}</button>
      </div>
      <ul>
        <li v-for="postId of filteredPosts" class="my-2 mx-2" :key="postId">
          <router-link :to="{ name: 'PostDetails', params: { id: postId } }">
            <PostElement :id="postId" />
          </router-link>
        </li>
      </ul>
      <PostsEmpty v-if="loadingPostsEmpty && !filteredPosts.length" />
      <infinite-loading class="mx-auto" :key="inifiteKey" @infinite="loadMorePosts" />
      <div class="h-3">
      </div>
    </div>
  </div>
</template>

<script>
import PostElement from '@/components/PostElement.vue';
import { mapGetters } from 'vuex';
import InfiniteLoading from 'v3-infinite-loading'
import axiosClient from '@/axiosClient';
import { mapMutations } from 'vuex';
import Selector from '@/components/Selector.vue';
import PostsLoader from '@/common/PostsLoader';
import PostsEmpty from '@/components/PostsEmpty.vue';
import AInput from '@/components/ALib/Fields/AInput.vue';
import { positiveNumberValidator } from '@/components/ALib/Fields/Validators.js'

//uncomment to see spinner
//import "v3-infinite-loading/lib/style.css"


export default {
  components: {
    PostElement,
    InfiniteLoading,
    Selector,
    PostsEmpty,
    AInput
  },
  data() {
    return {
      previousFilters: {},
      filters: {},
      sortOrderMap: new Map([
        [this.$t('A_Newer'), "desc"],
        [this.$t('A_Older'), "asc"]
      ]),
      amoutOfPostsPerRequest: 10,
      loadNewPostsNotification: false,
      loadingPostsEmpty: false,  // we need this because before posts are loaded, this shit is shown up
      userIdValidators: [positiveNumberValidator],
      user_id_error: false,
      inifiteKey: 1,
      rawAuthorId: undefined
    }
  },
  watch: {
    rawAuthorId(newAuthorId) {
      this.filters.authorId = newAuthorId.trim()
    }
  },
  computed: {
    ...mapGetters({
      filteredPosts: "getFilteredPosts",
      postById: "getPostWithId",
      userFilters: "loadUserFilters",
    }),
    sortOptions() {
      return [this.$t('A_Newer'), this.$t('A_Older')]
    }
  },
  methods: {
    defaultFilters() {
      return {
        postsLoader: new PostsLoader({
          apiPostsUrl: "/posts/headers/confirmed",
          postsLoadedCallback: this.onPostsLoaded,
          postsErrorCallback: this.setLoadingPostsEmpty // this shit is not fucking reactive
        }),
        sortOrder: 'Newer',
        authorId: undefined,
        amountOfPosts: 0,
      }
    },
    filtersEqual(filter1, filter2) {
      return (filter1?.sortOrder == filter2?.sortOrder) && (filter1?.authorId == filter2?.authorId)
    },
    resetFilters() {
      if (this.$refs?.idInput)
        this.$refs.idInput.reset()
      this.filters = this.defaultFilters()
      this.onFiltersChanged()
    },
    setLoadingPostsEmpty() {
      this.loadingPostsEmpty = true
    },
    ...mapMutations([
      "addFilteredPosts",
      "clearFilteredPosts",
      "saveUserFilters"
    ]),
    loadMorePosts() {
      this.filters.postsLoader.loadMorePosts()
    },
    onPostsLoaded(posts) {
      this.addFilteredPosts(posts)
      this.reloadInfinite()
    },
    reloadInfinite() {
      this.inifiteKey += 1
    },
    validateFilters() {
      if (this.user_id_error)
        return false
      if (this.filtersEqual(this.filters, this.previousFilters))
        return false
      return true
    },
    onFiltersChanged() {  // TODO: do not reload if filters did not changed
      if (!this.validateFilters())
        return
      Object.assign(this.previousFilters, this.filters)
      this.loadingPostsEmpty = false
      this.loadNewPostsNotification = false
      this.filters.postsLoader.reset()
      this.clearFilteredPosts()
      axiosClient.get('posts/amount')
        .then(response => {
          this.filters.amountOfPosts = response.data.data.attributes.amount
        })

      this.filters.postsLoader.loadMorePosts({
        "sorting": this.sortOrderMap.get(this.filters.sortOrder),
        "author[id]": this.filters.authorId
      })
    }
  },
  created() {
    if (!this.userFilters?.postsLoader) {
      this.resetFilters()
      return
    }
    this.filters = this.userFilters
    this.rawAuthorId = this.filters.authorId

    // need to do this shit, because otherwise it is not reactive
    this.userFilters.postsLoader.postsErrorCallback = this.setLoadingPostsEmpty
    this.userFilters.postsLoader.postsLoadedCallback = this.onPostsLoaded
    this.loadingPostsEmpty = true;
    axiosClient.get('posts/amount')
      .then(response => {
        if (this.filters.amountOfPosts != response.data.data.attributes.amount) {
          this.loadNewPostsNotification = true  // TODO: must sort in the order, that was before
        }
      })
  },
  unmounted() {
    this.saveUserFilters(this.filters)
  }
}

</script>