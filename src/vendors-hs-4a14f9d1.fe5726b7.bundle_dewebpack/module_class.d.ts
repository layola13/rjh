/**
 * 字符类生成器
 * 将字符类的AST节点转换为正则表达式的字符类字符串表示形式
 * 
 * @module CharacterClassFormatter
 */

/**
 * 表示字符类中的单个字符或字符范围
 */
type CharacterPart = string | [string, string];

/**
 * 字符类的AST节点结构
 */
interface CharacterClassNode {
  /** 字符类的组成部分，可以是单个字符或字符范围 */
  parts: CharacterPart[];
  /** 是否为取反字符类（使用 ^ 符号） */
  inverted: boolean;
}

/**
 * 格式化字符类节点为正则表达式字符串
 * 
 * @param node - 字符类AST节点
 * @returns 格式化后的字符类字符串，如 "[a-z]" 或 "[^0-9]"
 * 
 * @example
 * formatCharacterClass({ parts: [['a', 'z']], inverted: false }) 
 * // 返回: "[a-z]"
 * 
 * @example
 * formatCharacterClass({ parts: ['a', 'b', ['0', '9']], inverted: true })
 * // 返回: "[^ab0-9]"
 */
export declare function formatCharacterClass(node: CharacterClassNode): string;

/**
 * 转义单个字符用于正则表达式
 * 辅助函数，用于处理特殊字符的转义
 * 
 * @param char - 需要转义的字符
 * @returns 转义后的字符串
 */
declare function escapeCharacter(char: string): string;