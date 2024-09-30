
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query, ValidationPipe } from "@nestjs/common";
import { DemoTestOneService } from "../service/DemoTestOne.service";
import { RequirePermission } from "apps/auth/src/decorator/RequirePremission.decorator";
import { DemoTestOneReq } from "../model/req/DemoTestOneReq";
import { ResultData } from "apps/common/src/model/ResultData";
import { DemoTestOneDto } from "../model/dto/DemoTestOneDto";
import { ValidateGroupEnum } from "apps/common/src/model/enum/ValidateGroupEnum";
import { Log } from "apps/common/src/decorator/Log";
import { BusinessType } from "apps/common/src/model/enum/BusinessType";

@ApiTags('测试demo1')
@Controller('demo/demoTestOne')
export class DemoTestOneController {
    private logger = new Logger(DemoTestOneController.name);
    constructor(
      private readonly demoTestOneService:DemoTestOneService
    ) {
    }
    
    @ApiOperation({
      summary: '测试demo1-list',
    })
    @RequirePermission("demo:demoTestOne:list")
    @Get('list')
    async findList(@Query() demoTestOneReq: DemoTestOneReq) {
      this.logger.error("aaaa: "+JSON.stringify(demoTestOneReq))
      const [list,totals] = await this.demoTestOneService.findList(demoTestOneReq);
      return ResultData.list(list,totals);
    }
    
    @ApiOperation({
      summary: '测试demo1-create',
    })
    @ApiBody({
      type: DemoTestOneDto,
      required: true,
    })
    @Log({title:"测试demo1-ADD",businessType:BusinessType.ADD})
    @RequirePermission("demo:demoTestOne:add")
    @Post()
    async create(@Body(new ValidationPipe({ groups: [ValidateGroupEnum.CREATE] })) createDemoTestOneDto: DemoTestOneDto) {
      await this.demoTestOneService.create(createDemoTestOneDto);
      return ResultData.ok();
    }
    
    @ApiOperation({
      summary: '测试demo1-detail',
    })
    @RequirePermission("demo:demoTestOne:query")
    @Get('/:id')
    async findOne(@Param('id') id: number) {
      const entity = await this.demoTestOneService.findOne(+id)
      return ResultData.ok(entity);
    }
    
    @ApiOperation({
      summary: '测试demo1-update',
    })
    @ApiBody({
      type: DemoTestOneDto,
      required: true,
    })
    @Log({title:"测试demo1-EDIT",businessType:BusinessType.EDIT})
    @RequirePermission("demo:demoTestOne:edit")
    @Put()
    async update(@Body(new ValidationPipe({ groups: [ValidateGroupEnum.UPDATE] })) updateDemoTestOneDto: DemoTestOneDto) {
      await this.demoTestOneService.update(updateDemoTestOneDto);
      return ResultData.ok();
    }
    
    @ApiOperation({
      summary: '测试demo1-delete',
    })
    @Log({title:"测试demo1-DELETE",businessType:BusinessType.DELETE})
    @RequirePermission("demo:demoTestOne:remove")
    @Delete('/:ids')
    async remove(@Param('ids') ids: string) {
      const idList = ids.split(',').map((id) => +id);
      await this.demoTestOneService.remove(idList);
      return ResultData.ok();
    }

}
    