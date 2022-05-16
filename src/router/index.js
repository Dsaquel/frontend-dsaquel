import Vue from 'vue'
import VueRouter from 'vue-router'
import detailsStuff from './modules/detailsStuff'
import stuff from './modules/stuff'
import filterStuff from './modules/filterStuff'
import pageNotFound from './modules/pageNotFound'
import account from './modules/account'
import gloabal from './modules/global'

Vue.use(VueRouter)

const routes =
[
  ...detailsStuff,
  ...stuff,
  ...filterStuff,
  ...pageNotFound,
  ...account,
  ...gloabal
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
