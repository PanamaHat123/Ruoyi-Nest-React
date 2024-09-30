import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString } from "class-validator";
import { StatusEnum } from "./req";
import { Type } from "class-transformer";

export class ChangeUserStatusReq {
  @ApiProperty({
    required: true,
  })
  @IsNumber()
  @Type(()=>Number)
  userId: number;

  @ApiProperty({ required: true })
  @IsString()
  @IsEnum(StatusEnum)
  status: string;
}

