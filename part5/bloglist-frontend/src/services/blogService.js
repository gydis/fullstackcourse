import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const createBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const likeBlog = async (blog) => {
  const user = blog.user
  blog.user = blog.user.id

  const id = blog.id
  delete blog.id
  delete blog.__v

  blog.likes += 1

  const response = await axios.put(`${baseUrl}/${id}`, blog)
  response.data.user = user
  return response.data
}

const removeBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  await axios.delete(`${baseUrl}/${blog.id}`, config)
}

const exports = { getAll, setToken, createBlog, likeBlog, removeBlog }

export default exports
