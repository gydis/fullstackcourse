const listHelper = require('../utils/list_helper')
const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }  
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has more than one blog, equals the sum of likes of all posts', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })

  test('when list has no blogs, equals 0', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })
})

describe('favourite blog', () => {
  test('when there are more than 1 blogs in a list, returns favourite blog', () => {
    const favBlog =   {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    }

    const result = listHelper.favouriteBlog(blogs)
    expect(result).toEqual(favBlog)
  })   

  test('when the list is empty, returns a null', () => {
    const result = listHelper.favouriteBlog([])
    expect(result).toEqual(null)
  })
})

describe('Author with the most number of blogs', () => {
  test('when there are more than 1 blogs in a list, returns an object with the name of the most productive author and a number of produced blogs', () => {
    const right = {
      author: 'Robert C. Martin',
      blogs: 3
    }

    const res = listHelper.mostBlogs(blogs)
    expect(res).toEqual(right)
  })

  test('when the list is empty, returns a null', () => {
    const res = listHelper.mostBlogs([])
    expect(res).toEqual(null)
  })
})

describe('Most liked author', () => {
  test('when there are more than 1 blogs in a list, returns an object with the name of the most liked author and  a number of likes.', () => {
    const res = listHelper.mostLikes(blogs)
    expect(res).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
  
  test('whent the list is empty, returns null', () => {
    const res = listHelper.mostLikes([])
    expect(res).toEqual(null)
  })
})
