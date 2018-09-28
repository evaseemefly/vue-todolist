<template>
  <!-- <div id="app" class="container"> -->
  <div id="app">
    <myheader :groups=departments
              @changeIndex="changeIndex"></myheader>
    <!-- <leftmenu :groups=groups
              @changeIndex=changeIndex(group_index)></leftmenu> -->
    <!-- <leftmenu :groups=groups></leftmenu> -->
    <!-- <lefcalendar></lefcalendar> -->
    <router-view></router-view>
  </div>
</template>

<script>
  // import Header from "./layout/header.vue";
  import Search from "../member/search.vue";
  // import mycontent from "./content-main";
  import mycontent from "./content-main.vue";
  import leftmenu from "../left/left-menu.vue";
  // import lefcalendar from "../left/left-calendar.vue";
  // import header from "./layout/header.vue";
  import myheader from "../head/head.vue";
  import {
    getDepDutyList
  } from "../../api/api";
  import cookie from "../../common/js/cookie.js";
  // var bus=new Vue({

  // });
  // import $ from 'jquery'
  export default {
    data() {
      return {
        searchResult: null,
        departments:[],
        groups: [],
        group_index:0
      };
    },
    //注意：需要在componetns中声明子组件，才能在上面显示
    components: {
      // Header,
      Search,
      mycontent,
      leftmenu,
      // lefcalendar,
      myheader
    },
    methods: {
      //获取部门及群组的列表
      getdepdutylist: function () {
        var myself=this;
        //获取当前的cookie
        // console.log(cookie.getCookie('token'));
        getDepDutyList().then(function (res) {
          console.log(res);
          myself.departments = res.data;

        });
        //   getDepDutyList().then(function(res) {
        //     console.log(res);
        //   });
      },
      changeIndex:function(index){
        // alert(`子组件传递过来的值 ${index}`);
        //获取由子组件传递过来的index，该index为当前的header与left-navbar的department的索引值        
        this.group_index=index;
        this.groups=this.departments[this.group_index];
      }
    },
    mounted: function () {
      this.getdepdutylist();
    },
    watch:{
      '$route'(to,from){
        // alert('路由刷新')
      }
    }
  };
</script>
