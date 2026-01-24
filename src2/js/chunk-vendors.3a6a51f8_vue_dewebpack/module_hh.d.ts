/**
 * 希伯来语小时数格式化函数
 * 
 * @module module_hh
 * @description 将数字小时数转换为希伯来语表示形式
 * 当小时数为2时返回特殊形式"שעתיים"（双数形式），其他情况返回数字加复数形式"שעות"
 */

/**
 * 格式化小时数为希伯来语字符串
 * 
 * @param hours - 小时数
 * @returns 希伯来语格式的小时字符串
 * 
 * @example
 * formatHours(2) // 返回 "שעתיים" (两小时的双数形式)
 * formatHours(3) // 返回 "3 שעות" (3 + 复数"小时")
 * formatHours(24) // 返回 "24 שעות"
 */
export declare function formatHours(hours: number): string;