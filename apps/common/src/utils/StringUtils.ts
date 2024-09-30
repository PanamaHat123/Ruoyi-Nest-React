

export class StringUtils {

  public static isNotEmpty(value:any):boolean{
    return !StringUtils.isEmpty(value)
  }

  public static isEmpty(value:any):boolean{
    if(value == null){
      return true
    }
    if(value === ''){
      return true
    }
    return false
  }

}