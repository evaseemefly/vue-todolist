// import .dist from 'vue'
// require('/vue/vue.js')
// import * from '/vue/vue.js'
import Vue from 'vue'
// import 'vue/dist/vue.js'
import App from './app.vue'
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
const root=document.createElement("div")
document.body.appendChild(root)

new Vue({
    //使用箭头语法等同于下面的写法
    render:(h)=>h(App)
    // render:function(h){
    //     h(App);
    // }
}).$mount(root)     //$mount为vue中的手动挂载
console.log(process.env.NODE_ENV)