const AnimeFilter = () => import(/* webpackChunkName: "AnimeFilter" */ '@/components/anime/AnimeFilter.vue')
const MangaFilter = () => import(/* webpackChunkName: "MangaFilter" */ '@/components/manga/MangaFilter.vue')

export default [
  {
    path: '/anime',
    name: 'animeFilter',
    component: AnimeFilter
  },
  {
    path: '/manga',
    name: 'mangaFilter',
    component: MangaFilter
  }
]
