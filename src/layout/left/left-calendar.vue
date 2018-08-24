<template>
    <!-- <div class="calendar-border title">
        <h3>本月值班人员分布</h3>
        <div id="calendar"></div>
        <div class="panel-body">
            <table id="table_statistics"></table>
        </div>
    </div> -->
    <div id="body_calendar" class="tile calendar-border">
        <h3>本月值班人员分布</h3>
        <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
        <div id="calendar" style="height:400px;width: 400px;"></div>
        <div class="">
            <div class="panel-heading">8月份</div>
            <div class="panel-body table-parent-panel">
                <table id="table_statistics"></table>
            </div>
        </div>
    </div>
</template>

<script>
    // var echarts = require('echarts/lib/echarts')
    export default {
        data: function () {
            return {
                selected_date: '',
                selected_month: '',
                myChart: null
            }
        },
        methods: {
            loadTable: function () {
                $("#table_statistics").bootstrapTable({
                    columns: [{
                            field: "id",
                            title: "编号"
                        },
                        {
                            field: "duty",
                            title: "岗位"
                        },
                        {
                            field: "person_num",
                            title: "值班人数总计"
                        }
                    ],
                    data: [{
                            id: 1,
                            duty: "主班",
                            person_num: "31"
                        },
                        {
                            id: 2,
                            duty: "副班",
                            person_num: "31"
                        }
                    ]
                })
            },
        },
        mounted: function () {
            var myself = this;
            // var myChart = this.$echarts.init(document.getElementById('calendar'))

            var myChart = myself.$echarts.init(document.getElementById('calendar'))

            function getVirtulData(year) {
                year = year || '2017';
                var date = +myself.$echarts.number.parseDate(year + '-01-01');
                var end = +myself.$echarts.number.parseDate((+year + 1) + '-01-01');
                var dayTime = 3600 * 24 * 1000;
                var data = [];
                for (var time = date; time < end; time += dayTime) {
                    data.push([
                        myself.$echarts.format.formatTime('yyyy-MM-dd', time),
                        Math.floor(Math.random() * 4)
                    ]);
                }
                return data;
            }

            var data = getVirtulData(2018);

            var option = {
                // backgroundColor: '#404a59',

                title: {
                    top: 30,
                    text: '',
                    subtext: '',
                    left: 'center',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '30',
                    left: '100',
                    data: ['person_num'],
                    textStyle: {
                        color: '#fff'
                    }
                },
                calendar: [{
                    top: 100,
                    left: 'center',
                    orient: 'vertical',
                    cellSize: 40,
                    range: ['2018-01'],
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#000',
                            width: 4,
                            type: 'solid'
                        }
                    },
                    // yearLabel: {
                    // 	formatter: function(obj){
                    // 		return obj;
                    // 	},
                    // 	textStyle: {
                    // 		color: '#fff'
                    // 	}
                    // },
                    itemStyle: {
                        normal: {
                            // color: '#323c48',
                            color: '#36495D',
                            borderWidth: 1,
                            borderColor: '#111'
                        }
                    }
                }],
                series: [{
                        name: 'person_num',
                        type: 'scatter',
                        coordinateSystem: 'calendar',
                        data: data,
                        symbolSize: function (val) {
                            return val[1] / 0.2;
                        },
                        itemStyle: {
                            normal: {
                                // color: '#ddb926'
                                color: '#3EBD9C'

                            }
                        }
                    },
                    // {
                    // 	name: 'person_num',
                    // 	type: 'scatter',
                    // 	coordinateSystem: 'calendar',
                    // 	calendarIndex: 1,
                    // 	data: data,
                    // 	symbolSize: function (val) {
                    // 		return val[1] / 500;
                    // 	},
                    // 	itemStyle: {
                    // 		normal: {
                    // 			color: '#ddb926'
                    // 		}
                    // 	}
                    // }
                ]
            };

            myChart.setOption(option);
            this.loadTable();
        }
    }
</script>

<style scoped>
    .calendar-border {
        
    }
    #body_calendar{
        background: #bdc3c7;
        position: absolute;
        bottom: 0px;
        top:0px;
        margin: 0px;
        padding-bottom: 0px;
        padding-top: 0px;
    }
    #calendar {
        width: 400px;
        height: 400px;
        /* float: left; */
    }

    .calendar-border {
        float: left;
        width: 600px;
        /* background:  */
    }

    .panel-heading {
        /* background:  #1abc9c; */
        background: #34495e;
        color: aliceblue;
    }

    .panel-body {
        border: 4px solid #34495e;
        /* border: 4px solid #1abc9c; */
    }
</style>