/**
 * Vue Cookie 管理插件类型定义
 * 提供浏览器 Cookie 的读写、删除等操作能力
 */

/**
 * Cookie 配置选项接口
 */
export interface CookieConfig {
  /** Cookie 过期时间（默认: "1d"） */
  expires: string | number | Date;
  /** Cookie 路径（默认: ";path=/"） */
  path: string;
  /** Cookie 域名（默认: ""） */
  domain: string;
  /** 是否启用 Secure 标志（默认: ""） */
  secure: string;
  /** SameSite 属性（默认: ";SameSite=Lax"） */
  sameSite: string;
}

/**
 * 过期时间单位类型
 * - y: 年
 * - m: 月
 * - d: 天
 * - h: 小时
 * - min: 分钟
 * - s: 秒
 */
export type ExpiresUnit = 'y' | 'm' | 'd' | 'h' | 'min' | 's';

/**
 * 过期时间字符串格式（如 "1d", "30min", "2y"）
 */
export type ExpiresString = `${number}${ExpiresUnit}`;

/**
 * 过期时间类型（可以是数字秒数、时间字符串或 Date 对象）
 */
export type ExpiresValue = number | ExpiresString | Date | null;

/**
 * Cookie 值类型（支持字符串、对象等）
 */
export type CookieValue = string | Record<string, any>;

/**
 * Vue 插件接口
 */
export interface VueConstructor {
  prototype: Record<string, any>;
  $cookies?: VueCookies;
}

/**
 * Vue Cookie 插件主接口
 */
export interface VueCookies {
  /**
   * Vue 插件安装方法
   * @param Vue - Vue 构造函数
   */
  install(Vue: VueConstructor): void;

  /**
   * 全局配置 Cookie 默认选项
   * @param expires - 过期时间（默认: "1d"）
   * @param path - Cookie 路径（默认: "/"）
   * @param domain - Cookie 域名（可选）
   * @param secure - 是否启用 Secure 标志（可选）
   * @param sameSite - SameSite 属性值（默认: "Lax"）
   * @example
   *