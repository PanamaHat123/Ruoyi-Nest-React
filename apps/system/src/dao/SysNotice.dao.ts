import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SysNoticeEntity } from "../model/entity/SysNotice.entity";
import { Repository } from "typeorm";
import { SysNoticeReq } from "../model/req/SysNoticeReq";


@Injectable()
export class SysNoticeDao {

  constructor(
    @InjectRepository(SysNoticeEntity)
    private readonly sysNoticeEntityRepository: Repository<SysNoticeEntity>,
  ) {
  }


  async selectNoticeList(query: SysNoticeReq) {
    const entity = this.sysNoticeEntityRepository.createQueryBuilder('entity');
    entity.where('1=1');

    if (query.noticeTitle) {
      entity.andWhere(`entity.noticeTitle LIKE "%${query.noticeTitle}%"`);
    }

    if (query.createBy) {
      entity.andWhere(`entity.createBy LIKE "%${query.createBy}%"`);
    }

    if (query.noticeType) {
      entity.andWhere('entity.noticeType = :noticeType', { noticeType: query.noticeType });
    }

    if (query.params?.beginTime && query.params?.endTime) {
      entity.andWhere('entity.createTime BETWEEN :start AND :end', { start: query.params.beginTime, end: query.params.endTime });
    }

    if (query.pageSize && query.current) {
      entity.skip(query.pageSize * (query.current - 1)).take(query.pageSize);
    }
    return  await entity.getManyAndCount();
  }

  async selectNoticeById(noticeId: number) {
    return  await this.sysNoticeEntityRepository.findOne({
      where: {
        noticeId: noticeId,
      },
    });
  }
}