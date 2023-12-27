export default {
  posts: [
    // {
    //   id: ,
    //   name: ,
    //   email: ,
    //   title: ,
    //   date: '--/--/--:--:--:--',
    //   txHash: ,
    // }
  ],
  lastUserPostId: -1,
  // will only contains Posts ids
  userPosts: [
    
  ],
  starredPosts: [

  ],
  filteredPosts: [
    
  ],
  userPost: {
    title: '',
    text: '',
  },
  userFilters: {
    sortOrder: '',
    lastLoadedId: -1,
  },
  userData: {
    id: 0,
    email: '',
    name: '',
    password: '',
    creationDate: '',
    access_token: '',
    locale: 'en',
  }
}