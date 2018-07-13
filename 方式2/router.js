const routers=[
    {
        path:'/content/:did',
        component:(resolve)=>require(['./src/layout/center-content.vue'],resolve)
    },
    // {
    //     path:'*',
    //     redirect:'/index'
    // }
];
export default routers;