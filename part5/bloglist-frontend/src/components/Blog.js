import React, { useState } from "react";
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [hidden, setHidden] = useState(false);
  const hideWhenVisible = { display: hidden ? "none" : "" };
  const showWhenVisible = { display: hidden ? "" : "none" };

  const hideBlogStyle = { ...blogStyle, ...hideWhenVisible };
  const showBlogStyle = { ...blogStyle, ...showWhenVisible };

  const toggleVisibility = () => {
    setHidden(!hidden);
  };

  return (
    <div>
      <div style={hideBlogStyle}>
        {blog.title} {blog.author}{" "}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showBlogStyle}>
        {blog.title} {blog.author}{" "}
        <button onClick={toggleVisibility}>hide</button> <br />
        {blog.url} <br />
        likes {blog.likes} <button>like</button>
        <br />
        {blog.user.name} <br />
      </div>
    </div>
  );
};

export default Blog;

