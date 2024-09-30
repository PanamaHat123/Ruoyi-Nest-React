import { IsOptional, IsString } from "class-validator";
import { PagingDto } from "apps/common/src/model/dto/PagingDto";


export class GenDbTableListReq extends PagingDto {
  @IsString()
  @IsOptional()
  tableName?: string;

  @IsString()
  @IsOptional()
  tableComment?: string;
}