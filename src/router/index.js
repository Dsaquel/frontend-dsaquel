import Vue from 'vue'
import VueRouter from 'vue-router'

const EmailConfirmation = () => import(/* webpackChunkName: "EmailConfirmation" */ '../components/register/EmailConfirmation.vue')
const DetailsAnime = () => import(/* webpackChunkName: "DetailAnime" */ '../components/detail/DetailsAnime.vue')
const DetailsCharacter = () => import(/* webpackChunkName: "DetailCharacter" */ '../components/detail/DetailsCharacter.vue')
const DetailsManga = () => import(/* webpackChunkName: "DetailManga" */ '../components/detail/DetailsManga.vue')
const AnimeFilter = () => import(/* webpackChunkName: "AnimeFilter" */ '../components/anime/AnimeFilter.vue')
const MangaFilter = () => import(/* webpackChunkName: "MangaFilter" */ '../components/manga/MangaFilter.vue')
const Home = () => import(/* webpackChunkName: "Home" */ '../pages/Home.vue')
const Suggestion = () => import(/* webpackChunkName: "Suggestion" */ '../pages/Suggestion.vue')
const Objective = () => import(/* webpackChunkName: "Objective" */ '../pages/Objective.vue')
const Login = () => import(/* webpackChunkName: "Login" */ '../pages/Login.vue')
const Library = () => import(/* webpackChunkName: "Library" */ '../pages/Library.vue')
const PageNotFound = () => import(/* webpackChunkName: "PageNotFound" */ '../pages/PageNotFound.vue')
const Production = () => import(/* webpackChunkName: "Production" */ '../pages/Production.vue')
const Manga = () => import(/* webpackChunkName: "Manga" */ '../pages/Manga.vue')
const Anime = () => import(/* webpackChunkName: "Anime" */ '../pages/Anime.vue')
const UserProfile = () => import(/* webpackChunkName: "UserProfile" */ '../pages/UserProfile.vue')
const Register = () => import(/* webpackChunkName: "Register" */ '../pages/Register.vue')
const ResetPassword = () => import(/* webpackChunkName: "ResetPassword" */ '../pages/ResetPassword.vue')

Vue.use(VueRouter)

const routes =
[{
  path: '/',
  name: 'home',
  component: Home
},
{
  path: '/confirmation/:email/:token',
  name: 'EmailConfirmation',
  component: EmailConfirmation
},
{
  path: '/suggestion',
  name: 'suggestion',
  component: Suggestion
},
{
  path: '/objective',
  name: 'objective',
  component: Objective
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
  path: '/anime/filters/',
  component: AnimeFilter,
  name: 'animeFilter'
},
{
  path: '/manga/filters/',
  component: MangaFilter,
  name: 'mangaFilter'
},
{
  path: '/login',
  name: 'login',
  component: Login
},
{
  path: '/library',
  name: 'library',
  component: Library
},
{
  path: '/manga/',
  name: 'manga',
  component: Manga
},
{
  path: '/anime/',
  name: 'anime',
  component: Anime
},
{
  path: '/page-not-found',
  name: 'page-not-found',
  component: PageNotFound
},
{
  path: '/account/personnal-informations',
  name: 'editAccount',
  component: UserProfile
},
{
  path: '/register',
  name: 'register',
  component: Register
},
{
  path: '/production',
  name: 'production',
  component: Production
},
{
  path: '/reset-password/:email/:token',
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
