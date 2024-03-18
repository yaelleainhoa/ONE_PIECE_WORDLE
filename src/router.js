import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Classic from '@/views/Classic.vue'
import Policy from '@/views/Policy.vue'

const routes = [
  {
    path: '',
    name: 'Home',
    component: Home
  },
  {
    path: '/classic',
    name: 'Classic',
    component: Classic
  },  {
    path: '/policy',
    name: 'Policy',
    component: Policy
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: to => ({ path: '' }), 
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
});