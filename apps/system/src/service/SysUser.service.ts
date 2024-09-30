import { Repository, In, Not, EntityManager } from "typeorm";
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { SysUserEntity } from 'apps/system/src/model/entity/SysUser.entity';
import { AllocatedReq } from "../model/req/AllocatedReq";
import { ResultData } from "apps/common/src/model/ResultData";
import { SysUserRoleEntity } from "../model/entity/SysUserRole.entity";
import { SysDeptEntity } from "../model/entity/SysDept.entity";
import { AuthUserSelectAllDto } from "../model/req/AuthUserSelectAllReq";
import { AuthUserCancelReq } from "../model/req/AuthUserCancelReq";
import { SysDeptService } from "./SysDept.service";
import { SysUserReq } from "../model/req/SysUserReq";
import { DataScopeEnum } from "apps/common/src/model/enum/DataScopeEnum";
import { SysRoleService } from "./SysRole.service";
import { SysUserDto } from "../model/dto/SysUserDto";
import { GetNowDate, Uniq } from "apps/common/src/utils/normal.tool";
import * as bcrypt from 'bcrypt';
import { SYS_USER_TYPE } from "apps/common/src/constant";
import { SysUserPostEntity } from "../model/entity/SysUserPost.entity";
import { SysPostEntity } from "../model/entity/SysPost.entity";
import { ChangeUserStatusReq } from "../model/req/ChangeUserStatusReq";
import { ResetUserPwdReq } from "../model/req/ResetUserPwdReq";
import { UserAssignRoleReq } from "../model/req/UserAssignRoleReq";
import { ExportTable } from "apps/common/src/utils/export";
import { DelFlagEnum } from "apps/common/src/model/enum/DelFlagEnum";
import { UpdateProfileReq } from "../model/req/UpdateProfileReq";
import { RedisUtil } from "apps/common/src/utils/Redis.tool";
import { CacheEnum } from "apps/common/src/model/enum/CacheEnum";
import { UpdatePwdReq } from "../model/req/UpdatePwdReq";
import { SysUserDao } from "../dao/SysUser.dao";

@Injectable()
export class SysUserService {
  @InjectEntityManager()
  private manager: EntityManager;

  constructor(
    private readonly sysUserDao:SysUserDao,
    @InjectRepository(SysUserRoleEntity)
    private readonly sysUserRoleEntityRepository: Repository<SysUserRoleEntity>,
    @InjectRepository(SysUserEntity)
    private readonly sysUserEntityRepository: Repository<SysUserEntity>,
    @InjectRepository(SysUserPostEntity)
    private readonly sysUserPostEntityRepository: Repository<SysUserPostEntity>,
    @InjectRepository(SysDeptEntity)
    private readonly sysDeptEntityRepository: Repository<SysDeptEntity>,
    @InjectRepository(SysPostEntity)
    private readonly sysPostEntityRepository: Repository<SysPostEntity>,
    private readonly sysDeptService: SysDeptService,
    private readonly sysRoleService:SysRoleService,
    private readonly redisUtil: RedisUtil
  ) {}


  async getUserByUsername(username:string):Promise<SysUserEntity>{
    return this.sysUserEntityRepository.findOne({
      where:{
        delFlag:'0',
        userName:username
      }
    })
  }

  async updateLoginDate(userId:number,loginDate:Date){
    return await this.sysUserEntityRepository.update(
      {
        userId: userId,
      },
      {
        loginDate: loginDate,
      },
    );
  }

  async getUserinfo(userId: number): Promise<{ dept: SysDeptEntity; roles: Array<any>; posts: Array<SysPostEntity> } & SysUserEntity> {
    const entity = this.sysUserEntityRepository.createQueryBuilder('user');
    entity.where({
      userId: userId,
      delFlag: DelFlagEnum.NORMAL,
    });
    //联查部门详情
    entity.leftJoinAndMapOne('user.dept', SysDeptEntity, 'dept', 'dept.deptId = user.deptId');
    const roleIds = await this.getRoleIds([userId]);

    const roles = await this.sysRoleService.findRoles({
      where: {
        delFlag: '0',
        roleId: In(roleIds),
      },
    });

    const postIds = (
      await this.sysUserPostEntityRepository.find({
        where: {
          userId: userId,
        },
        select: ['postId'],
      })
    ).map((item) => item.postId);

    const posts = await this.sysPostEntityRepository.find({
      where: {
        postId: In(postIds),
      },
    });

    const data: any = await entity.getOne();
    data['roles'] = roles;
    data['posts'] = posts;

    return data;
  }



