import Vue from 'vue'

import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(elementUi)

import iviewUi from 'view-design'
import 'view-design/dist/styles/iview.css'
Vue.use(iviewUi)

// 引入 moment
import moment from 'moment'
// 通过 vue 的 prototype 设置一个全局的属性，从而设置为全局功能
Vue.prototype.$formatDate = moment

import router from './router/index.js'

import App from './App.vue'

import { Search } from 'vant';
import "vant/lib/index.css"
Vue.use(Search);
import { Loading } from 'vant';
Vue.use(Loading);
import { Button } from 'vant';
Vue.use(Button);
import { Icon } from 'vant';
Vue.use(Icon);

// 跨域访问
import axios from 'axios'
Vue.use(axios)
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    // 挂载router
    router
}).$mount('#app')