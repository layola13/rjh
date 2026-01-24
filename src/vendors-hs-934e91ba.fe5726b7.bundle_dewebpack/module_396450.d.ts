/**
 * Module: module_396450
 * Original ID: 396450
 * 
 * 根据输入值的类型选择合适的转换策略。
 * 该模块对数组和非数组值采用不同的处理逻辑。
 */

/**
 * 检查值是否为数组类型（来自 module_280873）
 */
declare function isArray<T = unknown>(value: unknown): value is T[];

/**
 * 处理数组类型的值（来自 module_34034）
 * @template T - 数组元素类型
 * @param value - 输入的数组值
 * @returns 处理后的结果
 */
declare function handleArrayValue<T>(value: T[]): unknown;

/**
 * 处理非数组类型的值（来自 module_69882）
 * @template T - 输入值类型
 * @param value - 输入的非数组值
 * @returns 处理后的结果
 */
declare function handleNonArrayValue<T>(value: T): unknown;

/**
 * 根据输入值类型动态选择处理策略的主函数
 * 
 * @template T - 输入值的类型
 * @param value - 待处理的值，可以是任意类型
 * @returns 根据值类型返回相应的处理结果：
 *          - 如果是数组，使用 handleArrayValue 处理
 *          - 如果不是数组，使用 handleNonArrayValue 处理
 * 
 * @example
 * // 处理数组
 * const arrayResult = processValue([1, 2, 3]);
 * 
 * @example
 * // 处理非数组
 * const objectResult = processValue({ key: 'value' });
 */
declare function processValue<T>(value: T): T extends unknown[] 
  ? ReturnType<typeof handleArrayValue<T[number]>>
  : ReturnType<typeof handleNonArrayValue<T>>;

export default processValue;