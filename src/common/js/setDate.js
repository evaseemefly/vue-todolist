//根据是否为月份截取传入的date字符串，
//若isMonth=true，则截取到第二个-位置处
//若isMonth=false，则截取全部str
export function getDateByStr(date_str, isMonth) {
  var dateStr = null;
  if (typeof date_str === typeof {}) {
    //若date_str的type是object，说明传入的是一个date对象
    //需要将date对象转换为 yyyy-mm格式
    let index_sub = date_str.toJSON().indexOf("T");
    dateStr = date_str.toJSON().substr(0, index_sub);
    // return null;
  }
  if (dateStr === null) {
    dateStr = date_str;
  }

  //   若只判断月份
  if (isMonth) {
    //   '2018-09-18'
    console.log(dateStr);
    let index_sub = dateStr.indexOf("-", 5);
    dateStr = dateStr.substr(0, index_sub);
  }

  return dateStr;
}
