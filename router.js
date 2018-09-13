const routers=[
    {
        path:'/content/:did',
        component:(resolve)=>require(['./src/layout/center-content.vue'],resolve)
    },
    // {
    //     path:'/login/',
    //     component:(resolve)=>require(['./'])
    // }
    // {
    //     path:'*',
    //     redirect:'/index'
    // }
];
export default routers;