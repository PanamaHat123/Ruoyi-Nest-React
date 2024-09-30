import { ApiProperty } from "@nestjs/swagger";


export class CreateGenTableDto {
  @ApiProperty({ type: String, description: '表名称' })
  public tableName: string;

  @ApiProperty({ type: String, description: '表描述' })
  public tableComment: string;

  @ApiProperty({ type: String, description: '实体类名称' })
  public className: string;

  @ApiProperty({ type: String, description: '生成包路径' })
  public packageName: string;

  @ApiProperty({ type: String, description: '生成模块名' })
  public moduleName: string;

  @ApiProperty({ type: String, description: '生成业务名' })
  public businessName: string;

  @ApiProperty({ type: String, description: '生成功能名' })
  public functionName: string;

  @ApiProperty({ type: String, description: '国际化' })
  public internationalize: string;

  @ApiProperty({ type: String, description: 'options' })
  public options?: string;

  @ApiProperty({ type: String, description: '生成功能作者' })
  public functionAuthor: string;

  @ApiProperty({ type: String, description: '创建人' })
  public createBy: string;
}