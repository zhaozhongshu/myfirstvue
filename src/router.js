import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/Home.vue'
import HomeDetail from './views/home/homeDetail.vue'
import AboutChild1 from './views/about/aboutChild1.vue'
import AboutChild2 from './views/about/aboutChild2'


Vue.use(Router)
 var  router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },{
      path:"/newWinHome/:id",
      component: HomeDetail

    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/about/About.vue'),
      children: [
        {
          path: 'aboutChild1',
          component: AboutChild1
        },
        {
          path: 'aboutChild2',
          component: AboutChild2
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  //路由拦截

  next();
     
 
})
router.afterEach((to, from, next) => {
  if (to.path.indexOf("newWin") >-1) {  // 判断该路由是否需要登录权限
  
  
  } 
 
})

export default router;