//引入vue
import Vue from 'vue';

//引入路由组件
import Router from 'vue-router';

//注册路由
// Vue.use(Router);
//引入路由需要的组件

//公共部分
import app from '../layout/app/app.vue';
//home
import home from '../layout/home/home.vue';
import foot from '../layout/foot/foot.vue';
import head from '../layout/head/head.vue';


var routers = [{
    path: '/app',
    component: app,
    children: [{
        path: '/home',
        component: home,
        children: {
            header: head,
            // content:
            footer: foot
        }

    }]
}];

//配置路由
// var router = new Router({
//     routes: [{
//         path: '/app',
//         component: app,
//         children: [
//             //   {
//             //     path: 'login',
//             //     name: 'login',
//             //     components: {
//             //       head: loginHead,
//             //       content: login,
//             //       footer: footer
//             //     },
//             //     meta: {
//             //       title: '登录',
//             //       need_log: false
//             //     }
//             //   },
//             {
//                 path: '/home',
//                 component: home,
//                 children: {
//                     header: head,
//                     // content:
//                     footer: foot
//                 }

//             }
//         ]
//     }]
// })
//修改网页标题
// router.afterEach((to, from, next) => {
//     document.title = to.matched[to.matched.length - 1].meta.title;
// })

//抛出路由
export default routers;
