const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const api = supertest(app)
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('../utils/test_helper')


beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('bloop', 10)
  const user = new User({ username: 'root', passwordHash})
  const rootUser = await user.save()
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs(rootUser._id))
}, 10000)

describe('when there are initially some blogs saved', () => {
  test('blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs('foobar').length)
  })
})

describe('unique identifier property of each blog post is named id', () => {
  test('for every returned blog post', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map(blog => blog.id)
    ids.forEach(id => expect(id).toBeDefined())
  })
})

describe('Addition of a new blog post', () => {
  test('changes the size of the array correctly', async () => {
    const user = await helper.createUser()
    const blog = {
      title: 'Foo',
      author: 'Bar',
      url: 'internet.com',
      user: user._id.toString(),
      likes: 2
    }
    await api
      .post('/api/blogs')
      .send(blog)
      .set('Authorization', 'Bearer '+user.token)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const updatedList = await Blog.find({}) 
    expect(updatedList).toHaveLength(helper.initialBlogs().length + 1)
  })

  test('correctly adds the blog post to the database', async () => {
    const user = await helper.createUser()
    const blog = {
      title: 'Foo',
      author: 'Bar',
      url: 'internet.com',
      user: user._id,
      likes: 2
    }
    await api
      .post('/api/blogs')
      .send(blog)
      .set('Authorization', 'Bearer '+user.token)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const updatedList = await Blog.find({}) 
    expect(updatedList.map(x => x.title)).toContain(blog.title)
  })

  test('makes the likes value default to zero, in case it is missing from the request', async() => {
    const user = await helper.createUser()
    const blog = {
      title: 'Foo',
      author: 'Bar',
      url: 'internet.com',
      user: user._id,
    }
    await api
      .post('/api/blogs')
      .send(blog)
      .set('Authorization', 'Bearer '+user.token)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const updatedList = await Blog.find({}) 
    expect(updatedList.find(x => x.title === blog.title).likes).toBe(0)
  })

  test('with missing title, url and user properties prompts a response with code 400', async () => {
    const user = await helper.createUser()
    const blog = {
      author: 'Bar',
    }
    await api
      .post('/api/blogs')
      .send(blog)
      .set('Authorization', 'Bearer '+user.token)
      .expect(400)
  })

  test('fails with a correct status code if a token is not provided', async () => {
    const blog = {
      title: 'Foo',
      author: 'Bar',
      url: 'internet.com',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(401)
  })
})

describe('deletion of a blog', () => {
  test('succeeds, given a right id', async () => {
    const user = await helper.createUser()
    const blog = {
      title: 'Foo',
      author: 'Bar',
      url: 'internet.com',
      user: user._id.toString(),
      likes: 2
    }
    const newBlog = new Blog(blog)
    const sentBlog = await newBlog.save()
    await api
      .delete(`/api/blogs/${sentBlog.id}`)
      .set('Authorization', 'Bearer '+user.token)
      .expect(204)
    const newList = await Blog.find({})
    expect(newList.map(x => x.id.toString())).not.toContain(sentBlog.id)
  })
})

describe('update of a note', () => {
  test('succeeds, when given a correct id and data', async() => {
    const initBlogs = await Blog.find({})
    const id = initBlogs[0].id
    const newBlog = initBlogs[0]
    newBlog.likes += 10

    await api
      .put(`/api/blogs/${id}`)
      .send(newBlog.toJSON())
      .expect(200)

    const newBlogs = await Blog.find({})
    expect(newBlogs[0].likes).toBe(newBlog.likes)
  })
})

describe('When there is initially one user in the database', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('bloop', 10)
    const user = new User({ username: 'root', passwordHash})

    await user.save()
  })

  test('creation succeds with a fresh username', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'gydis',
      name: 'John Brown',
      password: 'verysecurepassword',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
	
    const usernames = usersAtEnd.map(x => x.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username is already taken', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'root',
      name: 'Name',
      password: 'password2',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails if username or password is shorter than 3 characters with a proper status code and error message', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'sh',
      password: 'sh',
      name: 'Too short'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('at least 3 characters')

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => mongoose.connection.close())
