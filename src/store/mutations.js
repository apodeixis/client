export function setCredentials(state, payload) {
  state.userData.username = payload.username;
}

export function setUserData(state, userData) {
  Object.assign(state.userData, userData)
  localStorage.setItem("user_id", JSON.stringify(userData.id));
}

export function setUserLocale(state, locale) {
  state.userData.locale = locale
  localStorage.setItem("user_locale", JSON.stringify(locale))
}

export function addFilteredPosts(state, payload) {
  addPostsToList(state, payload, state.filteredPosts)
}

export function clearFilteredPosts(state) {
  state.filteredPosts = []
}

export function clearUserPosts(state) {
  state.userPosts = []
}

export function clearStarredPosts(state) {
  state.starredPosts = []
}

export function setUserPost(state, payload) {
  state.userPost = payload
}

export function addUserPost(state, post) {
  state.posts.push(post)
  state.userPosts.unshift(post.id)
}

export function addUserPosts(state, posts) {
  addPostsToList(state, posts, state.userPosts)
}

export function saveUserFilters(state, filters) {
  state.userFilters = filters
}

export function markPostStarred(state, data) {
  const el = state.posts.find(elem => elem.id == data.id)
  if (el == null)
    return
  el.starred = data.value
}

export function addStarredPosts(state, posts) {
  addPostsToList(state, posts, state.starredPosts)
}

function addPostsToList(state, posts, list) {
  for (let post of posts) {
    const cached_post_id = state.posts.findIndex(el => el.id == post.id)
    if (cached_post_id != -1) {
      state.posts[cached_post_id] = post
    }
    else {
      state.posts.push(post)
    }
    list.push(post.id)
  }
}

export function updatePosts(state, lambda) {
  for (let i = 0; i < state.posts.length; i++) {
    state.posts[i] = lambda(state.posts[i])
  }
}

export function setAccessToken(state, token) {
  state.userData.access_token = token
  if (!token) {
    localStorage.removeItem("access_token")
  }
  else {
    localStorage.setItem("access_token", JSON.stringify(token))
  }
}