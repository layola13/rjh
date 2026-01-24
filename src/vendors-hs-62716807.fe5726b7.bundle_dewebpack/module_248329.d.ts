/**
 * URL解析结果接口
 * 包含解析后的URL各个组成部分
 */
interface ParsedURL {
  /** 完整的URL地址 */
  href: string;
  /** 协议部分（如 http, https），不包含冒号 */
  protocol: string;
  /** 主机部分，包含hostname和port */
  host: string;
  /** 查询字符串部分，不包含问号前缀 */
  search: string;
  /** 哈希部分，不包含井号前缀 */
  hash: string;
  /** 主机名部分 */
  hostname: string;
  /** 端口号 */
  port: string;
  /** 路径部分，始终以斜杠开头 */
  pathname: string;
}

/**
 * 工具模块接口
 * 提供字符串检查和浏览器环境检测功能
 */
interface Utils {
  /** 检查值是否为字符串类型 */
  isString(value: unknown): value is string;
  /** 检查当前是否为标准浏览器环境 */
  isStandardBrowserEnv(): boolean;
}

/**
 * 同源检查函数类型
 * @param url - 要检查的URL，可以是字符串或已解析的URL对象
 * @returns 如果URL与当前页面同源返回true，否则返回false
 */
type IsSameOriginChecker = (url: string | ParsedURL) => boolean;

/**
 * 导出的模块类型
 * 在标准浏览器环境下返回同源检查函数，否则返回始终为true的函数
 */
declare const isSameOriginModule: IsSameOriginChecker | (() => true);

export = isSameOriginModule;