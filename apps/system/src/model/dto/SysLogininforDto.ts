import { IsNumber, IsOptional, IsString, Length } from "class-validator";


export class SysLogininforDto {

  @IsOptional()
  @IsString()
  @Length(0, 128)
  ipaddr?: string;

  @IsOptional()
  @IsString()
  @Length(0, 50)
  userName?: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  loginLocation?: string;

  @IsOptional()
  @IsString()
  @Length(0, 50)
  browser?: string;

  @IsOptional()
  @IsString()
  @Length(0, 50)
  os?: string;

  @IsOptional()
  loginTime?: Date;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  msg?: string;

  @IsOptional()
  @IsString()
  status?: string;
}