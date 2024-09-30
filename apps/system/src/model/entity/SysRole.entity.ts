import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity('sys_role', {
  comment: '角色信息表',
})
export class SysRoleEntity {
  @ApiProperty({ type: String, description: '角色ID' })
  @PrimaryGeneratedColumn({ type: 'int', name: 'role_id', comment: '角色ID' })
  public roleId: number;

  @Column({ type: 'varchar', name: 'role_name', length: 30, comment: '角色名称' })
  public roleName: string;

  @Column({ type: 'int', name: 'role_sort', default: 0, comment: '显示顺序' })
  public roleSort: number;

  @Column({ type: 'varchar', name: 'role_key', length: 100, comment: '角色权限字符串' })
  public roleKey: string;

  //数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限）
  @Column({ type: 'char', name: 'data_scope', length: 1, default: '1', comment: '数据范围' })
  public dataScope: string;

  @Column({ type: 'boolean', name: 'menu_check_strictly', default: false, comment: '菜单树选择项是否关联显示' })
  public menuCheckStrictly: boolean;

  @Column({ type: 'boolean', name: 'dept_check_strictly', default: false, comment: '部门树选择项是否关联显示' })
  public deptCheckStrictly: boolean;

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
