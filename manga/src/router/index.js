import { createRouter, createWebHistory } from 'vue-router'
const Home = () => import(/* webpackChunkName: "Home" */ '../pages/Home.vue');
const Login = () => import(/* webpackChunkName: "Login" */ '../pages/Login.vue');
const PageNotFound = () => import(/* webpackChunkName: "PageNotFound" */ '../pages/PageNotFound.vue');
const Panier = () => import(/* webpackChunkName: "Panier" */ '../pages/Panier.vue');
const Register = () => import(/* webpackChunkName: "Register" */ '../pages/Register.vue');
const ResetPassword = () => import(/* webpackChunkName: "ResetPassword" */ '../pages/ResetPassword.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/page-not-found',
      name: 'page-not-found',
      component: PageNotFound,
    },
    {
      path: '/panier',
      name: 'panier',
      component: Panier,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPassword,
    },
    {
      path: '/:catchAll(.*)',
      component: PageNotFound,
    },
  ]
})

export default router
