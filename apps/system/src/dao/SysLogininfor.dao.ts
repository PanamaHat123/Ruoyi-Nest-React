import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SysLogininforEntity } from "../model/entity/SysLogininfor.entity";
import { Repository } from "typeorm";
import { SysLogininforReq } from "../model/req/SysLogininforReq";


@Injectable()
export class SysLogininforDao {

  constructor(
    @InjectRepository(SysLogininforEntity)
    private readonly sysLogininforEntityRepository: Repository<SysLogininforEntity>,
  ) {
  }

  async selectLogininforList(query: SysLogininforReq) {
    const entity = this.sysLogininforEntityRepository.createQueryBuilder('entity');
    entity.where('1=1');
    if (query.ipaddr) {
      entity.andWhere(`entity.ipaddr LIKE "%${query.ipaddr}%"`);
    }
    if (query.userName) {
      entity.andWhere(`entity.userName LIKE "%${query.userName}%"`);
    }
    if (query.status) {
      entity.andWhere('entity.status = :status', { status: query.status });
    }
    if (query.params?.beginTime && query.params?.endTime) {
      entity.andWhere('entity.loginTime BETWEEN :start AND :end', { start: query.params.beginTime, end: query.params.endTime });
    }
    entity.orderBy(`entity.loginTime`, "DESC");
    if (query.orderByColumn && query.isAsc) {
      const key = query.isAsc === 'ascending' ? 'ASC' : 'DESC';
      entity.orderBy(`entity.${query.orderByColumn}`, key);
    }
    if (query.pageSize && query.current) {
      entity.skip(query.pageSize * (query.current - 1)).take(query.pageSize);
    }
    return  await entity.getManyAndCount();
  }

}