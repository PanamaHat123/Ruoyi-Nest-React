import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";


export enum StatusEnum {
  STATIC = '0',
  DYNAMIC = '1',
}

export class ChangeRoleStatusReq {
  @ApiProperty({
    required: true,
  })
  @IsNumber()
  @Type(()=>Number)
  roleId: number;

  @ApiProperty({ required: true })
  @IsString()
  @IsEnum(StatusEnum)
  status: string;
}
