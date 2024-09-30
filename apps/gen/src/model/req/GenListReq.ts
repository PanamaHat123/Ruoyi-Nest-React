import { PagingDto } from "apps/common/src/model/dto/PagingDto";
import { IsOptional, IsString } from "class-validator";


export class GenListReq extends PagingDto {
  @IsString()
  @IsOptional()
  tableName?: string;
  @IsOptional()
  @IsString()
  tableComment?: string;
}