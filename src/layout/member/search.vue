/* * @Author: casablca * *@Date: 2018-05-23 08:55:48 * * @Last Modified by: mikey.zhaopeng * @Last Modified time: 2018-05-23
12:13:02 08:56:13 */

<template>
  <div id="searchbar">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
            aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">查询条件</a>
        </div>
        <form class="navbar-form navbar-left">
          <div class="row">
            <div class="form-group">
              姓名
              <div class="input-group col-md-8">
                <select class="form-control" v-model="selected_user">
                  <option v-for='option in options_user' v-bind:value="option.value">
                    {{option.text}}
                  </option>
                </select>
              </div>
            </div>
            <!-- <div class="form-group">
                        日期
                        <input type="text" class="form-control picker" readonly>
                    </div> -->
            <div class="form-group">
              日期
              <div class="input-group date form_date col-md-8" data-date="" data-date-format="yyyy MM dd  " data-link-field="dtp_input2"
                data-link-format="yyyy-mm-dd">
                <input id="datetimepicker" class="form-control" size="12" type="text" value="">
                <span class="input-group-addon">
                  <span class="glyphicon glyphicon-calendar"></span>
                </span>
              </div>
              <input type="hidden" id="dtp_input2" value="" />
              <br/>
            </div>
            <button type="button" class="btn btn-default mt-5" v-on:click="summit()">查询</button>
          </div>
        </form>

      </div>

    </nav>
  </div>


</template>

<script>
  import bus from "../../assets/eventBus.js";
  // import bus from "../assets/eventBus";
  // import vue from 'vue'
  export default {
    //父组件传入的参数
    // props: ["searchResult"],
    props: {
      searchResult: {
        type: Object,
        required: false //参数一定要传入
      },
      did: {
        type: Number,
        required: true
      }
    },
    data: function () {
      return {
        // host:'http://127.0.0.1:8000/',
        host:'http://128.5.9.20:8015',
        selected_user: 1,
        options_user: [],
        selected_group: 2,
        options_group: [],
        selected_date: null,
        dict_users: {},
        searchResult: null
        // did:this.did
      };
    },
    watch: {
      /*
                              监听：
                                  选中的用户，
                                  选中的群组
    
                          */
      selected_date: function (new_val, old_val) {
        // alert(new_val);
      },
      selected_user: function (new_val, old_val) {},
      selected_group: function (new_val, old_val) {
        var self = this;
        //self.options_user=dict_users[new_val];
        this.options_user = [];
        this.options_user.push({
          text: "不选择",
          value: 0
        });
        var options_user = this.options_user;
        var dict_users = this.dict_users;
        $.map(dict_users[new_val], function (obj_user) {
          options_user.push({
            text: obj_user.username,
            value: obj_user.uid
          });
        });
        this.options_user = options_user;
        this.dict_users = dict_users;
        //select_options.options_user.push({text:obj.name,value:obj.did})
      }
    },
    methods: {
      //对搜索框中的日期进行初始化
      dateDefind: function () {
        var d, s;
        var myself = this;
        d = new Date();
        s = d.getFullYear() + "-"; //取年份
        s = s + (d.getMonth() + 1) + "-"; //取月份
        s += d.getDate() + " "; //取日期
        // s += d.getHours() + ":";    //取小时
        // s += d.getMinutes() + ":";  //取分
        // s += d.getSeconds();     //取秒
        myself.time = s;
        //初始化
        $("#datetimepicker").datetimepicker({
          // startDate: s,
          minView: "month", //选择日期后，不会再跳转去选择时分秒
          language: "zh-CN",
          format: "yyyy-mm-dd",
          todayBtn: 1,
          autoclose: 1
        });
        //当选择器隐藏时，讲选择框只赋值给data里面的time
        $("#datetimepicker")
          .datetimepicker()
          .on("hide", function (ev) {
            var value = $("#datetimepicker").val();
            myself.selected_date = value;
            // myself.modifiedDate(value);
            //注意此处的this已经不是外面的作用域了，此处的this为datatimepicker
            // this.selected_date = value;
          });
      },

      //暂时不用
      modifiedDate: function (date_val) {
        // this.selected_date=date_val;
      },

      //选择框的初值设置
      dataInit: function () {
        var myself = this;
        this.selected = 3;
        this.selected_group = 2;
      },
      // testsummit: function () {
      //   bus.$emit("on-message", "search组件的消息");
      // },

      //按照搜索条件进行搜索
      summit: function () {
        var myself=this;
        var search_url=`${myself.host}duty/schedulelist/`;
        // var search_url = "http://127.0.0.1:8000/duty/schedulelist/";
        // var search_url = "http://128.5.9.20:8015/duty/schedulelist/";
        //注意若想让vue中的方法访问data，需要使用this，最好通过self=this的方式
        var myself = this;
        /*
					此处修改如下：
						1、将查询的条件交给兄弟组件content
						2、兄弟组件通过bootstrap-table 的load方法进行加载，
						3、不在本组件内进行ajax处理

				*/

        var select_group_name = myself.options_group.map(temp => {
          if (temp.value == myself.selected_group) {
            return temp.text;
          }
        });
        select_group_name = select_group_name[0];

        var group_temp = {
          text: select_group_name,
          value: myself.selected_group
        };


        //注意这个obj是要请求到后台的
        var search_temp = {
          user_id: myself.selected_user,
          users_id: [myself.selected_user],
          group: group_temp,
          group_id: myself.selected_group,
          group_id_new: this.did,
          groups_id: [myself.selected_group],
          // group_name: select_group_name,
          selected_date: myself.selected_date
        };
        //每次提交时，先清空content组件的data
        bus.$emit("on-clearData");

        bus.$emit("on-loadTable", search_url, search_temp);
      },
      
      //获取群组和群组对应的人员
      getgroupuser() {
        //根据当前的did获取该did拥有的user
        var data_get = null;
        var myself = this;
        // var temp=this;
        // var get_groupAnduser_url = "http://127.0.0.1:8000/duty/grouplist/";
        var get_groupAnduser_url =`${myself.host}duty/grouplist/` ;
        var post_data = {
          department_id: this.did
        };
        var dict_users = {};
        $.ajax({
          type: "GET",
          url: get_groupAnduser_url,
          dataType: "json",
          data: post_data,
          async: false,
          success: function (data) {
            /*
                            1、遍历一级，存入group中
                            2、
                          */
            data_get = data;
          }
        }).then(function (data) {});
        // dict_users = {};
        var options_group = [];
        // options_group = this.options_group;
        var dict_users = this.dict_users;
        $.map(data_get, function (obj) {
          options_group.push({
            text: obj.name,
            value: obj.did
          });
          if (obj.uid.length > 1) {
            dict_users[obj.did] = obj.uid;
          }
        });
        this.options_group = options_group;
        this.dict_users = dict_users;
        //每次获取时需要清空当前options_user的列表
        myself.options_user=[];
        $.each(data_get[0].uid,(index,val)=>{
          myself.options_user.push({
            text: val.username,
            value: val.uid
          });
        });
      }
    },

    mounted: function () {
      this.dateDefind();
      this.getgroupuser();
      // this.did=this.did;
    },
    watch: {
      did: function () {
        // alert(this.did);
        this.dateDefind();
        this.getgroupuser();
      }
    }
  };
</script>
<style>
  #searchbar {
    padding: 15px;
  }
</style>