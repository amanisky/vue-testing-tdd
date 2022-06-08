<template>
  <header class="header">
    <h1>待办</h1>
    <input
      class="new-todo"
      data-testid="new-todo"
      autofocus
      placeholder="需要做什么？"
      @keyup.enter="onEnter"
    />
  </header>
</template>

<script>
export default {
  name: 'TodoHeader',

  methods: {
    onEnter (e) {
      const text = e.target.value.trim()
      if (!text.length) {
        return
      }
      this.$emit('new-todo', text)
      e.target.value = ''
    }
  }
}
</script>
