const routers=[
    {
        path:'/content',
        component:(resolve)=>require(['./src/layout/center-content.vue'],resolve)
    },
    // {
    //     path:'*',
    //     redirect:'/index'
    // }
];
export default routers;