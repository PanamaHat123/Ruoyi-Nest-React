import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SysConfigEntity } from "../model/entity/SysConfig.entity";
import { In, Repository } from "typeorm";
import { SysConfigReq } from "../model/req/SysConfigReq";
import { SysConfigDto } from "../model/dto/SysConfigDto";


@Injectable()
export class SysConfigDao {

  constructor(
    @InjectRepository(SysConfigEntity)
    private readonly sysConfigEntityRepository: Repository<SysConfigEntity>,
  ) {
  }

  async selectConfigList(query: SysConfigReq) {
    const entity = this.sysConfigEntityRepository.createQueryBuilder('entity');
    entity.where('1=1');

    if (query.configName) {
      entity.andWhere(`entity.configName LIKE "%${query.configName}%"`);
    }

    if (query.configKey) {
      entity.andWhere(`entity.configKey LIKE "%${query.configKey}%"`);
    }

    if (query.configType) {
      entity.andWhere('entity.configType = :configType', { configType: query.configType });
    }

    if (query.params?.beginTime && query.params?.endTime) {
      entity.andWhere('entity.createTime BETWEEN :start AND :end', { start: query.params.beginTime, end: query.params.endTime });
    }

    if (query.pageSize && query.current) {
      entity.skip(query.pageSize * (query.current - 1)).take(query.pageSize);
    }

    const [list, total] = await entity.getManyAndCount();
    return [list, total];
  }

  async insertConfig(createConfigDto: SysConfigDto) {
    return await this.sysConfigEntityRepository.save(createConfigDto);
  }

  async selectConfigById(configId: number) {
    return await this.sysConfigEntityRepository.findOne({
      where: {
        configId: configId,
      },
    });
  }

  async updateConfig(updateConfigDto: SysConfigDto) {
    return await this.sysConfigEntityRepository.update(
      {
        configId: updateConfigDto.configId,
      },
      updateConfigDto,
    );
  }

  async selectConfigListByIds(configIds: number[]) {
    return  await this.sysConfigEntityRepository.find({
      where: {
        configId: In(configIds),
      },
      select: ['configType', 'configKey'],
    });
  }

  async deleteConfigByIds(configIds: number[]) {
    return await this.sysConfigEntityRepository.delete(
      { configId: In(configIds) }
    );
  }

  async selectConfigAll() {
    const entity = this.sysConfigEntityRepository.createQueryBuilder('entity');
    return  await entity.getMany();
  }
}