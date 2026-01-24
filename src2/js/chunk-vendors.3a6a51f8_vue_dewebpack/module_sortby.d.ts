/**
 * 排序配置模块
 * @module module_sortBy
 */

/**
 * 排序选项类型
 * 可以是单个排序字段或排序字段数组
 */
export type SortByOption = string | string[] | SortConfig | SortConfig[];

/**
 * 排序配置接口
 */
export interface SortConfig {
  /** 排序字段名 */
  field: string;
  /** 排序方向 */
  order?: 'asc' | 'desc';
}

/**
 * 更新选项接口
 */
export interface UpdateOptions {
  /** 排序配置 */
  sortBy?: SortConfig[];
}

/**
 * 包含 sortBy 方法的类或对象接口
 */
export interface SortByModule {
  /**
   * 更新排序选项
   * @param options - 包含 sortBy 配置的选项对象
   */
  updateOptions(options: UpdateOptions): void;

  /**
   * 设置排序方式
   * @param sortBy - 排序配置，会被转换为数组格式
   */
  sortBy(sortBy: SortByOption): void;
}

/**
 * 工具函数：将值包装为数组
 * @param value - 任意值
 * @returns 包装后的数组
 */
export function wrapInArray<T>(value: T | T[]): T[];