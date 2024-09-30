import { lowercaseFirstLetter } from "../../utils";


export const serviceTem = (options)=>{
    const {  businessName, functionName, moduleName,className,columns } = options;
    const serviceName = `${className}Service`;
    const serviceInstance = `${className}Service`;
    const lfclassName = lowercaseFirstLetter(className);
    const primaryFiled = columns.find(filed => filed.isPk == "1");
    const primaryType = primaryFiled?(primaryFiled.javaType || "string"):"string"
    return `
import { Injectable } from "@nestjs/common";
import { ${className}Req } from "../model/req/${className}Req";
import { ${className}Dao } from "../dao/${className}.dao";
import { ${className}Dto } from "../model/dto/${className}Dto";

@Injectable()
export class ${className}Service {

    constructor(
      private readonly ${lfclassName}Dao:${className}Dao
    ) {
    }
    
    async findList(${lfclassName}Req: ${className}Req) {
      return await this.${lfclassName}Dao.select${className}List(${lfclassName}Req);
    }
    
    async create(create${className}Dto: ${className}Dto) {
      return await this.${lfclassName}Dao.insert${className}(create${className}Dto);
    }
    
    async findOne(id: ${primaryType}) {
      return await this.${lfclassName}Dao.select${className}ById(id);
    }
    
    async update(update${className}Dto: ${className}Dto) {
      return await this.${lfclassName}Dao.update${className}(update${className}Dto);
    }
    
    async remove(idList: ${primaryType}[]) {
      return await this.${lfclassName}Dao.delete${className}ByIds(idList);
    }

}
`
}
