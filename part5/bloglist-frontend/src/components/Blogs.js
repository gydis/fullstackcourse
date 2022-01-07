import React from "react";
import Blog from "./Blog";

const handleLogout = (event) => {
  event.preventDefault();
  window.localStorage.removeItem("loggedUser");
};

const Blogs = ({ blogs, user }) => (
  <div>
    <h2>blogs</h2>
    <p>
      {user.name} is logged in. <button onClick={handleLogout}>Logout</button>
    </p>
    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
);
export default Blogs;
