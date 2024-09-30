import { IsEnum, IsNumber, IsOptional, IsString, Length } from "class-validator";
import {PagingDto} from "apps/common/src/model/dto/PagingDto"
import { Type } from "class-transformer";
export enum TypeEnum {
  YES = 'Y',
  NO = 'N',
}
export class SysConfigReq extends PagingDto {

  @IsNumber()
  @IsOptional()
  @Type(()=>Number)
  configId: number;

  @IsOptional()
  @IsString()
  @Length(0, 100)
  configName?: string;

  @IsOptional()
  @IsString()
  @Length(0, 100)
  configKey?: string;

  @IsOptional()
  @IsString()
  @IsEnum(TypeEnum)
  configType?: string;
}
