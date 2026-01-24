/**
 * 归并排序实现模块
 * 
 * 提供了一个高效的归并排序算法，结合了插入排序优化小数组的性能。
 * 对于长度小于8的数组使用插入排序，否则使用归并排序。
 * 
 * @module MergeSort
 */

/**
 * 比较函数类型定义
 * 
 * @template T - 被比较元素的类型
 * @param a - 第一个比较元素
 * @param b - 第二个比较元素
 * @returns 负数表示a < b，0表示a === b，正数表示a > b
 */
type CompareFn<T> = (a: T, b: T) => number;

/**
 * 数组切片函数类型定义
 * 
 * @template T - 数组元素类型
 * @param array - 源数组
 * @param start - 起始索引
 * @param end - 结束索引（可选）
 * @returns 切片后的新数组
 */
type ArraySliceFn = <T>(array: T[], start: number, end?: number) => T[];

/**
 * 归并排序主函数
 * 
 * 递归地将数组分成两半进行排序，然后合并结果。
 * 当数组长度小于8时，使用插入排序优化性能。
 * 
 * @template T - 数组元素类型
 * @param array - 待排序的数组
 * @param compareFn - 比较函数，用于确定元素的排序顺序
 * @returns 排序后的数组（原地修改）
 */
declare function mergeSort<T>(array: T[], compareFn: CompareFn<T>): T[];

/**
 * 插入排序实现
 * 
 * 适用于小数组的高效排序算法。
 * 通过将每个元素插入到已排序部分的正确位置来完成排序。
 * 
 * @template T - 数组元素类型
 * @param array - 待排序的数组
 * @param compareFn - 比较函数
 * @returns 排序后的数组（原地修改）
 */
declare function insertionSort<T>(array: T[], compareFn: CompareFn<T>): T[];

/**
 * 合并两个已排序的数组
 * 
 * 将两个已排序的子数组合并回原数组的相应位置。
 * 
 * @template T - 数组元素类型
 * @param target - 目标数组（用于存储合并结果）
 * @param left - 左侧已排序数组
 * @param right - 右侧已排序数组
 * @param compareFn - 比较函数
 * @returns 合并后的数组
 */
declare function merge<T>(
  target: T[],
  left: T[],
  right: T[],
  compareFn: CompareFn<T>
): T[];

export = mergeSort;