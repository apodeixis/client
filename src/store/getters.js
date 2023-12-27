export function getPostWithId(state)
{
  return (id) => {
    return state.posts.find( el => el.id == id)
  }
}

export function getUserData(state)
{
  return state.userData;
}

export function getUserPosts(state)
{
  return state.userPosts
}

export function getStarredPosts(state)
{
  return state.starredPosts
}

export function getFilteredPosts(state)
{
  return state.filteredPosts
}
export function getUserPost(state)
{
  return state.userPost
}

export function loadUserFilters(state)
{
  return state.userFilters
}

export function getUserIsPostCreator(state)
{
  return (post) => {
    if(!post)
      return false
    const authorId = getUserData(state)?.id;
    const postAuthorId = post.authorId
    return  postAuthorId == authorId
  }
}

export function getAccessToken(state)
{
  if(!state.userData.access_token)
  {
    state.userData.access_token = JSON.parse(localStorage.getItem("access_token"))
  }
  return state.userData.access_token
}

export function authorized(state)
{
  return !!state.userData.access_token
}