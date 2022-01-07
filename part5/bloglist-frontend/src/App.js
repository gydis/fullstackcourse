import React, { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import blogService from "./services/blogService";
import LoginForm from "./components/Login";
import loginService from "./services/loginService";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const newUser = JSON.parse(loggedUser);
      setUser(newUser);
      blogService.setToken(newUser.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
      blogService.setToken(user.token);
    } catch (exception) {
      console.log("Something went wrong with logging in.");
      console.log(exception);
    }
  };

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
        <LoginForm
          username={username}
          password={password}
          setUsername={(event) => setUsername(event.target.value)}
          setPassword={(event) => setPassword(event.target.value)}
          handleLogin={handleLogin}
        />
      )}
    </div>
  );
};

export default App;

