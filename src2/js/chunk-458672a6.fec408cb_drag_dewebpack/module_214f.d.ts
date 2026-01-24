/**
 * 正则表达式字符串方法修复工具
 * 
 * 此模块用于修复字符串原型方法（如 replace、split）在使用正则表达式时的兼容性问题。
 * 主要解决：
 * 1. 命名捕获组 (named capture groups) 的支持
 * 2. RegExp 构造器的 species 模式处理
 * 3. 确保在不同环境下行为一致
 */

/**
 * 正则表达式执行结果，包含匹配信息和命名捕获组
 */
interface RegExpExecResult extends Array<string> {
  /** 匹配的起始位置 */
  index: number;
  /** 原始输入字符串 */
  input: string;
  /** 命名捕获组对象 */
  groups?: Record<string, string>;
}

/**
 * 替换函数的执行结果
 */
interface ReplaceResult {
  /** 是否已完成处理 */
  done: boolean;
  /** 处理后的值 */
  value?: unknown;
}

/**
 * 替换回调函数类型
 * @param target - 目标函数（String.prototype 上的原生方法）
 * @param regexp - 正则表达式对象
 * @param str - 要处理的字符串
 * @param arg2 - 第二个参数（replacer 函数或分隔符）
 * @param forceStringMethod - 是否强制使用字符串方法
 * @returns 替换操作的结果
 */
type ReplacerCallback = (
  target: Function,
  regexp: RegExp,
  str: string,
  arg2: unknown,
  forceStringMethod: boolean
) => ReplaceResult;

/**
 * Symbol.species 访问器类型
 */
type SpeciesConstructor = () => RegExp;

/**
 * 扩展的 RegExp 构造器接口，支持 Symbol.species
 */
interface RegExpConstructorWithSpecies extends RegExpConstructor {
  [Symbol.species]?: SpeciesConstructor;
}

/**
 * 字符串方法修复函数
 * 
 * @param methodName - 要修复的字符串方法名称（如 'replace', 'split', 'match', 'search'）
 * @param argCount - 方法接受的参数数量（1 或 2）
 * @param fixerFactory - 修复器工厂函数，接收辅助函数并返回两个函数的元组：
 *                       [0] 新的字符串方法实现
 *                       [1] 新的 RegExp.prototype[Symbol[methodName]] 实现
 * 
 * @description
 * 此函数通过以下步骤修复字符串方法：
 * 1. 检测当前环境是否支持命名捕获组
 * 2. 检测 split 方法是否正确处理正则表达式
 * 3. 验证方法是否使用了 Symbol.species 构造器
 * 4. 如果存在兼容性问题，则替换原生实现
 */
declare function fixRegExpMethod(
  methodName: string,
  argCount: 1 | 2,
  fixerFactory: (
    isRegExp: (value: unknown) => boolean,
    symbolKey: symbol,
    nativeMethod: Function,
    replacer: ReplacerCallback
  ) => [Function, Function]
): void;

export = fixRegExpMethod;