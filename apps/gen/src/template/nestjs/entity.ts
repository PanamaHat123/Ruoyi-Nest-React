

export const entityTem = (options) => {
  const { BusinessName, tableName, tableComment ,className} = options;

  const contentTem = content(options);
  return `
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ConvertDate } from "apps/common/src/model/ConvertDate";
import { DateTransformer } from "apps/common/src/conversion/DateTransformer";


@Entity('${tableName}', {
    comment: '${tableComment}',
})
export class ${className}Entity {
  ${contentTem}
}
    `;
};

const content = (options) => {
  const { columns } = options;
  let html = ``;
  columns.forEach((column) => {
    const { javaType, javaField, isPk, columnType, columnComment,columnName } = column;
    const filed = convertToSnakeCase(javaField);
    // const type = lowercaseFirstLetter(javaType);
    if (isPk == '1') {
      html += `
  @PrimaryGeneratedColumn({ type: '${columnType}', name: '${columnName}', comment: '${columnComment}'${javaType=="Date"?", transformer:new DateTransformer()":''} })
  public ${javaField}: ${javaType=="Date"?"ConvertDate":javaType};  
            `;
    } else {
      html += `
  @Column({ type: '${columnType}', name: '${columnName}', comment: '${columnComment}'${javaType=="Date"?", transformer:new DateTransformer()":''}})
  public ${javaField}: ${javaType=="Date"?"ConvertDate":javaType}; 
            `;
    }
  });

  return html;
};

function convertToSnakeCase(str) {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

function lowercaseFirstLetter(str) {
  if (str.length === 0) {
    return str;
  }
  return str.charAt(0).toLowerCase() + str.slice(1);
}
