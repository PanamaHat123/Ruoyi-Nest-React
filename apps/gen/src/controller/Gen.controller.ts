import { Body, Controller, Get, Param, Post, Put, Query, Res, Response, Request, UsePipes, ValidationPipe, Delete } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { GenListReq } from "../model/req/GenListReq";
import { GenService } from "../service/Gen.service";
import { GenTableDto } from "../model/dto/GenTableDto";
import { GenDbTableListReq } from "../model/req/GenDbTableListReq";
import { RequirePermission } from "apps/auth/src/decorator/RequirePremission.decorator";

@ApiTags('代码生成')
@Controller('code/gen')
export class GenController {

  constructor(
    private readonly genService:GenService,
  ) {
  }

  @ApiOperation({ summary: '数据表列表' })
  @RequirePermission("tool:gen:list")
  @Get('/list')
  findAll(@Query() query: GenListReq) {
    return this.genService.findAll(query);
  }

  @ApiOperation({ summary: '查看代码' })
  @RequirePermission("tool:gen:preview")
  @Get('/preview/:id')
  preview(@Param('id') id: string) {
    return this.genService.preview(+id);
  }



  @ApiOperation({ summary: '修改代码生成信息' })
  @RequirePermission("tool:gen:edit")
  @Put()
  // @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  genUpdate(@Body() genTableUpdate: GenTableDto) {
    return this.genService.genUpdate(genTableUpdate);
  }


  @ApiOperation({ summary: '生成代码' })
  @RequirePermission("tool:gen:list")
  @Get('/batchGenCode')
  batchGenCode(@Query("tables") tables: string, @Res() res: Response) {
    return this.genService.batchGenCode(tables, res);
  }


  @ApiOperation({ summary: '查询数据库列表' })
  @RequirePermission("tool:gen:import")
  @Get('/db/list')
  genDbList(@Query() query: GenDbTableListReq) {
    return this.genService.genDbList(query);
  }

  @ApiOperation({ summary: '导入表' })
  @RequirePermission("tool:gen:import")
  @Post('/importTable')
  genImportTable(@Query("tables") tables: string, @Request() req) {
    return this.genService.importTable(tables, req);
  }


  @ApiOperation({ summary: '查询表详细信息' })
  @RequirePermission("tool:gen:query")
  @Get('/:id')
  gen(@Param('id') id: string) {
    return this.genService.findOne(+id);
  }


  @ApiOperation({ summary: '删除表数据' })
  @RequirePermission("tool:gen:remove")
  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.genService.remove(+id);
  }


}
