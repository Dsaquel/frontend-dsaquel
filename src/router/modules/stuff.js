const Anime = () => import(/* webpackChunkName: "Anime" */ '@/pages/Anime.vue')
const Manga = () => import(/* webpackChunkName: "Manga" */ '@/pages/Manga.vue')

export default [
  {
    path: '/anime/',
    name: 'anime',
    component: Anime
  },
  {
    path: '/manga/',
    name: 'manga',
    component: Manga
  }
]
