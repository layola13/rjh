/**
 * 更新每页显示的项目数量
 * @param itemsPerPage - 每页要显示的项目数量
 */
declare function updateItemsPerPage(itemsPerPage: number): void;

/**
 * 选项配置接口
 */
interface Options {
  /** 每页显示的项目数量 */
  itemsPerPage: number;
  [key: string]: unknown;
}

/**
 * 包含 updateOptions 方法的类或对象的接口
 */
interface ItemsPerPageUpdater {
  /**
   * 更新选项配置
   * @param options - 要更新的选项对象
   */
  updateOptions(options: Partial<Options>): void;
}

/**
 * 模块：itemsPerPage
 * 用于更新分页配置中每页显示项目数量的方法
 * 
 * @param this - 包含 updateOptions 方法的上下文对象
 * @param itemsPerPage - 每页要显示的项目数量
 * @returns 无返回值
 */
declare function module_itemsPerPage(
  this: ItemsPerPageUpdater,
  itemsPerPage: number
): void;

export { module_itemsPerPage, ItemsPerPageUpdater, Options, updateItemsPerPage };