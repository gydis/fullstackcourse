import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogService'
import LoginForm from './components/LoginForm'
import loginService from './services/loginService'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const newUser = JSON.parse(loggedUser)
      setUser(newUser)
      blogService.setToken(newUser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
    } catch (exception) {
      console.log(exception)
      setMessage('Wrong username or password')
      setError(true)
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 5000)
    }
  }

  return (
    <div>
      {user ? (
        <div>
          <Blogs
            blogs={blogs}
            user={user}
            setUser={setUser}
            setBlogs={setBlogs}
          />
        </div>
      ) : (
        <div>
          <Notification message={message} error={error} />
          <LoginForm
            username={username}
            password={password}
            setUsername={(event) => setUsername(event.target.value)}
            setPassword={(event) => setPassword(event.target.value)}
            handleLogin={handleLogin}
          />
        </div>
      )}
    </div>
  )
}

export default App
