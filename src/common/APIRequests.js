import axiosClient from "@/axiosClient";

export function starPost(postId)
{
  return axiosClient.post("/user/posts/starred", JSON.stringify({data:{id:postId, type: "post"}}))
}

export function unstarPost(postId)
{
  return axiosClient.delete(`user/posts/starred/${postId}`)
}