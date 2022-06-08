<template>
  <li data-testid="todo-item" :class="{ completed: todoLocal.done, editing: isEditing }">
    <div class="view">
      <input type="checkbox" v-model="todoLocal.done" class="toggle" data-testid="todo-done" />
      <label data-testid="todo-text" @dblclick="isEditing = true">{{ todoLocal.text }}</label>
      <button class="destroy" data-testid="todo-delete" @click="$emit('todo-delete', todoLocal.id)"></button>
    </div>
    <input
      class="edit"
      data-testid="todo-edit"
      v-focus="isEditing"
      :value="todo.text"
      @blur="isEditing = false"
      @keyup.enter="onEditTodo"
      @keyup.esc="onEscTodo"
    />
  </li>
  <!-- <li class="completed">
    <div class="view">
      <input class="toggle" type="checkbox" checked>
      <label>Taste JavaScript</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
  </li>
  <li>
    <div class="view">
      <input class="toggle" type="checkbox">
      <label>Buy a unicorn</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="Rule the web">
  </li> -->
</template>

<script>
export default {
  name: 'TodoItem',

  props: {
    todo: {
      type: Object,
      required: true
    }
  },

  directives: {
    focus (element, binding) {
      if (binding.value) {
        element.focus()
      }
    }
  },

  data () {
    return {
      todoLocal: this.todo,
      isEditing: false
    }
  },

  methods: {
    onEditTodo (e) {
      this.$emit('todo-edit', {
        id: this.todo.id,
        text: e.target.value
      })
      // 取消编辑状态
      this.isEditing = false
    },

    onEscTodo () {
      this.isEditing = false
    }
  }
}
</script>
