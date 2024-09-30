import { Injectable } from "@nestjs/common";
import { SysPostReq } from "../model/req/SysPostReq";
import { In, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { SysPostEntity } from "../model/entity/SysPost.entity";
import { ResultData } from "apps/common/src/model/ResultData";
import { SysPostDto } from "../model/dto/SysPostDto";
import { ExportTable } from "apps/common/src/utils/export";
import { SysPostDao } from "../dao/SysPost.dao";

@Injectable()
export class SysPostService {

  constructor(
    private readonly sysPostDao:SysPostDao,
    @InjectRepository(SysPostEntity)
    private readonly sysPostEntityRepository: Repository<SysPostEntity>,
  ) {
  }

  async findAll(query: SysPostReq) {
    const [list, total] = await this.sysPostDao.selectPostList(query);
    return{
      code:200,
      msg:"success",
      rows:list,
      total
    };
  }

  async create(createPostDto: SysPostDto) {
    await this.sysPostEntityRepository.save(createPostDto);
    return ResultData.ok();
  }

  async findOne(postId: number) {
    const res = await this.sysPostEntityRepository.findOne({
      where: {
        postId: postId,
      },
    });
    return ResultData.ok(res);
  }

  async update(updatePostDto: SysPostDto) {
    const res = await this.sysPostEntityRepository.update({ postId: updatePostDto.postId }, updatePostDto);
    return ResultData.ok(res);
  }

  async remove(postIds: string[]) {
    const data = await this.sysPostEntityRepository.delete(
      { postId: In(postIds) }
    );
    return ResultData.ok(data);
  }

  /**
   * 导出岗位管理数据为xlsx文件
   * @param res
   * @param req
   */
  async export(res: Response, req: SysPostReq) {
    delete req.current;
    delete req.pageSize;
    const list = await this.findAll(req);
    const options = {
      sheetName: '岗位数据',
      data: list.rows,
      header: [
        { title: '岗位序号', dataIndex: 'postId' },
        { title: '岗位编码', dataIndex: 'postCode' },
        { title: '岗位名称', dataIndex: 'postName' },
        { title: '岗位排序', dataIndex: 'postSort' },
        { title: '状态', dataIndex: 'status' },
      ],
    };
    await ExportTable(options, res as any);
  }

}