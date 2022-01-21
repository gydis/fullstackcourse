import React, { useState } from "react";
import blogService from "../services/blogService";
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [hidden, setHidden] = useState(false);
  const [blogState, setBlog] = useState(blog);
  const hideWhenVisible = { display: hidden ? "none" : "" };
  const showWhenVisible = { display: hidden ? "" : "none" };

  const hideBlogStyle = { ...blogStyle, ...hideWhenVisible };
  const showBlogStyle = { ...blogStyle, ...showWhenVisible };

  const toggleVisibility = () => {
    setHidden(!hidden);
  };

  const likeIncrement = async () => {
    const newBlog = await blogService.likeBlog(blogState);
    setBlog(newBlog);
  };

  return (
    <div>
      <div style={hideBlogStyle}>
        {blogState.title} {blogState.author}{" "}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showBlogStyle}>
        {blogState.title} {blogState.author}{" "}
        <button onClick={toggleVisibility}>hide</button> <br />
        {blogState.url} <br />
        likes {blogState.likes} <button onClick={likeIncrement}>like</button>
        <br />
        {blogState.user.name} <br />
      </div>
    </div>
  );
};

export default Blog;
