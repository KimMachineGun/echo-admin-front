import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

Vue.prototype.$http = axios
Vue.prototype.$http.defaults.baseURL = 'http://localhost:8081'

new Vue({
  el: '#app',
  render: h => h(App)
})
