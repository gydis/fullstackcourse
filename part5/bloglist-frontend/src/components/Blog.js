import React, { useState } from 'react'
import blogService from '../services/blogService'
const Blog = ({ blog, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [hidden, setHidden] = useState(false)
  const [blogState, setBlog] = useState(blog)
  const hideWhenVisible = { display: hidden ? 'none' : '' }
  const showWhenVisible = { display: hidden ? '' : 'none' }

  const hideBlogStyle = { ...blogStyle, ...hideWhenVisible }
  const showBlogStyle = { ...blogStyle, ...showWhenVisible }

  const toggleVisibility = () => {
    setHidden(!hidden)
  }

  const likeIncrement = async () => {
    const newBlog = await blogService.likeBlog(blogState)
    setBlog(newBlog)
  }

  const removeButton = () => {
    const cache = JSON.parse(window.localStorage.getItem('loggedUser'))
    if (cache && blogState.user.username === cache.username) {
      return <button onClick={removeBlog}>remove</button>
    }
  }

  return (
    <div>
      <div style={hideBlogStyle}>
        {blogState.title} {blogState.author}{' '}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showBlogStyle}>
        {blogState.title} {blogState.author}{' '}
        <button onClick={toggleVisibility}>hide</button> <br />
        {blogState.url} <br />
        likes {blogState.likes} <button onClick={likeIncrement}>like</button>
        <br />
        {blogState.user.name} <br />
        {removeButton()}
      </div>
    </div>
  )
}

export default Blog
