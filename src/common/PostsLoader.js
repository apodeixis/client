import axiosClient from "@/axiosClient";
import { getPostData } from "@/common/APIConverters";

export default class PostsLoader {
  constructor({ apiPostsUrl, postsPerRequest, postsLoadedCallback, postsErrorCallback }) {
    if (postsPerRequest)
      this.postsPerRequest = postsPerRequest
    if (postsLoadedCallback)
      this.postsLoadedCallback = postsLoadedCallback
    if (postsErrorCallback)
      this.postsErrorCallback = postsErrorCallback
    if (apiPostsUrl)
      this.apiPostsUrl = apiPostsUrl
  }
  apiPostsUrl = '/posts/headers';
  postsPerRequest = 10;

  cursor = -1; // last loaded post id
  additionalParameters = {};
  loadPostsRequestInProgress = false;

  loadMorePosts(additionalParameters) {
    if (this.loadPostsRequestInProgress)  // TODO: cancel request if new parameters
      return;

    if (!additionalParameters)
      additionalParameters = this.additionalParameters
    else
      this.additionalParameters = additionalParameters
    this.loadMorePostsImpl(additionalParameters)
  };

  loadMorePostsImpl(additionalParameters) {
    if (!additionalParameters || !additionalParameters.sorting)
      return
    this.loadPostsRequestInProgress = true
    let cursor;
    if(additionalParameters.sorting == "asc" && this.cursor == -1)
      cursor = 0
    else if(this.cursor != -1)
      cursor = this.cursor
    
    const requestParameters = {
      params: {
        "limit": this.postsPerRequest,
        "cursor": cursor,
        ...additionalParameters
      }
    }
    axiosClient.get(this.apiPostsUrl, requestParameters)
      .then(response => {
        const resultPosts = []
        for (let post of response.data.data) {
          resultPosts.push(getPostData(post, response.data.included))
        }
        this.cursor = resultPosts[resultPosts.length - 1].id
        this?.postsLoadedCallback(resultPosts)
      })
      .catch(error => {
        this?.postsErrorCallback(error)
        console.log("error when fetching posts", error)
      })
      .finally(() => {
        this.loadPostsRequestInProgress = false
      })
  };
  reset() {
    this.cursor = -1
    this.additionalParameters = {}
    this.loadPostsRequestInProgress = false;
  };

}