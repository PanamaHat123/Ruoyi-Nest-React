import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SysOperlogEntity } from "../model/entity/SysOperlog.entity";
import { SysOperlogReq } from "../model/req/SysOperlogReq";
import { SysOperlogDao } from "../dao/SysOperlog.dao";
import { SysOperlogDto } from "../model/dto/SysOperlogDto";


@Injectable()
export class SysOperlogService {

  constructor(
    private readonly sysOperlogDao:SysOperlogDao,
    @InjectRepository(SysOperlogEntity)
    private readonly sysOperlogEntityRepository: Repository<SysOperlogEntity>,
  ) {}

  async findAll(query:SysOperlogReq) {
    const [list, total] = await this.sysOperlogDao.selectOperLogList(query);
    return {
      code:200,
      msg:"success",
      rows:list,
      total
    };
  }

  async create(createOperlogDto: SysOperlogDto) {
    return await this.sysOperlogEntityRepository.save(createOperlogDto);
  }


}
