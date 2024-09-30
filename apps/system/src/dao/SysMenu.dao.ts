import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SysMenuEntity } from "../model/entity/SysMenu.entity";
import { SysMenuReq } from "../model/req/SysMenuReq";


@Injectable()
export class SysMenuDao {

  constructor(
    @InjectRepository(SysMenuEntity)
    private readonly sysMenuEntityRepository: Repository<SysMenuEntity>,
  ) {
  }

  async selectMenuList(query: SysMenuReq) {
    const entity = this.sysMenuEntityRepository.createQueryBuilder('entity');
    entity.where('1=1');

    if (query.menuName) {
      entity.andWhere(`entity.menuName LIKE "%${query.menuName}%"`);
    }
    if (query.status) {
      entity.andWhere('entity.status = :status', { status: query.status });
    }
    entity.orderBy('entity.orderNum', 'ASC');

    return await entity.getMany();
  }
}

