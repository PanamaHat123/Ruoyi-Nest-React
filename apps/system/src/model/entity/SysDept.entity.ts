import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('sys_dept', {
  comment: '部门表',
})
export class SysDeptEntity {
  @ApiProperty({ type: String, description: '部门ID' })
  @PrimaryGeneratedColumn({ type: 'int', name: 'dept_id', comment: '部门ID' })
  public deptId: number;

  @ApiProperty({ type: String, description: '父部门ID' })
  @Column({ type: 'int', name: 'parent_id', default: 0, comment: '父部门ID' })
  public parentId: number;

  @Column({ type: 'varchar', name: 'ancestors', length: 50, default: '0', comment: '祖级列表' })
  public ancestors: string;

  @Column({ type: 'varchar', name: 'dept_name', length: 30, comment: '部门名称' })
  public deptName: string;

  @Column({ type: 'int', name: 'order_num', default: 0, comment: '显示顺序' })
  public orderNum: number;

  @Column({ type: 'varchar', name: 'leader', length: 20, comment: '负责人' })
  public leader: string;

  @ApiProperty({ type: String, description: '联系电话' })
  @Column({ type: 'varchar', name: 'phone', default: '', length: 11, comment: '联系电话' })
  public phone: string;

  @ApiProperty({ type: String, description: '邮箱' })
  @Column({ type: 'varchar', name: 'email', length: 50, default: '', comment: '邮箱' })
  public email: string;

  //0正常 1停用
  @ApiProperty({ type: String, description: '状态' })
  @Column({ type: 'char', name: 'status', default: '0', length: 1, comment: '状态' })
  public status: string;

  //0代表存在 1代表删除
  @ApiProperty({ type: String, description: '删除标志' })
  @Column({ type: 'char', name: 'del_flag', default: '0', length: 1, comment: '删除标志' })
  public delFlag: string;

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
