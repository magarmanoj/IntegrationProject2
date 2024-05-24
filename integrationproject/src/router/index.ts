import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '@/views/TabsPage.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tabHome'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tabHome'
      },
      {
        path: 'tabHome',
        component: () => import('@/views/HomePage.vue')
      },
      {
        path: 'tabInfo',
        component: () => import('@/views/InfoPage.vue')
      },
      {
        path: 'tabTest',
        component: () => import('@/views/TestPage.vue')
      }
      ,
      {
        path: 'tabMonths',
        component: () => import('@/views/MonthsPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
