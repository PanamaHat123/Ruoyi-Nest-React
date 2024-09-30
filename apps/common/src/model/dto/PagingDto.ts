import { IsDateString, IsNumberString, IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DateParamsDTO } from "./DateParamsDTO";
import {  Type } from "class-transformer";
/**
 * 分页DTO
 */
export class PagingDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  current: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  pageSize: number;

  /**
   * 时间区间
   */
  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  params?: DateParamsDTO;

  /**
   * 排序字段
   */
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  orderByColumn?: string;

  /**
   * 排序规则
   */
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  isAsc?: 'ascending' | 'descending';
}
