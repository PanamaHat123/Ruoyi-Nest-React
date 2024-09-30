import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity('gen_table', {
  comment: '代码生成业务表',
})
export class GenTableEntity{
  @ApiProperty({ type: Number, description: '编号' })
  @PrimaryGeneratedColumn({ type: 'int', name: 'table_id', comment: '编号' })
  public tableId: number;

  @ApiProperty({ type: String, description: '表名称' })
  @Column({ type: 'varchar', name: 'table_name', length: 200, default: '', comment: '表名称' })
  public tableName: string;

  @ApiProperty({ type: String, description: '表描述' })
  @Column({ type: 'varchar', name: 'table_comment', length: 500, default: '', comment: '表描述' })
  public tableComment: string;

  @ApiProperty({ type: String, description: '关联子表的表名' })
  @Column({ type: 'varchar', name: 'sub_table_name', length: 64, nullable: true, comment: '关联子表的表名' })
  public subTableName: string;

  @ApiProperty({ type: String, description: '子表关联的外键名' })
  @Column({ type: 'varchar', name: 'sub_table_fk_name', length: 64, nullable: true, comment: '子表关联的外键名' })
  public subTableFkName: string;

  @ApiProperty({ type: String, description: '实体类名称' })
  @Column({ type: 'varchar', name: 'class_name', length: 100, default: '', comment: '实体类名称' })
  public className: string;

  @ApiProperty({ type: String, description: '使用的模板（crud单表操作 tree树表操作）' })
  @Column({ type: 'varchar', name: 'tpl_category', length: 200, default: 'crud', comment: '使用的模板（crud单表操作 tree树表操作）' })
  public tplCategory: string;

  @ApiProperty({ type: String, description: '生成包路径' })
  @Column({ type: 'varchar', name: 'package_name', length: 100, comment: '生成包路径' })
  public packageName: string;

  @ApiProperty({ type: String, description: '生成模块名' })
  @Column({ type: 'varchar', name: 'module_name', length: 30, comment: '生成模块名' })
  public moduleName: string;

  @ApiProperty({ type: String, description: '生成业务名' })
  @Column({ type: 'varchar', name: 'business_name', length: 30, comment: '生成业务名' })
  public businessName: string;

  @ApiProperty({ type: String, description: '生成功能名' })
  @Column({ type: 'varchar', name: 'function_name', length: 50, comment: '生成功能名' })
  public functionName: string;

  @ApiProperty({ type: String, description: '是否国际化' })
  @Column({ type: 'char', name: 'internationalize', length: 50, comment: '是否国际化' })
  public internationalize: string;

  @ApiProperty({ type: String, description: '生成功能作者' })
  @Column({ type: 'varchar', name: 'function_author', length: 50, comment: '生成功能作者' })
  public functionAuthor: string;

  @ApiProperty({ type: String, description: '生成代码方式（0zip压缩包 1自定义路径）' })
  @Column({ type: 'char', name: 'gen_type', length: 1, default: '0', comment: '生成代码方式（0zip压缩包 1自定义路径）' })
  public genType: string;

  @ApiProperty({ type: String, description: '生成路径（不填默认项目路径）' })
  @Column({ type: 'varchar', name: 'gen_path', length: 200, default: '/', comment: '生成路径（不填默认项目路径）' })
  public genPath: string;

  @ApiProperty({ type: String, description: '其它生成选项' })
  @Column({ type: 'varchar', name: 'options', default: '', length: 1000, comment: '其它生成选项' })
  public options: string;

  @ApiProperty({ type: String, description: '创建者' })
  @Column({ type: 'varchar', name: 'create_by', length: 64, default: '', comment: '创建者' })
  public createBy: string;

  @ApiProperty({ type: Date, description: '创建时间' })
  @Column({ type: 'datetime', name: 'create_time', default: null, comment: '创建时间' })
  public createTime: Date;

  @ApiProperty({ type: String, description: '更新者' })
  @Column({ type: 'varchar', name: 'update_by', length: 64, default: '', comment: '更新者' })
  public updateBy: string;

  @ApiProperty({ type: Date, description: '更新时间' })
  @Column({ type: 'datetime', name: 'update_time', default: null, comment: '更新时间' })
  public updateTime: Date;

  @ApiProperty({ type: String, description: '备注' })
  @Column({ type: 'varchar', name: 'remark', length: 500, default: null, comment: '备注' })
  public remark: string;
}
