import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";


export class UpdatePwdReq {

  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 200)
  oldPassword: string;

  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 200)
  newPassword: string;
}