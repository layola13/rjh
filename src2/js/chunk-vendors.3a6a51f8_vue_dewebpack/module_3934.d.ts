/**
 * URL解析和同源检测工具模块
 * 
 * 提供URL解析功能和同源策略检测，根据环境返回不同的实现：
 * - 浏览器环境：使用DOM API解析URL并检测同源
 * - 非浏览器环境：始终返回true（允许所有请求）
 */

/**
 * URL解析结果接口
 * 描述解析后的URL各个组成部分
 */
interface ParsedURL {
  /** 完整的URL字符串 */
  href: string;
  /** 协议部分（不含冒号），如 'http', 'https' */
  protocol: string;
  /** 主机名和端口，如 'example.com:8080' */
  host: string;
  /** 查询字符串（不含问号），如 'key=value' */
  search: string;
  /** 锚点部分（不含井号），如 'section' */
  hash: string;
  /** 主机名（不含端口），如 'example.com' */
  hostname: string;
  /** 端口号，如 '8080' */
  port: string;
  /** 路径名（始终以/开头），如 '/path/to/resource' */
  pathname: string;
}

/**
 * 同源检测函数类型
 * 
 * @param url - 要检测的URL字符串或已解析的URL对象
 * @returns 如果URL与当前页面同源则返回true，否则返回false
 */
type OriginChecker = (url: string | ParsedURL) => boolean;

/**
 * 工具函数接口（从c532模块导入）
 */
interface Utils {
  /** 检测当前是否为标准浏览器环境 */
  isStandardBrowserEnv(): boolean;
  /** 检测给定值是否为字符串 */
  isString(value: unknown): value is string;
}

/**
 * 解析URL字符串为结构化对象
 * 使用DOM anchor元素进行解析，确保路径名始终以/开头
 * 
 * @param url - 要解析的URL字符串
 * @param anchorElement - 用于解析的anchor DOM元素
 * @param needsIEFix - 是否需要IE浏览器的兼容性修复
 * @returns 解析后的URL对象
 */
declare function parseURL(
  url: string,
  anchorElement: HTMLAnchorElement,
  needsIEFix: boolean
): ParsedURL;

/**
 * 创建同源检测器
 * 
 * 根据运行环境返回不同的实现：
 * - 标准浏览器环境：返回基于DOM的同源检测函数
 * - 非浏览器环境（Node.js等）：返回始终为true的函数
 * 
 * @param utils - 工具函数模块
 * @returns 同源检测函数
 */
declare function createOriginChecker(utils: Utils): OriginChecker;

/**
 * 默认导出：同源检测函数
 * 
 * 浏览器环境示例：
 *