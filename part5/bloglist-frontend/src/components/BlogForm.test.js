import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('calls the event handler it received as props with the right details when a new blog is created', () => {
    const handleSubmit = jest.fn()
    const props = {
      title: 'TestBlog',
      author: 'TestMan',
      url: 'Test.com',
      handleSubmit: handleSubmit,
    }

    const blogForm = render(
      <BlogForm
        title={props.title}
        author={props.author}
        url={props.url}
        handleSubmit={props.handleSubmit}
        setTitle={() => {}}
        setAuthor={() => {}}
        setUrl={() => {}}
      />
    )

    expect(blogForm.container.querySelector('#blogFormTitle').value).toBe(
      props.title
    )
    expect(blogForm.container.querySelector('#blogFormAuthor').value).toBe(
      props.author
    )
    expect(blogForm.container.querySelector('#blogFormUrl').value).toBe(
      props.url
    )

    fireEvent.submit(blogForm.container.querySelector('form'))
    expect(handleSubmit.mock.calls).toHaveLength(1)
  })
})
