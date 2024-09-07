import { createRouter, createWebHashHistory } from 'vue-router'
import LogingView from '@/views/LogingView.vue';
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'loging',
      component: LogingView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/SignUpView.vue')
    },
    {
      path: '/todoList',
      name: 'todoList',
      component: () => import('@/views/TodoListView.vue')
    },
    { path: '/:pathMatch(.*)*', 
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue')
    },
  ]
})

export default router
