import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity('sys_dict_data', {
  comment: '字典数据表',
})
export class SysDictDataEntity {
  @ApiProperty({ type: String, description: '字典主键' })
  @PrimaryGeneratedColumn({ type: 'int', name: 'dict_code', comment: '字典主键' })
  public dictCode: number;

  @Column({ type: 'int', name: 'dict_sort', default: 0, comment: '字典排序' })
  public dictSort: number;

  @Column({ type: 'varchar', name: 'dict_label', length: 100, comment: '字典标签' })
  public dictLabel: string;

  @Column({ type: 'varchar', name: 'dict_value', length: 100, comment: '字典键值' })
  public dictValue: string;

  @Column({ type: 'varchar', name: 'dict_type', length: 100, comment: '字典类型' })
  public dictType: string;

  //样式属性（其他样式扩展）
  @Column({ type: 'varchar', name: 'css_class', length: 100, default: '', comment: '样式属性' })
  public cssClass: string;

  //样式属性（其他样式扩展）
  @Column({ type: 'varchar', name: 'list_class', length: 100, comment: '表格回显样式' })
  public listClass: string;

  //是否默认（Y是 N否）
  @Column({ type: 'char', name: 'is_default', length: 1, default: 'N', comment: '是否默认' })
  public isDefault: string;

  //是否转数字
  @Column({ type: 'char', name: 'is_number', length: 1, default: 'N', comment: '是否转数字' })
  public isNumber: string;

  //0正常 1停用
  @ApiProperty({ type: String, description: '状态' })
  @Column({ type: 'char', name: 'status', default: '0', length: 1, comment: '状态' })
  public status: string;

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
