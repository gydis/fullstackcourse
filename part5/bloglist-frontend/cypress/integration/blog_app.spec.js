// blog_app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

Cypress.Commands.add('createUser', (username, password) => {
  const user = {
    name: 'Bob',
    username: username,
    password: password,
  }
  cy.request('POST', 'http://localhost:3003/api/users', user)
})

Cypress.Commands.add('login', (user) => {
  cy.request('POST', 'http://localhost:3003/api/login', user).then(
    ({ body }) => {
      localStorage.setItem('loggedUser', JSON.stringify(body))
    }
  )
})

Cypress.Commands.add('addBlog', (blog) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/blogs',
    body: blog,
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedUser')).token
      }`,
    },
  })
})

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    localStorage.clear()
  })

  describe('Login', function () {
    beforeEach(function () {
      cy.createUser('Bob', 'Passwd')
      cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
      cy.contains('login')
      cy.contains('username')
      cy.contains('password')
    })

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('Bob')
      cy.get('#password').type('Passwd')
      cy.get('#login-button').click()

      cy.contains('Bob is logged in')
    })

    it('fails with incorrect credentials', function () {
      cy.get('#username').type('Bob')
      cy.get('#password').type('Wrong password')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.createUser('Bob', 'Passwd')
      cy.createUser('John', 'Passwd')

      cy.login({ username: 'John', password: 'Passwd' })
      cy.addBlog({ author: 'John', title: 'John blog', url: 'John.com' })

      cy.login({ username: 'Bob', password: 'Passwd' })
      cy.addBlog({ author: 'Bob', title: 'First blog', url: 'Bob.com' })

      cy.visit('http://localhost:3000')
    })

    it('user can create a blog', function () {
      cy.contains('New blog').click()

      cy.get('#blogFormTitle').type('Testblog')
      cy.get('#blogFormAuthor').type('Bob')
      cy.get('#blogFormUrl').type('www.bob.com')

      cy.get('#blogFormButton-submit').click()

      cy.contains('Testblog')
    })

    it('user can like a blog', function () {
      cy.get('.blog:last').as('blog')
      cy.get('@blog').contains('First blog').contains('view').click()
      cy.get('@blog').find('.showMoreBlog').as('blog')
      cy.get('@blog').should('not.have.css', 'display: none')
      cy.get('@blog').contains('likes').contains('0')
      cy.get(':nth-child(5) > .showMoreBlog > #blogLikeButton').click()
      cy.get('@blog').contains('1')
    })

    it('user can delete a blog', function () {
      cy.get('.blog:last').contains('First blog').contains('view').click()
      cy.get('.blog:last').contains('remove').click()
      cy.should('not.contain', 'First blog')
    })

    it('user can\'t delete blogs of other users', function () {
      cy.get('.blog:first').contains('John blog').contains('view').click()
      cy.get('.blog:first').should('not.contain', 'remove')
    })

    it('blogs are sorted according to the likes(more likes first)', function () {
      for (let i = 0; i < 5; i++) {
        cy.addBlog({
          author: 'Bob',
          title: `blog ${i}`,
          url: 'Bob.com',
          likes: i,
        })
      }
      cy.visit('http://localhost:3000')
      cy.get('.likeString').then((x) => {
        const strs = x.map((i, el) => el.textContent[6])
        for (let i = 0; i < strs.length - 1; i++) {
          expect(parseInt(strs[i])).gte(parseInt(strs[i + 1]))
        }
      })
    })
  })
})
