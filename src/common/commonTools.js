import { starPost, unstarPost } from '@/common/APIRequests';
import store from '@/store'


export function convertTimestampToStr(timestamp)
{
  if(timestamp == 0) {
    return "----/--/-- --:--:--"
  }
  const date = new Date(timestamp * 1000)
  const year = date.getFullYear()
  const month = '0' + date.getMonth()
  const day = '0' + date.getDate()

  const hours = '0' + date.getHours()
  const minutes = '0' + date.getMinutes()
  const seconds = '0' + date.getSeconds()
  
  
  const result_str = year + '/' + month.substr(-2) + '/' + day.substr(-2) + ' ' 
    + hours.substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
  return result_str
}

export function togglePostStarred(postId, currentStarred, successCallback, failureCallback)
{
  const starAction = new Map([
    [true, unstarPost],
    [false, starPost]
  ])
  starAction.get(currentStarred)(postId)
  .then(response => {
    store.commit("markPostStarred", { id: postId, value: !currentStarred })
    if(successCallback)
      successCallback(response)
  })
  .catch(error => {
    if(error.response.status == 409)
      store.commit("markPostStarred", { id: postId, value: !currentStarred })
    if(failureCallback)
      failureCallback(error)
  })
}