/**
 * Cookie 管理工具的类型定义
 * 提供跨浏览器的 Cookie 读写、删除等操作
 */

/**
 * Cookie 属性配置接口
 */
interface CookieAttributes {
  /**
   * Cookie 的过期时间
   * - 可以是 Date 对象表示绝对时间
   * - 可以是数字表示从现在起的天数
   */
  expires?: number | Date;
  
  /**
   * Cookie 的路径，默认为 "/"
   */
  path?: string;
  
  /**
   * Cookie 的域名
   */
  domain?: string;
  
  /**
   * 是否仅通过 HTTPS 传输
   */
  secure?: boolean;
  
  /**
   * SameSite 属性，用于 CSRF 防护
   * - "strict": 严格模式
   * - "lax": 宽松模式
   * - "none": 无限制
   */
  sameSite?: 'strict' | 'lax' | 'none';
}

/**
 * Cookie 转换器接口
 * 用于自定义 Cookie 值的编码和解码方式
 */
interface CookieConverter {
  /**
   * 读取（解码）Cookie 值
   * @param value - 原始 Cookie 值
   * @param name - Cookie 名称
   * @returns 解码后的值
   */
  read(value: string, name: string): string;
  
  /**
   * 写入（编码）Cookie 值
   * @param value - 要编码的值
   * @param name - Cookie 名称
   * @returns 编码后的值
   */
  write(value: string, name: string): string;
}

/**
 * Cookie API 接口
 */
interface CookieAPI {
  /**
   * 设置 Cookie
   * @param name - Cookie 名称
   * @param value - Cookie 值
   * @param attributes - Cookie 属性配置
   * @returns Cookie 字符串
   */
  set(name: string, value: string, attributes?: CookieAttributes): string | undefined;
  
  /**
   * 获取 Cookie
   * @param name - Cookie 名称，如果不提供则返回所有 Cookie
   * @returns Cookie 值或所有 Cookie 的键值对象
   */
  get(name: string): string | undefined;
  get(): Record<string, string>;
  
  /**
   * 删除 Cookie
   * @param name - Cookie 名称
   * @param attributes - Cookie 属性配置（必须与设置时一致）
   */
  remove(name: string, attributes?: CookieAttributes): void;
  
  /**
   * 创建新的 Cookie API 实例，使用指定的属性
   * @param attributes - 默认的 Cookie 属性
   * @returns 新的 Cookie API 实例
   */
  withAttributes(attributes: CookieAttributes): CookieAPI;
  
  /**
   * 创建新的 Cookie API 实例，使用指定的转换器
   * @param converter - 自定义的转换器
   * @returns 新的 Cookie API 实例
   */
  withConverter(converter: Partial<CookieConverter>): CookieAPI;
  
  /**
   * 当前实例使用的属性配置（只读）
   */
  readonly attributes: Readonly<CookieAttributes>;
  
  /**
   * 当前实例使用的转换器（只读）
   */
  readonly converter: Readonly<CookieConverter>;
}

/**
 * 默认导出的 Cookie API 实例
 * 使用默认的转换器和属性（path: "/"）
 */
declare const cookies: CookieAPI;

export default cookies;
export { CookieAPI, CookieAttributes, CookieConverter };