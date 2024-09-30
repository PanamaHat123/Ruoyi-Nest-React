import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SysUserEntity } from "../model/entity/SysUser.entity";
import { Repository } from "typeorm";

@Injectable()
export class SysUserDao {

  constructor(
    @InjectRepository(SysUserEntity)
    private readonly sysUserEntityRepository: Repository<SysUserEntity>,
  ) {
  }

}