  async allocatedList(query: AllocatedReq) {
    const roleWidthRoleList = await this.sysUserRoleEntityRepository.find({
      where: {
        roleId: +query.roleId,
      },
      select: ['userId'],
    });
    if (roleWidthRoleList.length === 0) {
      return ResultData.ok({
        list: [],
        total: 0,
      });
    }
    const userIds = roleWidthRoleList.map((item) => item.userId);
    const entity = this.sysUserEntityRepository.createQueryBuilder('user');
    entity.where('user.delFlag = :delFlag', { delFlag: '0' });
    entity.andWhere('user.status = :status', { status: '0' });
    entity.andWhere('user.userId IN (:...userIds)', { userIds: userIds });
    if (query.userName) {
      entity.andWhere(`user.userName LIKE "%${query.userName}%"`);
    }

    if (query.phonenumber) {
      entity.andWhere(`user.phonenumber LIKE "%${query.phonenumber}%"`);
    }
    if(query.pageSize && query.current){
      entity.skip(query.pageSize * (query.current - 1)).take(query.pageSize);
    }
    //联查部门详情
    entity.leftJoinAndMapOne('user.dept', SysDeptEntity, 'dept', 'dept.deptId = user.deptId');
    const [list, total] = await entity.getManyAndCount();
    return  {
      code:200,
      msg:"success",
      rows:list,
      total
    };
  }

  /**
   * 获取角色未分配用户
   * @param query
   * @returns
   */
  async unallocatedList(query: AllocatedReq) {
    const roleWidthRoleList = await this.sysUserRoleEntityRepository.find({
      where: {
        roleId: +query.roleId,
      },
      select: ['userId'],
    });

    const userIds = roleWidthRoleList.map((item) => item.userId);
    const entity = this.sysUserEntityRepository.createQueryBuilder('user');
    entity.where('user.delFlag = :delFlag', { delFlag: '0' });
    entity.andWhere('user.status = :status', { status: '0' });
    entity.andWhere({
      userId: Not(In(userIds)),
    });
    if (query.userName) {
      entity.andWhere(`user.userName LIKE "%${query.userName}%"`);
    }

    if (query.phonenumber) {
      entity.andWhere(`user.phonenumber LIKE "%${query.phonenumber}%"`);
    }
    if(query.pageSize && query.current){
      entity.skip(query.pageSize * (query.current - 1)).take(query.pageSize);
    }
    //联查部门详情
    entity.leftJoinAndMapOne('user.dept', SysDeptEntity, 'dept', 'dept.deptId = user.deptId');
    const [list, total] = await entity.getManyAndCount();
    return  {
      code:200,
      msg:"success",
      rows:list,
      total
    };
  }

  async authUserSelectAll(data: AuthUserSelectAllDto) {
    const userIds = data.userIds.split(',');
    const entitys = userIds.map((userId) => {
      const sysDeptEntityEntity = new SysUserRoleEntity();
      return Object.assign(sysDeptEntityEntity, {
        userId: userId,
        roleId: +data.roleId,
      });
    });
    await this.sysUserRoleEntityRepository.save(entitys);
    return ResultData.ok();
  }

  async authUserCancel(data: AuthUserCancelReq) {
    await this.sysUserRoleEntityRepository.delete({
      userId: data.userId,
      roleId: data.roleId,
    });
    return ResultData.ok();
  }

  /**
   * 部门树
   * @returns
   */
  async deptTree() {
    const tree = await this.sysDeptService.deptTree();
    return ResultData.ok(tree);
  }

