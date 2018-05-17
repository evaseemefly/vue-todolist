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
									
								</div>
								<label class="control-label col-sm-1" for="txt_search_departmentname">组名</label>
								<div class="col-md-2">
									
								</div>
								<label class="control-label col-sm-1" for="txt_search_statu">日期</label>
								<div class="col-md-2">
									<div class="form-group">
										<div class="input-group date form_date col-md-12" data-date="" data-date-format="yyyy MM dd  " data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
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
									<button type="submit" id="btn_search" style="margin-left:50px" v-on:click="summit()" id="btn_query" class="btn btn-primary">查询</button>
								</div>
							</div>
						</form>
					</div>
				</div>

			</div>
		</div>
</template>

<script>
    
</script>