import VueRouter from 'vue-router';
import store from '@crex/store';

//We can use the theme data to pull in and create dynamic routes
const router = new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'home',
        component: () => import("../views/Main.vue"),
        props: true
      },
      {
        path: '/comparison',
        name: 'comparison',
        component: () => import("../views/Comparison.vue"),
        props: true
      }
    ]
});

export default router;
