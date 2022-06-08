import { shallowMount } from '@vue/test-utils'
import TodoView from '@/views/TodoView.vue'
import Vue from 'vue'

describe('TodoView', () => {
  const $route = {
    path: '/todos'
  }

  test('new todo', async () => {
    const wrapper = shallowMount(TodoView, {
      mocks: {
        $route
      }
    })
    const text = 'play'
    // 新增 todo
    wrapper.vm.addTodo(text)
    // todos 中能否找到
    const todo = wrapper.vm.todos.find(item => item.text === text)
    expect(todo).toBeTruthy()
  })

  test('todo list', async () => {
    const wrapper = shallowMount(TodoView, {
      mocks: {
        $route
      }
    })

    // 方式一：设置数据
    // wrapper.vm.todos = [
    //   { id: 1, text: 'play', done: false },
    //   { id: 2, text: 'eat', done: true },
    //   { id: 3, text: 'look', done: false }
    // ]
    // 等待数据驱动视图更新，需要导入 Vue
    // await Vue.nextTick()

    // 方式二：设置数据
    const todos = [
      { id: 1, text: 'play', done: false },
      { id: 2, text: 'eat', done: true },
      { id: 3, text: 'look', done: false }
    ]
    await wrapper.setData({
      todos
    })

    expect(wrapper.findAllComponents({ name: 'TodoItem' }).length).toBe(todos.length)
  })

  test('todo delete', async () => {
    const wrapper = shallowMount(TodoView, {
      mocks: {
        $route
      }
    })
    const todos = [
      { id: 1, text: 'play', done: false },
      { id: 2, text: 'eat', done: true },
      { id: 3, text: 'look', done: false }
    ]
    await wrapper.setData({
      todos
    })
    await wrapper.vm.onTodoDelete(1)
    expect(wrapper.vm.todos.length).toBe(2)
    expect(wrapper.findAllComponents({ name: 'TodoItem' }).length).toBe(2)
  })

  test('todo not delete', async () => {
    const wrapper = shallowMount(TodoView, {
      mocks: {
        $route
      }
    })
    const todos = [
      { id: 1, text: 'play', done: false },
      { id: 2, text: 'eat', done: true },
      { id: 3, text: 'look', done: false }
    ]
    await wrapper.setData({
      todos
    })
    await wrapper.vm.onTodoDelete(100)
    expect(wrapper.vm.todos.length).toBe(3)
    expect(wrapper.findAllComponents({ name: 'TodoItem' }).length).toBe(3)
  })

  test('todo edit', async () => {
    const wrapper = shallowMount(TodoView, {
      mocks: {
        $route
      }
    })
    const todos = [
      { id: 1, text: 'play', done: false },
      { id: 2, text: 'eat', done: true },
      { id: 3, text: 'look', done: false }
    ]
    await wrapper.setData({ todos })
    const todo = { id: 2, text: 'sleep' }
    await wrapper.vm.onTodoEdit(todo)
    expect(wrapper.vm.todos[1].text).toBe(todo.text)

    todo.text = ''
    await wrapper.vm.onTodoEdit(todo)
    expect(wrapper.vm.todos.find(t => t.id === todo.id)).toBeFalsy()
  })

  // 全选
  test('toggle all', async () => {
    const wrapper = shallowMount(TodoView, {
      mocks: {
        $route
      }
    })
    const todos = [
      { id: 1, text: 'play', done: false },
      { id: 2, text: 'eat', done: true },
      { id: 3, text: 'look', done: false }
    ]
    const toggleAll = wrapper.findComponent('[data-testid="toggle-all"]')
    await wrapper.setData({ todos })
    await toggleAll.setChecked()
    // 断言：所有的任务都被选中
    wrapper.vm.todos.forEach(todo => {
      expect(todo.done).toBeTruthy()
    })
    // 断言：取消全选
    await toggleAll.setChecked(false)
    wrapper.vm.todos.forEach(todo => {
      expect(todo.done).toBeFalsy()
    })
  })

  // 全选状态
  test('toggle all state', async () => {
    const wrapper = shallowMount(TodoView, {
      mocks: {
        $route
      }
    })
    const todos = [
      { id: 1, text: 'play', done: false },
      { id: 2, text: 'eat', done: true },
      { id: 3, text: 'look', done: false }
    ]
    await wrapper.setData({ todos })
    const toggleAll = wrapper.findComponent('[data-testid="toggle-all"]')
    // 所有任务变成完成状态，断言：toggleAll 选中
    wrapper.vm.todos.forEach(todo => {
      todo.done = true
    })
    await Vue.nextTick()
    expect(toggleAll.element.checked).toBeTruthy()

    // 某个任务编程未完成状态，断言：toggleAll 未选中
    wrapper.vm.todos[0].done = false
    await Vue.nextTick()
    expect(toggleAll.element.checked).toBeFalsy()

    // 没有任务，断言：toggleAll 未选中
    await wrapper.setData({ todos: [] })
    expect(toggleAll.element.checked).toBeFalsy()
  })

  // 删除所有已完成任务
  test('clear all compleated', async () => {
    const wrapper = shallowMount(TodoView, {
      mocks: {
        $route
      }
    })
    const todos = [
      { id: 1, text: 'play', done: false },
      { id: 2, text: 'eat', done: true },
      { id: 3, text: 'look', done: false }
    ]
    await wrapper.setData({ todos })
    wrapper.vm.onClearCompleted()
    await Vue.nextTick()
    expect(wrapper.vm.todos).toEqual(todos.filter(item => !item.done))
  })

  test('todos filter', async () => {
    const wrapper = shallowMount(TodoView, {
      mocks: {
        $route
      }
    })
    const todos = [
      { id: 1, text: 'play', done: false },
      { id: 2, text: 'eat', done: true },
      { id: 3, text: 'look', done: false }
    ]
    await wrapper.setData({ todos })
    // 将路由导航到 /todos
    wrapper.vm.$route.path = '/todos/'
    await Vue.nextTick()
    // 断言：filterTodos 是所有的任务列表
    expect(wrapper.vm.filterTodos).toEqual(todos)

    // 将路由导航到 /todos/active
    wrapper.vm.$route.path = '/todos/active'
    await Vue.nextTick()
    // 断言：filterTodos 是未完成的任务列表
    expect(wrapper.vm.filterTodos).toEqual(todos.filter(item => !item.done))

    // 将路由导航到 /todos/completed
    wrapper.vm.$route.path = '/todos/completed'
    await Vue.nextTick()
    // 断言：filterTodos 是已完成的任务列表
    expect(wrapper.vm.filterTodos).toEqual(todos.filter(item => item.done))
  })
})
