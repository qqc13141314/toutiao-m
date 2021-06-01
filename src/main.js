import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入全局样式
import './styles/index.less'

//引入 vant 组件库
import Vant from 'vant';
//引入vant 组件库样式ß
import 'vant/lib/index.css';
//全局注册vant
Vue.use(Vant);
//引入 amfe-flexible  --自动设置rem 基准值（html标签字体大小）
import 'amfe-flexible'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')