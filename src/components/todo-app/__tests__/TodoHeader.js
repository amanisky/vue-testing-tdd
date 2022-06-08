import { shallowMount } from '@vue/test-utils'
import TodoHeader from '@/components/todo-app/TodoHeader.vue'

describe('TodoHeader', () => {
  let wrapper = null

  beforeEach(() => {
    wrapper = shallowMount(TodoHeader)
  })

  test('new todo', async () => {
    const input = wrapper.findComponent('input[data-testid="new-todo"]')
    const text = 'play'
    await input.setValue(text)
    await input.trigger('keyup.enter')
    // 期望发射 new-todo 事件
    expect(wrapper.emitted('new-todo')).toBeTruthy()
    // 期望发射 new-todo 事件，携带的数据是 play
    expect(wrapper.emitted('new-todo')[0][0]).toBe(text)
    // 期望 input 输入框被清空
    expect(input.element.value).toBe('')
  })

  test('new todo with empty text', async () => {
    const input = wrapper.findComponent('input[data-testid="new-todo"]')
    const text = ''
    await input.setValue(text)
    await input.trigger('keyup.enter')
    // 期望不发射 new-todo 事件
    expect(wrapper.emitted('new-todo')).toBeFalsy()
  })

  // 组件开发完成并且稳定（样式和结构不再需要调整），加上快照测试，避免无意间修改
  test('heder snapshot', async () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
