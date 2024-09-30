import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";


export class LoginDto {
    
    @ApiProperty({
      required: false,
    })

    @IsOptional()
    @IsString()
    code?: string;
  
    @IsString()
    @MinLength(2)
    @MaxLength(10)
    username: string;
  
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    password: string;

    @IsOptional()
    @IsString()
    uuid?: string;
  }
