import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SysOperlogEntity } from "../model/entity/SysOperlog.entity";
import { Repository } from "typeorm";
import { SysOperlogReq } from "../model/req/SysOperlogReq";

@Injectable()
export class SysOperlogDao {

  constructor(
    @InjectRepository(SysOperlogEntity)
    private readonly sysOperlogEntityRepository: Repository<SysOperlogEntity>,
  ) {
  }

  async selectOperLogList(query: SysOperlogReq) {
    const entity = this.sysOperlogEntityRepository.createQueryBuilder('entity');
    entity.where('1=1');
    if (query.title) {
      entity.andWhere(`entity.title LIKE "%${query.title}%"`);
    }
    if(query.businessType != null){
      entity.andWhere(`entity.businessType = "${query.businessType}"`);
    }
    if(query.operatorType != null){
      entity.andWhere(`entity.operatorType = "${query.operatorType}"`);
    }
    if (query.operName) {
      entity.andWhere(`entity.operName LIKE "%${query.operName}%"`);
    }
    if(query.operIp != null){
      entity.andWhere(`entity.operIp = "${query.operIp}"`);
    }
    if(query.operLocation != null){
      entity.andWhere(`entity.operLocation = "${query.operLocation}"`);
    }
    if(query.status != null){
      entity.andWhere(`entity.status = "${query.status}"`);
    }
    if(query.requestMethod){
      entity.andWhere(`entity.requestMethod = "${query.requestMethod.toUpperCase()}"`);
    }
    if (query.params?.beginTime && query.params?.endTime) {
      entity.andWhere('entity.operTime BETWEEN :start AND :end', { start: query.params.beginTime, end: query.params.endTime });
    }
    entity.orderBy(`entity.operTime`, "DESC");
    if (query.pageSize && query.current) {
      entity.skip(query.pageSize * (query.current - 1)).take(query.pageSize);
    }
    return await entity.getManyAndCount();
  }
}
