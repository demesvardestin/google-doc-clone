import Vue from 'vue'
import App from './App.vue'

Vue.use(VueRouter)
Vue.config.productionTip = false

const Doc = { template: document }
const Newpage = { template: newPage }

const routes = [
  { path: '/doc/:id', component: Doc },
  { path: '/newpage', component: Newpage }
]

const router = new VueRouter({
  routes: routes
})


new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app')
