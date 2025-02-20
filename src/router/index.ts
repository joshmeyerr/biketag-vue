import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
// import Auth from '../auth'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:tagnumber?',
    name: 'Play',
    component: () => import('@/views/Play.vue'),
  },
  {
    path: '/biketags/:currentPage?',
    name: 'BikeTags',
    component: () => import('@/views/BikeTags.vue'),
  },
  {
    path: '/players/:currentPage?',
    name: 'Players',
    component: () => import('@/views/Players.vue'),
  },
  {
    path: '/player/:name/:currentPage?',
    name: 'Player',
    component: () => import('@/views/Player.vue'),
  },
  {
    path: '/play',
    name: 'Queue',
    component: () => import('@/views/Queue.vue'),
  },
  {
    path: '/howtoplay',
    name: 'How',
    component: () => import('@/views/HowToPlay.vue'),
  },
  {
    path: '/leaderboard',
    name: 'LeaderBoard',
    component: () => import('@/views/Leaderboard.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
  },
]

const protectedRoutes: Array<RouteRecordRaw> = []

// if (process.env.AUTH0_DOMAIN?.length) {
//   protectedRoutes = [
//     {
//       path: '/profile',
//       name: 'Profile',
//       beforeEnter: Auth.routeGuard,
//       component: () => import('@/views/Profile.vue'),
//     },
//   ]
// }

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routes, ...protectedRoutes],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
