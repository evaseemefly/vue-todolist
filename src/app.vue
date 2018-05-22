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
    data () {
        return {
            text:'abc'
        }
    }
}
</script>



