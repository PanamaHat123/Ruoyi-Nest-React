import { IsEnum, IsOptional, IsString, Length } from "class-validator";
import { StatusEnum } from "./req";
import {PagingDto} from "apps/common/src/model/dto/PagingDto"

export class SysPostReq extends PagingDto {

  @IsOptional()
  postId?: number;

  @IsOptional()
  @IsString()
  @Length(0, 50)
  postName?: string;

  @IsOptional()
  @IsString()
  @Length(0, 64)
  postCode?: string;

  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;
}
