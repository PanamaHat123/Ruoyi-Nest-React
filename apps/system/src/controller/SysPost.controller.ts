import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, Res ,Response } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { SysPostReq } from "../model/req/SysPostReq";
import { SysPostService } from "../service/SysPost.service";
import { SysPostDto } from "../model/dto/SysPostDto";
import { RequirePermission } from "apps/auth/src/decorator/RequirePremission.decorator";
import { Log } from "apps/common/src/decorator/Log";
import { BusinessType } from "apps/common/src/model/enum/BusinessType";

@ApiTags('岗位管理')
@Controller('system/post')
export class SysPostController {
  constructor(
    private readonly postService:SysPostService,
  ) {}

  @ApiOperation({
    summary: '岗位管理-列表',
  })
  @ApiBody({
    type: SysPostReq,
    required: true,
  })
  @RequirePermission("system:post:list")
  @Get('/list')
  findAll(@Query() query: SysPostReq) {
    return this.postService.findAll(query);
  }

  @ApiOperation({
    summary: '岗位管理-创建',
  })
  @ApiBody({
    type: SysPostDto,
    required: true,
  })
  @Log({title:"岗位管理-ADD",businessType:BusinessType.ADD})
  @RequirePermission("system:post:add")
  @Post()
  create(@Body() createPostDto: SysPostDto) {
    return this.postService.create(createPostDto);
  }

  @ApiOperation({
    summary: '岗位管理-详情',
  })
  @RequirePermission("system:post:query")
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @ApiOperation({
    summary: '岗位管理-更新',
  })
  @ApiBody({
    type: SysPostDto,
    required: true,
  })
  @Log({title:"岗位管理-EDIT",businessType:BusinessType.EDIT})
  @RequirePermission("system:post:edit")
  @Put()
  update(@Body() updatePostDto: SysPostDto) {
    return this.postService.update(updatePostDto);
  }

  @ApiOperation({
    summary: '岗位管理-删除',
  })
  @Log({title:"岗位管理-DELETE",businessType:BusinessType.DELETE})
  @RequirePermission("system:post:remove")
  @Delete('/:ids')
  remove(@Param('ids') ids: string) {
    const menuIds = ids.split(',').map((id) => id);
    return this.postService.remove(menuIds);
  }

  @ApiOperation({ summary: '导出岗位管理xlsx文件' })
  @RequirePermission("system:post:export")
  @Get('/export')
  async export(@Res() res: Response, @Query() req: SysPostReq): Promise<any> {
    return this.postService.export(res, req);
  }

}
