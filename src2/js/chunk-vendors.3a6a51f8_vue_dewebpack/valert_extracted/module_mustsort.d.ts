/**
 * 更新排序配置的选项接口
 * @interface SortOptions
 */
interface SortOptions {
  /**
   * 是否强制排序
   * 当设置为 true 时，将强制执行排序逻辑
   */
  mustSort: boolean;
}

/**
 * 配置更新方法的参数接口
 * @interface UpdateOptionsParams
 */
interface UpdateOptionsParams {
  /**
   * 是否强制排序
   */
  mustSort?: boolean;
  
  /**
   * 其他可能的配置选项
   */
  [key: string]: unknown;
}

/**
 * 排序模块接口
 * @interface SortModule
 */
interface SortModule {
  /**
   * 更新排序相关的配置选项
   * 
   * @param options - 包含配置选项的对象
   * @returns void
   * 
   * @example
   *