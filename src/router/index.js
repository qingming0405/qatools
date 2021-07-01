import Vue from 'vue'
import VueRouter from 'vue-router'
import Test from 'pages/Test.vue'
import Login from 'pages/Login.vue'
import Index from 'pages/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index/home'
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/index',
    name: 'Index',
    component: Index,
    meta: {
      title: 'main-page'
    },
    children: [
      {
        path: 'home',
        component: () => import('views/home/Home')
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
