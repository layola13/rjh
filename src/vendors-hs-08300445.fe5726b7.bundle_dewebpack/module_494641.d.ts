/**
 * 列表差异检测结果
 */
export interface ListDiffResult {
  /** 差异开始的索引位置 */
  index: number;
  /** 是否存在多个差异项 */
  multiple: boolean;
}

/**
 * 键提取函数类型
 * @template T 列表项类型
 */
export type KeyExtractor<T> = (item: T) => string | number;

/**
 * 查找两个列表的差异索引位置
 * 
 * 比较两个列表并返回第一个差异项的索引及是否存在多个差异
 * 
 * @template T 列表项类型
 * @param list1 第一个列表
 * @param list2 第二个列表
 * @param keyExtractor 从列表项提取唯一键的函数
 * @returns 差异结果对象，如果列表完全相同则返回null
 */
export function findListDiffIndex<T>(
  list1: T[],
  list2: T[],
  keyExtractor: KeyExtractor<T>
): ListDiffResult | null;

/**
 * 根据起始位置计算索引
 * 
 * 用于在虚拟滚动或分页场景中，根据起始位置和偏移量计算实际索引
 * 
 * @param start 起始边界
 * @param end 结束边界
 * @param center 中心位置
 * @param offset 偏移量
 * @returns 计算后的索引位置
 */
export function getIndexByStartLoc(
  start: number,
  end: number,
  center: number,
  offset: number
): number;