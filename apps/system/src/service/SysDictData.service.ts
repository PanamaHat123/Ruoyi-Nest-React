import { Injectable } from "@nestjs/common";
import { ListDictData } from "../model/req/ListDictData";
import { ResultData } from "apps/common/src/model/ResultData";
import { Repository } from "typeorm";
import { SysDictDataEntity } from "../model/entity/SysDictData.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { SysDictDataDto } from "../model/dto/SysDictDataDto";
import { ExportTable } from "apps/common/src/utils/export";
import { SysDictDataDao } from "../dao/SysDictData.dao";

@Injectable()
export class SysDictDataService {

  constructor(
    private readonly sysDictDataDao:SysDictDataDao,
    @InjectRepository(SysDictDataEntity)
    private readonly sysDictDataEntityRepository: Repository<SysDictDataEntity>,
  ) {
  }

  async findAllData(query:ListDictData){
    const [list, total] = await this.sysDictDataDao.selectDictDataList(query);
    return {
      total,
      rows:list,
      code:200,
      msg:"success"
    };
  }

  async findOneDataType(dictType: string){
    let data = await this.sysDictDataDao.selectListByType(dictType)
   return ResultData.ok(data)
  }

  // 字典数据
  async createDictData(createDictDataDto: SysDictDataDto) {
    await this.sysDictDataEntityRepository.save(createDictDataDto);
    return ResultData.ok();
  }

  async deleteDictData(dictId: number) {
    await this.sysDictDataEntityRepository.delete({ dictCode: dictId });
    return ResultData.ok();
  }

  async updateDictData(updateDictDataDto: SysDictDataDto) {
    await this.sysDictDataEntityRepository.update({ dictCode: updateDictDataDto.dictCode }, updateDictDataDto);
    return ResultData.ok();
  }

  /**
   * 导出字典数据为xlsx文件
   * @param res
   */
  async export(res: Response, body: ListDictData) {
    delete body.current;
    delete body.pageSize;
    const list = await this.findAllData(body);
    const options = {
      sheetName: '字典数据',
      data: list.rows,
      header: [
        { title: '字典编码', dataIndex: 'dictCode' },
        { title: '字典标签', dataIndex: 'dictLabel' },
        { title: '字典类型', dataIndex: 'dictType' },
        { title: '字典键值', dataIndex: 'dictValue' },
        { title: '状态', dataIndex: 'status' },
      ],
    };
    await ExportTable(options, res as any);
  }
}