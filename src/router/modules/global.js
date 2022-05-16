const Home = () => import(/* webpackChunkName: "Home" */ '@/pages/Home.vue')
const Objective = () => import(/* webpackChunkName: "Objective" */ '@/pages/Objective.vue')
const Suggestion = () => import(/* webpackChunkName: "Suggestion" */ '@/pages/Suggestion.vue')

export default [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/objective',
    name: 'objective',
    component: Objective
  },
  {
    path: '/suggestion',
    name: 'suggestion',
    component: Suggestion
  }
]
