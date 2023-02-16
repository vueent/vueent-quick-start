import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/routes/home.vue';
import Add from '@/routes/add.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/add',
      name: 'add',
      component: Add
    }
  ]
});

export default router;
