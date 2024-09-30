import { Module } from '@nestjs/common';
import { GenController } from "./controller/Gen.controller";
import { GenService } from "./service/Gen.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GenTableEntity } from "./model/entity/GenTable.entity";
import { GenTableColumnEntity } from "./model/entity/GenTableCloumn.entity";

@Module({
  imports: [
    // database table entity
    TypeOrmModule.forFeature([
      GenTableEntity,GenTableColumnEntity
    ])
  ],
  controllers: [GenController],
  providers: [
    //servcie
    ...[
      GenService
    ],
    //dao
    ...[

    ]
  ],
})
export class GenModule {}