  /**
   * 用户列表
   * @param query
   * @returns
   */
  async findAll(query: SysUserReq, user: any) {
    const entity = this.sysUserEntityRepository.createQueryBuilder('user');
    entity.where('user.delFlag = :delFlag', { delFlag: '0' });

    //数据权限过滤
    if (user) {
      const roles = user.roles || [];
      const deptIds = [];
      let dataScopeAll = false;
      let dataScopeSelf = false;
      for (let index = 0; index < roles.length; index++) {
        const role = roles[index];
        if (role.dataScope === DataScopeEnum.DATA_SCOPE_ALL) {
          dataScopeAll = true;
          break;
        } else if (role.dataScope === DataScopeEnum.DATA_SCOPE_CUSTOM) {
          const roleWithDeptIds = await this.sysRoleService.findRoleWithDeptIds(role.roleId);
          deptIds.push(...roleWithDeptIds);
        } else if (role.dataScope === DataScopeEnum.DATA_SCOPE_DEPT || role.dataScope === DataScopeEnum.DATA_SCOPE_DEPT_AND_CHILD) {
          const dataScopeWidthDeptIds = await this.sysDeptService.findDeptIdsByDataScope(user.deptId, role.dataScope);
          deptIds.push(...dataScopeWidthDeptIds);
        } else if (role.dataScope === DataScopeEnum.DATA_SCOPE_SELF) {
          dataScopeSelf = true;
        }
      }

      if (!dataScopeAll) {
        if (deptIds.length > 0) {
          entity.where('user.deptId IN (:...deptIds)', { deptIds: deptIds });
        } else if (dataScopeSelf) {
          entity.where('user.userId = :userId', { userId: user.userId });
        }
      }
    }

    if (query.deptId) {
      const deptIds = await this.sysDeptService.findDeptIdsByDataScope(+query.deptId, DataScopeEnum.DATA_SCOPE_DEPT_AND_CHILD);
      entity.andWhere('user.deptId IN (:...deptIds)', { deptIds: deptIds });
    }

    if (query.userName) {
      entity.andWhere(`user.userName LIKE "%${query.userName}%"`);
    }

    if (query.nickName) {
      entity.andWhere(`user.nickName LIKE "%${query.nickName}%"`);
    }


    if (query.phonenumber) {
      entity.andWhere(`user.phonenumber LIKE "%${query.phonenumber}%"`);
    }

    if (query.status) {
      entity.andWhere('user.status = :status', { status: query.status });
    }

    if (query.params?.beginTime && query.params?.endTime) {
      entity.andWhere('user.createTime BETWEEN :start AND :end', { start: query.params.beginTime, end: query.params.endTime });
    }

    if (query.pageSize && query.current) {
      entity.skip(query.pageSize * (query.current - 1)).take(query.pageSize);
    }
    //联查部门详情
    entity.leftJoinAndMapOne('user.dept', SysDeptEntity, 'dept', 'dept.deptId = user.deptId');

    const [list, total] = await entity.getManyAndCount();

    return {
      rows:list,
      total,
      code:200,
      msg:"success"
    };
  }

  /**
   * 后台创建用户
   */
  async create(createUserDto: SysUserDto) {
    const loginDate = new Date();
    const salt = bcrypt.genSaltSync(10);
    if (createUserDto.password) {
      createUserDto.password = bcrypt.hashSync(createUserDto.password, salt);
    }

    const res = await this.sysUserEntityRepository.save({ ...createUserDto, loginDate, userType: SYS_USER_TYPE.CUSTOM });
    const postEntity = this.sysUserPostEntityRepository.createQueryBuilder('postEntity');
    const postValues = createUserDto.postIds.map((id) => {
      return {
        userId: res.userId,
        postId: id,
      };
    });
    await postEntity.insert().values(postValues).execute();

    const roleEntity = this.sysUserRoleEntityRepository.createQueryBuilder('roleEntity');
    const roleValues = createUserDto.roleIds.map((id) => {
      return {
        userId: res.userId,
        roleId: id,
      };
    });
    roleEntity.insert().values(roleValues).execute();

    return ResultData.ok();
  }

  async findOne(userId: number) {
    const data = await this.sysUserEntityRepository.findOne({
      where: {
        delFlag: '0',
        userId: userId,
      },
    });
    data.userId = +data.userId
    const dept = await this.sysDeptEntityRepository.findOne({
      where: {
        delFlag: '0',
        deptId: data.deptId,
      },
    });
    data['dept'] = dept;

    const postList = await this.sysUserPostEntityRepository.find({
      where: {
        userId: userId,
      },
    });
    const postIds = postList.map((item) => +item.postId);
    const allPosts = await this.sysPostEntityRepository.find();

    const roleIds = await this.getRoleIds([userId]);
    const allRoles = await this.sysRoleService.findRoles({
      where: {
        delFlag: '0',
      },
    });

    data['roles'] = allRoles.filter((item) => roleIds.includes(item.roleId));
    let res : any = ResultData.ok(data)
    res.postIds = postIds;
    res.roleIds = roleIds;
    res.posts = allPosts;
    res.roles = allRoles;
    return res;
  }

  /**
   * 获取角色Id列表
   * @returns
   * @param userIds
   */
  async getRoleIds(userIds: Array<number>) {
    const roleList = await this.sysUserRoleEntityRepository.find({
      where: {
        userId: In(userIds),
      },
      select: ['roleId'],
    });
    const roleIds = roleList.map((item) => +item.roleId);
    return Uniq(roleIds);
  }

