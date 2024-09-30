import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Length } from "class-validator";
import { Type } from "class-transformer";


export class ResetUserPwdReq {

  @ApiProperty({
    required: true,
  })
  @IsNumber()
  @Type(()=>Number)
  userId: number;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @Length(5, 20)
  password: string;

}