import { lowercaseFirstLetter } from "../../utils";

export const controllerTem = (options) => {
  const {  businessName, functionName, moduleName,className,columns } = options;
  const serviceName = `${className}Service`;
  const serviceInstance = `${className}Service`;
  const lfclassName = lowercaseFirstLetter(className);
  const primaryFiled = columns.find(filed => filed.isPk == "1");
  const primaryType = primaryFiled?(primaryFiled.javaType || "string"):"string"
  return `
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Delete, Get, Param, Post, Put, Query, ValidationPipe } from "@nestjs/common";
import { ${serviceName} } from "../service/${className}.service";
import { RequirePermission } from "apps/auth/src/decorator/RequirePremission.decorator";
import { ${className}Req } from "../model/req/${className}Req";
import { ResultData } from "apps/common/src/model/ResultData";
import { ${className}Dto } from "../model/dto/${className}Dto";
import { ValidateGroupEnum } from "apps/common/src/model/enum/ValidateGroupEnum";
import { Log } from "apps/common/src/decorator/Log";
import { BusinessType } from "apps/common/src/model/enum/BusinessType";

@ApiTags('${functionName}')
@Controller('${moduleName}/${businessName}')
export class ${className}Controller {

    constructor(
      private readonly ${lfclassName}Service:${className}Service
    ) {
    }
    
    @ApiOperation({
      summary: '${functionName}-list',
    })
    @RequirePermission("${moduleName}:${businessName}:list")
    @Get('list')
    async findList(@Query() ${lfclassName}Req: ${className}Req) {
      const [list,totals] = await this.${lfclassName}Service.findList(${lfclassName}Req);
      return ResultData.list(list,totals);
    }
    
    @ApiOperation({
      summary: '${functionName}-create',
    })
    @ApiBody({
      type: ${className}Dto,
      required: true,
    })
    @Log({title:"${functionName}-ADD",businessType:BusinessType.ADD})
    @RequirePermission("${moduleName}:${businessName}:add")
    @Post()
    async create(@Body(new ValidationPipe({ groups: [ValidateGroupEnum.CREATE] })) create${className}Dto: ${className}Dto) {
      await this.${lfclassName}Service.create(create${className}Dto);
      return ResultData.ok();
    }
    
    @ApiOperation({
      summary: '${functionName}-detail',
    })
    @RequirePermission("${moduleName}:${businessName}:query")
    @Get('/:id')
    async findOne(@Param('id') id: ${primaryType}) {
      const entity = await this.${lfclassName}Service.findOne(${primaryType==='number'?'+':''}id)
      return ResultData.ok(entity);
    }
    
    @ApiOperation({
      summary: '${functionName}-update',
    })
    @ApiBody({
      type: ${className}Dto,
      required: true,
    })
    @Log({title:"${functionName}-EDIT",businessType:BusinessType.EDIT})
    @RequirePermission("${moduleName}:${businessName}:edit")
    @Put()
    async update(@Body(new ValidationPipe({ groups: [ValidateGroupEnum.UPDATE] })) update${className}Dto: ${className}Dto) {
      await this.${lfclassName}Service.update(update${className}Dto);
      return ResultData.ok();
    }
    
    @ApiOperation({
      summary: '${functionName}-delete',
    })
    @Log({title:"${functionName}-DELETE",businessType:BusinessType.DELETE})
    @RequirePermission("${moduleName}:${businessName}:remove")
    @Delete('/:ids')
    async remove(@Param('ids') ids: string) {
      const idList = ids.split(',').map((id) => ${primaryType==='number'?'+':''}id);
      await this.${lfclassName}Service.remove(idList);
      return ResultData.ok();
    }

}
    `;
};
