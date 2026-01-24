/**
 * VDatePicker 工具函数模块
 * @module VDatePicker/util
 */

/**
 * 事件监听器对象类型
 */
export interface ItemTypeListeners {
  [eventName: string]: (event: Event) => void;
}

/**
 * 原生事件监听器对象类型
 */
export interface ItemTypeNativeListeners {
  [eventName: string]: (event: Event) => void;
}

/**
 * 日期格式化选项
 */
export interface LocaleFormatterOptions extends Intl.DateTimeFormatOptions {
  locale?: string;
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  day?: 'numeric' | '2-digit';
  weekday?: 'long' | 'short' | 'narrow';
}

/**
 * 日期格式化函数类型
 */
export type LocaleFormatter = (date: Date | string | number) => string;

/**
 * 创建项目类型事件监听器
 * @param type - 项目类型标识
 * @param handler - 事件处理函数
 * @returns 事件监听器对象
 */
export function createItemTypeListeners(
  type: string,
  handler: (value: any) => void
): ItemTypeListeners;

/**
 * 创建项目类型原生事件监听器
 * @param type - 项目类型标识
 * @param handler - 原生事件处理函数
 * @returns 原生事件监听器对象
 */
export function createItemTypeNativeListeners(
  type: string,
  handler: (event: Event) => void
): ItemTypeNativeListeners;

/**
 * 创建基于原生 Intl API 的日期格式化函数
 * @param locale - 语言区域标识（如 'zh-CN', 'en-US'）
 * @param options - 格式化选项
 * @returns 日期格式化函数
 * @example
 * const formatter = createNativeLocaleFormatter('zh-CN', { year: 'numeric', month: 'long' });
 * formatter(new Date()); // "2024年1月"
 */
export function createNativeLocaleFormatter(
  locale: string,
  options?: LocaleFormatterOptions
): LocaleFormatter;

/**
 * 月份变更计算函数
 * @param value - 当前日期字符串（格式: YYYY-MM 或 YYYY-MM-DD）
 * @param offset - 月份偏移量（正数为向后，负数为向前）
 * @returns 计算后的日期字符串
 * @example
 * monthChange('2024-01-15', 1); // '2024-02-15'
 * monthChange('2024-01', -1); // '2023-12'
 */
export function monthChange(value: string, offset: number): string;

/**
 * 数字填充函数（左侧补零）
 * @param value - 需要填充的数字或字符串
 * @param length - 目标长度，默认为 2
 * @returns 填充后的字符串
 * @example
 * pad(5); // '05'
 * pad(12); // '12'
 * pad(7, 3); // '007'
 */
export function pad(value: string | number, length?: number): string;