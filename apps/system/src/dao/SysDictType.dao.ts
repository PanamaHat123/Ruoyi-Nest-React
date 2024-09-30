import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SysDictTypeEntity } from "../model/entity/SysDictType.entity";
import { Repository } from "typeorm";
import { ListDictType } from "../model/req/ListDictType";

@Injectable()
export class SysDictTypeDao {

  constructor(
    @InjectRepository(SysDictTypeEntity)
    private readonly sysDictTypeEntityRepository: Repository<SysDictTypeEntity>,
  ) {
  }


  async selectDictTypeById(query: ListDictType) {
    const entity = this.sysDictTypeEntityRepository.createQueryBuilder('entity');
    entity.where('1=1');

    if (query.dictName) {
      entity.andWhere(`entity.dictName LIKE "%${query.dictName}%"`);
    }

    if (query.dictType) {
      entity.andWhere(`entity.dictType LIKE "%${query.dictType}%"`);
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
