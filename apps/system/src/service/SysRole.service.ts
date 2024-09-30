import { Injectable, BadRequestException, HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SysRoleEntity } from "../model/entity/SysRole.entity";
import { FindManyOptions, In, Repository } from "typeorm";
import { SysRoleReq } from "../model/req/SysRoleReq";
import { ChangeRoleStatusReq } from "../model/req/ChangeRoleStatusReq";
import { ResultData } from "apps/common/src/model/ResultData";
import { SysRoleDto } from "../model/dto/SysRoleDto";
import { SysRoleMenuEntity } from "../model/entity/SysRoleMenu.entity";
import { SysDeptEntity } from "../model/entity/SysDept.entity";
import { ListToTree } from "apps/common/src/utils/normal.tool";
import { SysRoleDeptEntity } from "../model/entity/SysRoleDept.entity";
import { SysUserRoleEntity } from "../model/entity/SysUserRole.entity";
import { DataScopeEnum } from "apps/common/src/model/enum/DataScopeEnum";
import { ExportTable } from "apps/common/src/utils/export";
import { SysMenuService } from "./SysMenu.service";
import { SysRoleDao } from "../dao/SysRole.dao";


@Injectable()
export class SysRoleService {

  constructor(
    private readonly sysRoleDao:SysRoleDao,
    @InjectRepository(SysRoleEntity)
    private readonly sysRoleEntityRepository: Repository<SysRoleEntity>,
    @InjectRepository(SysRoleMenuEntity)
    private readonly sysRoleMenuEntityRepository: Repository<SysRoleMenuEntity>,
    @InjectRepository(SysDeptEntity)
    private readonly sysDeptEntityRepository: Repository<SysDeptEntity>,
    @InjectRepository(SysRoleDeptEntity)
    private readonly sysRoleDeptEntityRepository: Repository<SysRoleDeptEntity>,
    @InjectRepository(SysUserRoleEntity)
    private readonly sysUserRoleEntityRepository: Repository<SysUserRoleEntity>,
    private readonly sysMenuService: SysMenuService,
  ) {}


  async findAll(query: SysRoleReq) {
    const [list, total] = await this.sysRoleDao.selectRoleList(query);
    return {
      code:200,
      msg:"success",
      rows:list,
      total
    }
  }

  async changeStatus(changeStatusDto: ChangeRoleStatusReq) {
    const res = await this.sysRoleEntityRepository.update(
      { roleId: changeStatusDto.roleId },
      {
        status: changeStatusDto.status,
      },
    );
    return ResultData.ok(res);
  }

  async create(createRoleDto: SysRoleDto) {
    const res = await this.sysRoleEntityRepository.save(createRoleDto);
    const entity = this.sysRoleMenuEntityRepository.createQueryBuilder('entity');
    const values = createRoleDto.menuIds.map((id) => {
      return {
        roleId: res.roleId,
        menuId: id,
      };
    });
    await entity.insert().values(values).execute();
    return ResultData.ok(res);
  }

  async update(updateRoleDto: SysRoleDto) {
    const hasId = await this.sysRoleMenuEntityRepository.findOne({
      where: {
        roleId: updateRoleDto.roleId,
      },
      select: ['roleId'],
    });
    //角色已关联菜单
    if (hasId) {
      await this.sysRoleMenuEntityRepository.delete({
        roleId: updateRoleDto.roleId,
      });
    }

    //TODO 后续改造为事务
    const entity = this.sysRoleMenuEntityRepository.createQueryBuilder('entity');
    const values = updateRoleDto.menuIds.map((id) => {
      return {
        roleId: updateRoleDto.roleId,
        menuId: id,
      };
    });
    delete (updateRoleDto as any).menuIds;
    await entity.insert().values(values).execute();
    const res = await this.sysRoleEntityRepository.update({ roleId: updateRoleDto.roleId }, updateRoleDto);
    return ResultData.ok(res);
  }

