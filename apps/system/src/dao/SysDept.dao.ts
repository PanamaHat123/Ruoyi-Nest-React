import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SysDeptEntity } from "../model/entity/SysDept.entity";
import { Repository } from "typeorm";
import { SysDeptReq } from "../model/req/SysDeptReq";
import { SysDeptDto } from "../model/dto/SysDeptDto";


@Injectable()
export class SysDeptDao {

  constructor(
    @InjectRepository(SysDeptEntity)
    private readonly sysDeptEntityRepository: Repository<SysDeptEntity>
  ) {
  }

  async selectDeptList(query: SysDeptReq) {
    const entity = this.sysDeptEntityRepository.createQueryBuilder("entity");
    entity.where("entity.delFlag = :delFlag", { delFlag: "0" });

    if (query.deptName) {
      entity.andWhere(`entity.deptName LIKE "%${query.deptName}%"`);
    }
    if (query.status) {
      entity.andWhere("entity.status = :status", { status: query.status });
    }
    return  await entity.getMany();
  }

  async selectDeptById(deptId: number) {
    return await this.sysDeptEntityRepository.findOne({
      where: {
        deptId: deptId,
        delFlag: "0"
      }
    });
  }

  async insertDept(createDeptDto: SysDeptDto) {
    return await this.sysDeptEntityRepository.save(createDeptDto);
  }


  async selectDeptAll() {
   return await this.sysDeptEntityRepository.find({
      where: {
        delFlag: "0"
      }
    });
  }

  async updateDept(updateDeptDto: SysDeptDto) {
    return await this.sysDeptEntityRepository.update({ deptId: updateDeptDto.deptId }, updateDeptDto);
  }

  async deleteDeptById(deptId: number) {
    return await this.sysDeptEntityRepository.update(
      { deptId: deptId },
      {
        delFlag: '1',
      },
    );
  }
}