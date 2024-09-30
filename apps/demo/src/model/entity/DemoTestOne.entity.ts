
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ConvertDate } from "apps/common/src/model/ConvertDate";
import { DateTransformer } from "apps/common/src/conversion/DateTransformer";


@Entity('t_demo_test_one', {
    comment: '测试demo1',
})
export class DemoTestOneEntity {
  
  @PrimaryGeneratedColumn({ type: 'int', name: 'test_id', comment: '测试id' })
  public testId: number;  
            
  @Column({ type: 'varchar', name: 'test_name', comment: '测试名'})
  public testName: string; 
            
  @Column({ type: 'char', name: 'test_type', comment: '测试类型'})
  public testType: string; 
            
  @Column({ type: 'int', name: 'status', comment: '状态'})
  public status: number; 
            
  @Column({ type: 'varchar', name: 'test_content', comment: '测试内容'})
  public testContent: string; 
            
  @Column({ type: 'datetime', name: 'start_date', comment: '生效时间', transformer:new DateTransformer()})
  public startDate: ConvertDate; 
            
  @Column({ type: 'varchar', name: 'remark', comment: '备注'})
  public remark: string; 
            
  @Column({ type: 'varchar', name: 'create_by', comment: '创建者'})
  public createBy: string; 
            
  @Column({ type: 'datetime', name: 'create_time', comment: '创建时间', transformer:new DateTransformer()})
  public createTime: ConvertDate; 
            
  @Column({ type: 'varchar', name: 'update_by', comment: '更新者'})
  public updateBy: string; 
            
  @Column({ type: 'datetime', name: 'update_time', comment: '更新时间', transformer:new DateTransformer()})
  public updateTime: ConvertDate; 
            
}
    