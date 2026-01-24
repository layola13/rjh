/**
 * 组合北向(North)和东向(East)的变化
 * 通过合并两个方向的变化结果来计算东北方向的变化
 * 
 * @param t - 时间或变换参数
 * @param n - 第二个参数（具体含义取决于上下文）
 * @param i - 第三个参数（具体含义取决于上下文）
 * @returns 合并后的变化对象
 */
declare function moduleNE<T = unknown, N = unknown, I = unknown, R = Record<string, unknown>>(
  t: T,
  n: N,
  i: I
): R;

/**
 * 变化处理接口
 */
interface ChangeHandler<T = unknown, N = unknown, I = unknown, R = Record<string, unknown>> {
  /** 北向变化处理 */
  n(t: T, n: N, i: I): Partial<R>;
  /** 东向变化处理 */
  e(t: T, n: N, i: I): Partial<R>;
}

/**
 * 扩展工具接口
 */
interface ExtendUtility {
  /**
   * 合并多个对象的属性
   * @param sources - 要合并的源对象
   * @returns 合并后的新对象
   */
  extend<T extends Record<string, unknown>>(...sources: Partial<T>[]): T;
}