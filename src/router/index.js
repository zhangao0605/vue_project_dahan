import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/home'

Vue.use(Router)
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('../views/login/index'),
    hidden: true
  },
  {
    path: '/registered',
    component: () => import('../views/registered/index'),
    hidden: true
  },
  {
    path: '/registered_personal',
    namel: 'registered_personal',
    component: () => import('../views/personalInformation/index'),
    hidden: true
  }, {
    path: '/registered_enterprise',
    namel: 'registered_enterprise',
    component: () => import('../views/corporateInformation/index'),
    hidden: true
  }, {
    path: '/reset_password',
    namel: 'reset_password',
    component: () => import('../views/resetPassword/index'),
    hidden: true
  },
  {
    path: '/',
    component: Home,
    redirect: '/home',
    name: 'home',
    hidden: true,
    children: [{
      path: '/home',
      component: () => import('../components/homeContent')
    }]
  },
  {
    path: '/chain',
    component: Home,
    redirect: '/chain',
    name: 'chain',
    hidden: true,
    children: [{
      path: '/chain',
      redirect: '/chain/chainManagement',
      component: () => import('../views/chainManagement/index'),
      children: [{
        path: 'chainManagement',
        name: 'chainManagement',
        component: () => import('../components/chainIndex')
      }, {
        path: 'blockDetails',
        name: 'blockDetails',
        component: () => import('../components/blockDetails')
      }, {
        path: 'transactionDetails',
        name: 'transactionDetails',
        component: () => import('../components/transactionDetails')
      },]
    }]
  },
  {
    path: '/nodeManagement',
    component: Home,
    name: 'nodeManagement',
    hidden: true,
    children: [{
      path: '/nodeManagement',
      component: () => import('../views/nodeManagement/index')
    }]
  }, {
    path: '/accountManagement',
    component: Home,
    name: 'accountManagement',
    hidden: true,
    children: [{
      path: '/accountManagement',
      component: () => import('../views/accountManagement/index')
    }]
  }, {
    path: '/dataManagement',
    component: Home,
    name: 'dataManagement',
    hidden: true,
    children: [{
      path: '/dataManagement',
      component: () => import('../views/dataManagement/index')
    }]
  },
]


export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
