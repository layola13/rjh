/**
 * Module: module_se
 * 
 * 合并start和end变更操作的结果
 * @module se
 */

/**
 * 变更操作的返回类型（需根据实际业务调整）
 */
interface ChangeResult {
  [key: string]: unknown;
}

/**
 * 扩展工具的接口定义
 */
interface ExtendUtility {
  /**
   * 深度合并多个对象
   * @param target - 目标对象
   * @param sources - 源对象
   * @returns 合并后的对象
   */
  extend<T extends object>(target: T, ...sources: Partial<T>[]): T;
}

/**
 * 包含start和end变更方法的内部对象
 */
interface ChangeHandlers {
  /**
   * 开始变更处理
   * @param target - 目标参数
   * @param name - 名称参数
   * @param index - 索引参数
   */
  s(target: unknown, name: unknown, index: unknown): ChangeResult;
  
  /**
   * 结束变更处理
   * @param target - 目标参数
   * @param name - 名称参数
   * @param index - 索引参数
   */
  e(target: unknown, name: unknown, index: unknown): ChangeResult;
}

/**
 * 模块主类（需根据实际上下文补全类名）
 */
declare class ModuleSE {
  /** 内部变更处理器 */
  private _change: ChangeHandlers;
  
  /**
   * 合并start和end变更的结果
   * @param t - 第一个参数（需根据业务含义重命名）
   * @param n - 第二个参数（需根据业务含义重命名）
   * @param i - 第三个参数（需根据业务含义重命名）
   * @returns 合并后的变更结果
   */
  (t: unknown, n: unknown, i: unknown): ChangeResult;
}

export default ModuleSE;