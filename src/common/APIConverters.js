import { convertTimestampToStr } from '@/common/commonTools.js'

export function getPostData(data, included)
{
  const user_data = included.find(user => user.id == data.relationships.author.data.id)
  const parsed_data = {
    id: data.id,
    title: data.attributes.title,
    date: convertTimestampToStr(data.attributes.tx_timestamp),
    txHash: data.attributes.tx_hash,
    status: data.attributes.status,
    body: data.attributes.body,   // for some requests may be empty
    starred: data.attributes.starred,
    authorId: user_data.attributes.author_id,
    name: user_data.attributes.name,
    email: user_data.attributes.email
  }
  return parsed_data
}

export function getUserData(data)
{
  const user_data = {};
  const attributes = data.attributes;
  Object.assign(user_data, attributes)
  user_data.created_at = convertTimestampToStr(attributes.created_at)
  user_data.updated_at = convertTimestampToStr(attributes.updated_at)
  user_data.id = data.id
  return user_data;
}