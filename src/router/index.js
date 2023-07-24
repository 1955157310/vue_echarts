import { createRouter, createWebHashHistory } from 'vue-router' 
import HomeView from '../views/HomeView.vue'
import file1 from '../views/file1.vue'
import file2 from '../views/file2.vue'
import file3 from '../views/file3.vue'
import file4 from '../views/file4.vue'
import file5 from '../views/file5.vue'
import file6 from '../views/file6.vue'

const routes = [
  {
    path: '/',
    redirect: 'login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')

  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register.vue')

  },
  
   {
    path: '/home/file4',
    name: 'file4',
    meta :{
      keepAlive:true
    },
    component: file4

  },
  {
    path: '/home/file5',
    name: 'file5',
    meta :{
      keepAlive:true
    },
    component: file5

  },
  {
    path: '/home/file6',
    name: 'file6',
    meta :{
      keepAlive:true
    },
    component: file6

  },
  {
    path: '/home',
    name: 'home',
    //redirect: 'Homeview',
    component: HomeView,
    children: [
   {
     path: '/home/file1',
     name: 'file1',
      meta :{
       keepAlive:true
     }, 
     //redirect:'file1',
      component: file1
   },
   {
     path: '/home/file2',
     name: 'file2',
     meta :{
       keepAlive:true
     },
     component: file2

   },
   {
    path: '/home/file3',
    name: 'file3',
    meta :{
     keepAlive:true
   },
    component: file3

  }
   
   
 ]
  }, 
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
