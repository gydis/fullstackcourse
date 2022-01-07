import React from "react";
import Blog from "./Blog";

const handleLogout = (setUser) => (event) => {
  event.preventDefault();
  window.localStorage.removeItem("loggedUser");
  setUser(null);
};

const Blogs = ({ blogs, user, setUser }) => (
  <div>
    <h2>blogs</h2>
    <p>
      {user.name} is logged in.{" "}
      <button onClick={handleLogout(setUser)}>Logout</button>
    </p>
    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
);
export default Blogs;
