import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home.vue'
import document from './components/document.vue'
import newPage from './components/newPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { 
      path: '/doc/:id',
      name: 'doc',
      component: document
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
