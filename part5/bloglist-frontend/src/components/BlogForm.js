import React from "react";

const BlogForm = ({
  title,
  author,
  url,
  setTitle,
  setAuthor,
  setUrl,
  handleSubmit,
}) => (
  <div>
    <h3>create new</h3>
    <form onSubmit={handleSubmit}>
      <div>
        title:
        <input type="text" value={title} name="Title" onChange={setTitle} />
      </div>
      <div>
        author:
        <input type="text" value={author} name="Author" onChange={setAuthor} />
      </div>
      <div>
        url:
        <input type="text" value={url} name="Url" onChange={setUrl} />
      </div>
      <button type="submit">create</button>
    </form>
  </div>
);

export default BlogForm;
