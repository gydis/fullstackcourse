const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const userExtractor = require('../utils/middleware').userExtractor

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1} )
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const blog = new Blog(request.body)
  const user = request.user

  if (!user) {
    return response.status(401).json({error: 'token missing or invalid'})
  }
  else if (blog.title && blog.url){
    blog.user = user._id
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await User.findByIdAndUpdate(user._id, user)
    response.status(201).json(result)
  }
  else {
    response.status(400).end()
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if (!blog) response.status(404).end()
  else if (!user) response.status(401).json({error: 'token missing or invalid'}).end()
  else if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  else response.status(403).json({ error: 'only the creator of the blog is allowed to delete it' }).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body

  if (blog.title && blog.url) {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    await response.json(updatedBlog.toJSON())
  }
  else { response.status(400).end() }
})

module.exports = blogsRouter
