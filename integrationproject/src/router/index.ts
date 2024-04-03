import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TestPage from '@/views/TestPage.vue';
import HomePage from '@/views/HomePage.vue'; 
import InfoPage from '@/views/InfoPage.vue'; 

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/test'
  },
  {
    path: '/test',
    name: 'Test',
    component: TestPage
  },
  {
    path: '/home', 
    name: 'Home',
    component: HomePage
  },
  {
    path: '/info', 
    name: 'Info',
    component: InfoPage
  },
  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router;
