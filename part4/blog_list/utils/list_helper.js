const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, elem) => sum += elem.likes, 0)
}

const favouriteBlog = (blogs) => {
  const res = blogs.reduce((fav, elem) => elem.likes > fav.likes ? elem : fav, blogs[0])
  if (res) {
    delete res.url
    delete res.__v
    delete res._id
    return res }
  else return null
}

const mostBlogs = (blogs) => {
  let res = _.countBy(blogs, x => x.author)
  res = _.entries(res)
  res = res.reduce((most, elem) => elem[1] > most[1] ? elem : most, res[0])
  if (res) return {
    author: res[0],
    blogs: res[1]
  }
  else return null
}

const mostLikes = (blogs) => {
  let res = _.groupBy(blogs, 'author')
  res = _.mapValues(res, x => {
    return x.reduce((sum,post) => sum += post.likes, 0)
  })
  res = _.entries(res)
  res = res.reduce((most, elem) => elem[1] > most[1] ? elem : most, res[0])
  if (res) return _.zipObject(['author', 'likes'], res)
  else return null
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}
