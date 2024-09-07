import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'loging',
      component: () => import('../views/LogingView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '/todoList',
      name: 'todoList',
      component: () => import('../views/TodoListView.vue')
    }
  ]
})

export default router
