import { Injectable, BadRequestException } from '@nestjs/common';
import { SysConfigReq } from "../model/req/SysConfigReq";
import { ResultData } from "apps/common/src/model/ResultData";
import { SysConfigDto } from "../model/dto/SysConfigDto";
import { RedisUtil } from "apps/common/src/utils/Redis.tool";
import { CacheEnum } from "apps/common/src/model/enum/CacheEnum";
import { SysConfigDao } from "../dao/SysConfig.dao";

@Injectable()
export class SysConfigService {

  constructor(
    private readonly redisUtil:RedisUtil,
    private readonly sysConfigDao:SysConfigDao,
  ) {}

  async queryList(query: SysConfigReq) {
    const [list, total] = await this.sysConfigDao.selectConfigList(query);
    return {
      rows:list,
      total,
      code:200,
      msg:"success"
    };
  }

  async create(createConfigDto: SysConfigDto) {
    await this.sysConfigDao.insertConfig(createConfigDto);
    return ResultData.ok();
  }

  async findOne(configId: number) {
    const data = await this.sysConfigDao.selectConfigById(configId);
    return ResultData.ok(data);
  }

  async update(updateConfigDto: SysConfigDto) {
    await this.sysConfigDao.updateConfig(updateConfigDto)
    return ResultData.ok();
  }

  async remove(configIds: number[]) {
    const list = await this.sysConfigDao.selectConfigListByIds(configIds)
    const item = list.find((item) => item.configType === 'Y');
    if (item) {
      return ResultData.fail(500, `内置参数【${item.configKey}】不能删除`);
    }
    const data = await this.sysConfigDao.deleteConfigByIds(configIds)
    return ResultData.ok(data);
  }


  /**
   * Refresh the system configuration cache
   */
  async resetConfigCache() {
    await this.clearConfigCache();
    await this.loadingConfigCache();
    return ResultData.ok();
  }

  /**
   * Delete the system configuration cache
   */
  async clearConfigCache() {
    const keys = await this.redisUtil.keys(`${CacheEnum.SYS_CONFIG_KEY}*`);
    if (keys && keys.length > 0) {
      await this.redisUtil.del(keys);
    }
  }
  /**
   * Load the system configuration cache
   */
  async loadingConfigCache() {
    const list = await this.sysConfigDao.selectConfigAll()
    list.forEach((item) => {
      if (item.configKey) {
        this.redisUtil.set(`${CacheEnum.SYS_CONFIG_KEY}${item.configKey}`, item.configValue);
      }
    });
  }

}
