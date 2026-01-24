/**
 * 通用UI插件工具模块
 * 提供资源URL解析、日志记录和字符串工具函数
 */

/**
 * 资源URL解析函数
 * @param resourcePath - 资源路径
 * @param transformType - 转换类型参数
 * @param baseUrl - 图片资源的基础URL
 * @returns 解析后的完整资源URL
 */
export function parseURL(
  resourcePath: string,
  transformType: unknown,
  baseUrl: string
): string;

/**
 * 获取插件日志记录器实例
 * @returns 配置为"plugin.CommonUI"命名空间的日志记录器
 */
export function logger(): unknown;

/**
 * 检查字符串是否以指定前缀开头
 * @param str - 要检查的字符串
 * @param prefix - 前缀字符串
 * @returns 如果str以prefix开头返回true，否则返回false
 */
export function stringStartsWith(str: string, prefix: string): boolean;