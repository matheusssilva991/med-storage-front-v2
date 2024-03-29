import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/databases',
      name: 'databases',
      component: () => import('../views/DatabaseListView.vue')
    },
    {
      path: '/image-types',
      name: 'image-types',
      component: () => import('../views/ImageTypeListView.vue')
    },
    {
      path: '/solicitations',
      name: 'solicitations',
      component: () => import('../views/SolicitationListView.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UserListView.vue')
    }
  ]
})

export default router
