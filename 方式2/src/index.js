// import .dist from 'vue'
// require('/vue/vue.js')
// import * from '/vue/vue.js'
import Vue from 'vue'
// import 'vue/dist/vue.js'
// import App from './app.vue'
import VueRouter from 'vue-router'
// import Routers from '../router';
import router from './router/router'

import App from './myapp.vue';
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
import moment from 'moment'

import './components/js/bootstrapExt/table/bootstrap-table.js'
import './components/js/bootstrapExt/editable/bootstrap-editable.js'


// require('bootstrap-loader')
// require('bootstrap')
Vue.prototype.moment=moment
Vue.config.devtools=true;
// Vue.use(VueRouter)

//7月13日注释掉
// const root=document.createElement("div")
// document.body.appendChild(root)

// 路由配置
// const RouterConfig = {
//     // 使用 HTML5 的 History 路由模式
//     mode: 'history',
//     routes: Routers
// };
// const router = new VueRouter(RouterConfig);

// 7月13日注释掉
// new Vue({
//     //使用箭头语法等同于下面的写法
//     render:(h)=>h(App),
//     router:router,
//     components:{App}
//     // render:function(h){
//     //     h(App);
//     // }
// }).$mount(root)     //$mount为vue中的手动挂载


//创建全局实例
new Vue({
    el:'#app',
    router,
    template:'<App/>',
    components:{App}
})


console.log(process.env.NODE_ENV)