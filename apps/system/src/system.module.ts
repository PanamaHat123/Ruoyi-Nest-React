import { Module } from '@nestjs/common';
import { SysUserService } from "./service/SysUser.service";
import { SysMenuController } from "./controller/SysMenu.controller";
import { SysUserController } from "./controller/SysUser.controller";
import { SysMenuService } from "./service/SysMenu.service";
import { SysMenuDao } from "./dao/SysMenu.dao";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SysMenuEntity } from "./model/entity/SysMenu.entity";
import { SysDictDataEntity } from "./model/entity/SysDictData.entity";
import { SysDictDataService } from "./service/SysDictData.service";
import { SysDictDataController } from "./controller/SysDictData.controller";
import { SysDictTypeEntity } from "./model/entity/SysDictType.entity";
import { SysDictTypeService } from "./service/SysDictType.service";
import { SysDictTypeController } from "./controller/SysDictType.controller";
import { SysDeptService } from "./service/SysDept.service";
import { SysDeptController } from "./controller/SysDept.controller";
import { SysDeptEntity } from "./model/entity/SysDept.entity";
import { SysPostService } from "./service/SysPost.service";
import { SysPostController } from "./controller/SysPost.controller";
import { SysPostEntity } from "./model/entity/SysPost.entity";
import { SysConfigEntity } from "./model/entity/SysConfig.entity";
import { SysConfigController } from "./controller/SysConfig.controller";
import { SysConfigService } from "./service/SysConfig.service";
import { SysNoticeEntity } from "./model/entity/SysNotice.entity";
import { SysNoticeController } from "./controller/SysNotice.controller";
import { SysNoticeService } from "./service/SysNotice.service";
import { SysRoleEntity } from "./model/entity/SysRole.entity";
import { SysRoleService } from "./service/SysRole.service";
import { SysRoleController } from "./controller/SysRole.controller";
import { SysRoleMenuEntity } from "./model/entity/SysRoleMenu.entity";
import { SysRoleDeptEntity } from "./model/entity/SysRoleDept.entity";
import { SysLogininforEntity } from "./model/entity/SysLogininfor.entity";
import { SysLogininforController } from "./controller/SysLogininfor.controller";
import { SysLogininforService } from "./service/SysLogininfor.service";
import { SysOperlogEntity } from "./model/entity/SysOperlog.entity";
import { SysOperlogController } from "./controller/SysOperlog.controller";
import { SysOperlogService } from "./service/SysOperlog.service";
import { SysUserPostEntity } from "./model/entity/SysUserPost.entity";
import { SysUserRoleEntity } from "./model/entity/SysUserRole.entity";
import { SysUserEntity } from "./model/entity/SysUser.entity";
import { SysConfigDao } from "./dao/SysConfig.dao";
import { SysDeptDao } from "./dao/SysDept.dao";
import { SysDictDataDao } from "./dao/SysDictData.dao";
import { SysDictTypeDao } from "./dao/SysDictType.dao";
import { SysLogininforDao } from "./dao/SysLogininfor.dao";
import { SysNoticeDao } from "./dao/SysNotice.dao";
import { SysOperlogDao } from "./dao/SysOperlog.dao";
import { SysPostDao } from "./dao/SysPost.dao";
import { SysRoleDao } from "./dao/SysRole.dao";
import { SysUserDao } from "./dao/SysUser.dao";
import { SysOnlineController } from "./controller/SysOnline.controller";
import { SysOnlineService } from "./service/SysOnline.service";


@Module({
  imports: [
    // database table entity
    TypeOrmModule.forFeature([
      SysMenuEntity,SysDictDataEntity,SysDictTypeEntity,SysDeptEntity,SysPostEntity,
      SysConfigEntity,SysNoticeEntity,SysRoleEntity,SysRoleMenuEntity,SysRoleDeptEntity,
      SysLogininforEntity,SysOperlogEntity,SysUserPostEntity,SysUserRoleEntity,SysUserEntity,
      SysUserRoleEntity,
    ])
  ],
  controllers: [
    SysMenuController,SysUserController,SysDictDataController,SysDictTypeController,
    SysDeptController,SysPostController,SysConfigController,SysNoticeController,SysOnlineController,
    SysRoleController,SysLogininforController,SysOperlogController,
  ],
  providers: [
    //service
    ...[
      SysUserService,SysMenuService,SysDictDataService,SysDictTypeService,SysOnlineService,
      SysDeptService,SysPostService,SysConfigService,SysNoticeService,SysRoleService,
      SysLogininforService,SysOperlogService,
    ],
    // dao
    ...[
      SysMenuDao,SysConfigDao,SysDeptDao,SysDictDataDao,SysDictTypeDao,SysLogininforDao,
      SysNoticeDao,SysOperlogDao,SysPostDao,SysRoleDao,SysUserDao,
    ],

  ],
  exports:[SysUserService,SysLogininforService,SysOperlogService]
})
export class SystemModule {}
