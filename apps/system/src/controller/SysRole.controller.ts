import { Controller, Get, Post, Body, Put, Param, Query, Res, Delete,Response, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { SysUserService } from "../service/SysUser.service";
import { SysRoleService } from "../service/SysRole.service";
import { SysRoleReq } from "../model/req/SysRoleReq";
import { ChangeRoleStatusReq } from "../model/req/ChangeRoleStatusReq";
import { SysRoleDto } from "../model/dto/SysRoleDto";
import { AllocatedReq } from "../model/req/AllocatedReq";
import { AuthUserSelectAllDto } from "../model/req/AuthUserSelectAllReq";
import { AuthUserCancelReq } from "../model/req/AuthUserCancelReq";
import { RequirePermission } from "apps/auth/src/decorator/RequirePremission.decorator";
import { Log } from "apps/common/src/decorator/Log";
import { BusinessType } from "apps/common/src/model/enum/BusinessType";

@ApiTags('角色管理')
@Controller('system/role')
export class SysRoleController {
  constructor(
    private readonly sysUserService: SysUserService,
    private readonly sysRoleService: SysRoleService,
  ) {}

  @ApiOperation({
    summary: '角色管理-列表',
  })
  @ApiBody({
    type: SysRoleReq,
    required: true,
  })
  @RequirePermission("system:role:list")
  @Get('list')
  findAll(@Query() query: SysRoleReq) {
    return this.sysRoleService.findAll(query);
  }


  @ApiOperation({
    summary: '角色管理-停用角色',
  })
  @ApiBody({
    type: ChangeRoleStatusReq,
    required: true,
  })
  @Log({title:"角色管理-停用角色",businessType:BusinessType.EDIT})
  @RequirePermission("system:role:edit")
  @Put('changeStatus')
  changeStatus(@Body() changeStatusDto: ChangeRoleStatusReq) {
    return this.sysRoleService.changeStatus(changeStatusDto);
  }


  @ApiOperation({
    summary: '角色管理-创建',
  })
  @ApiBody({
    type: SysRoleDto,
    required: true,
  })
  @Log({title:"角色管理-ADD",businessType:BusinessType.ADD})
  @RequirePermission("system:role:add")
  @Post()
  create(@Body() createRoleDto: SysRoleDto) {
    return this.sysRoleService.create(createRoleDto);
  }


  @ApiOperation({
    summary: '角色管理-修改',
  })
  @ApiBody({
    type: SysRoleDto,
    required: true,
  })
  @Log({title:"角色管理-EDIT",businessType:BusinessType.EDIT})
  @RequirePermission("system:role:edit")
  @Put()
  update(@Body() updateRoleDto: SysRoleDto) {
    return this.sysRoleService.update(updateRoleDto);
  }

  @ApiOperation({
    summary: '角色管理-delete',
  })
  @Log({title:"角色管理-EDIT",businessType:BusinessType.DELETE})
  @RequirePermission("system:role:remove")
  @Delete(':id')
  remove(@Param('id') ids: string) {
    const menuIds = ids.split(',').map((id) => +id);
    return this.sysRoleService.remove(menuIds);
  }


  @ApiOperation({
    summary: '角色管理-解绑角色',
  })
  @ApiBody({
    type: AuthUserCancelReq,
    required: true,
  })
  @Put('authUser/cancel')
  authUserCancel(@Body() body: AuthUserCancelReq) {
    return this.sysUserService.authUserCancel(body);
  }



  @ApiOperation({
    summary: '角色管理-部门树',
  })
  @Get('deptTree/:id')
  deptTree(@Param('id') id: string) {
    return this.sysRoleService.deptTree(+id);
  }

  @ApiOperation({
    summary: '角色管理-角色已分配用户列表',
  })
  @ApiBody({
    type: AllocatedReq,
    required: true,
  })
  @Get('authUser/allocatedList')
  authUserAllocatedList(@Query() query: AllocatedReq) {
    return this.sysUserService.allocatedList(query);
  }

  @ApiOperation({
    summary: '角色管理-角色未分配用户列表',
  })
  @ApiBody({
    type: AllocatedReq,
    required: true,
  })
  @Get('authUser/unallocatedList')
  authUserUnAllocatedList(@Query() query: AllocatedReq) {
    return this.sysUserService.unallocatedList(query);
  }

  @ApiOperation({
    summary: '角色管理-批量绑定角色',
  })
  @ApiBody({
    type: AuthUserSelectAllDto,
    required: true,
  })
  @Put('authUser/selectAll')
  authUserSelectAll(@Query() params: AuthUserSelectAllDto) {
    return this.sysUserService.authUserSelectAll(params);
  }

  @ApiOperation({
    summary: '角色管理-数据权限修改',
  })
  @ApiBody({
    type: SysRoleDto,
    required: true,
  })
  @Put('dataScope')
  dataScope(@Body() updateRoleDto: SysRoleDto) {
    return this.sysRoleService.dataScope(updateRoleDto);
  }

  @ApiOperation({ summary: '导出角色管理xlsx文件' })
  @RequirePermission("system:role:export")
  @Get('/export')
  async export(@Res() res: Response, @Query() body: SysRoleReq): Promise<void> {
    return this.sysRoleService.export(res, body);
  }

  @ApiOperation({
    summary: '角色管理-详情',
  })
  @RequirePermission("system:role:query")
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sysRoleService.findOne(+id);
  }
}
