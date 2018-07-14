import Vue from 'vue';
import Router from 'vue-router';

import home from '../layout/home/index.vue';
import login from '../layout/login/login.vue';
import content from '../layout/home/content-main.vue'

// 路由改为组件的方式引入，不再使用require
const routers=[
    {
        path:'/home',
        component:home,
        children:[
            {
                path:'content/:did',
                component:content
            }
        ]
    },
    {
        path:'/login',
        component:login        
    }    
];
export default routers;