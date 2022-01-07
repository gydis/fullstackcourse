import React, { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import blogService from "./services/blogs";
import LoginForm from "./components/Login";
import login from "./services/login";

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
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await login({ username, password });
      setUser(user);
      setUsername("");
      setPassword("");
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
    } catch (exception) {
      console.log("Something went wrong");
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <Blogs blogs={blogs} user={user} setUser={setUser} />
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

