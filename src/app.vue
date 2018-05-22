<template>
<div id="app">
    <Search></Search>
    <Header></Header>
</div>    
</template>

<script>
import Header from "./layout/header.vue";
import Search from "./layout/search.vue";
// import $ from 'jquery'
export default {
    //注意：需要在componetns中声明子组件，才能在上面显示
    components:{
        Header,
        Search
    }
    // data () {
    //     return {
    //         text:'abc'
    //     }
    // }
}
</script>



