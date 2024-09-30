import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { StatusEnum } from "../req/req";
import { Type } from "class-transformer";

export class SysPostDto {

  @ApiProperty({
    required: true,
  })
  @IsOptional()
  @IsNumber()
  @Type(()=>Number)
  postId: number;

  @IsString()
  @Length(0, 50)
  postName: string;

  @IsString()
  @Length(0, 64)
  postCode: string;

  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  remark?: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsNumber()
  @Type(()=>Number)
  postSort?: number;
}