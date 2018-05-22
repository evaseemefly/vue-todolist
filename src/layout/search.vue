<template>
    <div class="container">
		<div class="panel-body" style="padding-bottom:0px;">
			<div id="panel_search" class="panel panel-primary">
				<div class="panel-heading">查询条件</div>
				<div class="panel-body table-parent-panel">
					<form id="formSearch" class="form-horizontal">
						<div class="form-group" style="margin-top:15px">
							<label class="control-label col-sm-1" for="txt_search_departmentname">姓名</label>
							<div class="col-md-2">
								<select class="form-control" v-model="selected_user">
									<option v-for='option in options_user' v-bind:value="option.value">
										{{option.text}}
									</option>
								</select>
							</div>
							<label class="control-label col-sm-1" for="txt_search_departmentname">组名</label>
							<div class="col-md-2">
								<select class="form-control" v-model="selected_group">
									<option v-for='option in options_group' v-bind:value="option.value">
										{{option.text}}
									</option>
								</select>
							</div>
							<label class="control-label col-sm-1" for="txt_search_statu">日期</label>
							<div class="col-md-2">
								<div class="form-group">
									<div class="input-group date form_date col-md-12" data-date="" data-date-format="yyyy MM dd  " data-link-field="dtp_input2"
									    data-link-format="yyyy-mm-dd">
										<input id="datetimepicker" class="form-control" size="16" type="text" value="">
										<span class="input-group-addon">
											<span class="glyphicon glyphicon-calendar"></span>
										</span>
									</div>
									<input type="hidden" id="dtp_input2" value="" />
									<br/>
								</div>
							</div>
							<div class="col-md-2" style="text-align:left;">
								<!-- <button type="submit" id="btn_search" type="button" style="margin-left:50px" id="btn_query" class="btn btn-primary">查询</button> -->
								<button type="submit" id="btn_search" style="margin-left:50px" v-on:click="summit()" class="btn btn-primary">查询</button>
							</div>
						</div>
					</form>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
export default{
  data() {
    return {
      select_options: {
		  selected_user: 1,
				options_user: [],
				selected_group: 2,
				options_group: [],
				selected_date: null
	  }

    };
  },
  methods: {
    dateDefind:function() {
                        var d, s;
                        var self = this;
                        d = new Date();
                        s = d.getFullYear() + "-";       //取年份
                        s = s + (d.getMonth() + 1) + "-";//取月份
                        s += d.getDate() + " ";     //取日期
                        // s += d.getHours() + ":";    //取小时
                        // s += d.getMinutes() + ":";  //取分
                        // s += d.getSeconds();     //取秒
                        self.time = s;
                        //初始化
                        $('#datetimepicker').datetimepicker({
                            // startDate: s,
                            minView: "month", //选择日期后，不会再跳转去选择时分秒
                            language: 'zh-CN',
                            format: 'yyyy-mm-dd',
                            todayBtn: 1,                            
                            autoclose: 1
                        });
                        //当选择器隐藏时，讲选择框只赋值给data里面的time
                        $('#datetimepicker').datetimepicker()
                            .on('hide', function (ev) {
                                var value = $("#datetimepicker").val();
                                self.time = value;
                            });
                    },
					
                    summit: function () {
                        var self = this;
                        alert(self.time);
                    }
  },
  mounted:function(){
this.dateDefind();
  }
};

</script>
<style>

</style>