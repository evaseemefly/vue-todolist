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
            <div class="panel-heading">{{nowDateStr}}</div>
            <div class="panel-body table-parent-panel">
                <table id="table_statistics"></table>
            </div>
        </div>
    </div>
</template>

<script>
// var echarts = require('echarts/lib/echarts')
//记得要引入bus
import bus from "../../assets/eventBus.js";
//引入根据是否为月份截取date字符串的方法
import { getDateByStr } from "../../common/js/setDate.js";
import { getDepartmentStatistics } from "../../api/api.js";
import { mapGetters, mapMutations, Store } from "vuex";
export default {
  data: function() {
    return {
      selected_date: "",
      selected_month: "",
      myChart: null,
      personData: []
      //   myChart: null
    };
  },
  computed: {
    // getNowDate() {
    //   return this.$store.getters.nowDate;
    // }
    ...mapGetters(["nowDate"], ["isMonth"]),
    nowDate() {
      return this.$store.state.now;
    },
    nowDateStr(){
      var myself=this;
      return getDateByStr(myself.nowDate, myself.isMonth);
    },
    isMonth() {
      return this.$store.state.isMonth;
    }
    // mapState({
    //     nowDate:state=>state.now.all;
    // })
  },
  methods: {
    loadTable: function() {
      $("#table_statistics").bootstrapTable({
        columns: [
          {
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
        data: [
          {
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
      });
    }
  },
  watch: {
    // 思路：监听personData的变化，若personData发生变化后
    // 重新初始化日历插件
    personData: function() {
      var myself = this;
      //获取当前选定的日期，并判断是否为月份

      myself.myChart;
      let dateStr = getDateByStr(myself.nowDate, myself.isMonth);
      //   var myChart = myself.$echarts.init(document.getElementById("calendar"));
      // 设置日历中月份与series中的data
      myself.myChart.setOption({
        calendar: [
          {
            range: [dateStr]
          }
        ],
        series: [
          {
            name: "person_num",
            type: "scatter",
            coordinateSystem: "calendar",
            data: myself.personData,
            symbolSize: function(val) {
              return val[1] / 0.2;
            },
            itemStyle: {
              normal: {
                // color: '#ddb926'
                color: "#3EBD9C"
              }
            }
          }
        ]
      });
    },
    nowDate: function(newVal, oldVal) {
      console.log(newVal, oldVal);
      var myself=this;
      // myself.myChart;
      // myself.myChart.setOption({
      //   calendar: [
      //     {
      //       range: [myself.nowDateStr]
      //     }
      //   ]
      // });
    },
    isMonth: function(newVal, oldVal) {
      console.log(newVal, oldVal);
    },
    now: function(val) {
      console.log(val);
    }
  },
  mounted: function() {
    var myself = this;
    // var myChart = this.$echarts.init(document.getElementById('calendar'))

    myself.myChart = myself.$echarts.init(document.getElementById("calendar"));
    // var myChart = myself.$echarts.init(document.getElementById("calendar"));

    //生成echart的日历加载的测试数据方法
    function getVirtulData(year) {
      year = year || "2017";
      var date = +myself.$echarts.number.parseDate(year + "-01-01");
      var end = +myself.$echarts.number.parseDate(+year + 1 + "-01-01");
      var dayTime = 3600 * 24 * 1000;
      var data = [];
      for (var time = date; time < end; time += dayTime) {
        data.push([
          myself.$echarts.format.formatTime("yyyy-MM-dd", time),
          Math.floor(Math.random() * 4)
        ]);
      }
      return data;
    }

    var data = getVirtulData(2018);
    myself.personData = data;
    var option = {
      // backgroundColor: '#404a59',

      title: {
        top: 30,
        text: "",
        subtext: "",
        left: "center",
        textStyle: {
          color: "#fff"
        }
      },
      tooltip: {
        trigger: "item"
      },
      legend: {
        top: "30",
        left: "100",
        data: ["person_num"],
        textStyle: {
          color: "#fff"
        }
      },
      calendar: [
        {
          top: 100,
          left: "center",
          orient: "vertical",
          cellSize: 40,
          // range: ["2018-08"], //此处需修改为自动修改为指定月份
          splitLine: {
            show: true,
            lineStyle: {
              color: "#000",
              width: 4,
              type: "solid"
            }
          },

          itemStyle: {
            normal: {
              // color: '#323c48',
              color: "#36495D",
              borderWidth: 1,
              borderColor: "#111"
            }
          }
        }
      ],
      series: [
        {
          name: "person_num",
          type: "scatter",
          coordinateSystem: "calendar",
          data: myself.personData,
          symbolSize: function(val) {
            return val[1] / 0.2;
          },
          itemStyle: {
            normal: {
              // color: '#ddb926'
              color: "#3EBD9C"
            }
          }
        }
      ]
    };

    bus.$on("on-loadCalendar", function(data) {
      getDepartmentStatistics(data).then(res => {
        //res.data是一个array，
        /*
           其中包含：
                dutydate
                count
            需要加该data转成数组，且格式为
            ["yyyy-mm-dd",num]
        */
        console.log(res);
        var persons = [];
        for (var e of res.data) {
          persons.push([e.dutydate, e.count]);
        }
        myself.personData = persons;
      });
    });

    myself.myChart.setOption(option);
    this.loadTable();
  }
};
</script>

<style scoped>
.calendar-border {
}
#body_calendar {
  background: #bdc3c7;
  position: absolute;
  bottom: 0px;
  top: 0px;
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