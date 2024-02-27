import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Classic from '@/views/Classic.vue'

const routes = [
  {
    path: '/ONE_PIECE_WORDLE',
    name: 'Home',
    component: Home
  },
  {
    path: '/ONE_PIECE_WORDLE/classic',
    name: 'Classic',
    component: Classic
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: to => ({ path: '/ONE_PIECE_WORDLE' }), 
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
});