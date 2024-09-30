import { IsEnum, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { StatusEnum } from "../req/req";
import { Type } from "class-transformer";

export class SysDictDataDto {

  @IsOptional()
  @IsNumber()
  @Type(()=>Number)
  dictCode: number;

  @IsString()
  @Length(0, 100)
  dictType: string;

  @IsString()
  @Length(0, 100)
  dictLabel: string;

  @IsString()
  @Length(0, 100)
  dictValue: string;

  @IsString()
  @Length(0, 100)
  listClass: string;

  @IsOptional()
  @IsString()
  isDefault: string;

  @IsOptional()
  @IsString()
  @Length(0, 10)
  isNumber: string;

  @IsOptional()
  @IsNumber()
  @Type(()=>Number)
  dictSort?: number;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  remark?: string;

  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;
}