import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import Page1 from "./App.vue"
// import Page2 from "./Rules.vue"

const app = createApp(App)

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/ONE_PIECE_WORDLE/home', component: Page1, name: "home" },
    //   { path: '/rules', component: Page2, name: "rules" },
      { 
        path: '/:catchAll(.*)', 
        redirect: to => ({ path: '/ONE_PIECE_WORDLE/home' }), 
      },
    ]
  })

app.use(router)
app.mount('#app')