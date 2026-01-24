/**
 * Module: module_sw
 * 
 * 合并两个变更操作的结果
 * 该函数通过调用 _change.s 和 _change.w 方法，并将结果进行扩展合并
 * 
 * @param t - 第一个参数，通常表示目标对象或类型标识
 * @param n - 第二个参数，通常表示新值或配置项
 * @param i - 第三个参数，可能表示索引或额外选项
 * @returns 合并后的变更对象
 */
declare function moduleSw<T extends Record<string, unknown>>(
  t: unknown,
  n: unknown,
  i: unknown
): T;

/**
 * 内部变更处理器接口
 */
interface ChangeHandler {
  /**
   * S方法 - 执行第一种变更操作
   * @param args - 可变参数列表
   * @returns 部分变更结果
   */
  s(...args: unknown[]): Record<string, unknown>;

  /**
   * W方法 - 执行第二种变更操作
   * @param t - 目标参数
   * @param n - 新值参数
   * @param i - 索引/选项参数
   * @returns 部分变更结果
   */
  w(t: unknown, n: unknown, i: unknown): Record<string, unknown>;
}

/**
 * 对象扩展工具接口
 */
interface ExtendUtility {
  /**
   * 扩展/合并对象
   * @param sources - 要合并的源对象列表
   * @returns 合并后的对象
   */
  extend<T extends Record<string, unknown>>(...sources: Record<string, unknown>[]): T;
}

export { moduleSw, ChangeHandler, ExtendUtility };