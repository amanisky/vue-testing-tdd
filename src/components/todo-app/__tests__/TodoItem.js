import { shallowMount } from '@vue/test-utils'
import TodoItem from '@/components/todo-app/TodoItem.vue'

describe('TodoItem', () => {
  /** @type { import('@vue/test-utils').Wrapper } */
  let wrapper = null

  beforeEach(() => {
    const todo = {
      id: 1,
      text: 'play',
      done: true
    }
    wrapper = shallowMount(TodoItem, {
      propsData: {
        todo
      }
    })
  })

  test('todo text', () => {
    const todoText = wrapper.findComponent('[data-testid="todo-text"]')
    expect(todoText.text()).toBe(wrapper.vm.todo.text)
  })

  test('todo status', async () => {
    const todoDone = wrapper.findComponent('[data-testid="todo-done"]')
    const todoItem = wrapper.findComponent('[data-testid="todo-item"]')

    // 选中
    expect(todoDone.element.checked).toBeTruthy()
    expect(todoItem.classes()).toContain('completed')

    // 取消选中
    await todoDone.setChecked(false)
    expect(todoDone.element.checked).toBeFalsy()
    expect(todoItem.classes('completed')).toBeFalsy()
  })

  // 删除
  test('todo delete', async () => {
    const deleteButton = wrapper.findComponent('[data-testid="todo-delete"]')
    await deleteButton.trigger('click')
    expect(wrapper.emitted('todo-delete')).toBeTruthy()
    expect(wrapper.emitted('todo-delete')[0][0]).toBe(wrapper.vm.todo.id)
  })

  // 双击
  test('todo edit style', async () => {
    const label = wrapper.findComponent('[data-testid="todo-text"]')
    const todoItem = wrapper.findComponent('[data-testid="todo-item"]')
    const todoEdit = wrapper.findComponent('[data-testid="todo-edit"]')
    await label.trigger('dblclick')
    expect(todoItem.classes()).toContain('editing')

    await todoEdit.trigger('blur')
    expect(todoItem.classes('editing')).toBeFalsy()
  })

  // 保存
  test('todo edit save', async () => {
    const label = wrapper.findComponent('[data-testid="todo-text"]')
    const todoEdit = wrapper.findComponent('[data-testid="todo-edit"]')
    await label.trigger('dblclick')

    // 编辑文本框中的内容展示
    expect(todoEdit.element.value).toBe(wrapper.vm.todo.text)

    // 修改文本框的值
    const text = 'hello'
    todoEdit.setValue(text)

    // 触发回车保存事件
    await todoEdit.trigger('keyup.enter')

    // 断言：发射 todo-edit 事件，传递的数据是否相等
    expect(wrapper.emitted('todo-edit')).toBeTruthy()
    expect(wrapper.emitted('todo-edit')[0][0]).toEqual({ id: wrapper.vm.todo.id, text })

    // 断言：回车后，取消编辑状态
    expect(wrapper.vm.isEditing).toBeFalsy()
  })

  // 取消
  test('todo edit cancel', async () => {
    const label = wrapper.findComponent('[data-testid="todo-text"]')
    const todoEdit = wrapper.findComponent('[data-testid="todo-edit"]')
    await label.trigger('dblclick')
    const copyText = wrapper.vm.todo.text
    await todoEdit.setValue('wahaha')
    // 触发取消事件
    await todoEdit.trigger('keyup.esc')
    // 断言：没有被修改
    expect(wrapper.vm.todo.text).toBe(copyText)
    // 断言：编辑状态被取消
    expect(wrapper.vm.isEditing).toBe(false)
  })
})
