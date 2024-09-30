import { Injectable, HttpException, Logger } from "@nestjs/common";
import { ClientInfoDto } from "apps/common/src/model/ClientInfoDto";
import { LoginDto } from "apps/common/src/model/LoginDto";
import { GenerateUUID } from "apps/common/src/utils/normal.tool";
import { createToken } from "apps/common/src/utils/TokenUtils";
import { SysUserService } from "apps/system/src/service/SysUser.service";
import * as bcrypt from "bcrypt";
import { ResultData } from "apps/common/src/model/ResultData";
import { CacheEnum } from "apps/common/src/model/enum/CacheEnum";
import * as config from "config"
import { RedisUtil } from "apps/common/src/utils/Redis.tool";
import { DelFlagEnum } from "apps/common/src/model/enum/DelFlagEnum";
import { StatusEnum } from "apps/common/src/model/enum/StatusEnum";
import { SysLogininforService } from "apps/system/src/service/SysLogininfor.service";

@Injectable()
export class SysLoginService {
  private readonly logger = new Logger(SysLoginService.name)

  constructor(
    private readonly sysUserService: SysUserService,
    private readonly redisUtil: RedisUtil,
    private readonly logininforService: SysLogininforService,
  ) {
  }

  async login(user: LoginDto, clientInfo: ClientInfoDto) {
    const loginLog = {
      ...clientInfo,
      userName: user.username,
      status: "0",
      msg: "Login success",
      loginTime:new Date(),
    };
    try {
      // todo
      // const loginLocation = await this.axiosService.getIpAddress(clientInfo.ipaddr);
      loginLog.loginLocation = "loginLocation todo";
    } catch (error) {
    }
    //   const loginRes = await this.sysUserService.login(user, loginLog);
    //   loginLog.status = loginRes.code === 200 ? '0' : '1';
    //   loginLog.msg = loginRes.msg;
    const userEntity = await this.sysUserService.getUserByUsername(user.username);
    if (userEntity === null) {
      throw new HttpException("用户不存在",520);
    }
    //校验密码
    if (!bcrypt.compareSync(user.password, userEntity.password)) {
      throw new HttpException("密码不正确",510);
    }
    const userData = await this.sysUserService.getUserinfo(userEntity.userId);

    if (userData.delFlag === DelFlagEnum.DELETE) {
      return ResultData.fail(500, `您已被禁用，如需正常使用请联系管理员`);
    }
    if (userData.status === StatusEnum.STOP) {
      return ResultData.fail(500, `您已被停用，如需正常使用请联系管理员`);
    }
    const loginDate = new Date();
    await this.sysUserService.updateLoginDate(userEntity.userId,loginDate)
    /**
     * return
     * {
     *     "code": 200,
     *     "msg": null,
     *     "data": {
     *         "access_token": "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2tleSI6ImU5ZDNkNmYwLTAxYjktNDhhOC04ODFjLTM2ZTVlZjRhNTdmMSIsInVzZXJuYW1lIjoiYWRtaW4ifQ.PVb0TfNKGM4ners7VavngwV_u87lSAmLJ6Fgqw20jumR1AjRmoRyFsawYL8wYioNDJMIHqdGK64hxW2xDAJ_fA",
     *         "expires_in": 720
     *     }
     * }
     * jwt
     * {
     *   "user_id": 1,
     *   "user_key": "e9d3d6f0-01b9-48a8-881c-36e5ef4a57f1",
     *   "username": "admin"
     * }
     */
    const uuid = GenerateUUID();
    const token = createToken({ user_key: uuid, user_id: userEntity.userId,username: user.username});


    const permissions = await this.sysUserService.getUserPermissions(userData.userId);
    const roles = userData.roles.map((item) => item.roleKey);

    if(process.env.NODE_ENV==="development"){
      userData["permissions"] = permissions
    }
    // this.deleteFileds(userData);

    let metaData = {
      browser: clientInfo.browser,
      ipaddr: clientInfo.ipaddr,
      loginLocation: clientInfo.loginLocation,
      loginTime: loginDate,
      os: clientInfo.os,
      permissions: permissions,
      roles: roles,
      token: uuid,
      user: userData,
      userId: userData.userId,
      username: userData.userName,
      deptId: userData.deptId,
    }
    await this.redisUtil.set(`${CacheEnum.LOGIN_TOKEN_KEY}${uuid}`,metaData ,config.get("jwt.expiresIn"));
    this.logininforService.create(loginLog).catch(err=>this.logger.error(err));

    return ResultData.ok({
      access_token:token,
      expires_in: config.get("jwt.expiresIn")
    });
  }

  logout(clientInfo: { os: string; browser: string; ipaddr: any; loginLocation: string ,userName:string}) {
    const loginLog = {
      ...clientInfo,
      status: '0',
      msg: 'Logout success',
      loginTime: new Date(),
    };
    this.logininforService.create(loginLog).catch(err=>this.logger.error(err));

    return ResultData.ok();

  }
}