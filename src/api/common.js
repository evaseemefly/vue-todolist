export class Message{
  constructor(msg,level){
    this.msg=msg;
    this.level=level;
  }
}

export class StaticsQueryInfo{
  constructor(selectedDate,isMonth=1,groupId){
    this.selectedDate=selectedDate;
    this.isMonth=isMonth;
    this.groupId=groupId;
  }
}

