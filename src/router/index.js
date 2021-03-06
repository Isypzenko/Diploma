import { createRouter, createWebHistory } from 'vue-router'
import firebase from 'firebase/app'


const routes = [
  {
    path:'/login',
    name:'login',
    meta:{
      layout:'empty'
    },
    component: () => import('@/views/Login.vue')
  },
  {
    path:'/categories',
    name:'categories',
    meta:{
      layout:'main',auth:'true'
    },
    component: () => import('@/views/Categories.vue')
  },
  {
    path:'/register',
    name:'register',
    meta:{
      layout:'empty'
    },
    component:() => import('@/views/Register.vue')
  },
  {
    path:'/record',
    name:'record',
    meta:{
      layout:'main',auth:'true'
    },
    component:() => import('@/views/Record.vue')
  },
  {
    path:'/profile',
    name:'profile',
    meta:{
      layout:'main',auth:'true'
    },
    component:() => import('@/views/Profile.vue')
  },
  {
    path:'/planning',
    name:'planning',
    meta:{
      layout:'main',auth:'true'
    },
    component:() => import('@/views/Planning.vue')
  },
  {
    path:'/',
    name:'home',
    meta:{
      layout:'main', auth:'true'
    },
    component:() => import('@/views/Home.vue')
  },
  {
    path:'/history',
    name:'history',
    meta:{
      layout:'main'
    },
    component:() => import('@/views/History.vue')
  },
  {
    path:'/detail/:id',
    name:'detail',
    meta:{
      layout:'main',auth:'true'
    },
    component:() => import('@/views/DetailRecord.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next) => {
  const currentUser = firebase.auth().currentUser
  const requiredAuth = to.matched.some(record => record.meta.auth)

  if(requiredAuth && !currentUser){
    next('/login?message=login')
  }else{
    next()
  }
})

export default router
