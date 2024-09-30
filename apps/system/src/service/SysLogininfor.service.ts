import { Injectable, BadRequestException } from '@nestjs/common';
import { ResultData } from "apps/common/src/model/ResultData";
import { In, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { SysLogininforEntity } from "../model/entity/SysLogininfor.entity";
import { SysLogininforReq } from "../model/req/SysLogininforReq";
import { SysLogininforDao } from "../dao/SysLogininfor.dao";
import { SysLogininforDto } from "../model/dto/SysLogininforDto";


@Injectable()
export class SysLogininforService {


  constructor(
    private readonly sysLogininforDao:SysLogininforDao,
    @InjectRepository(SysLogininforEntity)
    private readonly sysLogininforEntityRepository: Repository<SysLogininforEntity>,
  ) {}

  /**
   * 日志列表-分页
   * @param query
   * @returns
   */
  async findAll(query: SysLogininforReq) {
    const [list, total] = await this.sysLogininforDao.selectLogininforList(query);
    return {
      code:200,
      msg:"success",
      rows:list,
      total
    };
  }

  async create(createLoginlogDto: SysLogininforDto) {
    return await this.sysLogininforEntityRepository.save(createLoginlogDto);
  }

  async remove(ids: string[]) {
    const data = await this.sysLogininforEntityRepository.delete(
      { infoId: In(ids) },
    );
    return ResultData.ok(data);
  }


}
