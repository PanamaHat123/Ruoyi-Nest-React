const moment = require("moment")

// for transform datetime to YYYY-MM-DD HH:mm:ss
export class ConvertDate extends Date{

  constructor(date:Date|string) {
    super(date);
  }

  toString(): string {
    return this.toISOString()
  }

  toISOString(): string {
    return moment(this).format('YYYY-MM-DD HH:mm:ss');
  }
  
  static convert(value:any){
    
    if(value == null || value == '' || !value){
      return null
    }
    else{
      return new ConvertDate(value)
    }
  }

}