import { lowercaseFirstLetter, uppercaseFirstLetter } from "../../utils";
import { GenTableColumnEntity } from "../../model/entity/GenTableCloumn.entity";

export const i18nTem = (options) => {
  const { businessName, functionName, moduleName,className,columns,internationalize } = options;
  const lfclassName = lowercaseFirstLetter(className);
  const upperModuleName = uppercaseFirstLetter(moduleName);
  const primaryFiled = columns.find(filed => filed.isPk == "1");
  const primaryType = primaryFiled?(primaryFiled.javaType || "string"):"string"
  const i18n = internationalize == '1'
  return `
// import this file to zh-CN.ts or en-US.ts for using
export default {
  ${createBody()}
  
};

    `;
  function createBody() {
    let str = `   "menu.1stMenuName.2ndMenuName.3edMenuName.?":"${functionName}",`;
    columns.forEach((column:GenTableColumnEntity)=>{
      str+=`
      "${moduleName}.${lfclassName}.${column.columnName}":"${column.columnComment}",`
    })
    return str
  }

};

