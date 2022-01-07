import React, { useState } from "react";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import blogService from "../services/blogService";

const handleLogout = (setUser) => (event) => {
  event.preventDefault();
  window.localStorage.removeItem("loggedUser");
  setUser(null);
};

const handleField = (setState) => (event) => {
  setState(event.target.value);
};

const Blogs = ({ blogs, user, setUser, setBlogs }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newBlog = { title, author, url };
    const blog = await blogService.createBlog(newBlog);
    blogs.push(blog);
    setBlogs(blogs);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} is logged in.{" "}
        <button onClick={handleLogout(setUser)}>Logout</button>
      </p>
      <BlogForm
        title={title}
        author={author}
        url={url}
        setTitle={handleField(setTitle)}
        setAuthor={handleField(setAuthor)}
        setUrl={handleField(setUrl)}
        handleSubmit={handleSubmit}
      />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};
export default Blogs;
