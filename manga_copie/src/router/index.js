import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import(/* webpackChunkName: "Home" */ '../pages/Home.vue')
const Login = () => import(/* webpackChunkName: "Login" */ '../pages/Login.vue')
const PageNotFound = () => import(/* webpackChunkName: "PageNotFound" */ '../pages/PageNotFound.vue')
const Register = () => import(/* webpackChunkName: "Register" */ '../pages/Register.vue')
const ResetPassword = () => import(/* webpackChunkName: "ResetPassword" */ '../pages/ResetPassword.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/page-not-found',
    name: 'page-not-found',
    component: PageNotFound
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: ResetPassword
  },
  {
    path: '*',
    component: PageNotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
