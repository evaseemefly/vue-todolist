<template>
    <div id="center-content" >
        <search></search>
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
        }
    }
</script>

<style>
#center-content{
    /* position: fixed; */
    /* position: fixed; */
    padding-left: 220px;
}
</style>
