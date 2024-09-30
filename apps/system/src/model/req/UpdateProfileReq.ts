import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsString, Length } from "class-validator";


export class UpdateProfileReq {
  @ApiProperty({ required: true })
  @IsOptional()
  @IsString()
  @Length(0, 30)
  nickName: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsEmail()
  @Length(0, 50)
  email: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsString()
  phonenumber: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsString()
  sex: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  avatar?: string;
}