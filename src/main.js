// import { createApp } from '@vue/composition-api'
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import '@/styles/global.css' // global css

import App from './App.vue'
import store from './store'
import router from './router'
import { makeServer } from '@/server'
import '@/permission' // permission control
import { utilsMixin } from '@/mixins'
import 'virtual:uno.css'

// if (import.meta.env.DEV) {
//   makeServer()
// }
makeServer()

Vue.config.productionTip = false
Vue.mixin(utilsMixin)
Vue.use(ElementUI, { size: 'medium', zIndex: 3000 })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
