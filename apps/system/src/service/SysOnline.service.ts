import { Injectable } from '@nestjs/common';

import { RedisUtil } from "apps/common/src/utils/Redis.tool";
import { CacheEnum } from "apps/common/src/model/enum/CacheEnum";
import { Paginate } from "apps/common/src/utils/normal.tool";
import { ResultData } from "apps/common/src/model/ResultData";

@Injectable()
export class SysOnlineService {
  constructor(
    private readonly redisUtil: RedisUtil
  ) {}
  /**
   * 日志列表-分页
   * @param query
   * @returns
   */
  async findAll(query) {
    const kes = await this.redisUtil.keys(`${CacheEnum.LOGIN_TOKEN_KEY}*`);
    const data = await this.redisUtil.mget(kes);
    const list = Paginate(
      {
        list: data,
        pageSize: query.pageSize,
        current: query.current,
      },
      query,
    ).map((item) => {
      return {
        tokenId: item.token,
        deptName: item.user.deptName,
        userName: item.username,
        ipaddr: item.ipaddr,
        loginLocation: item.loginLocation,
        browser: item.browser,
        os: item.os,
        loginTime: item.loginTime,
      };
    });
    return ResultData.list(list,data.length);
  }

  async delete(token: string) {
    await this.redisUtil.del(`${CacheEnum.LOGIN_TOKEN_KEY}${token}`);
    return ResultData.ok();
  }
}
