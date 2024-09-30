import { lowercaseFirstLetter, uppercaseFirstLetter } from "../../utils";

export const menuSqlTem = (options) => {
  const {  businessName, functionName, moduleName,className,columns ,options:optionjson} = options;
  const optObj = JSON.parse(optionjson)
  const lfclassName = lowercaseFirstLetter(className);
  const primaryFiled = columns.find(filed => filed.isPk == "1");
  const primaryType = primaryFiled?(primaryFiled.javaType || "string"):"string"
  return `

-- 菜单 (Menu) SQL
insert into sys_menu (menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values('${functionName}', '${optObj.parentMenuId}', '1', '${lfclassName}', '${uppercaseFirstLetter(moduleName)}/${className}/index', 1, 0, 'C', '0', '0', '${moduleName}:${businessName}:list', '#', 'admin', sysdate(), '', null, '${functionName} Menu');

-- 操作权限父菜单 (operate permission parent menu) ID
SELECT @parentId := LAST_INSERT_ID();

-- 操作权限 (operate permission) SQL
insert into sys_menu (menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values('${functionName} query', @parentId, '1',  '#', '', 1, 0, 'F', '0', '0', '${moduleName}:${businessName}:query',        '#', 'admin', sysdate(), '', null, '');

insert into sys_menu (menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values('${functionName} add', @parentId, '2',  '#', '', 1, 0, 'F', '0', '0', '${moduleName}:${businessName}:add',          '#', 'admin', sysdate(), '', null, '');

insert into sys_menu (menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values('${functionName} edit', @parentId, '3',  '#', '', 1, 0, 'F', '0', '0', '${moduleName}:${businessName}:edit',         '#', 'admin', sysdate(), '', null, '');

insert into sys_menu (menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values('${functionName} remove', @parentId, '4',  '#', '', 1, 0, 'F', '0', '0', '${moduleName}:${businessName}:remove',       '#', 'admin', sysdate(), '', null, '');

insert into sys_menu (menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values('${functionName} export', @parentId, '5',  '#', '', 1, 0, 'F', '0', '0', '${moduleName}:${businessName}:export',       '#', 'admin', sysdate(), '', null, '');

    `;
};
