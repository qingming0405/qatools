import Vue from 'vue'
import VueRouter from 'vue-router'
import Test from 'pages/Test.vue'
import Login from 'pages/Login.vue'
import Index from 'pages/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/im-ex-offset'
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
    path: '', // 设置主页面默认路径为空字符串
    name: 'Index',
    component: Index,
    meta: {
      title: 'main-page'
    },
    children: [
      {
        path: 'home',
        component: () => import('views/home/Home')
      },
      {
        path: 'im-ex-offset',
        component: () => import('views/im-ex/offset/Offset')
      },
      {
        path: 'im-ex-alarm',
        component: () => import('views/im-ex/alarm/Alarm.vue')
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
