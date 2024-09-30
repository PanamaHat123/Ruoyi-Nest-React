import { lowercaseFirstLetter } from "../../utils";
import { GenTableColumnEntity } from "../../model/entity/GenTableCloumn.entity";


export const daoTem = (options)=>{
    const {  businessName, functionName, moduleName,className,columns } = options;
    const serviceName = `${className}Service`;
    const serviceInstance = `${className}Service`;
    const lfclassName = lowercaseFirstLetter(className);
    const primaryFiled = columns.find(filed => filed.isPk == "1");
    const primaryType = primaryFiled?(primaryFiled.javaType || "string"):"string"
  
    return `
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { ${className}Entity } from "../model/entity/${className}.entity";
import { ${className}Req } from "../model/req/${className}Req";
import { ${className}Dto } from "../model/dto/${className}Dto";
import { StringUtils } from "apps/common/src/utils/StringUtils";

@Injectable()
export class ${className}Dao {

    constructor(
      @InjectRepository(${className}Entity)
      private readonly ${lfclassName}DaoRepository: Repository<${className}Entity>,
    ) {
    }
    
    async select${className}List(query: ${className}Req) {
      const entity = this.${lfclassName}DaoRepository.createQueryBuilder("entity")
      entity.where('1=1');
    
      ${createQuerySqlStr(columns)}
    
      if (query.pageSize && query.current) {
        entity.skip(query.pageSize * (query.current - 1)).take(query.pageSize);
      }
      return await entity.getManyAndCount();
    }
    
    async insert${className}(create${className}Dto: ${className}Dto) {
      return this.${lfclassName}DaoRepository.insert(create${className}Dto);
    }
    
    async select${className}ById(id: ${primaryType}) {
      return this.${lfclassName}DaoRepository.findOne({
        where: {
          ${primaryFiled.javaField}: id
        },
      });
    }
    
    async update${className}(update${className}Dto: ${className}Dto) {
      return this.${lfclassName}DaoRepository.update({
          ${primaryFiled.javaField}: update${className}Dto.${primaryFiled.javaField},
        },
        update${className}Dto
      )
    }
    
    async delete${className}ByIds(idList: ${primaryType}[]) {
      return await this.${lfclassName}DaoRepository.delete(
        { ${primaryFiled.javaField}: In(idList) }
      );
    }
}

    `
}

const queryTypeMapping = {
    "EQ":"=",
    "NE":"!=",
    "GT":">",
    "GTE":">=",
    "LT":"<",
    "LTE":"<=",
    "LIKE":"LIKE",
    "BETWEEN":"=",
}

function createQuerySqlStr(columns:GenTableColumnEntity[]){
    let str = ``;

    columns.forEach(item=>{

        if(item.isQuery){
            let isLike = queryTypeMapping[item.queryType] === "LIKE"
            str+= `
      if (StringUtils.isNotEmpty(query.${item.javaField})) {
        entity.andWhere(\`entity.${item.javaField} ${queryTypeMapping[item.queryType]} "${isLike?'%':''}\${query.${item.javaField}}${isLike?'%':''}"\`);
      }   
        `
        }
    })
    return str;
}
