//根据是否为月份截取传入的date字符串，
//若isMonth=true，则截取到第二个-位置处
//若isMonth=false，则截取全部str
export function getDateByStr(date_str, isMonth) {
  var dateStr = null;
  if (typeof date_str === Object) {
    return null;
  }
  dateStr = date_str;
  //   若只判断月份
  if (isMonth) {
    //   '2018-09-18'
    console.log(date_str);
    let index_sub = date_str.indexOf("-", 5);
    dateStr = date_str.substr(0, index_sub);
  }
  return dateStr;
}
