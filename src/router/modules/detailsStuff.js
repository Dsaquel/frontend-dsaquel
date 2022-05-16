const DetailsAnime = () => import(/* webpackChunkName: "DetailAnime" */ '@/components/detail/DetailsAnime.vue')
const DetailsManga = () => import(/* webpackChunkName: "DetailManga" */ '@/components/detail/DetailsManga.vue')
const DetailsCharacter = () => import(/* webpackChunkName: "DetailCharacter" */ '@/components/detail/DetailsCharacter.vue')

export default [
  {
    path: '/detail-anime/:id',
    name: 'detailAnime',
    component: DetailsAnime
  },
  {
    path: '/detail-manga/:id',
    name: 'detailManga',
    component: DetailsManga
  },
  {
    path: '/detail-character/:id',
    name: 'detailCharacter',
    component: DetailsCharacter
  }
]
