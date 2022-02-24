import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashbord',
    component: () => import('../views/layout/Dashboard'),
    children: [
      {
        path: '/product',
        name: 'product',
        component: () => import('../views/product/Index'),
      },
      {
        path: '/product/create',
        name: 'product.create',
        component: () => import('../views/product/Form'),
      },
      {
        path: '/product/:id',
        name: 'product.update',
        component: () => import('../views/product/Form'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !store.state.isLogin) next({ name: 'Login' })
  else next()
})
export default router
