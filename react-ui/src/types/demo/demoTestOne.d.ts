

declare namespace API.Demo {

  interface DemoTestOne {
    
    testId:number;
    testName:string;
    testType:string;
    status:number;
    testContent:string;
    startDate:Date;
    remark:string;
    createBy:string;
    createTime:Date;
    updateBy:string;
    updateTime:Date;
  }

  export interface DemoTestOneListParams {
    
    testId:number;
    testName:string;
    testType:string;
    status:number;
    testContent:string;
    startDate:Date;
    remark:string;
    createBy:string;
    createTime:Date;
    updateBy:string;
    updateTime:Date;
    pageSize?: string;
    current?: string;
  
  }

  export interface DemoTestOneInfoResult {
    code: number;
    msg: string;
    data: DemoTestOne;
  }

   export interface DemoTestOnePageResult {
    code: number;
    msg: string;
    total: number;
    rows: Array<DemoTestOne>;
  }

}
    