import Vue from 'vue'
import VueRouter from 'vue-router'
import Notfound from '../views/404.vue'
import register from '../views/Register.vue'
import first from '../views/first.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/login'
  }, 
  {
    path: '/first',
    name: 'first',
    component: first,
    children: [
      {
          path: '/home',
          name: 'home',
          component: ()=>import('../views/home.vue')
      },
      {
          path: '/user',
          name: 'user',
          component: ()=>import('../views/user.vue')
      }
  ]
  },
  {
    path: '/user',
    name: 'user',
    component: ()=>import('../views/user.vue')
  }, 
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    path: '*',
    name: '404',
    component: Notfound
  },  
  {
    path: '/register',
    name: 'register',
    component: register
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//路由守卫
router.beforeEach((to,from,next)=>{
  const istoken =localStorage.elementToken ? true : false
  if( to.path =='/login'|| to.path=='/register')
  {
  next()
}else{
  istoken ? next() : next('/login')
}}
)

export default router
