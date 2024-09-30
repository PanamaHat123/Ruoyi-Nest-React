import { Controller, Get, Post, Body, Put, Param, Query, Res, Delete, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { SysNoticeService } from "../service/SysNotice.service";
import { SysNoticeDto } from "../model/dto/SysNoticeDto";
import { SysNoticeReq } from "../model/req/SysNoticeReq";
import { RequirePermission } from "apps/auth/src/decorator/RequirePremission.decorator";
import { Log } from "apps/common/src/decorator/Log";
import { BusinessType } from "apps/common/src/model/enum/BusinessType";

@ApiTags('通知管理')
@Controller('system/notice')
export class SysNoticeController {
  constructor(
    private readonly sysNoticeService:SysNoticeService
  ) {}

  @ApiOperation({
    summary: '通知公告-创建',
  })
  @ApiBody({
    type: SysNoticeDto,
  })
  @Log({title:"通知公告-ADD",businessType:BusinessType.ADD})
  @RequirePermission("system:notice:add")
  @Post()
  create(@Body() createConfigDto: SysNoticeDto) {
    return this.sysNoticeService.create(createConfigDto);
  }

  @ApiOperation({
    summary: '通知公告-列表',
  })
  @ApiBody({
    type: SysNoticeReq,
    required: true,
  })
  @RequirePermission("system:notice:list")
  @Get('/list')
  findAll(@Query() query: SysNoticeReq) {
    return this.sysNoticeService.findAll(query);
  }

  @ApiOperation({
    summary: '通知公告-详情',
  })
  @RequirePermission("system:notice:query")
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sysNoticeService.findOne(+id);
  }

  @ApiOperation({
    summary: '通知公告-更新',
  })
  @Log({title:"通知公告-EDIT",businessType:BusinessType.EDIT})
  @RequirePermission("system:notice:edit")
  @Put()
  update(@Body() updateNoticeDto: SysNoticeDto) {
    return this.sysNoticeService.update(updateNoticeDto);
  }

  @ApiOperation({
    summary: '通知公告-删除',
  })
  @Log({title:"通知公告-DELETE",businessType:BusinessType.DELETE})
  @RequirePermission("system:notice:remove")
  @Delete(':id')
  remove(@Param('id') ids: string) {
    const noticeIds = ids.split(',').map((id) => +id);
    return this.sysNoticeService.remove(noticeIds);
  }


}
