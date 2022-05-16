const Production = () => import(/* webpackChunkName: "Production" */ '@/pages/Production.vue')
const PageNotFound = () => import(/* webpackChunkName: "PageNotFound" */ '@/pages/PageNotFound.vue')

export default [
  {
    path: '/production',
    name: 'production',
    component: Production
  },
  {
    path: '/page-not-found',
    name: 'page-not-found',
    component: PageNotFound
  },
  {
    path: '*',
    component: PageNotFound
  }
]
