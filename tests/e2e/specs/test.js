// https://docs.cypress.io/api/table-of-contents

describe('My First Test', () => {
  it('Visits the app root url', () => {
    // 打开浏览器并运行该地址
    cy.visit('http://localhost:8080')
    // 测试页面是否有 h1 元素，其文本内容是否为 Welcome to Your Vue.js App
    cy.contains('h1', 'Welcome to Your Vue.js App')
  })
})

describe('Visits the app root url', () => {
  it('Visits the app root url', () => {
    cy.visit('http://localhost:8080')
    const text = 'hello world'
    // 找到输入框，输入内容后回车
    cy.get('[data-testid="todo-input"]').type(`${text}{enter}`)
    // 检查页面是否有 hello world 内容
    cy.contains(text)
  })
})
