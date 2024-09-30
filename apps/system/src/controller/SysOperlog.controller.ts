import { Controller, Get, Post, Body, Put, Param, Query, Res, Delete, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

import { SysOperlogService } from "../service/SysOperlog.service";
import { SysOperlogReq } from "../model/req/SysOperlogReq";
import { RequirePermission } from "apps/auth/src/decorator/RequirePremission.decorator";

@ApiTags('操作日志')
@Controller('system/operlog')
export class SysOperlogController {
  constructor(
    private readonly sysOperlogService:SysOperlogService
  ) {}

  @ApiOperation({
    summary: '登录日志-列表',
  })
  @ApiBody({
    type: SysOperlogReq,
    required: true,
  })
  @RequirePermission("system:operlog:list")
  @Get('/list')
  findAll(@Query() req:SysOperlogReq) {
    return this.sysOperlogService.findAll(req);
  }

}
