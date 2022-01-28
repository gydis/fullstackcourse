import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let blog

  beforeEach(() => {
    const testBlog = {
      author: 'Bob',
      title: 'The test',
      likes: 25,
      url: 'Bib.com',
      user: { username: 'Bob', name: 'testuser1' },
    }

    blog = render(<Blog blog={testBlog} removeBlog={jest.fn()} />)
  })

  test('renders the blog\'s title and author, but does not render its url or number of likes by default', () => {
    expect(blog.container.querySelector('.showMoreBlog')).toHaveStyle(
      'display:none'
    )
    expect(blog.container.querySelector('.defaultBlog')).toHaveTextContent(
      'Bob'
    )
    expect(blog.container.querySelector('.defaultBlog')).toHaveTextContent(
      'The test'
    )
  })

  test('shows the blog\'s url and number of likes when the button controlling the shown details has been clicked.', () => {
    const button = blog.getByText('view')

    fireEvent.click(button)

    expect(blog.container.querySelector('.defaultBlog')).toHaveStyle(
      'display:none'
    )
    expect(blog.container.querySelector('.showMoreBlog')).toHaveTextContent(
      'Bib.com'
    )
    expect(blog.container.querySelector('.showMoreBlog')).toHaveTextContent(
      '25'
    )
  })
})
