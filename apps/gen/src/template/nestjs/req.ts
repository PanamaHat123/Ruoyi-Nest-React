export const reqTem = (options) => {
    const { BusinessName, primaryKey,className } = options;
    const req = dtoIsReq(options);
    return `
import { IsString, IsNumber, IsBoolean, IsDate, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from "class-transformer";
import { PagingDto } from "apps/common/src/model/dto/PagingDto";
import { ConvertDate } from "apps/common/src/model/ConvertDate";

export class ${className}Req extends PagingDto {
${req}
}
    `;
};

const dtoIsReq = (options) => {
    const { columns } = options;
    let str = ``;
    columns.forEach(column => {
        const { javaType, javaField, isRequired } = column;
        const required = isRequired == '1'

        str += `
    @ApiProperty({ required: ${required} })
    @IsOptional()
    ${getValidatorDecorator(javaType)}
    ${javaField}${required ? '' : '?'}: ${javaType=='Date'?'ConvertDate':javaType};
        `
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

function lowercaseFirstLetter(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}