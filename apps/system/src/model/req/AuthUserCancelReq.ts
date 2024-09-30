import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { Type } from "class-transformer";


export class AuthUserCancelReq {

  @ApiProperty({
    required: true,
  })
  @IsNumber()
  @Type(()=>Number)
  roleId: number;

  @ApiProperty({
    required: true,
  })
  @IsNumber()
  @Type(()=>Number)
  userId: number;
}
