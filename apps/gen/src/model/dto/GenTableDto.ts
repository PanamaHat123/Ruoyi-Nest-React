import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { UpdateGenTableColumnDto } from "./UpdateGenTableColumnDto";


export class GenTableDto {
  @ApiProperty({
    required: true,
  })
  @IsOptional()
  tableId: number;

  @IsOptional()
  @IsString()
  tableName?: string;

  @IsOptional()
  @IsString()
  tableComment?: string;


  @IsOptional()
  @IsString()
  subTableName?: string;

  @IsOptional()
  @IsString()
  subTableFkName?: string;

  @IsOptional()
  @IsString()
  className?: string;

  @IsOptional()
  @IsString()
  tplCategory?: string;

  @IsOptional()
  @IsString()
  packageName?: string;


  @IsOptional()
  @IsString()
  moduleName?: string;

  @IsOptional()
  @IsString()
  businessName?: string;

  @IsOptional()
  @IsString()
  functionName?: string;

  @IsOptional()
  @IsString()
  internationalize?: string;

  @IsOptional()
  @IsString()
  functionAuthor?: string;

  @IsOptional()
  @IsString()
  genType?: string;

  @IsOptional()
  @IsString()
  genPath?: string;

  @IsOptional()
  @IsString()
  options?: string;

  @IsOptional()
  columns?: UpdateGenTableColumnDto[];

  @IsString()
  @IsOptional()
  tplWebType?: string;

  @IsOptional()
  @IsString()
  remark?: string;
}

