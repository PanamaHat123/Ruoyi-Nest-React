import { Controller, Get, Post, Body, Put, Param, Query, Res, Delete, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

import { SysUserService } from "../service/SysUser.service";
import { ResultData } from "apps/common/src/model/ResultData";
import { SysLogininforService } from "../service/SysLogininfor.service";
import { SysLogininforReq } from "../model/req/SysLogininforReq";
import { RequirePermission } from "apps/auth/src/decorator/RequirePremission.decorator";

@ApiTags('登录日志')
@Controller('system/logininfor')
export class SysLogininforController {
  constructor(
    private readonly sysLogininforService:SysLogininforService
  ) {}

  @ApiOperation({
    summary: '登录日志-列表',
  })
  @ApiBody({
    type: SysLogininforReq,
    required: true,
  })
  @RequirePermission("system:logininfor:list")
  @Get('/list')
  findAll(@Query() query: SysLogininforReq) {
    return this.sysLogininforService.findAll(query);
  }

}
