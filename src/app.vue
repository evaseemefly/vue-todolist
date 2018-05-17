
<template>
<div id="app">
    <Header></Header>
    <MyContent></MyContent>
    <Footer></Footer>
</div>    
</template>

<script>
import Header from "./layout/header.vue";
import MyContent from "./layout/content.vue";
import Footer from "./layout/footer.vue";
export default {
    data () {
        return {
            text:'abc'
        }
    }
}
</script>

<style>
#test{
    color: red;
}
</style>


