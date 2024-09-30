
import { IsString, IsNumber, IsBoolean, IsDate, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from "class-transformer";
import { ValidateGroupEnum } from "apps/common/src/model/enum/ValidateGroupEnum";
import { ConvertDate } from "apps/common/src/model/ConvertDate";

export class DemoTestOneDto {
  
    @ApiProperty({ required: false })
    @IsOptional({groups:[ValidateGroupEnum.CREATE]})
    @IsNumber({},{groups:[ValidateGroupEnum.UPDATE]})
    @Type(()=>Number)
    testId: number;
            
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    testName?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    testType?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    @Type(()=>Number)
    status?: number;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    testContent?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @Transform(({ value }) =>ConvertDate.convert(value))
    startDate?: ConvertDate;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    remark?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    createBy?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @Transform(({ value }) =>ConvertDate.convert(value))
    createTime?: ConvertDate;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    updateBy?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @Transform(({ value }) =>ConvertDate.convert(value))
    updateTime?: ConvertDate;
    
}
    