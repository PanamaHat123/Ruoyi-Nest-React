import { ApiProperty } from '@nestjs/swagger';

export const SUCCESS_CODE = 200;

/**
 * 响应结构
 * ok 成功
 * fail 失败
 */
export class ResultData {
  constructor(code = SUCCESS_CODE, msg?: string, data?: any) {
    this.code = code;
    this.msg = msg || '操作成功';
    this.data = data || null;
  }

  @ApiProperty({ type: 'number', default: SUCCESS_CODE })
  code: number;

  @ApiProperty({ type: 'string', default: '操作成功' })
  msg?: string;

  data?: any;

  rows?: any[];

  total?: number;

  static ok(data?: any, msg?: string): ResultData {
    return new ResultData(SUCCESS_CODE, msg, data);
  }

  static list(list?: any, total?:number, msg?: string): ResultData {
    let res = new ResultData(SUCCESS_CODE)
    res.rows = list;
    res.total = total
    if(msg){
      res.msg = msg
    }
    return res;
  }

  static fail(code: number, msg?: string, data?: any): ResultData {
    return new ResultData(code || 500, msg || 'fail', data);
  }
}
