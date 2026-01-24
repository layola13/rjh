/**
 * 自定义工具项接口
 */
interface CustomToolItem {
  /** 工具内容数组 */
  content: unknown[];
}

/**
 * 模块移除功能的宿主类接口
 */
interface ModuleRemoveHost {
  /** 自定义工具集合 */
  customTools: CustomToolItem[];
  
  /**
   * 从第一个自定义工具的内容数组中移除指定索引的项
   * @param index - 要移除的项的索引位置
   * @returns void
   */
  remove(index: number): void;
}

/**
 * 从自定义工具的内容数组中移除指定索引的元素
 * @param this - 包含 customTools 属性的上下文对象
 * @param index - 要移除的元素索引
 */
declare function remove(this: ModuleRemoveHost, index: number): void;

export { remove, ModuleRemoveHost, CustomToolItem };