import Vue from 'vue'
import App from './App.vue'
// 引入插件
import "./elementui"
import store from './store/index'
new Vue({
  store,
  render: h => h(App),
  // 创建前
  beforeCreate() {
    // 安装事件总线
    Vue.prototype.$bus = this
  }
}).$mount('#app')