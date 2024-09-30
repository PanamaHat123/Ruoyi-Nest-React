
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { DemoTestOneEntity } from "../model/entity/DemoTestOne.entity";
import { DemoTestOneReq } from "../model/req/DemoTestOneReq";
import { DemoTestOneDto } from "../model/dto/DemoTestOneDto";
import { StringUtils } from "apps/common/src/utils/StringUtils";

@Injectable()
export class DemoTestOneDao {

    constructor(
      @InjectRepository(DemoTestOneEntity)
      private readonly demoTestOneDaoRepository: Repository<DemoTestOneEntity>,
    ) {
    }
    
    async selectDemoTestOneList(query: DemoTestOneReq) {
      const entity = this.demoTestOneDaoRepository.createQueryBuilder("entity")
      entity.where('1=1');
    
      
      if (StringUtils.isNotEmpty(query.testId)) {
        entity.andWhere(`entity.testId = "${query.testId}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.testName)) {
        entity.andWhere(`entity.testName LIKE "%${query.testName}%"`);
      }   
        
      if (StringUtils.isNotEmpty(query.testType)) {
        entity.andWhere(`entity.testType = "${query.testType}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.status)) {
        entity.andWhere(`entity.status = "${query.status}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.testContent)) {
        entity.andWhere(`entity.testContent = "${query.testContent}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.startDate)) {
        entity.andWhere(`entity.startDate = "${query.startDate}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.remark)) {
        entity.andWhere(`entity.remark = "${query.remark}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.createBy)) {
        entity.andWhere(`entity.createBy = "${query.createBy}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.createTime)) {
        entity.andWhere(`entity.createTime = "${query.createTime}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.updateBy)) {
        entity.andWhere(`entity.updateBy = "${query.updateBy}"`);
      }   
        
      if (StringUtils.isNotEmpty(query.updateTime)) {
        entity.andWhere(`entity.updateTime = "${query.updateTime}"`);
      }   
        
    
      if (query.pageSize && query.current) {
        entity.skip(query.pageSize * (query.current - 1)).take(query.pageSize);
      }
      return await entity.getManyAndCount();
    }
    
    async insertDemoTestOne(createDemoTestOneDto: DemoTestOneDto) {
      return this.demoTestOneDaoRepository.insert(createDemoTestOneDto);
    }
    
    async selectDemoTestOneById(id: number) {
      return this.demoTestOneDaoRepository.findOne({
        where: {
          testId: id
        },
      });
    }
    
    async updateDemoTestOne(updateDemoTestOneDto: DemoTestOneDto) {
      return this.demoTestOneDaoRepository.update({
          testId: updateDemoTestOneDto.testId,
        },
        updateDemoTestOneDto
      )
    }
    
    async deleteDemoTestOneByIds(idList: number[]) {
      return await this.demoTestOneDaoRepository.delete(
        { testId: In(idList) }
      );
    }
}

    