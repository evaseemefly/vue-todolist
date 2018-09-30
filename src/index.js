// import .dist from 'vue'
// require('/vue/vue.js')
// import * from '/vue/vue.js'
import Vue from 'vue'
// import 'vue/dist/vue.js'
import App from './app.vue'
import VueRouter from 'vue-router'
import Routers from './router/router';
//引入vuex
// 放在store/store.js中
// import Vuex from 'vuex';
import store from './store/index';
// import Routers from '../router';

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
// iview的样式
import 'iview/dist/styles/iview.css'
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

// 引入对于bootstrap-table的导出excel功能，注意js引入的顺序
import './components/js/bootstrapExt/export/bootstrap-table-export'
import './components/js/bootstrapExt/export/tableExport'

//引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts=echarts;
// 加入flatui的部分样式
import './components/css/flatui/flat-ui.css'
// 加入iview
import iView from 'iview'

// require('bootstrap-loader')
// require('bootstrap')

Vue.prototype.moment=moment
Vue.config.devtools=true;
Vue.use(VueRouter)
//引入vuex
// Vue.use(Vuex)
Vue.use(iView)
const root=document.createElement("div")
document.body.appendChild(root)

iView.Message.config({
    top:70,
    duration:1.5
})

// 路由配置
const RouterConfig = {
    // 使用 HTML5 的 History 路由模式
    mode: 'history',
    // mode: 'hash',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

// const store=new Vuex.Store({

// })

// new Vue({
//     //使用箭头语法等同于下面的写法
//     el:'#app',
//     template:'<App/>',
//     components:{App},  
//     // render:function(h){
//     //     h(App);
//     // }
//     router:router
// })

// 使用router hash模式，暂时注释掉
// 注意此处若使用router model 为 history，需要采用以下方式进行配置
new Vue({
    //使用箭头语法等同于下面的写法    
    render:(h)=>h(App),    
    // render:function(h){
    //     h(App);
    // }
    router:router,
    store:store
}).$mount(root)     //$mount为vue中的手动挂载

// 使用以下方式配置，暂时有问题
// new Vue({
//     el:'#app',
//     router,
//     // store,
//     template:'<App/>',
//     components:{App}
// })