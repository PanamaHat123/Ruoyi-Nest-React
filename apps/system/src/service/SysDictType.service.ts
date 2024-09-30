import { Injectable } from "@nestjs/common";
import { ResultData } from "apps/common/src/model/ResultData";
import { In, Repository } from "typeorm";
import { SysDictDataEntity } from "../model/entity/SysDictData.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ListDictType } from "../model/req/ListDictType";
import { SysDictTypeEntity } from "../model/entity/SysDictType.entity";
import { SysDictTypeDto } from "../model/dto/SysDictTypeDto";
import { ExportTable } from "apps/common/src/utils/export";
import { SysDictTypeDao } from "../dao/SysDictType.dao";

@Injectable()
export class SysDictTypeService {

  constructor(
    private readonly sysDictTypeDao:SysDictTypeDao,
    @InjectRepository(SysDictTypeEntity)
    private readonly sysDictTypeEntityRepository: Repository<SysDictTypeEntity>,
    @InjectRepository(SysDictDataEntity)
    private readonly sysDictDataEntityRepository: Repository<SysDictDataEntity>,
  ) {
  }

  async findAllType(query:ListDictType){
    const [list, total] = await this.sysDictTypeDao.selectDictTypeById(query);
    return {
      code:200,
      msg:"success",
      rows:list,
      total
    };
  }

  async createType(createDictTypeDto: SysDictTypeDto){
    await this.sysDictTypeEntityRepository.save(createDictTypeDto);
    return ResultData.ok();
  }

  async updateType(updateDictTypeDto: SysDictTypeDto) {
    await this.sysDictTypeEntityRepository.update({ dictId: updateDictTypeDto.dictId }, updateDictTypeDto);
    return ResultData.ok();
  }

  async deleteType(dictIds: number[]) {
    await this.sysDictTypeEntityRepository.delete({ dictId: In(dictIds) });
    return ResultData.ok();
  }

  /**
   * 导出字典数据为xlsx文件
   * @param res
   */
  async export(res: Response, body: ListDictType) {
    delete body.current;
    delete body.pageSize;
    const list = await this.findAllType(body);
    const options = {
      sheetName: '字典数据',
      data: list.rows,
      header: [
        { title: '字典主键', dataIndex: 'dictId' },
        { title: '字典名称', dataIndex: 'dictName' },
        { title: '字典类型', dataIndex: 'dictType' },
        { title: '状态', dataIndex: 'status' },
      ],
    };
    await ExportTable(options, res as any);
  }

  async findOptionselect() {
    const data = await this.sysDictTypeEntityRepository.find();
    return ResultData.ok(data);
  }

  async findOneType(dictId: number) {
    const data = await this.sysDictTypeEntityRepository.findOne({
      where: {
        dictId: dictId
      },
    });
    return ResultData.ok(data);
  }



}