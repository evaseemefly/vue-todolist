<template>
  <div class="panel-body">
    <div class="panel panel-primary">
      <div class="panel-heading">排班详情</div>
      <div class="panel-body table-parent-panel">
        <!-- <div id="toolbar" class="btn-toolbar" role="toolbar">
                    <div class="btn-group" role="group">
                        <button id="btn_add" type="button" class="btn btn-primary">
                            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
                        </button>
                        <button id="btn_delete" type="button" class="btn btn-danger">
                            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除
                        </button>
                    </div>
                </div> -->
        <Toolbar @add_row="append_row" @del_row="del_row"></Toolbar>
        <div id="table_parent">
          <table id="tb_user"></table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import bus from "../assets/eventBus";
  import Toolbar from "./toolbar.vue";

  import "../components/js/common/dateFormart.js";
  import moment from "moment";
  // const moment=require('moment')
  //使用require的方式，会提示找不到该js中的export的方法
  // require('../components/js/bootstrapExt/editable/test.js')
  import momenttest from "../components/js/bootstrapExt/editable/test.js";

  export default {
    props: ["searchResult"],
    components: {
      Toolbar
    },
    data() {
      return {
        schedulelist: [],
        select_user_dict: {}, //值班人员字典
        select_duty_dict: {}, //岗位职责字典
        select_user_source: [], //值班人员下拉框
        select_duty_source: [], //岗位下拉框
        group_id: -999, //群组id,
        group: {},
        user_data: {}, //值班人员下拉框及岗位下拉框中需要向后台提交的data（现在只保存当前的group_id）
        curRow: {}, //当前选中行
        search_data: {},
        search_url: {}
      };
    },
    watch: {
      searchResult: function (new_val, old_val) {
        // alert(new_val);
      }
    },
    methods: {
      clearData: function () {
        // Object.assign(this.$data,this.$options.data());
        Object.assign(this.$data, this.$options.data());
        //销毁table
        $("#tb_user").bootstrapTable("destroy");
        // this.$forceUpdated();
      },

      loadTable: function (url, search_condition) {
        var myself = this;
        $("#tb_user").bootstrapTable({
          toolbar: "#toolbar",
          idField: "Id",
          pagination: true,
          pageNumber: 1,
          pageSize: 10,
          showRefresh: true,
          clickToSelect: true, //设置 true 将在点击行时，自动选择 rediobox 和 checkbox。
          search: true,
          striped: true, //使表格带有条纹
          queryParams: function (param) {
            return search_condition;
            //   var query_data = search_condition;
            //   return query_data;
          },
          method: "GET",
          //url: "data_schedule.json",
          url: "http://127.0.0.1:8000/duty/schedulelist/",
          //url:'http://127.0.0.1:8000/duty/schedulelist/'+'?format=json',
          columns: [{
              checkbox: true,
              rowspan: 1
            },
            {
              //由于是复合表头，注意隐藏的元素若复合表头占了两行，需要填满该列
              field: "id",
              title: "id",
              // visible: false,
              rowspan: 1
            },
            {
              field: "dutydate",
              title: "值班日期",
              // visible: false,
              rowspan: 1,
              editable: true,
              formatter: myself.tablerowDate
            },
            {
              field: "department",
              title: "组",
              rowspan: 1,
              editable: false,
              formatter: myself.tablerowDepartmentEdit
            },
            {
              field: "duty",
              title: "岗位",
              rowspan: 1,
              editable: true,
              formatter: myself.tablerowDutyEdit
            },
            {
              field: "MainUser",
              title: "值班员",
              // visible: false,
              rowspan: 1,
              editable: true,
              formatter: myself.tablerowUserEdit
            }
          ],
          onEditableSave: function (field, row, oldValue, $el) {},
          onClickRow: function (row, $element) {
            myself.curRow = row;
          },
          // onLoadSuccess:(data)=>{
          // 	alert('成功加载页面');
          // },
          onPageChange: function (params) {
            // alert('跳转下一页');
            myself.init_control();
          },
          //加载成功后执行
          onLoadSuccess: function (aa, bb, cc) {
            myself.init_control();
            //   alert('成功加载页面');
          }
        });
      },

      defaultData() {
        var id = "-999";
      },

      newData() {
        var id = "-999";
        var myself = this;
        // var rows = {};
        var row = {
          id: id,
          dutydate: moment().format("YYYY-MM-DD"),
          // "duty": {
          // 	""
          // },
          rDepartmentDuty: {
            duid: {
              duid: -999
            },
            did: {
              //did已经封装只group中
              // did: myself.group_id,
              did: myself.group.value,
              derpartmentname: myself.group.text
            }
          },
          user: {
            uid: -999,
            username: "未选择"
          }
        };
        return row;
      },
      del_row: function () {
        // var date = moment('2018/06/01', "YYYY/MM/DD");
        // alert(date);
        var post_url = 'http://127.0.0.1:8000/duty/schedulelist/';
        // var post_url=null;
        var post_data = {};
        var myself = this;
        var ids = $("#tb_user").bootstrapTable('getSelections');
        //使用getSelections获取的选中的行若未选中则为none，len=0
        //取出对象中的id
        var ids_str = [];
        $.each(ids, (index, value) => {
          ids_str.push(value.id);
        });
        console.log(ids_str);
        post_data.id = ids_str;
        $.post(post_url, post_data, (data) => {
          //删除成功重新查询表

          // alert('删除成功');
          //销毁table
          $("#tb_user").bootstrapTable("destroy");
          this.loadTable(myself.search_url, myself.search_data);
        }, 'text');
      },
      append_row: function () {
        // alert('子组件调用父组件');
        var $my_table = $("#tb_user");
        var temp_newdata = this.newData();
        //table最后追加一行
        $my_table.bootstrapTable("append", temp_newdata);
        //scrollTo 	value 	滚动到指定位置，单位为 px，设置 'bottom' 表示跳到最后。
        $my_table.bootstrapTable("scrollTo", "bottom");
        //初始化行内样式
        this.init_control();
        //将新增的这一行数据提交至后台（默认值）
        var url_post = "http://127.0.0.1:8000/duty/modity/";
        temp_newdata.id = -999;

        function convert_data(temp_data) {
          var post_data = new Object();
          post_data.id = temp_newdata.id;
          post_data.code = "all";
          post_data.did = temp_newdata.rDepartmentDuty.did.did;
          post_data.duid = temp_newdata.rDepartmentDuty.duid.duid;
          post_data.uid = temp_newdata.user.uid;
          return post_data;
        }

        var post_data = convert_data(temp_newdata);

        this.submitData(post_data, url_post);
        //销毁table
        $("#tb_user").bootstrapTable("destroy");
        this.loadTable(this.search_url, this.search_data);
      },

      submitData: function (data_post, url) {
        var myself = this;
        //post到后台
        $.ajax({
          type: "POST",
          url: url,
          data: data_post,
          dataType: "json",
          success: function (data) {
            //若返回错误信息，则提示

          }
        });
      },

      getSelectDataAndPost: function (params, code, url = null) {
        //获取修改的信息并提交
        //console.log(params);
        var duty_data = new Object();
        var myself = this;
        duty_data.id = this.curRow.id;
        // 以下信息是对于修改非用户时提交时所用的
        if (code === "duty") {
          duty_data.did = this.curRow.rDepartmentDuty.did.did;
          duty_data.duid = params.value;
          //duty_data.duid = curRow.rDepartmentDuty.duid.duid;
        } else if (code === "user") {
          duty_data.uid = params.value;
        } else if (code === "date") {
          duty_data.dutydate = params.value;
        }
        //duty_data.modity_id = params.value;
        duty_data.code = code;
        //序列化
        //var duty_data_json = JSON.stringify(duty_data);
        var url_post = "http://127.0.0.1:8000/duty/modity/";
        myself.submitData(duty_data, url_post);
      },

      tablerowDate(value, row, index) {
        /*
					格式化行内日期要素
				*/
        //使用monment.js完成时间的格式化
        var date = moment(value, "YYYY/MM/DD");
        // var date=new Date();
        var date_str = date.format("YYYY-MM-DD");

        var result =
          '<a href="#" class="my_dutydate" id="dob" data-type="combodate" data-value="' +
          date_str +
          '" data-format="YYYY-MM-DD" data-viewformat="YYYY-MM-DD" data-template="YYYY /MMM / D " data-pk="1"  data-title="请选择值班日期">' +
          date_str +
          "</a>";
        return result;
      },

      tablerowDepartmentEdit(value, row, index) {
        /*
				格式化当前行内部门要素
			 */
        //获取用户id
        /*
				判断当前传入的id是否为-999，
				若为-999则说明是新增列，跳过如下方法
			*/
        var duty_id;
        var select_value;
        var reuslt;

        duty_id = row.rDepartmentDuty.did.did;
        select_value = row.rDepartmentDuty.did.derpartmentname;
        reuslt = select_value;

        // if (row.id == -999) {
        // 	reuslt = "-";
        // } else {

        // }

        return reuslt;
      },
      tablerowDutyEdit(value, row, index) {
        /*
				格式化当前的岗位行内要素
			*/

        //获取用户id
        /*
				判断当前传入的id是否为-999，
				若为-999则说明是新增列，跳过如下方法
			*/
        var duty_id;
        var select_value;
        var reuslt;
        duty_id = row.rDepartmentDuty.duid.duid;
        select_value = this.select_duty_dict[duty_id];
        reuslt = '<a href="#" class="my_select_duty">' + select_value + "</a>";
        // if (row.id == -999) {
        // 	reuslt = "<a href=\"#\" class=\"my_select_duty\">" + "-" + "</a>";
        // } else {
        // 	duty_id = row.rDepartmentDuty.duid.duid;
        // 	select_value = this.select_duty_dict[duty_id];
        // 	reuslt = "<a href=\"#\" class=\"my_select_duty\">" + select_value + "</a>";
        // }

        return reuslt;
      },
      tablerowUserEdit(value, row, index) {
        /*
				格式化当前的行内用户要素
			*/
        //点击班级岗位时显示下拉框，并记录相应动作
        //1 显示下拉框
        /*
				由于后台返回的是人员对应的id
				即value为id，所以需要将id作为key从字典中取出对应的value
			*/
        //获取用户id
        var user_id;
        var select_value = null;
        var reuslt = null;

        user_id = row.user.uid;
        // alert(user_id);
        // console.log(user_id);
        select_value = this.select_user_dict[user_id];
        reuslt = '<a href="#" class="my_select_user">' + select_value + "</a>";

        // if (row.id === -999) {
        // 	reuslt = "<a href=\"#\" class=\"my_select_user\">" + "-" + "</a>";
        // } else {

        // }
        //2 记录动作
        return reuslt;
      },

      init_User_Select() {
        //下拉框向后台传入的数据
        // var user_data = new Object();
        // var myself=this;
        var get_url = "http://127.0.0.1:8000/duty/userlist/";
        // 1 ajax请求后台获取当前组的人员下拉框中成员
        this.user_data.group_id = [this.group_id];
        var myself = this;
        $.ajax({
          type: "GET",
          //url: "data_user.json",
          url: get_url,
          processData: true,

          data: myself.user_data,
          dataType: "json",
          async: false,
          traditional: true, //data中传入数组
          success: function (data) {
            $.each(data, function (index, obj) {
              // console.log(obj);
              // console.log(myself);
              //修改下拉框
              myself.select_user_source.push({
                value: obj.uid,
                text: obj.username
              });
              //刷新人员字典
              myself.select_user_dict[obj.uid] = obj.username;
            });
          }
        });
      },
      init_Duty_Select() {
        var myself = this;
        //2 ajax请求后台获取当前组的岗位
        $.ajax({
          type: "GET",
          //url: "data_duty.json",
          url: "http://127.0.0.1:8000/duty/dutylist/",
          processData: true,
          dataType: "json",
          async: false,
          data: myself.user_data,
          traditional: true, //data中传入数组
          success: function (data) {
            $.each(data, function (index, obj) {
              // console.log(obj);
              console.log(myself);
              myself.select_duty_source.push({
                value: obj.duid,
                text: obj.dutyname
              });
              //刷新岗位字典
              myself.select_duty_dict[obj.duid] = obj.dutyname;
            });
          }
        });
      },

      init_Select() {
        // 1、通过ajax请求对 用户 及 岗位 的下拉框进行初始化
        this.init_User_Select();
        this.init_Duty_Select();
      },

      init_control() {
        var myself = this;

        $(".my_select_user").editable({
          type: "select", //编辑框的类型。支持text|textarea|select|date|checklist等
          source: myself.select_user_source,
          title: "选择人员", //编辑框的标题
          disabled: false, //是否禁用编辑
          emptytext: "空文本", //空值的默认文本

          success: function (response, value) {
            // $('#table').bootstrapTable('method', parameter);
            // $("#tb_user").bootstrapTable('check');
            var selects = $("#tb_user").bootstrapTable("getSelections");
            //   console.log(response + value);
          },
          url: function (params) {
            //点击确定时触发
            /*
					 流程：
						1、获取当前的选中行，获取当前选中行内的数据（obj形式）
							获取id
							获取value（option的key）
						2、创建向后台提交的数据
					*/
            myself.getSelectDataAndPost(
              params,
              "user",
              "http://127.0.0.1:8000/duty/modity/"
            );
          },
          mode: "inline" //编辑框的模式：支持popup和inline两种模式，默认是popup
        });

        $(".my_select_duty").editable({
          type: "select", //编辑框的类型。支持text|textarea|select|date|checklist等
          source: myself.select_duty_source,
          title: "选择岗位", //编辑框的标题
          disabled: false, //是否禁用编辑
          emptytext: "空文本", //空值的默认文本

          success: function (response, value) {
            // $('#table').bootstrapTable('method', parameter);
            // $("#tb_user").bootstrapTable('check');
            var selects = $("#tb_user").bootstrapTable("getSelections");
            //   console.log("response:" + response + "|" + "value:" + value);
          },
          url: function (params) {
            //点击确定时触发
            /*
					 流程：

					*/
            myself.getSelectDataAndPost(
              params,
              "duty",
              "http://127.0.0.1:8000/duty/modity/"
            );
            //console.log(params);
          },
          mode: "inline" //编辑框的模式：支持popup和inline两种模式，默认是popup
        });

        $(".my_dutydate").editable({
          type: "date", //编辑框的类型。支持text|textarea|select|date|checklist等

          disabled: false, //是否禁用编辑
          emptytext: "空文本", //空值的默认文本
          mode: "inline", //编辑框的模式：支持popup和inline两种模式，默认是popup
          url: (params) => {
            //点击确定时触发
            /*
					 流程：

					*/
            myself.getSelectDataAndPost(
              params,
              "date",
              "http://127.0.0.1:8000/duty/modity/"
            );
          },
        });
      }
    },
    mounted: function () {
      // bus.$on('on-message',function(msg){
      // 	alert(msg);
      // });
      var myself = this;
      bus.$on("on-loadTable", function (url, data) {
        /*
					由兄弟组件search触发本组件的on-loadTable方法，实现如下操作：
						1、获取传入的:
							url,
							data
						2、获取data中的group_id，并赋值给this.
						3、使用bootstrap-table的load方法请求后台
						4、
				*/
        // console.log(url);
        // console.log(data);
        this.user_data = new Object();
        //   myself.group_id = data.group_id;
        myself.group_id = data.group.value;
        myself.group = data.group;
        myself.search_data = data;
        myself.search_url = url;
        //提取到外侧，不放在loadTable中调用了
        myself.init_Select();
        //直接调用loadTable方法，loadTable最后会执行init_control()方法
        myself.loadTable(url, data);
      });
      bus.$on("on-clearData", function () {
        myself.clearData();
      });
    }
  };
</script>
