<template>
  <!-- <Button type="primary" @click="info">Display info prompt</Button> -->
  <div></div>
</template>

<script>
import {Message} from "../../api/common.js";
  export default {
    props:{
      msg:{
        type:Object,
        required:false
      }
    },
    methods: {
      info() {
        this.$Message.info('This is a info tip');
      }
    }
  }
</script>

<style>

</style>