<template>
    <div id="app" class="container">    
        <!-- <search></search>
        <mycontent></mycontent> -->
        <leftmenu></leftmenu>
    </div>
</template>

<script>
    // import Header from "./layout/header.vue";
    import Search from "./layout/search.vue";
    import mycontent from "./layout/content.vue";
    import leftmenu from "./layout/left-menu.vue";

    // var bus=new Vue({
        
    // });
    // import $ from 'jquery'
    export default {
        data(){
            return{
                searchResult:null
            }
        },
        //注意：需要在componetns中声明子组件，才能在上面显示
        components: {
            // Header,
            Search,
            mycontent,
            leftmenu
        }
        // data () {
        //     return {
        //         text:'abc'
        //     }
        // }
    }
</script>
