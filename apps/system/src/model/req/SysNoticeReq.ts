import { IsEnum, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { TypeEnum } from "../dto/SysNoticeDto";
import {PagingDto} from "apps/common/src/model/dto/PagingDto"
import { Type } from "class-transformer";


export class SysNoticeReq extends PagingDto {

  @IsOptional()
  @IsNumber()
  @Type(()=>Number)
  noticeId?: number;

  @IsOptional()
  @IsString()
  @Length(0, 50)
  noticeTitle?: string;

  @IsOptional()
  @IsString()
  @IsEnum(TypeEnum)
  noticeType?: string;

  @IsOptional()
  @IsString()
  createBy?: string;
}
