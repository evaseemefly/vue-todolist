<template>
    <div id="center-content" >
        <!-- <header></header> -->
        <!-- 父组件向子组件动态传值，需要使用v-bind进行绑定 -->
        <search :did="did"></search>
        <maincontent></maincontent>
    </div>

</template>

<script>
    import maincontent from "./content.vue";
    import search from "./search.vue";
    
    export default {
        components: {
            maincontent,
            search
        },
        data(){
            return{
                // did:-999
                // did:route.params.did
                did:this.$route.params.did
            }
        },
        mounted:function(){
            this.did=this.$route.params.did;
        }
    }
</script>

<style>
#center-content{
    /* position: fixed; */
    /* position: fixed; */
    padding-left: 220px;
    /* top:50px; */
    margin-top: 50px;
    right: 0px;    
}
</style>
