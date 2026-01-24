/**
 * 分组配置模块
 * @module module_groupBy
 */

/**
 * 分组配置选项
 */
interface GroupByOptions {
  /** 分组字段或字段数组 */
  groupBy: string | string[];
}

/**
 * 更新选项的配置对象
 */
interface UpdateOptions extends Partial<GroupByOptions> {
  [key: string]: unknown;
}

/**
 * 包含 updateOptions 方法的组件/实例接口
 */
interface ComponentWithOptions {
  /**
   * 更新组件选项
   * @param options - 要更新的选项对象
   */
  updateOptions(options: UpdateOptions): void;
}

/**
 * 设置分组字段
 * @param groupByValue - 分组字段名称或字段名称数组
 * @this ComponentWithOptions
 */
declare function setGroupBy(this: ComponentWithOptions, groupByValue: string | string[]): void;