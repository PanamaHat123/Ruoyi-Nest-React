import { Controller, Get, Post, Body, Put, Param, Query, Res, Delete, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { SysConfigService } from "../service/SysConfig.service";
import { SysConfigReq } from "../model/req/SysConfigReq";
import { SysConfigDto } from "../model/dto/SysConfigDto";
import { RequirePermission } from "apps/auth/src/decorator/RequirePremission.decorator";
import { Log } from "apps/common/src/decorator/Log";
import { BusinessType } from "apps/common/src/model/enum/BusinessType";

@ApiTags('参数配置')
@Controller('system/config')
export class SysConfigController {
  constructor(
    private readonly sysConfigService:SysConfigService
  ) {}

  @ApiOperation({
    summary: '参数设置-列表',
  })
  @ApiBody({
    type: SysConfigReq,
    required: true,
  })
  @RequirePermission("system:config:list")
  @Get('/list')
  findAll(@Query() query: SysConfigReq) {
    return this.sysConfigService.queryList(query);
  }

  @ApiOperation({
    summary: '参数设置-创建',
  })
  @ApiBody({
    type: SysConfigDto,
  })
  @Log({title:"参数管理-ADD",businessType:BusinessType.ADD})
  @RequirePermission("system:config:add")
  @Post()
  create(@Body() createConfigDto: SysConfigDto) {
    return this.sysConfigService.create(createConfigDto);
  }

  @ApiOperation({
    summary: '参数设置-详情(id)',
  })
  @RequirePermission("system:config:query")
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sysConfigService.findOne(+id);
  }

  @ApiOperation({
    summary: '参数设置-更新',
  })
  @Log({title:"参数管理-EDIT",businessType:BusinessType.EDIT})
  @RequirePermission("system:config:edit")
  @Put()
  update(@Body() updateConfigDto: SysConfigDto) {
    return this.sysConfigService.update(updateConfigDto);
  }



  @ApiOperation({
    summary: '参数设置-刷新缓存',
  })
  @Delete('/refreshCache')
  refreshCache() {
    return this.sysConfigService.resetConfigCache();
  }

  @ApiOperation({
    summary: '参数设置-删除',
  })
  @Log({title:"参数管理-DELETE",businessType:BusinessType.DELETE})
  @RequirePermission("system:config:remove")
  @Delete(':id')
  remove(@Param('id') ids: string) {
    const configIds = ids.split(',').map((id) => +id);
    return this.sysConfigService.remove(configIds);
  }
}
