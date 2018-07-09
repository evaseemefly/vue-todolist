<template>
    <div id="center-content" >
        <!-- <header></header> -->
        <search did="did"></search>
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
                did:-999
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
