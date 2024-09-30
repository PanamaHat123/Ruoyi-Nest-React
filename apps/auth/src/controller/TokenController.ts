import { Body, Controller, Delete, HttpCode, Post, Request } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody, ApiConsumes, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { CacheEnum } from "apps/common/src/model/enum/CacheEnum";
import { LoginDto } from "apps/common/src/model/LoginDto";
import { ResultData } from "apps/common/src/model/ResultData";
import * as Useragent from 'useragent';
import { SysLoginService } from "../service/SysLoginService";
import { getRedisUtilBean, RedisUtil } from "apps/common/src/utils/Redis.tool";

@ApiTags('auth')
@Controller("auth")
export class TokenController {
    constructor(
        private loginService: SysLoginService,
        private readonly redisUtil: RedisUtil
    ) {}
    
    @ApiOperation({
        summary: 'login',
      })
    @ApiBody({
      type: LoginDto,
      required: true,
    })
    @Post('/login')
    @HttpCode(200)
    async login(@Body() user: LoginDto, @Request() req) {

      const code = await getRedisUtilBean().get(CacheEnum.CAPTCHA_CODE_KEY + user.uuid);
      if (!code) {
        return ResultData.fail(500, `验证码已过期`);
      }
      if (code !== user.code) {
        return ResultData.fail(500, `验证码错误`);
      }
      const agent = Useragent.parse(req.headers['user-agent']);
      const os = agent.os.toJSON().family;
      const browser = agent.toAgent();
      const clientInfo = {
        userAgent: req.headers['user-agent'],
        ipaddr: req.ip,
        browser: browser,
        os: os,
        loginLocation: '',
      };
      return this.loginService.login(user, clientInfo);
    }

  @ApiOperation({
    summary: '退出登录',
  })
  @ApiBody({
    type: LoginDto,
    required: true,
  })
  @Delete('/logout')
  @HttpCode(200)
  async logout(@Request() req) {
      const user = req?.user?.user
      const agent = Useragent.parse(req.headers['user-agent']);
      const os = agent.os.toJSON().family;
      const browser = agent.toAgent();
      const clientInfo = {
        userAgent: req.headers['user-agent'],
        ipaddr: req.ip,
        browser: browser,
        os: os,
        loginLocation: '',
        userName:user?.userName
      };
      if (req.user?.token) {
        await this.redisUtil.del(`${CacheEnum.LOGIN_TOKEN_KEY}${req.user.token}`);
      }
      return this.loginService.logout(clientInfo);
  }


}