/**
 * HTTP 标准头部字段列表
 * 这些字段在重复出现时需要特殊处理
 */
const STANDARD_HTTP_HEADERS: readonly string[] = [
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
];

/**
 * 解析后的HTTP头部对象
 * 键为小写的头部字段名，值可以是字符串或字符串数组（针对set-cookie）
 */
export interface ParsedHeaders {
  [headerName: string]: string | string[];
}

/**
 * 工具函数接口（来自依赖模块 c532）
 */
interface Utils {
  /**
   * 遍历数组或对象
   */
  forEach<T>(collection: T[] | Record<string, T>, callback: (item: T, index: number | string) => void): void;
  
  /**
   * 去除字符串首尾空白
   */
  trim(str: string): string;
}

/**
 * 解析HTTP响应头字符串为结构化对象
 * 
 * @param headersString - 原始HTTP头部字符串（多行格式，每行为 "key: value"）
 * @returns 解析后的头部对象，字段名转为小写
 * 
 * @remarks
 * - 标准头部字段出现多次时会被忽略（仅保留首次出现的值）
 * - `set-cookie` 字段特殊处理：多次出现时累积为数组
 * - 其他非标准字段多次出现时用逗号+空格连接
 * 
 * @example
 *