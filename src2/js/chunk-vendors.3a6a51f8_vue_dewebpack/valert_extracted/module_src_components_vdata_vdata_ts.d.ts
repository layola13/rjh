import { VNode } from 'vue';

/**
 * 排序和分组配置项
 */
export interface DataOptions {
  /** 当前页码（从1开始） */
  page: number;
  /** 每页显示的条目数（-1表示显示全部） */
  itemsPerPage: number;
  /** 排序字段数组 */
  sortBy: string[];
  /** 排序方向数组（true表示降序，false表示升序） */
  sortDesc: boolean[];
  /** 分组字段数组 */
  groupBy: string[];
  /** 分组方向数组（true表示降序，false表示升序） */
  groupDesc: boolean[];
  /** 是否必须保持排序状态 */
  mustSort: boolean;
  /** 是否允许多字段排序 */
  multiSort: boolean;
}

/**
 * 分页信息
 */
export interface PaginationInfo {
  /** 当前页码 */
  page: number;
  /** 每页条目数 */
  itemsPerPage: number;
  /** 当前页第一条数据的索引 */
  pageStart: number;
  /** 当前页最后一条数据的索引 */
  pageStop: number;
  /** 总页数 */
  pageCount: number;
  /** 数据总条目数 */
  itemsLength: number;
}

/**
 * 分组后的数据项
 */
export interface GroupedItem<T = any> {
  /** 分组名称 */
  name: string;
  /** 分组内的数据项 */
  items: T[];
}

/**
 * 作用域插槽的属性
 */
export interface ScopedProps<T = any> {
  /** 单字段排序方法 */
  sort: (key: string) => void;
  /** 多字段排序方法 */
  sortArray: (keys: string[]) => void;
  /** 分组方法 */
  group: (key: string) => void;
  /** 计算后的数据项（已排序、分页） */
  items: T[];
  /** 当前的配置选项 */
  options: DataOptions;
  /** 更新配置选项的方法 */
  updateOptions: (options: Partial<DataOptions>) => void;
  /** 分页信息 */
  pagination: PaginationInfo;
  /** 分组后的数据（如果启用分组） */
  groupedItems: GroupedItem<T>[] | null;
  /** 原始数据项的长度 */
  originalItemsLength: number;
}

/**
 * 自定义排序函数类型
 */
export type CustomSortFunction<T = any> = (
  items: T[],
  sortBy: string[],
  sortDesc: boolean[],
  locale: string
) => T[];

/**
 * 自定义分组函数类型
 */
export type CustomGroupFunction<T = any> = (
  items: T[],
  groupBy: string[],
  groupDesc: boolean[]
) => GroupedItem<T>[];

/**
 * 自定义过滤函数类型
 */
export type CustomFilterFunction<T = any> = (
  items: T[],
  search: string
) => T[];

/**
 * VData 组件
 * 
 * 提供数据排序、分组、分页和过滤功能的无渲染组件。
 * 通过作用域插槽将处理后的数据和控制方法暴露给使用者。
 * 
 * @example
 *