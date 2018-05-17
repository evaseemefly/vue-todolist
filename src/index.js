import Vue from 'vue'
import App from './app.vue'

const root=document.createElement("div")
document.body.appendChild(root)

new Vue({
    //使用箭头语法等同于下面的写法
    render:(h)=>h(App)
    // render:function(h){
    //     h(App);
    // }
}).$mount(root)     //$mount为vue中的手动挂载