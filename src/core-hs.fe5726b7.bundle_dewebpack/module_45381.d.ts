/**
 * RegExp 原型方法修补工具模块
 * 
 * 用于修复和增强正则表达式相关的字符串方法（如 split、match、replace 等），
 * 确保它们在不同环境中的一致性和正确性。
 * 
 * @module RegExpMethodPatcher
 */

/**
 * 正则表达式方法的执行结果
 */
interface RegExpExecResult {
  /** 是否已完成执行 */
  done: boolean;
  /** 执行结果值（如果成功） */
  value?: unknown;
}

/**
 * 正则表达式构造器配置
 */
interface RegExpConstructorConfig {
  /** 构造函数引用 */
  constructor?: {
    /** Species symbol 配置 */
    [key: symbol]: () => RegExp;
  };
  /** 正则表达式标志 */
  flags?: string;
  /** 执行方法 */
  exec?: (str: string) => RegExpExecArray | null;
  /** Symbol 方法（如 Symbol.split, Symbol.match 等） */
  [key: symbol]: unknown;
}

/**
 * 方法修补函数的返回类型
 */
type PatchedMethodTuple = [
  // String.prototype 上的方法实现
  (this: string, regexp: RegExp, ...args: unknown[]) => unknown,
  // RegExp.prototype 上的方法实现
  (str: string, ...args: unknown[]) => unknown
];

/**
 * 修补回调函数类型
 * 
 * @param nativeMethod - 原生方法的未绑定版本
 * @param stringMethod - 字符串原型上的方法
 * @param callback - 拦截执行的回调函数
 * @returns 修补后的方法元组 [字符串方法实现, 正则方法实现]
 */
type PatchCallback = (
  symbolKey: symbol,
  methodName: string,
  interceptor: MethodInterceptor
) => PatchedMethodTuple;

/**
 * 方法拦截器函数
 * 
 * @param nativeMethod - 原生方法引用
 * @param target - 执行目标（RegExp 或 String）
 * @param thisArg - this 上下文
 * @param args - 方法参数
 * @param additionalContext - 额外的上下文信息
 * @returns 拦截结果
 */
type MethodInterceptor = (
  nativeMethod: Function,
  target: RegExp | string,
  thisArg: unknown,
  ...args: unknown[]
) => RegExpExecResult;

/**
 * 修补正则表达式相关的字符串方法
 * 
 * 此函数用于修复原生实现的缺陷或不一致性，确保：
 * 1. 方法在所有环境中行为一致
 * 2. 正确处理 Symbol.species
 * 3. 正确处理 RegExp 子类
 * 
 * @param methodName - 要修补的方法名称（如 'split', 'match', 'replace', 'search'）
 * @param stringMethodCallback - 用于生成修补实现的回调函数
 * @param options - 修补选项
 * @param forceShim - 是否强制使用 shim 实现（即使原生实现存在）
 * 
 * @example
 *