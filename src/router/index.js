import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import shareId from '../views/share/_id'
import userId from '../views/user/_id'

/**
 * @type { import('vue-router').RouteRecordRaw[] }
 */
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/oauth',
    name: 'OAuth',
    component: () => import('../views/OAuth.vue')
  },
  {
    path: '/status/:id',
    name: 'share-id',
    component: shareId
  },
  {
    path: '/user/:id',
    name: 'user-id',
    component: userId
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
