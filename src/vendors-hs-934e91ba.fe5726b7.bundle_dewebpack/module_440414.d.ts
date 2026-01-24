/**
 * 深度比较两个数组是否相等的函数类型定义
 * 支持自定义比较器和循环引用检测
 * @module ArrayEqualityComparator
 */

/**
 * 自定义比较器函数类型
 * @param valueA - 第一个数组中的值
 * @param valueB - 第二个数组中的值
 * @param index - 当前比较元素的索引
 * @param arrayA - 第一个完整数组
 * @param arrayB - 第二个完整数组
 * @param cache - 用于循环引用检测的缓存对象
 * @returns 返回比较结果，true表示相等，false表示不相等，undefined表示使用默认比较逻辑
 */
type Comparator = (
  valueA: unknown,
  valueB: unknown,
  index: number,
  arrayA: unknown[],
  arrayB: unknown[],
  cache: WeakMap<object, unknown>
) => boolean | undefined;

/**
 * 递归相等性检查函数类型
 * @param valueA - 第一个值
 * @param valueB - 第二个值
 * @param bitmask - 比较选项位掩码
 * @param customizer - 自定义比较器（可选）
 * @param cache - 循环引用缓存
 * @returns 两个值是否深度相等
 */
type EqualFunc = (
  valueA: unknown,
  valueB: unknown,
  bitmask: number,
  customizer: Comparator | undefined,
  cache: WeakMap<object, unknown>
) => boolean;

/**
 * SetCache类型 - 用于高效集合操作的缓存结构
 */
interface SetCache {
  push(value: number): number;
  has(value: unknown): boolean;
}

/**
 * 比较选项位掩码常量
 */
declare const COMPARE_PARTIAL_FLAG = 1; // 部分比较标志：允许数组B长度大于数组A
declare const COMPARE_UNORDERED_FLAG = 2; // 无序比较标志：启用SetCache优化无序比较

/**
 * 深度比较两个数组是否相等
 * 
 * @param arrayA - 第一个待比较数组
 * @param arrayB - 第二个待比较数组
 * @param bitmask - 比较选项位掩码
 *   - 位0 (值1): 部分比较模式，允许arrayB包含arrayA的所有元素（长度可更长）
 *   - 位1 (值2): 无序比较模式，使用SetCache优化性能
 * @param customizer - 自定义比较器函数，用于特殊类型的比较逻辑
 * @param equalFunc - 递归相等性检查函数，用于深度比较嵌套值
 * @param cache - WeakMap缓存，用于检测和处理循环引用
 * @returns 如果数组相等返回true，否则返回false
 * 
 * @remarks
 * - 支持循环引用检测，避免无限递归
 * - 可选的自定义比较器允许特殊类型的比较逻辑
 * - 使用SetCache优化无序比较的性能
 * - 部分比较模式用于类似"包含"的语义检查
 */
declare function equalArrays(
  arrayA: unknown[],
  arrayB: unknown[],
  bitmask: number,
  customizer: Comparator | undefined,
  equalFunc: EqualFunc,
  cache: WeakMap<object, unknown>
): boolean;

export = equalArrays;