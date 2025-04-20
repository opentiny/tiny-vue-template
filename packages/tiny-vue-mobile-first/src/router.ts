import { createWebHistory, createRouter } from 'vue-router'

import Home from './pages/index/index.vue'
import About from './pages/about/index.vue'
import Detail from './pages/detail/index.vue'
import Test from './pages/test/index.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/detail', component: Detail },
  { path: '/test', component: Test }
]

export const router = createRouter({
  history: createWebHistory('/tiny-vue-template/'),
  routes
})
