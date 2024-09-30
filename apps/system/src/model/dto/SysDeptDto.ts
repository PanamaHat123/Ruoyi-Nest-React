import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsOptional, IsString, Length, Min } from "class-validator";
import { Type } from "class-transformer";


export class SysDeptDto {

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(()=>Number)
  deptId?: number;

  @ApiProperty({
    required: true,
  })
  @IsNumber()
  @Type(()=>Number)
  parentId: number;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @Length(0, 30)
  deptName: string;

  @ApiProperty({
    required: true,
  })
  @IsNumber()
  @Min(0)
  @Type(()=>Number)
  orderNum: number;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  leader?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(0, 11)
  phone?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  status?: string;
}