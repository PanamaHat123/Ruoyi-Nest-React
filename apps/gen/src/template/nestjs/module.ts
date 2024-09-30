export const moduleTem = (options)=>{
    const {  businessName, functionName, moduleName,className,columns } = options;


    return `
import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ${className}Controller } from "./controller/${className}.controller";
import { ${className}Service } from "./service/${className}.service";
import { ${className}Dao } from "./dao/${className}.dao";
import { ${className}Entity } from "./model/entity/${className}.entity";

/*
* for monorepo mode, config this file into existing "*.module.ts" 
*/

@Module({
  imports: [
    // database table entity
    TypeOrmModule.forFeature([
      OtherEntity,${className}Entity
    ])
  ],
  controllers: [
    OtherController,${className}Controller
  ],
  providers: [
    //service
    ...[
      OtherService,${className}Service
    ],
    // dao
    ...[
      OtherDao,${className}Dao
    ],

  ],
  exports:[]
})
export class OtherModule {}

    `
}


