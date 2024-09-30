import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SysPostEntity } from "../model/entity/SysPost.entity";
import { Repository } from "typeorm";
import { SysPostReq } from "../model/req/SysPostReq";


@Injectable()
export class SysPostDao {

  constructor(
    @InjectRepository(SysPostEntity)
    private readonly sysPostEntityRepository: Repository<SysPostEntity>,
  ) {
  }

  async selectPostList(query: SysPostReq) {
    const entity = this.sysPostEntityRepository.createQueryBuilder('entity');
    entity.where('1=1');

    if (query.postId) {
      entity.andWhere(`entity.postId = "${query.postId}"`);
    }

    if (query.postName) {
      entity.andWhere(`entity.postName LIKE "%${query.postName}%"`);
    }

    if (query.postCode) {
      entity.andWhere(`entity.postCode LIKE "%${query.postCode}%"`);
    }

    if (query.status) {
      entity.andWhere('entity.status = :status', { status: query.status });
    }

    if (query.pageSize && query.current) {
      entity.skip(query.pageSize * (query.current - 1)).take(query.pageSize);
    }
    entity.orderBy("post_sort","ASC")
    return await entity.getManyAndCount()
  }
}