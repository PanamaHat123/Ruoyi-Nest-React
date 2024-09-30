
import { Injectable } from "@nestjs/common";
import { DemoTestOneReq } from "../model/req/DemoTestOneReq";
import { DemoTestOneDao } from "../dao/DemoTestOne.dao";
import { DemoTestOneDto } from "../model/dto/DemoTestOneDto";

@Injectable()
export class DemoTestOneService {

    constructor(
      private readonly demoTestOneDao:DemoTestOneDao
    ) {
    }
    
    async findList(demoTestOneReq: DemoTestOneReq) {
      return await this.demoTestOneDao.selectDemoTestOneList(demoTestOneReq);
    }
    
    async create(createDemoTestOneDto: DemoTestOneDto) {
      return await this.demoTestOneDao.insertDemoTestOne(createDemoTestOneDto);
    }
    
    async findOne(id: number) {
      return await this.demoTestOneDao.selectDemoTestOneById(id);
    }
    
    async update(updateDemoTestOneDto: DemoTestOneDto) {
      return await this.demoTestOneDao.updateDemoTestOne(updateDemoTestOneDto);
    }
    
    async remove(idList: number[]) {
      return await this.demoTestOneDao.deleteDemoTestOneByIds(idList);
    }

}
