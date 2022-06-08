import { mount, createLocalVue } from '@vue/test-utils'
import TodoFooter from '@/components/todo-app/TodoFooter.vue'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter({
  linkExactActiveClass: 'selected'
})

describe('TodoFooter', () => {
  /** @type { import('@vue/test-utils').Wrapper } */
  let wrapper = null

  beforeEach(() => {
    const todos = [
      { id: 1, text: 'play', done: false },
      { id: 2, text: 'eat', done: true },
      { id: 3, text: 'look', done: false }
    ]
    wrapper = mount(TodoFooter, {
      propsData: {
        todos
      },
      localVue,
      router
    })
  })

  // 未完成数量
  test('done todos count', () => {
    const count = wrapper.vm.todos.filter(item => !item.done).length
    const doneTodosCount = wrapper.findComponent('[data-testid="done-todos-count"]')
    expect(+doneTodosCount.text()).toBe(count)
  })

  // 隐藏/显示 清除已完成按钮
  test('clear completed show', async () => {
    expect(wrapper.findComponent('[data-testid="clear-completed"]').isVisible()).toBeTruthy()

    // 清除所有任务完成状态，断言：按钮不存在
    // 注意：
    // 1、props 是父组件传递过来的数据，不能通过 wrapper.vm.todos 循环修改每个 todo 的 done 为 false
    // 2、通过重新定义传递的数据，重新渲染组件并挂载后再进行判断
    // 3、如果是判断是否存在 v-if 配合 exists 方法
    // 4、如果是判断是否显示 v-show 配合 isVisible 方法
    const todos = [
      { id: 1, text: 'play', done: false },
      { id: 2, text: 'eat', done: false },
      { id: 3, text: 'look', done: false }
    ]
    wrapper = mount(TodoFooter, {
      propsData: {
        todos
      },
      localVue,
      router
    })
    expect(wrapper.findComponent('[data-testid="clear-completed"]').isVisible()).toBeFalsy()
  })

  // 清除已完成任务
  test('clear completed', async () => {
    const button = wrapper.findComponent('[data-testid="clear-completed"]')
    await button.trigger('click')
    // 断言：发射 clear-completed 事件
    expect(wrapper.emitted('clear-completed')).toBeTruthy()
  })

  // 导航链接激活状态
  test.only('router link active class', async () => {
    const links = wrapper.findAllComponents({ name: 'router-link' })

    router.push('/todos')
    await localVue.nextTick()
    for (let i = 0; i < links.length; i++) {
      const link = links.at(i)
      if (link.vm.to === '/todos') {
        expect(link.classes()).toContain('selected')
      } else {
        expect(link.classes('selected')).toBeFalsy()
      }
    }

    router.push('/todos/active')
    await localVue.nextTick()
    for (let i = 0; i < links.length; i++) {
      const link = links.at(i)
      if (link.vm.to === '/todos/active') {
        expect(link.classes()).toContain('selected')
      } else {
        expect(link.classes('selected')).toBeFalsy()
      }
    }

    router.push('/todos/completed')
    await localVue.nextTick()
    for (let i = 0; i < links.length; i++) {
      const link = links.at(i)
      if (link.vm.to === '/todos/completed') {
        expect(link.classes()).toContain('selected')
      } else {
        expect(link.classes('selected')).toBeFalsy()
      }
    }
  })
})
