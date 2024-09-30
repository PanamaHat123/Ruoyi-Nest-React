import { lowercaseFirstLetter, uppercaseFirstLetter } from "../../utils";
import { GenTableColumnEntity } from "../../model/entity/GenTableCloumn.entity";

export const reactTypesTem = (options) => {
  const { businessName, functionName, moduleName,className,columns } = options;
  const lfclassName = lowercaseFirstLetter(className);
  const upperModuleName = uppercaseFirstLetter(moduleName);
  const primaryFiled = columns.find(filed => filed.isPk == "1");
  const primaryType = primaryFiled?(primaryFiled.javaType || "string"):"string"
  return `

declare namespace API.${upperModuleName} {

  interface ${className} {
    ${getEntity(options.columns)}
  }

  export interface ${className}ListParams {
    ${getEntityListParams(options.columns)}
  }

  export interface ${className}InfoResult {
    code: number;
    msg: string;
    data: ${className};
  }

   export interface ${className}PageResult {
    code: number;
    msg: string;
    total: number;
    rows: Array<${className}>;
  }

}
    `;
};

function getEntity(columns:GenTableColumnEntity[]){
  let str = ``;
  columns.forEach(item=>{
    str+=`
    ${item.javaField}:${item.javaType};`
  })
  return str
}
function getEntityListParams(columns:GenTableColumnEntity[]){
  let str = ``;
  columns.forEach(item=>{
    str+=`
    ${item.javaField}:${item.javaType};`
  })
  str+=`
    pageSize?: string;
    current?: string;
  `
  return str
}

