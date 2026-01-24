/**
 * 字符类模块
 * 用于生成正则表达式字符类字符串表示（如 [a-z] 或 [^0-9]）
 * @module CharacterClass
 */

/**
 * 字符类定义接口
 * 描述正则表达式中的字符类结构
 */
interface CharacterClassDefinition {
  /**
   * 字符类的组成部分
   * - 单个字符：string
   * - 字符范围：[起始字符, 结束字符]
   */
  parts: Array<string | [string, string]>;
  
  /**
   * 是否为反向字符类
   * true: 匹配不在字符类中的字符（生成 [^...] 形式）
   * false: 匹配字符类中的字符（生成 [...] 形式）
   * @default false
   */
  inverted?: boolean;
}

/**
 * 将字符类定义转换为正则表达式字符串
 * 
 * @param characterClass - 字符类定义对象
 * @returns 格式化的正则表达式字符类字符串
 * 
 * @example
 *