/**
 * 输入框提及功能的工具函数模块
 * 提供文本搜索、光标位置处理、选项过滤等功能
 */

/**
 * 过滤选项，判断选项值是否包含搜索文本
 * @param searchText - 搜索文本
 * @param option - 选项对象
 * @returns 是否匹配
 */
export function filterOption(
  searchText: string,
  option: { value?: string }
): boolean;

/**
 * 获取光标位置之前的文本内容
 * @param element - 输入框元素
 * @returns 光标前的文本
 */
export function getBeforeSelectionText(
  element: HTMLInputElement | HTMLTextAreaElement
): string;

/**
 * 查找触发字符的位置信息
 */
export interface MeasureIndex {
  /** 触发字符在文本中的位置索引 */
  location: number;
  /** 匹配到的触发字符前缀 */
  prefix: string;
}

/**
 * 在文本中查找最后一次出现的触发字符位置
 * @param text - 要搜索的文本
 * @param prefixes - 触发字符前缀，可以是单个字符串或字符串数组（如 '@', '#'）
 * @returns 最后一次出现的位置信息，未找到则返回 location: -1
 */
export function getLastMeasureIndex(
  text: string,
  prefixes?: string | string[]
): MeasureIndex;

/**
 * 文本替换的参数配置
 */
export interface ReplaceWithMeasureConfig {
  /** 触发字符的位置索引 */
  measureLocation: number;
  /** 触发字符前缀（如 '@', '#'） */
  prefix: string;
  /** 要插入的目标文本 */
  targetText: string;
  /** 当前光标位置 */
  selectionStart: number;
  /** 分隔符，用于分隔提及文本 */
  split: string;
}

/**
 * 文本替换的返回结果
 */
export interface ReplaceResult {
  /** 替换后的完整文本 */
  text: string;
  /** 新的光标位置 */
  selectionLocation: number;
}

/**
 * 在输入框中替换提及文本
 * @param originalText - 原始完整文本
 * @param config - 替换配置
 * @returns 替换后的文本和新光标位置
 */
export function replaceWithMeasure(
  originalText: string,
  config: ReplaceWithMeasureConfig
): ReplaceResult;

/**
 * 设置输入框的光标位置
 * @param element - 输入框元素
 * @param position - 光标位置索引
 */
export function setInputSelection(
  element: HTMLInputElement | HTMLTextAreaElement,
  position: number
): void;

/**
 * 搜索验证配置
 */
export interface ValidateSearchConfig {
  /** 分隔符 */
  split?: string;
}

/**
 * 验证搜索文本是否合法（不包含分隔符）
 * @param searchText - 搜索文本
 * @param config - 验证配置
 * @returns 是否为合法的搜索文本
 */
export function validateSearch(
  searchText: string,
  config: ValidateSearchConfig
): boolean;

/**
 * 从对象中移除指定的属性
 * @template T - 源对象类型
 * @template K - 要移除的键类型
 * @param source - 源对象
 * @param keys - 要移除的键名
 * @returns 移除指定属性后的新对象
 */
export function omit<T extends Record<string, any>, K extends keyof T>(
  source: T,
  ...keys: K[]
): Omit<T, K>;