/**
 * 正则表达式方法修复模块
 * 
 * 该模块用于修复旧版JavaScript引擎中正则表达式相关方法的兼容性问题，
 * 包括 String.prototype.replace、String.prototype.split 等方法的命名捕获组支持。
 * 
 * @module RegExpMethodFixer
 */

/**
 * 正则表达式执行结果，包含命名捕获组
 */
interface RegExpExecArrayWithGroups extends RegExpExecArray {
  /** 命名捕获组对象 */
  groups?: Record<string, string>;
}

/**
 * 正则表达式替换/分割回调函数的返回值
 */
interface FixMethodResult {
  /** 操作是否完成 */
  done: boolean;
  /** 操作结果值 */
  value?: unknown;
}

/**
 * 正则表达式方法修复回调函数
 * 
 * @param nativeStringMethod - 原生字符串方法（如 String.prototype.replace）
 * @param target - 目标对象（通常是正则表达式）
 * @param string - 待处理的字符串
 * @param arg2 - 第二个参数（替换字符串或分隔符限制）
 * @param forceStringMethod - 是否强制使用字符串方法
 * @returns 修复后的执行结果
 */
type FixerCallback = (
  nativeStringMethod: Function,
  target: RegExp,
  string: string,
  arg2?: string | number,
  forceStringMethod?: boolean
) => FixMethodResult;

/**
 * 正则表达式方法修复器配置
 */
interface MethodFixerConfig {
  /** 修复后的字符串原型方法 */
  stringMethod: Function;
  /** 修复后的正则表达式原型方法 */
  regExpMethod: Function;
}

/**
 * 修复正则表达式相关方法的主函数
 * 
 * 该函数检测并修复以下问题：
 * 1. 命名捕获组支持（如 $<name> 语法）
 * 2. RegExp.prototype.split 的构造函数继承问题
 * 3. exec 方法的副作用处理
 * 
 * @param methodName - 要修复的方法名称（如 "replace"、"split"）
 * @param argsLength - 方法参数数量
 * @param fixerCallback - 修复逻辑的回调函数
 * @returns void
 * 
 * @example
 *