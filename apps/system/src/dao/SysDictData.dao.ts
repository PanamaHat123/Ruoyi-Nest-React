import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SysDictDataEntity } from "../model/entity/SysDictData.entity";
import { Repository } from "typeorm";
import { ListDictData } from "../model/req/ListDictData";


@Injectable()
export class SysDictDataDao {

  constructor(
    @InjectRepository(SysDictDataEntity)
    private readonly sysDictDataEntityRepository: Repository<SysDictDataEntity>,
  ) {
  }

  async selectDictDataList(query: ListDictData) {
    const entity = this.sysDictDataEntityRepository.createQueryBuilder('entity');
    entity.where('1=1');
    if (query.dictLabel) {
      entity.andWhere(`entity.dictLabel LIKE "%${query.dictLabel}%"`);
    }
    if (query.dictType) {
      entity.andWhere(`entity.dictType LIKE "%${query.dictType}%"`);
    }
    if (query.status) {
      entity.andWhere('entity.status = :status', { status: query.status });
    }
    if (query.pageSize && query.current) {
      entity.skip(query.pageSize * (query.current - 1)).take(query.pageSize);
    }
    return await entity.getManyAndCount();
  }

  async selectListByType(dictType: string) {
    return await this.sysDictDataEntityRepository.find({
      where: {
        dictType: dictType,
      },
    });
  }
}