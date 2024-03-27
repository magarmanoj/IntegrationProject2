import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TestPage from '@/views/TestPage.vue';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/test'
  },
  {
    path: '/test', 
    name: 'Test',
    component: TestPage 
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
