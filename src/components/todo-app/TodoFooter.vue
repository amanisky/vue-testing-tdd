<template>
  <footer class="footer">
      <!-- This should be `0 items left` by default -->
      <span class="todo-count"><strong data-testid="done-todos-count">{{ count }}</strong> 未完成</span>
      <!-- Remove this if you don't implement routing -->
      <ul class="filters">
        <li>
          <router-link to="/todos">全部的</router-link>
        </li>
        <li>
          <router-link to="/todos/active">进行中</router-link>
        </li>
        <li>
          <router-link to="/todos/completed">已完成</router-link>
        </li>
      </ul>
      <!-- 如果没有已完成的项目，则隐藏 ↓ -->
      <button
        v-show="show"
        class="clear-completed"
        data-testid="clear-completed"
        @click="$emit('clear-completed')"
      >清除已完成</button>
    </footer>
</template>

<script>
export default {
  name: 'TodoFooter',

  props: {
    todos: {
      type: Array,
      required: true
    }
  },

  computed: {
    count () {
      return this.todos.filter(todo => !todo.done).length
    },

    show () {
      return this.todos.some(todo => todo.done === true)
    }
  }
}
</script>
