/**
 * Module: module_sw
 * Original ID: sw
 * 
 * 该模块用于合并和扩展变更对象，通过调用内部的 s 和 w 变更处理器
 */

/**
 * 变更处理器接口
 * 定义了处理不同类型变更的方法
 */
interface ChangeHandler<T = unknown, N = unknown, I = unknown> {
  /**
   * S类型变更处理器
   * @param args - 传递给处理器的参数
   * @returns 处理后的部分结果对象
   */
  s(...args: unknown[]): Partial<Record<string, unknown>>;
  
  /**
   * W类型变更处理器
   * @param t - 第一个参数
   * @param n - 第二个参数
   * @param i - 第三个参数
   * @returns 处理后的部分结果对象
   */
  w(t: T, n: N, i: I): Partial<Record<string, unknown>>;
}

/**
 * 扩展工具接口
 * 用于合并多个对象
 */
interface ExtendUtility {
  /**
   * 扩展/合并多个对象
   * @param target - 目标对象
   * @param sources - 源对象
   * @returns 合并后的对象
   */
  extend<T extends Record<string, unknown>>(
    target: Partial<T>,
    ...sources: Array<Partial<Record<string, unknown>>>
  ): T;
}

/**
 * 模块上下文接口
 * 定义了模块实例的内部结构
 */
interface ModuleContext<T = unknown, N = unknown, I = unknown> {
  /**
   * 变更处理器实例
   */
  _change: ChangeHandler<T, N, I>;
}

/**
 * 模块 SW 函数声明
 * 
 * 该函数合并两个变更处理器的结果：
 * 1. 调用 _change.s 处理器并传入所有参数
 * 2. 调用 _change.w 处理器并传入特定的三个参数
 * 3. 使用 extend 工具合并两个结果
 * 
 * @param this - 模块上下文，包含 _change 处理器
 * @param t - 第一个参数，传递给两个处理器
 * @param n - 第二个参数，传递给两个处理器
 * @param i - 第三个参数，传递给两个处理器
 * @param e - 扩展工具实例
 * @returns 合并后的变更对象
 * 
 * @example
 *