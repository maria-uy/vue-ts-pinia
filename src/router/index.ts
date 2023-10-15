import { createRouter, createWebHistory } from 'vue-router'
import ClientsLayout from '@/clients/layout/ClientsLayout.vue'
import ListPage from '@/clients/views/ListPage.vue'
import ClientPage from '@/clients/views/ClientPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'clients',
      component: ClientsLayout,
      redirect: { name: 'list'},
      children: [
        { path: 'list', name: 'list', component: ListPage },
        { path: 'client/:id', name: 'client-id', component: ClientPage} 
      ]
    }
  ]
})

export default router
