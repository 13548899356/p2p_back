// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from '@/api/http' //vue项目对axios的全局配置
import VueAxios from 'vue-axios'
import App from './App'
import router from './router'
import vpay from 'vpay';
Vue.use(VueAxios, axios)
// 引入Element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI) //新添加3
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
