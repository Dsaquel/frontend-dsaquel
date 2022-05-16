import Vue from 'vue'
import VueRouter from 'vue-router'
import stuff from './modules/stuff'
import account from './modules/account'
import gloabal from './modules/global'
import filterStuff from './modules/filterStuff'
import detailsStuff from './modules/detailsStuff'
import pageNotFound from './modules/pageNotFound'

Vue.use(VueRouter)

const routes =
[
  ...stuff,
  ...account,
  ...gloabal,
  ...filterStuff,
  ...detailsStuff,
  ...pageNotFound
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