  /**
   * 修改用户状态
   * @param changeStatusDto
   * @returns
   */
  async changeStatus(changeStatusDto: ChangeUserStatusReq) {
    const userData = await this.sysUserEntityRepository.findOne({
      where: {
        userId: changeStatusDto.userId,
      },
      select: ['userType'],
    });
    if (userData.userType === SYS_USER_TYPE.SYS) {
      return ResultData.fail(500, '系统角色不可停用');
    }

    const res = await this.sysUserEntityRepository.update(
      { userId: changeStatusDto.userId },
      {
        status: changeStatusDto.status,
      },
    );
    return ResultData.ok(res);
  }


  /**
   * 批量删除用户
   * @param ids
   * @returns
   */
  async remove(ids: number[]) {
    // 忽略系统角色的删除
    const data = await this.sysUserEntityRepository.update(
      { userId: In(ids), userType: Not(SYS_USER_TYPE.SYS) },
      {
        delFlag: '1',
      },
    );
    return ResultData.ok(data);
  }

  /**
   * 更新用户
   * @param updateUserDto
   * @param userId
   * @returns
   */
  async update(updateUserDto: SysUserDto, userId: number) {
    //不能修改超级管理员
    if (updateUserDto.userId === 1) throw new BadRequestException('非法操作！');

    //过滤掉设置超级管理员角色
    updateUserDto.roleIds = updateUserDto.roleIds.filter((v) => v !== 1);

    //当前用户不能修改自己的状态
    if (updateUserDto.userId === userId) {
      delete updateUserDto.status;
    }

    if (updateUserDto?.postIds?.length > 0) {
      //用户已有岗位,先删除所有关联岗位
      const hasPostId = await this.sysUserPostEntityRepository.findOne({
        where: {
          userId: updateUserDto.userId,
        },
        select: ['postId'],
      });

      if (hasPostId) {
        await this.sysUserPostEntityRepository.delete({
          userId: updateUserDto.userId,
        });
      }
      const postEntity = this.sysUserPostEntityRepository.createQueryBuilder('postEntity');
      const postValues = updateUserDto.postIds.map((id) => {
        return {
          userId: updateUserDto.userId,
          postId: id,
        };
      });
      await postEntity.insert().values(postValues).execute();
    }

    if (updateUserDto?.roleIds?.length > 0) {
      //用户已有角色,先删除所有关联角色
      const hasRoletId = await this.sysUserRoleEntityRepository.findOne({
        where: {
          userId: updateUserDto.userId,
        },
        select: ['roleId'],
      });
      if (hasRoletId) {
        await this.sysUserRoleEntityRepository.delete({
          userId: updateUserDto.userId,
        });
      }
      const roleEntity = this.sysUserRoleEntityRepository.createQueryBuilder('roleEntity');
      const roleValues = updateUserDto.roleIds.map((id) => {
        return {
          userId: updateUserDto.userId,
          roleId: id,
        };
      });
      await roleEntity.insert().values(roleValues).execute();
    }

    delete updateUserDto.password;
    delete (updateUserDto as any).dept;
    delete (updateUserDto as any).roles;
    delete (updateUserDto as any).roleIds;
    delete (updateUserDto as any).postIds;

    //更新用户信息
    const data = await this.sysUserEntityRepository.update({ userId: updateUserDto.userId }, updateUserDto);
    return ResultData.ok(data);
  }

