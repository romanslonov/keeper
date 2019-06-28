import Vue from 'vue';
import Router from 'vue-router';
import MainLayout from './layouts/Main.vue';
import AuthLayout from './layouts/Auth.vue';
import store from './store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-exact-active',
  routes: [
    {
      path: '/',
      component: MainLayout,
      meta: { requireAuth: true },
      children: [
        {
          path: '',
          name: 'home',
          component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
        },
      ]
    },
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        { path: '', redirect: { name: 'Login' }},
        {
          path: 'login',
          name: 'Login',
          component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
        },
        {
          path: 'register',
          name: 'Register',
          component: () => import(/* webpackChunkName: "register" */ './views/Register.vue'),
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!store.getters.isAuthenticated) {
      return next({ name: 'Login' });
    }

    await store.dispatch('getProfile');
  }

  return next();
});

export default router;