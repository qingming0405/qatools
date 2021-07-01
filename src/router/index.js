import Vue from 'vue'
import VueRouter from 'vue-router'
import Test from 'pages/Test.vue'
import Login from 'pages/Login.vue'
import Index from 'pages/Index.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Test',
  //   component: Test
  // },
  // {
  //   path: '/',
  //   name: 'Login',
  //   component: Login
  // },
  {
    path: '/',
    name: 'Index',
    component: Index
  },
]

const router = new VueRouter({
  routes
})

export default router
