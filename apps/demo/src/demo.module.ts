import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { DemoTestOneService } from "./service/DemoTestOne.service";
import { DemoTestOneDao } from "./dao/DemoTestOne.dao";
import { DemoTestOneController } from "./controller/DemoTestOne.controller";
import { DemoTestOneEntity } from "./model/entity/DemoTestOne.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DemoTestOneEntity
    ])
  ],
  controllers: [DemoTestOneController],
  providers: [
    //service
    ...[
      DemoTestOneService
    ],
    // dao
    ...[
      DemoTestOneDao
    ],
  ],
})
export class DemoModule {}
