//引入vue
import Vue from 'vue';

import Router from 'vue-router';

//注册路由
Vue.use(Router);

//公共vue
import app from '../layout/app/app.vue';

import login from '../layout/login/login.vue';
import loginHead from '../layout/login/login-head.vue';
// import footer from '../layout/footer/footer'
import footer from '../layout/footer/footer.vue';

// const routers=[
//     {
//         path:'/content/:did',
//         component:(resolve)=>require(['./src/layout/center-content.vue'],resolve)
//     },
//     // {
//     //     path:'*',
//     //     redirect:'/index'
//     // }
// ];

const router = new Router[{
    routes: [{
        path: '/app',
        component: app,
        children: [{
            path: 'login',
            name: 'login',
            components: {
                head: loginHead,
                content: login,
                footer: footer
            }
        }]
    }],
    mode:'histroy'
}]

//进行路由判断
router.beforeEach((to, from, next) => {
            // var nextPath = cookie.getCookie('nextPath')
            // console.log(nextPath)
            // if(nextPath=="pay"){
            //   next({
            //     path: '/app/home/member/order',
            //   });
            // }else{
            //   if(to!=undefined){
            //     if(to.meta.need_log){
            //       console.log(to.meta.need_log)
            //       if(!store.state.userInfo.token){
            //         next({
            //           path: '/app/login',
            //         });
            //       }else {
            //         next();
            //       }
            //     }else {
            //       if (to.path === '/') {
            //         next({
            //           path: '/app/home/index',
            //         });
            //       }else {
            //         next();
            //       }
            //     }
            //   }else {
            //     if (to.path === '/') {
            //       next({
            //         path: '/app/home/index',
            //       });
            //     }else {
            //       next();
            //     }
            //   }
            // }

            //暂时先不加入支付功能的路由
            if (to != undefined) {
                if (to.meta.need_log) {
                    console.log(to.meta.need_log)
                    if (!store.state.userInfo.token) {
                        next({
                            path: '/app/login',
                        });
                    } else {
                        next();
                    }
                } else {
                    if (to.path === '/') {
                        next({
                            path: '/app/home/index',
                        });
                    } else {
                        next();
                    }
                }
            } else {
                if (to.path === '/') {
                    next({
                        path: '/app/home/index',
                    });
                } else {
                    next();
                }
            }
        })


 export default router;