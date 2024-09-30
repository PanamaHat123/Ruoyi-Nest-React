import { IsNotEmpty, IsOptional } from "class-validator";


export class SysOperlogDto{

  @IsOptional()
  title?: string;

  //业务类型（0其它 1新增 2修改 3删除）
  @IsNotEmpty()
  businessType: string;

  @IsOptional()
  method?: string;

  @IsOptional()
  requestMethod?: string;

  @IsOptional()
  operatorType?: string;

  @IsOptional()
  operName?: string;

  @IsOptional()
  deptName?: string;

  @IsOptional()
  operUrl?: string;

  @IsOptional()
  operIp?: string;

  @IsOptional()
  operLocation?: string;

  @IsOptional()
  operParam?: string;

  @IsOptional()
  jsonResult?: string;

  @IsOptional()
  operTime?: Date;

  @IsOptional()
  status?: string;

  @IsOptional()
  errorMsg?: string;

  @IsOptional()
  costTime?: number;


}