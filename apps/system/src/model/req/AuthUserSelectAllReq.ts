import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";


export class AuthUserSelectAllDto {
  @ApiProperty({
    required: true,
  })
  @IsNumber()
  @Type(()=>Number)
  roleId: number;

  @ApiProperty({
    required: true,
  })
  @IsString()
  userIds: string;
}
