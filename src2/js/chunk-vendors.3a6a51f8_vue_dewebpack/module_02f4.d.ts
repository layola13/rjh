/**
 * 字符串迭代器工厂函数
 * 创建一个函数用于从字符串中提取字符，支持 Unicode 代理对（surrogate pairs）
 * 
 * @module StringIteratorFactory
 * @description 处理 UTF-16 编码的字符串，正确识别和提取 Unicode 代理对
 */

/**
 * 将值转换为整数
 */
declare function toInteger(value: unknown): number;

/**
 * 确保值可以转换为对象（非 null/undefined）
 */
declare function requireObjectCoercible(value: unknown): unknown;

/**
 * 字符串迭代器配置
 */
interface StringIteratorConfig {
  /** 是否返回完整字符而非码点值 */
  returnCharacters: boolean;
}

/**
 * 字符串迭代器函数类型
 */
interface StringIteratorFunction {
  /**
   * 从字符串中获取指定位置的字符或码点
   * 
   * @param target - 目标字符串或可转换为字符串的值
   * @param position - 要读取的位置索引
   * @returns 返回字符串或码点值，越界时返回空字符串或 undefined
   */
  (target: unknown, position: unknown): string | number | undefined;
}

/**
 * 创建字符串迭代器
 * 
 * @param returnCharacters - 如果为 true，返回字符；如果为 false，返回码点数值
 * @returns 字符串迭代器函数
 * 
 * @remarks
 * 该函数正确处理 Unicode 代理对（U+D800 到 U+DFFF 范围）：
 * - 高代理项范围：0xD800 (55296) ~ 0xDBFF (56319)
 * - 低代理项范围：0xDC00 (56320) ~ 0xDFFF (57343)
 * - 完整码点计算：(high - 0xD800) * 0x400 + (low - 0xDC00) + 0x10000
 * 
 * @example
 *