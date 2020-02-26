import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/login"

  },
  {
    path: "/login",
    component: () => import("../components/LO/Login/Login.vue")
  },
  {
    path: "/home",
    component: () => import("../views/Home.vue"),
    redirect: "/defaul",
    children: [
      {
        path: "/defaul",
        component: () => import("../components/Homepage/main/defaul.vue")
      }, {
        path: "/users",
        component: () => import("../components/Homepage/main/userviews/users.vue")
      },{
        path:"/rights",
        component:()=>import("../components/Homepage/main/rightsviews/quanxian.vue")
      },{
          path:"/roles",
          component:()=>import("../components/Homepage/main/rightsviews/role.vue")
      },{
        path:"/goods",
        component:()=>import("../components/Homepage/main/goodslie/goodsliebiao.vue")
       
      },
      {
        path:"/categories",
        component:()=>import("../components/Homepage/main/goodslie/goodsfeilei.vue")
      },{
        path:"/params",
        component:()=>import("../components/Homepage/main/goodslie/goodscanshu.vue")
      },
      {
        path:"/add",
        component:()=>import("../components/Homepage/main/goodslie/add.vue")
      },
      {
        path:"/orders",
        component:()=>import("../components/Homepage/main/dingdan/orders.vue")
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 登录页权限问题
router.beforeEach((to, from, next) => {
  if (to.path == "/login") {
    return next()
  } else {
    const token = window.sessionStorage.getItem("token")
    if (!token) {
      return next("/login")
    } else {
      next()
    }
  }
})


export default router
