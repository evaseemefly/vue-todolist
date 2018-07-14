import Vue from 'vue';
import Router from 'vue-router';

import home from '../layout/home/index.vue';
import login from '../layout/login/index.vue';
import content from '../layout/home/content-main.vue'
// import content from '../layout/center-content.vue'

// 路由改为组件的方式引入，不再使用require
const routers=[
    // {
    //     path:'/content/:did',
    //     // component:(resolve)=>require(['./src/layout/center-content.vue'],resolve)
    //     component:content
    // },
    {
        path:'/home',
        component:home,
        children:[
            {
                path:'/content/:did',
                component:content
            }
        ]
    },
    {
        path:'/login',
        component:login
        // component:(resolve)=>require(['./'])
    }
    // {
    //     path:'*',
    //     redirect:'/index'
    // }
];
export default routers;