<template>
    <div id="app" class="container">
        <myheader></myheader>
        <leftmenu></leftmenu>
        <router-view></router-view>
    </div>
</template>

<script>
// import Header from "./layout/header.vue";
import Search from "../member/search.vue";
import mycontent from "./content-main.vue";
import leftmenu from "../left/left-menu.vue";
// import header from "./layout/header.vue";
import myheader from "../head/head.vue";
import {getDepDutyList} from "../../api/api";
import cookie from "../../common/js/cookie.js";
// var bus=new Vue({

// });
// import $ from 'jquery'
export default {
  data() {
    return {
      searchResult: null
    };
  },
  //注意：需要在componetns中声明子组件，才能在上面显示
  components: {
    // Header,
    Search,
    mycontent,
    leftmenu,
    myheader
  },
  methods: {
    //获取部门及群组的列表
    getdepdutylist: function() {
        //获取当前的cookie
        console.log(cookie.getCookie('token'));
        getDepDutyList().then(function(res){
            console.log(res);
        });
    //   getDepDutyList().then(function(res) {
    //     console.log(res);
    //   });
    }
  },
  mounted:function(){
      this.getdepdutylist();
  }
};
</script>
