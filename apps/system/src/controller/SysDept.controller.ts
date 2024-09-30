import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Request } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { SysDeptService } from "../service/SysDept.service";
import { SysDeptReq } from "../model/req/SysDeptReq";
import { SysDeptDto } from "../model/dto/SysDeptDto";
import { ResultData } from "apps/common/src/model/ResultData";
import { RequirePermission } from "apps/auth/src/decorator/RequirePremission.decorator";
import { Log } from "apps/common/src/decorator/Log";
import { BusinessType } from "apps/common/src/model/enum/BusinessType";

@ApiTags('部门管理')
@Controller('system/dept')
export class SysDeptController {
  constructor(
    private readonly deptService:SysDeptService
  ) {}

  @ApiOperation({
    summary: '部门管理-列表',
  })
  @RequirePermission("system:dept:list")
  @Get('/list')
  findAll(@Query() query: SysDeptReq) {
    return this.deptService.findAll(query);
  }

  @ApiOperation({
    summary: '部门管理-详情',
  })
  @RequirePermission("system:dept:query")
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.deptService.findOne(+id);
    return ResultData.ok(data);
  }

  @ApiOperation({
    summary: '部门管理-创建',
  })
  @ApiBody({
    type: SysDeptDto,
    required: true,
  })
  @Log({title:"部门管理-ADD",businessType:BusinessType.ADD})
  @RequirePermission("system:dept:add")
  @Post()
  @HttpCode(200)
  create(@Body() createDeptDto: SysDeptDto) {
    return this.deptService.create(createDeptDto);
  }

  @ApiOperation({
    summary: '部门管理-黑名单',
  })
  @RequirePermission("system:dept:query")
  @Get('/list/exclude/:id')
  findListExclude(@Param('id') id: string) {
    return this.deptService.findListExclude(+id);
  }

  @ApiOperation({
    summary: '部门管理-更新',
  })
  @ApiBody({
    type: SysDeptDto,
    required: true,
  })
  @Log({title:"部门管理-EDIT",businessType:BusinessType.EDIT})
  @RequirePermission("system:dept:edit")
  @Put()
  update(@Body() updateDeptDto: SysDeptDto) {
    return this.deptService.update(updateDeptDto);
  }

  @ApiOperation({
    summary: '部门管理-删除',
  })
  @Log({title:"部门管理-DELETE",businessType:BusinessType.DELETE})
  @RequirePermission("system:dept:remove")
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deptService.remove(+id);
  }


}
