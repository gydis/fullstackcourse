import React, { useState, useRef, useEffect } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import blogService from '../services/blogService'
import Notification from './Notification'
import Togglable from './Togglable'

const handleLogout = (setUser) => (event) => {
  event.preventDefault()
  window.localStorage.removeItem('loggedUser')
  setUser(null)
}

const handleField = (setState) => (event) => {
  setState(event.target.value)
}

const Blogs = ({ user, setUser }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const blogFormRef = useRef()
  const genRemoveBlog = (blog) => async () => {
    const result = window.confirm(`Remove blog ${blog.title}?`)
    if (result) {
      await blogService.removeBlog(blog)
      setBlogs(blogs.filter((x) => (x.id === blog.id ? false : true)))
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newBlog = { title, author, url }
    try {
      await blogFormRef.current.toggleVisibility()
      const blog = await blogService.createBlog(newBlog)
      blogs.push(blog)
      setBlogs(blogs)
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage(`A new blog ${blog.title} added`)
      setTimeout(() => setMessage(null), 5000)
    } catch (exception) {
      console.log(exception)
      setMessage('Something went wrong.')
      setError(true)
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 5000)
    }
  }

  return (
    <div>
      <Notification message={message} error={error} />
      <h2>blogs</h2>
      <p>
        {user.name} is logged in.{' '}
        <button onClick={handleLogout(setUser)}>Logout</button>
      </p>
      <Togglable buttonLabel={'New blog'} ref={blogFormRef}>
        <BlogForm
          title={title}
          author={author}
          url={url}
          setTitle={handleField(setTitle)}
          setAuthor={handleField(setAuthor)}
          setUrl={handleField(setUrl)}
          handleSubmit={handleSubmit}
        />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} removeBlog={genRemoveBlog(blog)} />
        ))}
    </div>
  )
}
export default Blogs
