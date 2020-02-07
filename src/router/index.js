import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    redirect: "/login"

  },
  {
    path: "/login",
    component:()=>import("../components/LO/Login/Login.vue")
  },
  {
    path:"/home",
    component:()=>import("../views/Home.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 登录页权限问题
router.beforeEach((to, from, next) => {
  if(to.path=="/login"){
    return next()
  }else{
    const token= window.sessionStorage.getItem("token")
    if(!token){
      return next("/login")
    }else{
      next()
    }
  }
  })


export default router
