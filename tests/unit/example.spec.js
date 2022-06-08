import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

// 测试用例
test('HelloWorld.vue', () => {
  // 挂载组件
  const wrapper = shallowMount(HelloWorld, {
    propsData: {
      msg: 'hello world'
    }
  })
  expect(wrapper.html()).toContain('hello world')
})

// 模拟用户交互
test('button click', async () => {
  // 挂载组件
  const wrapper = shallowMount(HelloWorld, {
    propsData: {
      msg: 'hello world'
    }
  })
  expect(wrapper.vm.count).toBe(0)
  // 找到 button 按钮
  const button = wrapper.findComponent('button')
  // 触发点击
  await button.trigger('click')
  expect(wrapper.vm.count).toBe(1)
  const countText = wrapper.findComponent('[data-testid="count-text"]')
  expect(countText.text()).toBe('1')
})

// 模拟发射事件
test('emit event', async () => {
  // 挂载组件
  const wrapper = shallowMount(HelloWorld, {
    propsData: {
      msg: 'hello world'
    }
  })
  const button = wrapper.findComponent('[data-testid="emit-button"]')
  await button.trigger('click')
  // 出发了 hello 事件
  expect(wrapper.emitted('hello')).toBeTruthy()
  // 传递的数据是 123
  expect(wrapper.emitted('hello')[0][0]).toBe(111)
})
