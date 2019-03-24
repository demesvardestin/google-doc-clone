import Vue from 'vue'
import VueRouter from 'vue-router'
import doc from './views/doc.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { 
      path: '/doc',
      name: 'doc',
      component: doc
    }
  ]
})

export default router
