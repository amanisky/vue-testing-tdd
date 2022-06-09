import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/todos'
  },
  {
    path: '/todos/:filter?',
    name: 'todos',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "todos" */ '../views/TodoView.vue')
  }
]

const router = new VueRouter({
  routes,
  linkExactActiveClass: 'selected'
})

export default router
