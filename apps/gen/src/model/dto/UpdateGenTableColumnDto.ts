import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class UpdateGenTableColumnDto {
  @ApiProperty({
    required: true,
  })
  @IsOptional()
  @IsNumber()
  @Type(()=>Number)
  columnId:number;
  @IsOptional()
  @IsString()
  columnComment?:string;
  @IsOptional()
  @IsString()
  javaType?:string;
  @IsOptional()
  @IsString()
  javaField?:string;
  @IsOptional()
  @IsString()
  isInsert?:string;
  @IsOptional()
  @IsString()
  isEdit?:string;
  @IsOptional()
  @IsString()
  isList?:string;
  @IsOptional()
  @IsString()
  isQuery?:string;
  @IsOptional()
  @IsString()
  queryType?:string;
  @IsOptional()
  @IsString()
  isRequired?:string;
  @IsOptional()
  @IsString()
  htmlType?:string;
  @IsOptional()
  @IsString()
  dictType?:string;
}