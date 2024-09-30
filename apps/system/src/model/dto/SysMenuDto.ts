import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { Type } from "class-transformer";


//菜单类型
export enum MenuTypeEnum {
  M = 'M',
  C = 'C',
  F = 'F',
}
export enum StatusEnum {
  STATIC = '0',
  DYNAMIC = '1',
}

export class SysMenuDto {

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(()=>Number)
  menuId?: number;

  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 50)
  menuName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(()=>Number)
  orderNum?: number;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsNumber()
  @Type(()=>Number)
  parentId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(0, 200)
  path?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(0, 200)
  query?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(0, 255)
  component?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(0, 100)
  icon?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEnum(MenuTypeEnum)
  menuType?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  isCache?: number;

  @ApiProperty({ required: true })
  @IsOptional()
  isFrame?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  visible?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  perms?: string;

}
