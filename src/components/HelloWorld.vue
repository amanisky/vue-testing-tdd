<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2 data-testid="count-text">{{ count }}</h2>
    <button @click="count++">点击</button>
    <button data-testid="emit-button" @click="$emit('hello', 111)">发射</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      count: 0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
