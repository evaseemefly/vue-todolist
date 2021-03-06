// import .dist from 'vue'
// require('/vue/vue.js')
// import * from '/vue/vue.js'
import Vue from 'vue'
// import 'vue/dist/vue.js'

import VueRouter from 'vue-router'
import Routers from '../router';
import routers from './router/routers';
import $ from 'jquery'
// import 'bootstrap/dist/css/bootstrap.min.css'  
// import 'bootstrap/dist/js/bootstrap.min'  
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min'
// import 'bootstrap/dist/css/bootstrap.css' 
// import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.css'
import './components/css/bootstrapExt/table/bootstrap-table.css'
import './components/css/bootstrapExt/editable/bootstrap-editable.css'
import 'bootstrap/dist/js/bootstrap.js'

// import './components/css/background.css'
// import './components/css/bootstrap/bootstrap.min.css'

import './components/css/datetimepicker/bootstrap-datetimepicker.min.css'
// import './components/js/bootstrap/bootstrap.js'
import './components/js/datetimepicker/bootstrap-datetimepicker.js'
import './components/js/datetimepicker/bootstrap-datetimepicker.zh-CN.js'

// import 'moment/moment.js'
// import "moment";
// import 'moment/moment'
// import moment from 'moment/moment'
// import moment from 'moment'
// import './components/js/common/moment'

//下面两个暂时去掉
// import './components/js/common/moment.js'
// require('./components/js/common/moment.js')
import moment from 'moment'

import './components/js/bootstrapExt/table/bootstrap-table.js'
import './components/js/bootstrapExt/editable/bootstrap-editable.js'


// require('bootstrap-loader')
// require('bootstrap')
Vue.prototype.moment=moment
Vue.config.devtools=true;
Vue.use(VueRouter)
const root=document.createElement("div")
document.body.appendChild(root)

// 路由配置
const RouterConfig = {
    // 使用 HTML5 的 History 路由模式
    // mode: 'history',
    routes: routers
};
const router = new VueRouter(RouterConfig);

import App from './app.vue'

new Vue({
    el:'#app',
    router:router,
    template:'<App/>',
    components:{App}
    
})
// console.log(process.env.NODE_ENV)