  /**
   * 重置密码
   * @param body
   * @returns
   */
  async resetPwd(body: ResetUserPwdReq) {
    if (body.userId === 1) {
      return ResultData.fail(500, '系统用户不能重置密码');
    }
    if (body.password) {
      body.password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(10));
    }
    await this.sysUserEntityRepository.update(
      {
        userId: body.userId,
      },
      {
        password: body.password,
      },
    );
    return ResultData.ok();
  }


  /**
   * 更新用户角色信息
   * @param query
   * @returns
   */
  async updateAuthRole(query:UserAssignRoleReq) {
    // const roleIds = query.roleIds.split(',');
    const roleIds = query.roleIds;
    if (roleIds?.length > 0) {
      //用户已有角色,先删除所有关联角色
      const hasRoletId = await this.sysUserRoleEntityRepository.findOne({
        where: {
          userId: query.userId,
        },
        select: ['roleId'],
      });
      if (hasRoletId) {
        await this.sysUserRoleEntityRepository.delete({
          userId: query.userId,
        });
      }
      const roleEntity = this.sysUserRoleEntityRepository.createQueryBuilder('roleEntity');
      const roleValues = roleIds.map((id) => {
        return {
          userId: query.userId,
          roleId: id,
        };
      });
      await roleEntity.insert().values(roleValues).execute();
    }
    return ResultData.ok();
  }

  /**
   * 角色详情
   * @returns
   * @param userId
   */
  async authRole(userId: number) {
    const allRoles = await this.sysRoleService.findRoles({
      where: {
        delFlag: '0',
      },
    });

    const user = await this.sysUserEntityRepository.findOne({
      where: {
        delFlag: '0',
        userId: userId,
      },
    });

    const dept = await this.sysDeptEntityRepository.findOne({
      where: {
        delFlag: '0',
        deptId: user.deptId,
      },
    });
    user['dept'] = dept;

    const roleIds = await this.getRoleIds([userId]);
    //TODO flag用来给前端表格标记选中状态，后续优化
    user['roles'] = allRoles.filter((item) => {
      if (roleIds.includes(item.roleId)) {
        item['flag'] = true;
        return true;
      } else {
        return true;
      }
    });
    return ResultData.ok({
      roles: allRoles,
      user,
    });
  }


  /**
   * 导出用户信息数据为xlsx
   * @param res
   * @param body
   * @param user
   */
  async export(res: Response, body: SysUserReq, user) {
    delete body.current;
    delete body.pageSize;
    const list = await this.findAll(body, user);
    const options = {
      sheetName: '用户数据',
      data: list.rows,
      header: [
        { title: '用户序号', dataIndex: 'userId' },
        { title: '登录名称', dataIndex: 'userName' },
        { title: '用户昵称', dataIndex: 'nickName' },
        { title: '用户邮箱', dataIndex: 'email' },
        { title: '手机号码', dataIndex: 'phonenumber' },
        { title: '用户性别', dataIndex: 'sex' },
        { title: '账号状态', dataIndex: 'status' },
        { title: '最后登录IP', dataIndex: 'loginIp' },
        { title: '最后登录时间', dataIndex: 'loginDate', width: 20 },
        { title: '部门', dataIndex: 'dept.deptName' },
        { title: '部门负责人', dataIndex: 'dept.leader' },
      ],
    };

    await ExportTable(options, res as any);
  }


  async getUserPermissions(userId: number) {
    // 超级管理员
    if (userId === 1) {
      return ['*:*:*'];
    }
    const roleIds = await this.getRoleIds([userId]);
    const list = await this.sysRoleService.getPermissionsByRoleIds(roleIds);
    const permissions = Uniq(list.map((item) => item.perms)).filter((item) => {
      return item;
    });
    return permissions;
  }

  async updateProfile(user: any, updateProfileReq: UpdateProfileReq) {

    await this.sysUserEntityRepository.update({ userId: user.user.userId }, updateProfileReq);
    const userData = await this.redisUtil.get(`${CacheEnum.LOGIN_TOKEN_KEY}${user.token}`);
    userData.user = Object.assign(userData.user, updateProfileReq)
    await this.redisUtil.set(`${CacheEnum.LOGIN_TOKEN_KEY}${user.token}`, userData);
    return ResultData.ok();
  }


  async updatePwd(user: any, updatePwdReq: UpdatePwdReq) {
    if (updatePwdReq.oldPassword === updatePwdReq.newPassword) {
      return ResultData.fail(500, '新密码不能与旧密码相同');
    }
    if (!bcrypt.compareSync( updatePwdReq.oldPassword,user.user.password)) {
      return ResultData.fail(500, '修改密码失败，旧密码错误');
    }
    const password = bcrypt.hashSync(updatePwdReq.newPassword, bcrypt.genSaltSync(10));
    await this.sysUserEntityRepository.update({ userId: user.user.userId }, { password: password });
    return ResultData.ok();
  }


  deleteFileds(userData) {
    const posts = userData["posts"]
    const roles = userData["roles"]
    const dept = userData["dept"]

    if(dept){
      delete dept.createTime;
      delete dept.createBy;
      delete dept.updateBy;
      delete dept.updateTime;
    }
    roles?.forEach(role=>{
      delete role.createTime;
      delete role.createBy;
      delete role.updateBy;
      delete role.updateTime;
    })
    posts?.forEach(post=>{
      delete post.createTime;
      delete post.createBy;
      delete post.updateBy;
      delete post.updateTime;
    })
    delete userData.password;
    delete userData.createTime;
    delete userData.createBy;
    delete userData.updateBy;
    delete userData.updateTime;
    delete userData.loginIp;
  }

}
