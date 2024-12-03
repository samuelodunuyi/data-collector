import { createRouter, createWebHistory } from 'vue-router'
import clientView from '@/View/Client.vue'
import adminView from '@/View/Admin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'client',
      component: clientView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: adminView,
    },
  ],
})

export default router
