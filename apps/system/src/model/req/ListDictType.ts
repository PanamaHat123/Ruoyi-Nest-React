import { IsEnum, IsOptional, IsString, Length } from "class-validator";
import { StatusEnum } from "./req";
import {PagingDto} from "apps/common/src/model/dto/PagingDto"

export class ListDictType extends PagingDto {
  @IsOptional()
  @IsString()
  @Length(0, 100)
  dictName?: string;

  @IsOptional()
  @IsString()
  @Length(0, 100)
  dictType?: string;

  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;
}