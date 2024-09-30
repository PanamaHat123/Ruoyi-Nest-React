import {  Controller, Get} from '@nestjs/common';
import { AppService } from '../service/app.service';
import { createMath } from 'apps/common/src/utils/captcha';
import { GenerateUUID } from 'apps/common/src/utils/normal.tool';
import { CacheEnum } from 'apps/common/src/model/enum/CacheEnum';
import { ResultData } from 'apps/common/src/model/ResultData';
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { RedisUtil } from "apps/common/src/utils/Redis.tool";
import { I18nContext, I18nService } from "nestjs-i18n";

@ApiTags("App root")
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly redisUtil: RedisUtil,
    private readonly i18n: I18nService
  ) {}

  @Get("/test")
  test(){
    return this.i18n.t('test11.aa');
  }

  @Get("/test2")
  test2(){
    return this.i18n.t('system.test.aa');
  }

  @ApiOperation({
    summary: '获取验证图片',
  })
  @Get('/code')
  async captchaImage() {
    //是否开启验证码
    const enable = true;
    const captchaEnabled: boolean = enable === true;
    const data = {
      captchaEnabled,
      img: '',
      uuid: '',
    };
    try {
      if (captchaEnabled) {
        const captchaInfo = createMath();
        const base64String = Buffer.from(captchaInfo.data).toString('base64');
        data.img = base64String;
        data.uuid = GenerateUUID();
   
        await this.redisUtil.set(CacheEnum.CAPTCHA_CODE_KEY + data.uuid, captchaInfo.text.toLowerCase(), 1000 * 60 * 5);
      }
      return ResultData.ok(data, '操作成功');
    } catch (err) {
      return ResultData.fail(500, '生成验证码错误，请重试');
    }
  }



}
