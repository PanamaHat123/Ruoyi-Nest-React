import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SysRoleEntity } from "../model/entity/SysRole.entity";
import { Repository } from "typeorm";
import { SysRoleReq } from "../model/req/SysRoleReq";


@Injectable()
export class SysRoleDao {

  constructor(
    @InjectRepository(SysRoleEntity)
    private readonly sysRoleEntityRepository: Repository<SysRoleEntity>,
  ) {
  }

  async selectRoleList(query: SysRoleReq) {
    const entity = this.sysRoleEntityRepository.createQueryBuilder('entity');
    entity.where('entity.delFlag = :delFlag', { delFlag: '0' });

    if (query.roleName) {
      entity.andWhere(`entity.roleName LIKE "%${query.roleName}%"`);
    }

    if (query.roleKey) {
      entity.andWhere(`entity.roleKey LIKE "%${query.roleKey}%"`);
    }

    if (query.roleId) {
      entity.andWhere('entity.roleId = :roleId', { roleId: query.roleId });
    }

    if (query.status) {
      entity.andWhere('entity.status = :status', { status: query.status });
    }

    if (query.params?.beginTime && query.params?.endTime) {
      entity.andWhere('entity.createTime BETWEEN :start AND :end', { start: query.params.beginTime, end: query.params.endTime });
    }

    if (query.pageSize && query.current) {
      entity.skip(query.pageSize * (query.current - 1)).take(query.pageSize);
    }
    return await entity.getManyAndCount();
  }
}