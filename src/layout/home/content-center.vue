<template>
  <div id="body_panel" class="panel-body">
    <div class="panel">
      <div class="panel-heading my-panel-heading">排班详情</div>
      <div class="panel-body my-panel-body table-parent-panel">
        <Toolbar @add_row="append_row" @del_row="del_row"></Toolbar>
        <div id="table_parent">
          <table v-show="select_duty_source.length>0" data-toggle="table">
            <thead>
              <!-- 注意此处只是使用bootstrap table时是需要手动添加th中的div，正常的table是不用的 -->
              <!-- 此种方式可行 -->
              <th v-for="obj in select_duty_source">
                <!-- {{obj.text}} -->
                <div class="th-inner">{{obj.text}}</div>
                <div class="fht-cell"></div>
              </th>
            </thead>
            <tfoot>
              <tr>
                <td>待显示</td>
                <td>待显示</td>
              </tr>
            </tfoot>

            <tbody>
              <tr>
              </tr>
            </tbody>
          </table>
          <table id="tb_user"></table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import bus from "../assets/eventBus";
  import bus from "../../assets/eventBus.js";
  import Toolbar from "../member/toolbar.vue";

  import "../../components/js/common/dateFormart.js";
  // import "../components/js/common/dateFormart.js";
  import moment from "moment";
  // const moment=require('moment')
  //使用require的方式，会提示找不到该js中的export的方法
  // require('../components/js/bootstrapExt/editable/test.js')
  import momenttest from "../../components/js/bootstrapExt/editable/test.js";
  import {
    getScheduleList,
    addSchedule,
    delSchedule
  } from "../../api/api.js";
  export default {
    props: ["searchResult"],
    components: {
      Toolbar
    },
    data() {
      return {
        host: 'http://127.0.0.1:8000',
        // host: 'http://128.5.9.20:8015',
        schedulelist: [],
        select_user_dict: {}, //值班人员字典
        select_duty_dict: {}, //岗位职责字典
        select_user_source: [], //值班人员下拉框
        select_duty_source: [], //岗位下拉框
        columns_duty: [],
        table_data: [],
        group_id: -999, //群组id,
        group: {},
        append_last_date: null,
        user_data: {}, //值班人员下拉框及岗位下拉框中需要向后台提交的data（现在只保存当前的group_id）
        curRow: {}, //当前选中行
        curCell: {},
        search_data: {},
        search_url: {},
        duty_columns: [] //当前部门拥有的duty（作为每一列的列头，例如duty1
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
      destroyTable: function () {
        //销毁当前table
        $("#tb_user").bootstrapTable("destroy");
      },
      loadTable: function (url, search_condition) {
        //根据搜索条件加载table
        var myself = this;
        //每次加载前把table中的data清空
        this.table_data = [];
        this.duty_columns = [];
        //此处改为ajax的方式通过get方式获取
        //将获取到的data写入table_data中
        // $.ajax({
        //   type: "GET",
        //   url: "http://127.0.0.1:8000/duty/schedulelist/",
        //   processData: true,
        //   dataType: "json",
        //   async: false,
        //   data: search_condition,
        //   success: function(data) {
        //     // console.log(data);
        //     var temp_duty = new Object();
        //     if (data[0].DutyUserList.length > 0) {
        //       //加载成功后将数据推入table_data中
        //       //注意jquery的each后面的function的参数有两个，index，value
        //       $.each(data, (index, value) => {
        //         // console.log(value);
        //         temp_duty = new Object();
        //         var temp_dutydate = value.dutydate;
        //         myself.append_last_date = value.dutydate;
        //         temp_duty["dutydate"] = temp_dutydate;
        //         $.each(value.DutyUserList, (temp_index, temp_value) => {
        //           var temp_duty_id =
        //             "duty" + temp_value.rDepartmentDuty.duid.duid;
        //           //向duty_columns中插入当前table的列头
        //           myself.duty_columns.push(temp_duty_id);

        //           var temp_user_id = temp_value.user.uid;
        //           temp_duty[temp_duty_id] = temp_user_id;
        //         });

        //         myself.table_data.push(temp_duty);
        //       });
        //     }
        //   }
        // });
        //不再使用ajax的方式，改为axios的方式
        getScheduleList(search_condition).then(res => {
          var data = res.data;
          //此处需要先判断返回的res.data是否为空
          if (data.length > 0) {
            var temp_duty = new Object();
            if (data[0].DutyUserList.length > 0) {
              //加载成功后将数据推入table_data中
              //注意jquery的each后面的function的参数有两个，index，value
              $.each(data, (index, value) => {

                temp_duty = new Object();
                var temp_dutydate = value.dutydate;
                myself.append_last_date = value.dutydate;
                temp_duty["dutydate"] = temp_dutydate;
                $.each(value.DutyUserList, (temp_index, temp_value) => {
                  var temp_duty_id =
                    "duty" + temp_value.rDepartmentDuty.duid.duid;
                  //向duty_columns中插入当前table的列头
                  //由init_Duty_Select方法完成
                  // myself.duty_columns.push(temp_duty_id);

                  var temp_user_id = temp_value.user.uid;
                  temp_duty[temp_duty_id] = temp_user_id;
                });

                myself.table_data.push(temp_duty);
              });
            }
          }

          //初始化下拉菜单
          this.init_Select();
          //加载table表
          this.init_Table();
          //
          this.init_control();
        });
      },

      defaultData() {
        var id = "-999";
      },

      convert_data(temp_data) {
        var post_data = new Object();
        post_data.id = temp_data.id;
        post_data.code = "all";
        post_data.did = temp_data.did;
        post_data.duids = [];
        $.each(temp_data.DutyUserList, (index, value) => {
          post_data.duids.push(value.rDepartmentDuty.duid.duid);
        });
        post_data.selected_date = temp_data.dutydate;
        return post_data;
      },

      newTableData() {
        var id = "-999";
        //向table后追加一行默认值得数据行
        const temp_data = new Object();
        var myself = this;
        var temp_append_last_date = moment(myself.append_last_date);
        var temp_append_last_date_str = temp_append_last_date.format(
          "YYYY-MM-DD"
        );
        var lastday_month = temp_append_last_date;
        lastday_month.endOf("month");

        var temp_append_last_date_add1 = moment(myself.append_last_date).add(
          1,
          "days"
        );

        if (
          temp_append_last_date_add1.format("DD") != lastday_month.format("dd")
        ) {
          myself.append_last_date = temp_append_last_date_add1.format(
            "YYYY-MM-DD"
          );
        }
        temp_data["dutydate"] = myself.append_last_date;
        $.each(myself.duty_columns, (index, value) => {
          temp_data[value] = -999;
        });
        myself.table_data.push(temp_data);
        var row = {
          id: id,
          dutydate: temp_append_last_date_add1.format("YYYY-MM-DD"),

          did: this.group_id,
          DutyUserList: []
        };
        //循环向其中添加rDepartmentDuty
        $.each(myself.select_duty_source, (index, value) => {
          // console.log(value);
          row.DutyUserList.push({
            rDepartmentDuty: {
              duid: {
                // duid: myself.group_id,
                duid: value.value,
                dutyname: value.text
              },
              did: {
                did: myself.group_id
              }
            }
          });
        });

        var post_data = this.convert_data(row);
        addSchedule(post_data);
        this.init_Select();
        this.destroyTable();
        // this.submitData(post_data);
        //加载table
        this.init_Table();
        this.init_control();
      },

      //暂时弃用
      newData() {
        var id = "-999";
        var myself = this;
        var rows = {};
        var temp_append_last_date = moment(myself.append_last_date);
        var temp_append_last_date_str = temp_append_last_date.format(
          "YYYY-MM-DD"
        );
        var lastday_month = temp_append_last_date;
        lastday_month.endOf("month");

        // var temp_append_last_date_str=temp_append_last_date.format('YYYY-MM-DD');

        var temp_append_last_date_add1 = moment(myself.append_last_date).add(
          1,
          "days"
        );

        if (
          temp_append_last_date_add1.format("DD") != lastday_month.format("dd")
        ) {
          myself.append_last_date = temp_append_last_date_add1.format(
            "YYYY-MM-DD"
          );
        }

        // console.log(temp_append_last_date);
        var row = {
          id: id,
          dutydate: temp_append_last_date_add1.format("YYYY-MM-DD"),

          did: this.group_id,
          DutyUserList: []
        };
        //循环向其中添加rDepartmentDuty
        $.each(myself.select_duty_source, (index, value) => {
          // console.log(value);
          row.DutyUserList.push({
            rDepartmentDuty: {
              duid: {
                // duid: myself.group_id,
                duid: value.value,
                dutyname: value.text
              },
              did: {
                did: myself.group_id
              }
            }
          });
        });
        return row;
      },
      del_row: function () {
        var myself = this;
        // var post_url = "http://127.0.0.1:8000/duty/schedulelist/del/";
        var post_url = `${myself.host}/duty/schedulelist/del/`;
        var post_data = {};
        var myself = this;
        var target_date = this.curRow.dutydate;
        post_data.target_date = target_date;
        post_data.group_id = this.group_id;

        // $.post(
        //   post_url,
        //   post_data,
        //   data => {
        //     //删除成功重新查询表
        //     //销毁table
        //     $("#tb_user").bootstrapTable("destroy");
        //     this.loadTable(myself.search_url, myself.search_data);
        //   },
        //   "text"
        // );

        delSchedule(post_data).then(res => {
          $("#tb_user").bootstrapTable("destroy");
          this.loadTable(myself.search_url, myself.search_data);
        })

      },

      append_row_backup: function () {
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
        // var url_post = "http://127.0.0.1:8000/duty/schedulelist/creat/";
        var url_post = `${myself.host}/duty/schedulelist/creat/`;
        temp_newdata.id = -999;

        function convert_data(temp_data) {
          var post_data = new Object();
          post_data.id = temp_data.id;
          post_data.code = "all";
          post_data.did = temp_data.did;
          post_data.duids = [];
          $.each(temp_data.DutyUserList, (index, value) => {
            post_data.duids.push(value.rDepartmentDuty.duid.duid);
          });
          post_data.selected_date = temp_data.dutydate;
          return post_data;
        }

        var post_data = convert_data(temp_newdata);

        this.submitData(post_data, url_post);
        // this.init_control();
        // this.init_User_Select();
        // this.loadTable()
      },

      append_row: function () {
        var myself = this;
        var $my_table = $("#tb_user");
        // var temp_newdata = this.newData();
        //table最后追加一行
        /*
          追加方式1：
            直接使用bootstrapTable的append方法，此种方法会造成显示的问题
        */
        // $my_table.bootstrapTable("append", temp_newdata);
        /*
          追加方式2：
            参考loadTable中的追加方法
        */
        //注意在创建新的一行数据时，需要先判断append_last_date是否未定义

        this.newTableData();

        //scrollTo 	value 	滚动到指定位置，单位为 px，设置 'bottom' 表示跳到最后。
        $my_table.bootstrapTable("scrollTo", "bottom");

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
        // var cur = this.curRow;
        // duty_data.id = this.curRow.id;
        // 1 获取当前选中行的指定时间
        var target_date = this.curCell.row.dutydate;
        duty_data.dutydate = target_date;

        //2 当前的group
        duty_data.did = this.group_id;

        //3 获取当前的duty
        // 以下信息是对于修改非用户时提交时所用的
        if (code === "user") {
          var duty_id = this.curCell.field.substring(
            this.curCell.field.lastIndexOf("duty") + 4
          );
          duty_data.duid = duty_id;
          duty_data.uid = params.value;
        } else if (code === "date") {
          // 修改后的日期
          duty_data.dutydate = params.value;
          // 之前的日期
          duty_data.old_date=myself.curRow.dutydate
        }
        // console.log(duty_data);
        //duty_data.modity_id = params.value;
        duty_data.code = code;
        //序列化
        //var duty_data_json = JSON.stringify(duty_data);
        // var url_post = "http://127.0.0.1:8000/duty/modity/";
        var url_post = `${myself.host}/duty/modity/`;
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

        user_id = value;

        select_value = this.select_user_dict[user_id];
        reuslt = '<a href="#" class="my_select_user">' + select_value + "</a>";

        if (user_id === undefined) {
          reuslt = '<a href="#" class="my_select_user">' + "-" + "</a>";
        }

        //2 记录动作
        return reuslt;
      },

      init_User_Select() {
        //下拉框向后台传入的数据
        // var user_data = new Object();
        var myself = this;
        // var get_url = "http://127.0.0.1:8000/duty/userlist/";
        var get_url = `${myself.host}/duty/userlist/`;
        //注意每次请求后台获取下拉框中的人员时，由于是向 myself.select_user_source push，所以注意先清空
        myself.select_user_source = [];
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

      init_Table() {
        /*
          根据table_data，columns_duty等加载table

        */
        var myself = this;
        //加载table
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
          },

          columns: myself.columns_duty,
          data: myself.table_data,
          onEditableSave: function (field, row, oldValue, $el) {},
          onClickRow: function (row, $element) {
            myself.curRow = row;
          },
          onClickCell: (field, value, row, $elemen) => {
            myself.curCell = {
              field: field,
              value: value,
              row: row
            };
          },
          onPageChange: function (params) {
            myself.init_control();
          },
          //加载成功后执行
          onLoadSuccess: function (aa, bb, cc) {
            myself.init_control();
          }
        });
      },
      init_Duty_Select() {
        var myself = this;
        var url_duty_select = `${myself.host}/duty/dutylist/`;
        //2 ajax请求后台获取当前组的岗位
        $.ajax({
          type: "GET",
          //url: "data_duty.json",
          url: url_duty_select,
          processData: true,
          dataType: "json",
          async: false,
          data: myself.user_data,
          traditional: true, //data中传入数组
          success: function (data) {
            //注意要先复原
            myself.select_duty_source = [];
            myself.columns_duty = [];
            myself.columns_duty.push({
              field: "dutydate",
              title: "日期",
              editable: true,
              formatter: myself.tablerowDate
            });
            $.each(data, function (index, obj) {
              //分别向下拉框数组以及table的列表头数组中添加岗位信息
              myself.select_duty_source.push({
                value: obj.duid,
                text: obj.dutyname
              });
              myself.columns_duty.push({
                field: "duty" + obj.duid,
                title: obj.dutyname,
                editable: true,
                formatter: myself.tablerowUserEdit
              });
              myself.duty_columns.push("duty" + obj.duid);
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
        // console.log(this.select_duty_source);
      },

      init_control() {
        //初始化下拉框
        var myself = this;
        var url_user_select = `${myself.host}/duty/modity/`;
        // var url_dutydate = `${myself.host}/duty/modity/`;
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
              url_user_select
              // "http://127.0.0.1:8000/duty/modity/"
            );
          },
          mode: "inline" //编辑框的模式：支持popup和inline两种模式，默认是popup
        });

        $(".my_dutydate").editable({
          type: "date", //编辑框的类型。支持text|textarea|select|date|checklist等

          disabled: false, //是否禁用编辑
          emptytext: "空文本", //空值的默认文本
          mode: "inline", //编辑框的模式：支持popup和inline两种模式，默认是popup
          url: params => {
            //点击确定时触发
            /*
					 流程：

					*/
            myself.getSelectDataAndPost(
              params,
              "date",
              url_user_select
              // "http://127.0.0.1:8000/duty/modity/"
            );
          }
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

        // myself.group_id = data.group.value;
        myself.group_id = data.group_id_new;
        myself.group = data.group;
        myself.search_data = data;
        myself.search_url = url;
        //注意此处需要对当前的append_last_date赋值，将由search传递过来的selected_date，赋给他
        myself.append_last_date = data.selected_date;
        //提取到外侧，不放在loadTable中调用了
        // myself.init_Select();
        //直接调用loadTable方法，loadTable最后会执行init_control()方法
        myself.loadTable(url, data);
      });
      bus.$on("on-clearData", function () {
        myself.clearData();
      });
    }
  };
</script>

<style scoped>
  @import "../../components/css/common/panel.css";

  #body_panel {
    /* display: inline-block;
  margin-left: 600px;
  width: 60%; */
    padding-top: 0px;
  }

  .my-panel-body {}
</style>