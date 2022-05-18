const Library = () => import(/* webpackChunkName: "Library" */ '@/pages/Library.vue')
const UserProfile = () => import(/* webpackChunkName: "UserProfile" */ '@/pages/UserProfile.vue')
const ResetPassword = () => import(/* webpackChunkName: "ResetPassword" */ '@/pages/ResetPassword.vue')
const EmailConfirmation = () => import(/* webpackChunkName: "EmailConfirmation" */ '@/components/register/EmailConfirmation.vue')

export default [
  {
    path: '/library',
    name: 'library',
    component: Library
  },
  {
    path: '/account/personnal-informations',
    name: 'editAccount',
    component: UserProfile
  },
  {
    path: '/reset-password/:email/:token',
    name: 'reset-password',
    component: ResetPassword
  },
  {
    path: '/confirmation/:email/:token',
    name: 'EmailConfirmation',
    component: EmailConfirmation
  }
]
