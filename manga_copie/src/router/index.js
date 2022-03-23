import Vue from 'vue'
import VueRouter from 'vue-router'

const DetailsAnime = () => import(/* webpackChunkName: "DetailAnime" */ '../components/detail/DetailsAnime.vue')
const DetailsCharacter = () => import(/* webpackChunkName: "DetailCharacter" */ '../components/detail/DetailsCharacter.vue')
const DetailsManga = () => import(/* webpackChunkName: "DetailManga" */ '../components/detail/DetailsManga.vue')
const Home = () => import(/* webpackChunkName: "Home" */ '../pages/Home.vue')
const Login = () => import(/* webpackChunkName: "Login" */ '../pages/Login.vue')
const PageNotFound = () => import(/* webpackChunkName: "PageNotFound" */ '../pages/PageNotFound.vue')
const MangaList = () => import(/* webpackChunkName: "MangaList" */ '../pages/MangaList.vue')
const Register = () => import(/* webpackChunkName: "Register" */ '../pages/Register.vue')
const ResetPassword = () => import(/* webpackChunkName: "ResetPassword" */ '../pages/ResetPassword.vue')
const Search = () => import(/* webpackChunkName: "Search" */ '../pages/Search.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/detail-manga/:id',
    name: 'detailManga',
    component: DetailsManga
  },
  {
    path: '/detail-anime/:id',
    name: 'detailAnime',
    component: DetailsAnime
  },
  {
    path: '/detail-character/:id',
    name: 'detailCharacter',
    component: DetailsCharacter
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/manga-list/:style/:filter',
    component: MangaList
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
    path: '/search/:id',
    component: Search
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
