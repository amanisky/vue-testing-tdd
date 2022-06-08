<template>
  <section class="todoapp">
    <TodoHeader @new-todo="addTodo" />
    <section class="main">
      <!-- 默认情况下，此部分应隐藏，并在有待办事项时显示 -->
      <input
        id="toggle-all"
        data-testid="toggle-all"
        class="toggle-all"
        type="checkbox"
        v-model="toggleAll"
      >
      <label for="toggle-all">Mark all as complete</label>

      <ul class="todo-list">
        <!-- 列表项，编辑时 class 为 editing，标记为完成时 class 为 completed -->
        <TodoItem
          v-for="todo in filterTodos"
          :key="todo.id"
          :todo="todo"
          @todo-delete="onTodoDelete"
          @todo-edit="onTodoEdit"
        />
      </ul>
    </section>

    <!-- 默认情况下，此页脚应隐藏，并在有待办事项时显示 -->
    <TodoFooter :todos="todos" @clear-completed="onClearCompleted" />
  </section>
</template>

<script>
import TodoHeader from '@/components/todo-app/TodoHeader.vue'
import TodoItem from '@/components/todo-app/TodoItem.vue'
import TodoFooter from '@/components/todo-app/TodoFooter.vue'
export default {
  name: 'TodoView',

  components: {
    TodoHeader,
    TodoItem,
    TodoFooter
  },

  data () {
    return {
      todos: []
    }
  },

  computed: {
    toggleAll: {
      get () {
        return this.todos.length && this.todos.every(todo => todo.done)
      },
      set (val) {
        this.todos.forEach(todo => {
          todo.done = val
        })
      }
    },

    filterTodos () {
      switch (this.$route.path) {
        case '/todos/active':
          return this.todos.filter(item => !item.done)
        case '/todos/completed':
          return this.todos.filter(item => item.done)
        default:
          return this.todos
      }
    }
  },

  methods: {
    addTodo (text) {
      const lastTodo = this.todos[this.todos.length - 1]
      this.todos.push({
        id: lastTodo ? lastTodo.id + 1 : 1,
        text,
        done: false
      })
    },

    onTodoDelete (id) {
      this.todos = this.todos.filter(item => item.id !== id)
    },

    onTodoEdit ({ id, text }) {
      const todo = this.todos.find(item => item.id === id)
      if (!todo) {
        return
      }
      if (!text.trim().length) {
        // 执行删除操作
        this.onTodoDelete(id)
      }
      // 执行修改操作
      todo.text = text
    },

    onClearCompleted () {
      this.todos = this.todos.filter(item => !item.done)
    }
  }
}
</script>
