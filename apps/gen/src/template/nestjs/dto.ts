export const dtoTem = (options) => {
    const { BusinessName, primaryKey,className } = options;
    const dto = dtoIsDto(options);
    return `
import { IsString, IsNumber, IsBoolean, IsDate, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from "class-transformer";
import { ValidateGroupEnum } from "apps/common/src/model/enum/ValidateGroupEnum";
import { ConvertDate } from "apps/common/src/model/ConvertDate";

export class ${className}Dto {
  ${dto}
}
    `;
};

const dtoIsDto = (options) => {
    const { columns } = options;
    let str = ``;
    columns.forEach(column => {
        const { javaType, javaField, isRequired } = column;
        const required = isRequired == '1'
        //主键 处理不同
        if (column.isPk == "1") {
            str += `
    @ApiProperty({ required: ${required} })${!required ? `
    @IsOptional({groups:[ValidateGroupEnum.CREATE]})` : ''}
    ${getValidatorDecoratorPk(javaType)}
    ${javaField}: ${javaType};
            `
        } else {
            str += `
    @ApiProperty({ required: ${required} })${!required ? `
    @IsOptional()` : ''}
    ${getValidatorDecorator(javaType)}
    ${javaField}${required ? '' : '?'}: ${javaType=='Date'?'ConvertDate':javaType};
    `
        }
    })
    return str
};


function getValidatorDecorator(javaType) {
    switch (javaType) {
        case 'string': return `@IsString()`;
        case 'number': return `@IsNumber()
    @Type(()=>Number)`;
        case 'boolean': return `@IsBoolean()`;
        case 'Date': return `@Transform(({ value }) =>ConvertDate.convert(value))`;
        default: return ``;
    }
}
function getValidatorDecoratorPk(javaType){
    switch (javaType) {
        case 'string': return `@IsString({},{groups:[ValidateGroupEnum.UPDATE]})`;
        case 'number': return `@IsNumber({},{groups:[ValidateGroupEnum.UPDATE]})
    @Type(()=>Number)`;
        case 'boolean': return `@IsBoolean({},{groups:[ValidateGroupEnum.UPDATE]})`;
        case 'Date': return `@IsDate({},{groups:[ValidateGroupEnum.UPDATE]})
    @Type(() => Date)`;
        default: return ``;
    }
}
function lowercaseFirstLetter(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}