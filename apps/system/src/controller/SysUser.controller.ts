import { Controller, Get, Post, Body, Put, Param, Query, Res, Delete, Request, Response, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

import { SysUserService } from "../service/SysUser.service";
import { ResultData } from "apps/common/src/model/ResultData";
import { SysUserReq } from "../model/req/SysUserReq";
import { SysUserDto } from "../model/dto/SysUserDto";
import { ChangeUserStatusReq } from "../model/req/ChangeUserStatusReq";
import { ResetUserPwdReq } from "../model/req/ResetUserPwdReq";
import { UserAssignRoleReq } from "../model/req/UserAssignRoleReq";
import { UpdateProfileReq } from "../model/req/UpdateProfileReq";
import { UpdatePwdReq } from "../model/req/UpdatePwdReq";
import { RequirePermission } from "apps/auth/src/decorator/RequirePremission.decorator";
import { Log } from "apps/common/src/decorator/Log";
import { BusinessType } from "apps/common/src/model/enum/BusinessType";

@ApiTags('用户管理')
@Controller('system/user')
export class SysUserController {
  constructor(
    private readonly userService: SysUserService,
  ) {}
  @ApiOperation({
    summary:"获取登录用户信息"
  })
  @Get("/getInfo")
  getInfo(@Request() req): any {
    let res = ResultData.ok() as any;
    res.user = req.user.user;
    this.userService.deleteFileds(res.user)
    res.roles = req.user.roles;
    res.permissions = req.user.permissions;
    return res;
  }

  @ApiOperation({
    summary: '用户-部门树',
  })
  @Get('deptTree')
  deptTree() {
    return this.userService.deptTree();
  }

  @ApiOperation({
    summary: '用户-列表',
  })
  @RequirePermission("system:user:list")
  @Get('list')
  findAll(@Query() query: SysUserReq, @Request() req) {
    const user = req.user.user;
    return this.userService.findAll(query, user);
  }

  @ApiOperation({
    summary: '用户-创建',
  })
  @ApiBody({
    type: SysUserDto,
    required: true,
  })
  @Log({title:"用户-ADD",businessType:BusinessType.ADD})
  @RequirePermission("system:user:add")
  @Post()
  create(@Body() createUserDto: SysUserDto) {
    return this.userService.create(createUserDto);
  }


  @ApiOperation({
    summary: '用户-停用角色',
  })
  @ApiBody({
    type: ChangeUserStatusReq,
    required: true,
  })
  @Log({title:"用户-STOP",businessType:BusinessType.EDIT})
  @RequirePermission("system:user:edit")
  @Put('changeStatus')
  changeStatus(@Body() changeStatusDto: ChangeUserStatusReq) {
    return this.userService.changeStatus(changeStatusDto);
  }

  @ApiOperation({
    summary: '用户-删除',
  })
  @Log({title:"用户-DELETE",businessType:BusinessType.DELETE})
  @RequirePermission("system:user:remove")
  @Delete(':id')
  remove(@Param('id') ids: string) {
    const menuIds = ids.split(',').map((id) => +id);
    return this.userService.remove(menuIds);
  }

  @ApiOperation({
    summary: '用户-更新',
  })
  @ApiBody({
    type: SysUserDto,
    required: true,
  })
  @Log({title:"用户-EDIT",businessType:BusinessType.EDIT})
  @RequirePermission("system:user:edit")
  @Put()
  update(@Body() updateUserDto: SysUserDto, @Request() req) {
    const userId = req.user.userId;
    return this.userService.update(updateUserDto, userId);
  }

  @ApiOperation({
    summary: '用户-重置密码',
  })
  @ApiBody({
    type: ResetUserPwdReq,
    required: true,
  })
  @Log({title:"用户-PASSWORD_RESET",businessType:BusinessType.EDIT})
  @RequirePermission("system:user:resetPwd")
  @Put('resetPwd')
  resetPwd(@Body() body: ResetUserPwdReq) {
    return this.userService.resetPwd(body);
  }


  @ApiOperation({
    summary: '用户-角色信息-更新',
  })
  @Log({title:"用户-角色信息-更新",businessType:BusinessType.EDIT})
  @Put('authRole')
  updateAuthRole(@Query() query:UserAssignRoleReq) {
    return this.userService.updateAuthRole(query);
  }

  @ApiOperation({
    summary: '用户-分配角色-详情',
  })
  @Get('authRole/:id')
  authRole(@Param('id') id: string) {
    return this.userService.authRole(+id);
  }

  @ApiOperation({ summary: '导出用户信息数据为xlsx' })
  @RequirePermission("system:user:export")
  @Get('export')
  async export(@Res() res: Response, @Query() query: SysUserReq, @Request() req): Promise<void> {
    const user = req.user.user;
    return this.userService.export(res, query, user);
  }

  @ApiOperation({
    summary: '用户-详情',
  })
  @RequirePermission("system:user:query")
  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.userService.findOne(+userId);
  }

  @ApiOperation({
    summary: '个人中心-用户信息',
  })
  @Get('/profile')
  profile(@Request() req) {
    const user = req.user.user;
    return ResultData.ok(user);
  }

  @ApiOperation({
    summary: '个人中心-修改用户信息',
  })
  @Put('/profile')
  @Log({title:"个人中心-EDIT",businessType:BusinessType.EDIT})
  // @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  updateProfile(@Request() req, @Body() updateProfileReq: UpdateProfileReq) {
    const user = req.user;
    return this.userService.updateProfile(user, updateProfileReq);
  }

  @ApiOperation({
    summary: '个人中心-修改密码',
  })
  @Put('/profile/updatePwd')
  @Log({title:"个人中心-修改密码",businessType:BusinessType.EDIT})
  // @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  updatePwd(@Request() req, @Query() updatePwdReq: UpdatePwdReq) {
    const user = req.user;
    return this.userService.updatePwd(user, updatePwdReq);
  }


}
