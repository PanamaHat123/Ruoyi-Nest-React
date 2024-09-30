import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { SysNoticeEntity } from "../model/entity/SysNotice.entity";
import { SysNoticeDto } from "../model/dto/SysNoticeDto";
import { ResultData } from "apps/common/src/model/ResultData";
import { SysNoticeReq } from "../model/req/SysNoticeReq";
import { SysNoticeDao } from "../dao/SysNotice.dao";


@Injectable()
export class SysNoticeService {


  constructor(
    private readonly sysNoticeDao:SysNoticeDao,
    @InjectRepository(SysNoticeEntity)
    private readonly sysNoticeEntityRepository: Repository<SysNoticeEntity>,
  ) {}

  async create(createNoticeDto: SysNoticeDto) {
    await this.sysNoticeEntityRepository.save(createNoticeDto);
    return ResultData.ok();
  }

  async findAll(query: SysNoticeReq) {
    const [list, total] = await this.sysNoticeDao.selectNoticeList(query);
    return {
      rows:list,
      total,
      code:200,
      msg:"success"
    };
  }

  async findOne(noticeId: number) {
    const data = await this.sysNoticeDao.selectNoticeById(noticeId);
    return ResultData.ok(data);
  }

  async update(updateNoticeDto: SysNoticeDto) {
    await this.sysNoticeEntityRepository.update(
      {
        noticeId: updateNoticeDto.noticeId,
      },
      updateNoticeDto,
    );
    return ResultData.ok();
  }

  async remove(noticeIds: number[]) {
    const data = await this.sysNoticeEntityRepository.delete(
      { noticeId: In(noticeIds) });
    return ResultData.ok(data);
  }

}
