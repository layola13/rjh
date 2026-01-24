/**
 * 默认分页大小常量
 */
export const DEFAULT_PAGE_SIZE: 10;

/**
 * 分页配置选项接口
 */
export interface PaginationOptions {
  /** 当前页码 */
  current?: number;
  /** 每页条数 */
  pageSize?: number;
  /** 默认当前页码 */
  defaultCurrent?: number;
  /** 默认每页条数 */
  defaultPageSize?: number;
  /** 总数据条数 */
  total?: number;
  /** 页码或每页条数改变时的回调 */
  onChange?: (current: number, pageSize: number) => void;
  /** 其他自定义属性 */
  [key: string]: any;
}

/**
 * 分页状态接口
 */
export interface PaginationState {
  /** 当前页码 */
  current: number;
  /** 每页条数 */
  pageSize: number;
}

/**
 * 增强的分页配置（包含计算后的属性）
 */
export interface EnhancedPaginationOptions extends PaginationOptions {
  /** 总数据条数 */
  total: number;
  /** 页码或每页条数改变时的回调 */
  onChange: (current: number, pageSize: number) => void;
}

/**
 * 分页状态更新函数类型
 */
export type SetPaginationState = (current?: number, pageSize?: number) => void;

/**
 * 分页 Hook 返回值类型
 */
export type UsePaginationResult = [EnhancedPaginationOptions, SetPaginationState];

/**
 * 分页 Hook - 用于管理表格或列表的分页状态
 * 
 * @param dataLength - 当前数据长度，用于在没有 total 时计算总页数
 * @param paginationOptions - 分页配置选项，传 false 则禁用分页
 * @param onPaginationChange - 分页变化时的回调函数
 * @returns 返回包含分页配置对象和状态更新函数的元组，禁用时返回空配置
 * 
 * @example
 *