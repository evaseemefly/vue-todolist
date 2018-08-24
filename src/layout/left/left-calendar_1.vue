<template>
    <div id="calendar"></div>
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
            
        },
        mounted: function () {
            var myself=this;
            var myChart = this.$echarts.init(document.getElementById('calendar'))
            var cellSize = [80, 80];
            var pieRadius = 30;            

            function getVirtulData() {
                var date = +myself.$echarts.number.parseDate('2017-02-01');
                var end = +myself.$echarts.number.parseDate('2017-03-01');
                var dayTime = 3600 * 24 * 1000;
                var data = [];
                for (var time = date; time < end; time += dayTime) {
                    data.push([
                         myself.$echarts.format.formatTime('yyyy-MM-dd', time),
                        Math.floor(Math.random() * 10000)
                    ]);
                }
                return data;
            }
            var scatterData = getVirtulData();
            function getPieSeries(scatterData, chart) {
                return myself.$echarts.util.map(scatterData, function (item, index) {
                    var center = chart.convertToPixel('calendar', item);
                    return {
                        id: index + 'pie',
                        type: 'pie',
                        center: center,
                        label: {
                            normal: {
                                formatter: '{c}',
                                position: 'inside'
                            }
                        },
                        radius: pieRadius,
                        data: [{
                                name: '工作',
                                value: Math.round(Math.random() * 24)
                            },
                            {
                                name: '娱乐',
                                value: Math.round(Math.random() * 24)
                            },
                            {
                                name: '睡觉',
                                value: Math.round(Math.random() * 24)
                            }
                        ]
                    };
                });
            }

            function getPieSeriesUpdate(scatterData, chart) {
                return myself.$echarts.util.map(scatterData, function (item, index) {
                    var center = chart.convertToPixel('calendar', item);
                    return {
                        id: index + 'pie',
                        center: center
                    };
                });
            }
           var option = {
                tooltip: {},
                legend: {
                    data: ['工作', '娱乐', '睡觉'],
                    bottom: 20
                },
                calendar: {
                    top: 'middle',
                    left: 'center',
                    orient: 'vertical',
                    cellSize: cellSize,
                    yearLabel: {
                        show: false,
                        textStyle: {
                            fontSize: 30
                        }
                    },
                    dayLabel: {
                        margin: 20,
                        firstDay: 1,
                        nameMap: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
                    },
                    monthLabel: {
                        show: false
                    },
                    range: ['2017-02']
                },
                series: [{
                    id: 'label',
                    type: 'scatter',
                    coordinateSystem: 'calendar',
                    symbolSize: 1,
                    label: {
                        normal: {
                            show: true,
                            formatter: function (params) {
                                return myself.$echarts.format.formatTime('dd', params.value[0]);
                            },
                            offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 10],
                            textStyle: {
                                color: '#000',
                                fontSize: 14
                            }
                        }
                    },
                    data: scatterData
                }]
            };

            if (!app.inNode) {
                var pieInitialized;
                setTimeout(function () {
                    pieInitialized = true;
                    myChart.setOption({
                        series: getPieSeries(scatterData, myChart)
                    });
                }, 10);

                app.onresize = function () {
                    if (pieInitialized) {
                        myChart.setOption({
                            series: getPieSeriesUpdate(scatterData, myChart)
                        });
                    }
                };
            }

            myChart.setOption(option);
        }
    }
</script>

<style>
    #calendar {
        /* width: 100%;
        height: 400px; */
        float: left;
    }
</style>