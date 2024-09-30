import * as Lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
// import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn'; // 导入本地化语言
import { DataScopeEnum } from '../model/enum/DataScopeEnum';
const dayjs = require("dayjs")
const utc = require('dayjs/plugin/utc'); // 导入插件
const timezone = require('dayjs/plugin/timezone'); // 导入插件
const isLeapYear = require('dayjs/plugin/isLeapYear'); // 导入插件

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isLeapYear); // 使用插件
dayjs.locale('zh-cn'); // 使用本地化语言
dayjs.tz.setDefault('Asia/Beijing');


/**
 * 数组转树结构
 * @param arr
 * @param getId
 * @param getLabel
 * @returns
 */
// export function ListToTree(arr, getId, getLabel) {
//   const kData = {}; // 以id做key的对象 暂时储存数据
//   const lData = []; // 最终的数据 arr
//   arr.forEach((m) => {
//     m = {
//       id: getId(m),
//       label: getLabel(m),
//       parentId: +m.parentId,
//     };
//     kData[m.id] = {
//       id: m.id,
//       label: m.label,
//       parentId: m.parentId,
//     };
//     if (m.parentId === 0) {
//       lData.push(kData[m.id]);
//     } else {
//       kData[m.parentId] = kData[m.parentId] || {};
//       kData[m.parentId].children = kData[m.parentId].children || [];
//       kData[m.parentId].children.push(kData[m.id]);
//     }
//   });
//   return lData;
// }

export function ListToTree(arr, getId, getLabel) {
  const tree = []; // 最终的树形结构数组
  const map = {}; // 以id为键的对象，用于快速查找节点

  // 首先初始化map，并创建节点对象
  arr.forEach(item => {
    const node = {
      id: getId(item),
      label: getLabel(item),
      parentId: item.parentId,
      children: []
    };
    map[node.id] = node;
  });

  // 然后根据parentId构建树形结构
  (Object.values(map) as any[]).forEach(node=> {
    if (node.parentId === 0 || node.parentId === null || !map[node.parentId]) {
      // 如果parentId为0，或者parentId不存在于map中，则视为根节点
      tree.push(node);
    } else {
      // 否则，将该节点添加到其父节点的children数组中
      if (!map[node.parentId].children) {
        map[node.parentId].children = [];
      }
      map[node.parentId].children.push(node);
    }
  });

  return tree;
}


/**
 * 获取当前时间
 * YYYY-MM-DD HH:mm:ss
 * @returns
 */
export function GetNowDate() {
  return dayjs().format('YYYY-MM-DD HH:mm:ss');
}

/**
 * 时间格式化
 * @param date
 * @param format
 * @returns
 */
export function FormatDate(date: Date, format = 'YYYY-MM-DD HH:mm:ss') {
  return date && dayjs(date).format(format);
}

/**
 * 深拷贝
 * @param obj
 * @returns
 */
export function DeepClone(obj: object) {
  return Lodash.cloneDeep(obj);
}

/**
 * 生成唯一id
 * UUID
 * @returns
 */
export function GenerateUUID(): string {
  const uuid = uuidv4();
  return uuid.replaceAll('-', '');
}

/**
 * 数组去重
 * @param list
 * @returns
 */
export function Uniq(list: Array<number | string>) {
  return Lodash.uniq(list);
}

/**
 * 分页
 * @param data
 * @param pageSize
 * @param current
 * @returns
 */
export function Paginate(data: { list: Array<any>; pageSize: number; current: number }, filterParam: any) {
  // 检查 pageSize 和 currentber 的合法性
  if (data.pageSize <= 0 || data.current < 0) {
    return [];
  }

  // 将数据转换为数组
  let arrayData = Lodash.toArray(data.list);

  if (Object.keys(filterParam).length > 0) {
    arrayData = Lodash.filter(arrayData, (item) => {
      const arr = [];
      if (filterParam.ipaddr) {
        arr.push(Boolean(item.ipaddr.includes(filterParam.ipaddr)));
      }

      if (filterParam.userName && item.username) {
        arr.push(Boolean(item.username.includes(filterParam.userName)));
      }
      return !Boolean(arr.includes(false));
    });
  }

  // 获取指定页的数据
  const pageData = arrayData.slice((data.current - 1) * data.pageSize, data.current * data.pageSize);

  return pageData;
}

/**
 * 数据范围过滤
 *
 * @param joinPoint 切点
 * @param user 用户
 * @param deptAlias 部门别名
 * @param userAlias 用户别名
 * @param permission 权限字符
 */
export async function DataScopeFilter<T>(entity: any, dataScope: DataScopeEnum): Promise<T> {
  switch (dataScope) {
    case DataScopeEnum.DATA_SCOPE_CUSTOM:
      // entity.andWhere((qb) => {
      //   const subQuery = qb.subQuery().select('user.deptId').from(User, 'user').where('user.userId = :userId').getQuery();
      //   return 'post.title IN ' + subQuery;
      // });
      break;
    default:
      break;
  }
  return entity;
}