  async remove(roleIds: number[]) {
    // can delete
    //  is role assigned to user
    const count = await this.sysUserRoleEntityRepository.count({
      where:{
        roleId:In(roleIds)
      }
    })
    if(count>0){
      throw new HttpException("角色已分配用户,请先解绑用户",500);
    }

    // 删除角色与菜单关联
    await this.sysRoleMenuEntityRepository.delete({
      roleId:In(roleIds)
    })
    // 删除角色与部门关联
    await this.sysRoleDeptEntityRepository.delete({
      roleId:In(roleIds)
    })

    const data = await this.sysRoleEntityRepository.update(
      { roleId: In(roleIds) },
      {
        delFlag: '1',
      },
    );
    return ResultData.ok(data);
  }


  async findOne(roleId: number) {
    const res = await this.sysRoleEntityRepository.findOne({
      where: {
        roleId: roleId,
        delFlag: '0',
      },
    });
    return ResultData.ok(res);
  }

  async deptTree(roleId: number) {
    const res = await this.sysDeptEntityRepository.find({
      where: {
        delFlag: '0',
      },
    });
    const tree = ListToTree(
      res,
      (m) => +m.deptId,
      (m) => m.deptName,
    );
    const deptIds = await this.sysRoleDeptEntityRepository.find({
      where: { roleId: roleId },
      select: ['deptId'],
    });
    const checkedKeys = deptIds.map((item) => {
      return item.deptId;
    });

    return {
      code:200,
      msg:"success",
      depts: tree,
      checkedKeys: checkedKeys,
    }
  }

  async dataScope(updateRoleDto: SysRoleDto) {
    const hasId = await this.sysRoleDeptEntityRepository.findOne({
      where: {
        roleId: updateRoleDto.roleId,
      },
      select: ['roleId'],
    });

    //角色已有权限 或者 非自定义权限 先删除权限关联
    if (hasId || updateRoleDto.dataScope !== DataScopeEnum.DATA_SCOPE_CUSTOM) {
      await this.sysRoleDeptEntityRepository.delete({
        roleId: updateRoleDto.roleId,
      });
    }

    const entity = this.sysRoleDeptEntityRepository.createQueryBuilder('entity');
    const values = updateRoleDto.deptIds.map((id) => {
      return {
        roleId: updateRoleDto.roleId,
        deptId: id,
      };
    });
    await entity.insert().values(values).execute();

    delete (updateRoleDto as any).deptIds;

    const res = await this.sysRoleEntityRepository.update({ roleId: updateRoleDto.roleId }, updateRoleDto);
    return ResultData.ok(res);
  }

  /**
   * 根据角色ID异步查找与之关联的部门ID列表。
   *
   * @param roleId - 角色的ID，用于查询与该角色关联的部门。
   * @returns 返回一个Promise，该Promise解析为一个部门ID的数组。
   */
  async findRoleWithDeptIds(roleId: number) {
    // 使用TypeORM的实体仓库查询方法，异步查找与指定角色ID相关联的部门ID。
    const res = await this.sysRoleDeptEntityRepository.find({
      select: ['deptId'],
      where: {
        roleId: roleId,
      },
    });
    // 将查询结果映射为仅包含部门ID的数组并返回。
    return res.map((item) => item.deptId);
  }

  async findRoles(where: FindManyOptions<SysRoleEntity>) {
    return await this.sysRoleEntityRepository.find(where);
  }

  /**
   * 导出角色管理数据为xlsx
   * @param res
   * @param req
   */
  async export(res: Response, req: SysRoleReq) {
    delete req.current;
    delete req.pageSize;
    const list = await this.findAll(req);
    const options = {
      sheetName: '角色数据',
      data: list.rows,
      header: [
        { title: '角色编号', dataIndex: 'roleId' },
        { title: '角色名称', dataIndex: 'roleName', width: 15 },
        { title: '权限字符', dataIndex: 'roleKey' },
        { title: '显示顺序', dataIndex: 'roleSort' },
        { title: '状态', dataIndex: 'status' },
        { title: '创建时间', dataIndex: 'createTime', width: 15 },
      ],
    };
    await ExportTable(options, res as any);
  }

  async getPermissionsByRoleIds(roleIds: (number | string)[]) {
    const list = await this.sysRoleMenuEntityRepository.find({
      where: {
        roleId: In(roleIds),
      },
      select: ['menuId'],
    });
    const menuIds = list.map((item) => item.menuId);
    const permission = await this.sysMenuService.findMany({
      where: { status: '0', menuId: In(menuIds) },
    });
    return permission;
  }
}
