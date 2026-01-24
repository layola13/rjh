/**
 * 中文语言包模块
 * 提供建筑/窗户相关术语的中英文映射
 */

/**
 * 语言键类型定义
 * 包含所有支持的翻译键
 */
export type LanguageKey =
  | 'groundLevel'
  | 'padding'
  | 'gap'
  | 'faced'
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'both'
  | 'inside'
  | 'outside'
  | 'pulling_height'
  | 'arch_height'
  | 'radius'
  | 'arc_length'
  | 'chord_length';

/**
 * 中文语言映射表
 * 将英文键名映射到对应的中文翻译
 * 
 * @remarks
 * 主要用于建筑测量、窗户配置等场景的术语翻译
 * 
 * @example
 *