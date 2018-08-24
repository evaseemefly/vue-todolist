<template>
    <div id="center-content">
        <!-- <header></header> -->
        <!-- 父组件向子组件动态传值，需要使用v-bind进行绑定 -->
        <calendar></calendar>
        <div id="main_components" class="tile">
            <search :did="did"></search>
            <maincontent></maincontent>
        </div>

    </div>

</template>

<script>
    // import maincontent from "./content.vue";
    import maincontent from "./content-center.vue";
    import search from "../member/search.vue";
    import calendar from "../left/left-calendar.vue";
    
    export default {
        components: {
            maincontent,
            search,
            calendar
        },
        data() {
            return {
                // did:-999
                // did:route.params.did
                did: this.$route.params.did
            }
        },
        mounted: function () {
            // alert("mounted调用");
            this.did = this.$route.params.did;
        },
        created: function () {
            // alert("created调用");
        },
        watch: {
            "$route": function () {
                // alert('路由变化');
                this.did = this.$route.params.did;
            }
        }
    }
</script>

<style scoped>
    #center-content {
        /* position: fixed; */
        /* position: fixed; */
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 0px;
        top: 53px;
        /* padding-top: 58px; */
        /* padding-left: 220px; */
        /* top:50px; */
        /* margin-top: 50px; */
        /* right: 0px; */
    }
    #main_components{
        /* margin-right: 300px; */
        /* height: 100%; */
        /* float: right; */
        position: absolute;
        top: 0px;
        left: 600px;
        right: 0px;
        bottom: 0px;
        margin-bottom: 0px;
    }
    .tile{
        background: #eff0f221;
    }
</style>