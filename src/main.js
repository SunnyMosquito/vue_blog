import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import "./assets/style/reset.css"

Vue.use(VueAxios, axios);
Vue.config.productionTip = false
Vue.use(VueRouter)
const router = new VueRouter({
  routes: routes
})

new Vue({
  store: store,
  router: router,
  render: h => h(App)
}).$mount('#app')