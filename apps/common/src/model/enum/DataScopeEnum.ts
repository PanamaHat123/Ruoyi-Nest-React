/**
 * 数据过滤规则枚举
 */
export enum DataScopeEnum {
    /**
     * 全部数据权限
     */
    DATA_SCOPE_ALL = '1',
  
    /**
     * 自定数据权限
     */
    DATA_SCOPE_CUSTOM = '2',
  
    /**
     * 部门数据权限
     */
    DATA_SCOPE_DEPT = '3',
  
    /**
     * 部门及以下数据权限
     */
    DATA_SCOPE_DEPT_AND_CHILD = '4',
  
    /**
     * 仅本人数据权限
     */
    DATA_SCOPE_SELF = '5',
  }