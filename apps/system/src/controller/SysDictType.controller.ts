import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Request, Res,Response } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { SysDictTypeService } from "../service/SysDictType.service";
import { ListDictType } from "../model/req/ListDictType";
import { SysDictTypeEntity } from "../model/entity/SysDictType.entity";
import { SysDictTypeDto } from "../model/dto/SysDictTypeDto";
import { RequirePermission } from "apps/auth/src/decorator/RequirePremission.decorator";
import { Log } from "apps/common/src/decorator/Log";
import { BusinessType } from "apps/common/src/model/enum/BusinessType";

@ApiTags('字典类型')
@Controller('system/dict/type')
export class SysDictTypeController {
  constructor(
    private readonly dictTypeService: SysDictTypeService
  ) {}

  @ApiOperation({
    summary: '字典数据-列表',
  })
  @RequirePermission("system:dict:list")
  @Get('/list')
  findAllData(@Query() query: ListDictType) {
    return this.dictTypeService.findAllType(query);
  }

  //字典类型
  @ApiOperation({
    summary: '字典类型-创建',
  })
  @ApiBody({
    type: SysDictTypeDto,
    required: true,
  })
  @HttpCode(200)
  @Log({title:"字典类型-ADD",businessType:BusinessType.ADD})
  @RequirePermission("system:dict:add")
  @Post()
  createType(@Body() createDictTypeDto: SysDictTypeDto) {
    return this.dictTypeService.createType(createDictTypeDto);
  }

  @ApiOperation({
    summary: '字典类型-修改',
  })
  @Log({title:"字典类型-EDIT",businessType:BusinessType.EDIT})
  @RequirePermission("system:dict:edit")
  @Put()
  updateType(@Body() updateDictTypeDto: SysDictTypeDto) {
    return this.dictTypeService.updateType(updateDictTypeDto);
  }

  @ApiOperation({
    summary: '字典类型-删除',
  })
  @Log({title:"字典类型-DELETE",businessType:BusinessType.DELETE})
  @RequirePermission("system:dict:remove")
  @Delete('/:id')
  deleteType(@Param('id') ids: string) {
    const dictIds = ids.split(',').map((id) => +id);
    return this.dictTypeService.deleteType(dictIds);
  }

  @ApiOperation({ summary: '导出字典数据为xlsx文件' })
  @RequirePermission("system:dict:export")
  @Get('/export')
  async export(@Res() res: Response, @Query() query: ListDictType): Promise<void> {
    return this.dictTypeService.export(res, query);
  }


  @ApiOperation({
    summary: '全部字典类型-下拉数据',
  })
  @Get('/optionselect')
  findOptionselect() {
    return this.dictTypeService.findOptionselect();
  }


  @ApiOperation({
    summary: '字典类型-详情',
  })
  @Get('/:id')
  findOneType(@Param('id') id: string) {
    return this.dictTypeService.findOneType(+id);
  }

}
