/**
 * 自定义工具项接口
 */
interface CustomToolItem {
  /** 工具内容数组 */
  content: unknown[];
  // 可能还有其他属性...
}

/**
 * 包含自定义工具的类或对象接口
 */
interface HasCustomTools {
  /** 自定义工具列表 */
  customTools: CustomToolItem[];
}

/**
 * 从第一个自定义工具的内容数组中移除指定索引的元素
 * 
 * @param index - 要移除的元素索引位置
 * @returns void
 * 
 * @remarks
 * - 此方法直接修改 `customTools[0].content` 数组
 * - 如果索引超出范围，splice 方法不会报错但也不会移除任何元素
 * - 必须确保 `customTools` 数组至少有一个元素
 */
declare function remove(this: HasCustomTools, index: number): void;