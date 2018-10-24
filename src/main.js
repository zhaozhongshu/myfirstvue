import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './utils/axios'
import myfilters from './utils/filters';
import ElementUI from 'element-ui';
import VueQuillEditor from 'vue-quill-editor'
import { VTree, VSelectTree } from 'vue-tree-halower'


Vue.config.productionTip = false

//用于模拟数据
require('./mock/mock')//此部分引入的是我们所编写的mockjs文档

//使用element组件 
Vue.use(ElementUI);

Vue.prototype.axios = axios
//初始化全局过滤器
Object.keys(myfilters).forEach(k => Vue.filter(k, myfilters[k]));

//juqery
var $ = require('jquery');
window.$ = $;

 //富文本组件
Vue.use(VueQuillEditor, /* { default global options } */)

//组件树
Vue.use (VTree)
Vue.use (VSelectTree)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import 'element-ui/lib/theme-chalk/index.css';
//富文本 require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// you can customize the style of the tree
import 'vue-tree-halower/dist/halower-tree.min.css' 

import './assets/common.scss';