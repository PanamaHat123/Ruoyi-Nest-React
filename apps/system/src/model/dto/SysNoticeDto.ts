import { IsEnum, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";


export enum TypeEnum {
  Instruct = '1',
  Notice = '2',
}
export enum StatusEnum {
  STATIC = '0',
  DYNAMIC = '1',
}

export class SysNoticeDto {

  @IsOptional()
  @IsNumber()
  @Type(()=>Number)
  noticeId: number;

  @IsString()
  @Length(0, 50)
  noticeTitle: string;

  @IsString()
  @IsEnum(TypeEnum)
  noticeType: string;

  @ApiProperty({
    required: true,
  })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  remark?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;

  @IsOptional()
  @IsString()
  noticeContent?: string;
}
