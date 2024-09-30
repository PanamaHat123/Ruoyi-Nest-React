import { Injectable } from "@nestjs/common";
import { SysMenuDao } from "../dao/SysMenu.dao";
import { buildMenus } from "../utils/MenuUtils";
import { SysMenuReq } from "../model/req/SysMenuReq";
import { InjectRepository } from "@nestjs/typeorm";
import { SysMenuEntity } from "../model/entity/SysMenu.entity";
import { FindManyOptions, In, Repository } from "typeorm";
import { ResultData } from "apps/common/src/model/ResultData";
import { SysMenuDto } from "../model/dto/SysMenuDto";
import { ListToTree, Uniq } from "apps/common/src/utils/normal.tool";
import { SysRoleMenuEntity } from "../model/entity/SysRoleMenu.entity";

@Injectable()
export class SysMenuService {

  constructor(
    private readonly sysMenuDao:SysMenuDao,
    @InjectRepository(SysMenuEntity)
    private readonly sysMenuEntityRepository: Repository<SysMenuEntity>,
    @InjectRepository(SysRoleMenuEntity)
    private readonly sysRoleMenuEntityRepository: Repository<SysRoleMenuEntity>,
  ) {
  }

  async selectMenuTreeByUserId(metaData:any):Promise<any>{
    const user = metaData.user
    const roleIds = user.roles?.map(item=>+item.roleId)
    let menuWidthRoleList = [];
    if (roleIds.includes(1)) {
      // 超管roleId=1，所有菜单权限
      menuWidthRoleList = await this.sysMenuEntityRepository.find({
        where: {
          status: '0',
        },
        select: ['menuId'],
      });
    } else {
      // 查询角色绑定的菜单
      menuWidthRoleList = await this.sysRoleMenuEntityRepository.find({
        where: { roleId: In(roleIds) },
        select: ['menuId'],
      });
    }
    // 菜单Id去重
    const menuIds = Uniq(menuWidthRoleList.map((item) => item.menuId));
    // 菜单列表
    const menuList = await this.sysMenuEntityRepository.find({
      where: {
        status: '0',
        menuId: In(menuIds),
      },
      order: {
        orderNum: 'ASC',
      },
    });
    // 构建前端需要的菜单树
    return buildMenus(menuList)
  }

  async findAll(query: SysMenuReq) {
    const res = await this.sysMenuDao.selectMenuList(query);

    return ResultData.ok(res);
  }

  async create(createMenuDto: SysMenuDto) {
    //@ts-ignore
    const res = await this.sysMenuEntityRepository.save(createMenuDto);
    return ResultData.ok(res);
  }
  async update(updateMenuDto: SysMenuDto) {
    if(!updateMenuDto.icon){
      updateMenuDto.icon = "#"
    }
    //@ts-ignore
    const res = await this.sysMenuEntityRepository.update({ menuId: updateMenuDto.menuId }, updateMenuDto);
    return ResultData.ok(res);
  }


  async remove(menuIds: number[]) {
    for (let menuId of menuIds) {
      const menu = await this.sysMenuEntityRepository.findOne({where:{ menuId: menuId}})
      if(menu){
        //delete children
        if(menu.menuType != 'F'){
          const childrenMenuIds = await this.deepSearchMenu(menu.menuId)
          if(childrenMenuIds){
            await this.remove(childrenMenuIds)
          }
        }
        await this.sysMenuEntityRepository.delete(
          { menuId: menuId }
        );
      }
    }
    return ResultData.ok();
  }
  private async deepSearchMenu(menuId: number):Promise<number[]>{

    const children = await this.sysMenuEntityRepository.find({
      where:{
        parentId:menuId
      }
    })
    if(!children){
      return null
    }
    return children.map(item=>item.menuId)
  }


  async treeSelect() {
    const res = await this.sysMenuEntityRepository.find({
      order: {
        orderNum: 'ASC',
      },
    });
    const tree = ListToTree(
      res,
      (m) => m.menuId,
      (m) => m.menuName,
    );
    return ResultData.ok(tree);
  }

  async roleMenuTreeselect(roleId: number): Promise<any> {
    const res = await this.sysMenuEntityRepository.find({
      order: {
        orderNum: 'ASC',
      },
    });
    const tree = ListToTree(
      res,
      (m) => m.menuId,
      (m) => m.menuName,
    );
    const menuIds = await this.sysRoleMenuEntityRepository.find({
      where: { roleId: roleId },
      select: ['menuId'],
    });
    const checkedKeys = menuIds.map((item) => {
      return item.menuId;
    });
    return {
      code:200,
      msg:"success",
      menus: tree,
      checkedKeys: checkedKeys
    }
  }

  async findMany(where: FindManyOptions<SysMenuEntity>) {
    return await this.sysMenuEntityRepository.find(where);
  }
}