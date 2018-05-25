<template>
    <div class="panel-body">
        <div class="panel panel-primary">
            <div class="panel-heading">排班详情</div>
            <div class="panel-body table-parent-panel">
                <div id="toolbar" class="btn-toolbar" role="toolbar">
                    <div class="btn-group" role="group">
                        <button id="btn_add" type="button" class="btn btn-primary">
                            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
                        </button>
                        <button id="btn_delete" type="button" class="btn btn-danger">
                            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除
                        </button>
                    </div>
                </div>
                <div id="table_parent">
                    <table id="tb_user"></table>
                </div>
            </div>
        </div>
    </div>
</template>

<<script>
import bus from '../assets/eventBus';
// import '../components/bootstrapExt/datetimepicker/bootstrap-datetimepicker.min.css'
// import '../components/css/bootstrapExt/table/bootstrap-table.css'
// import '../components/css/bootstrapExt/editable/bootstrap-editable.css'
import '../components/js/common/dateFormart.js'
import '../components/js/common/moment.js'
// import '../components/js/bootstrapExt/table/bootstrap-table.js'
// import '../components/js/bootstrapExt/editable/bootstrap-editable.js'

    export default{
		props:['searchResult'],
		
        data(){
			return{
				schedulelist:[]
			}
        },
		watch:{
			searchResult:function(new_val,old_val){
				alert(new_val);
			}
		},
        methods:{   
			
			loadTable:function(url,data){
				var myself=this;
				$("#tb_user").bootstrapTable({
				toolbar: "#toolbar",
				idField: "Id",
				pagination: true,
				pageNumber: 1,
				pageSize: 10,
				showRefresh: true,
				clickToSelect: true, //设置 true 将在点击行时，自动选择 rediobox 和 checkbox。
				search: true,
				// striped: true,
				// clickToSelect: true,
				striped: true, //使表格带有条纹  
				queryParams: function (param) {
					var query_data = {
						pageSize: param.pageSize,
						pageNumber: param.pageNumber,
						username: '',
						groupname: '',
						groupid: '',
						dutyid: '',
						nowdate: ''
					};
					return query_data;
				},
				method: 'GET',
				//url: "data_schedule.json",
				url: 'http://127.0.0.1:8000/duty/schedulelist/',
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
						// formatter: tablerowDate
					},
					{
						field: "department",
						title: "组",
						rowspan: 1,
						editable: false,
						// formatter: tablerowDepartmentEdit
					},
					{
						field: "duty",
						title: "岗位",
						rowspan: 1,
						editable: true,
						// formatter: tablerowDutyEdit
					},
					{
						field: "MainUser",
						title: "值班员",
						// visible: false,
						rowspan: 1,
						editable: true,
						// formatter: tablerowUserEdit
					}

				],
				onEditableSave: function (field, row, oldValue, $el) {

				},
				onClickRow: function (row, $element) {
					curRow = row;
				},
				//加载成功后执行
				onLoadSuccess: function (aa, bb, cc) {
					init_control();					
				}

			});
			},

            getSelectDataAndPost:function(url,code ,params=null ) {
			//获取修改的信息并提交
			//console.log(params);
			var duty_data = new Object();
			duty_data.id = curRow.id;
			// 以下信息是对于修改非用户时提交时所用的
			if (code == 'duty') {
				duty_data.did = curRow.rDepartmentDuty.did.did;
				duty_data.duid = params.value;
				//duty_data.duid = curRow.rDepartmentDuty.duid.duid;
			} else if (code == 'user') {
				duty_data.uid = params.value;
			}
			//duty_data.modity_id = params.value;
			duty_data.code = code;
			//序列化
			//var duty_data_json = JSON.stringify(duty_data);
			var url_post = 'http://127.0.0.1:8000/duty/modity/';
			//post到后台
			$.ajax({
				type: 'POST',
				url: url,
				data: duty_data,
				dataType: 'json',
				success: function (data) {
					//若返回错误信息，则提示
				}
			});
            },
		

            tablerowDepartmentEdit(value, row, index) {

			//获取用户id
			/*
				判断当前传入的id是否为-999，
				若为-999则说明是新增列，跳过如下方法
			*/
			var duty_id;
			var select_value;
			var reuslt;
			if (row.id == -999) {
				reuslt = "-";
			} else {
				duty_id = row.rDepartmentDuty.did.did;
				select_value = row.rDepartmentDuty.did.derpartmentname;
				reuslt = select_value;
			}

			return reuslt;
		},
        tablerowDutyEdit(value, row, index) {

			//获取用户id
			/*
				判断当前传入的id是否为-999，
				若为-999则说明是新增列，跳过如下方法
			*/
			var duty_id;
			var select_value;
			var reuslt;
			if (row.id == -999) {
				reuslt = "<a href=\"#\" class=\"my_select_duty\">" + "-" + "</a>";
			} else {
				duty_id = row.rDepartmentDuty.duid.duid;
				select_value = select_duty_dict[duty_id];
				reuslt = "<a href=\"#\" class=\"my_select_duty\">" + select_value + "</a>";
			}

			return reuslt;
		},
        tablerowUserEdit(value, row, index) {
			//点击班级岗位时显示下拉框，并记录相应动作
			//1 显示下拉框
			/*
				由于后台返回的是人员对应的id
				即value为id，所以需要将id作为key从字典中取出对应的value
			*/
			//获取用户id
			var user_id;
			var select_value;
			var reuslt;
			if (row.id == -999) {
				reuslt = "<a href=\"#\" class=\"my_select_user\">" + "-" + "</a>";
			} else {
				user_id = row.user.uid;
				select_value = select_user_dict[user_id];
				reuslt = "<a href=\"#\" class=\"my_select_user\">" + select_value + "</a>";
			}
			//2 记录动作
			return reuslt;
		},
        init_control() {

			var select_user_source = [];
			var select_duty_source = [];
			//下拉框向后台传入的数据
			var user_data = new Object();
			// 1 ajax请求后台获取当前组的人员下拉框中成员
			user_data.group_id = [group_id];			

			$('.my_select_user').editable({
				type: "select", //编辑框的类型。支持text|textarea|select|date|checklist等
				source: select_user_source,
				title: "选择人员", //编辑框的标题
				disabled: false, //是否禁用编辑
				emptytext: "空文本", //空值的默认文本

				success: function (response, value) {
					// $('#table').bootstrapTable('method', parameter);
					// $("#tb_user").bootstrapTable('check');
					var selects = $("#tb_user").bootstrapTable('getSelections');
					console.log(response + value);
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
					getSelectDataAndPost(params, 'user', 'http://127.0.0.1:8000/duty/modity/');				

				},
				mode: "inline", //编辑框的模式：支持popup和inline两种模式，默认是popup            
			});

			$('.my_select_duty').editable({
				type: "select", //编辑框的类型。支持text|textarea|select|date|checklist等
				source: select_duty_source,
				title: "选择岗位", //编辑框的标题
				disabled: false, //是否禁用编辑
				emptytext: "空文本", //空值的默认文本

				success: function (response, value) {
					// $('#table').bootstrapTable('method', parameter);
					// $("#tb_user").bootstrapTable('check');
					var selects = $("#tb_user").bootstrapTable('getSelections');
					console.log("response:" + response + "|" + "value:" + value);
				},
				url: function (params) {
					//点击确定时触发
					/*
					 流程：

					*/
					getSelectDataAndPost(params, 'duty', 'http://127.0.0.1:8000/duty/modity/');
					//console.log(params);
				},
				mode: "inline", //编辑框的模式：支持popup和inline两种模式，默认是popup            
			});

			$('.my_dutydate').editable({
				type: "date", //编辑框的类型。支持text|textarea|select|date|checklist等

				disabled: false, //是否禁用编辑
				emptytext: "空文本", //空值的默认文本
				mode: "inline", //编辑框的模式：支持popup和inline两种模式，默认是popup            
			});
		}

        },
        mounted:function(){
			// bus.$on('on-message',function(msg){
			// 	alert(msg);
			// });
			var myself=this;
			bus.$on('on-loadTable',function(url,data){
				/*
					由兄弟组件search触发本组件的on-loadTable方法，实现如下操作：
						1、获取传入的:
							url,
							data
						2、使用bootstrap-table的load方法请求后台
				*/
				console.log(url);
				console.log(data);
				myself.loadTable(url,data);
				
			})
        }
    };

</script>

