import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './utils/axios'
import myfilters from './utils/filters';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/common.scss';

//用于开发调试时模拟数据
require('./mock/mock')//此部分引入的是我们所编写的mockjs文档

Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.prototype.axios = axios
Object.keys(myfilters).forEach(k => Vue.filter(k, myfilters[k]));

var $ = require('jquery');
window.$ = $;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
