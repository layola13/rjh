/**
 * Module: module_ry
 * Original ID: ry
 */

/**
 * 执行rx方法的包装函数
 * @param e - 传递给rx方法的参数
 * @returns rx方法的返回值
 */
declare function ry<T = unknown, R = unknown>(this: { rx: (param: T) => R }, e: T): R;

/**
 * 如果这是某个类的方法，可能的类型定义：
 */
interface ModuleRyContext<TParam = unknown, TReturn = unknown> {
  /**
   * 内部rx方法
   */
  rx(param: TParam): TReturn;
  
  /**
   * 公开的ry方法，调用内部rx方法
   */
  ry(e: TParam): TReturn;
}