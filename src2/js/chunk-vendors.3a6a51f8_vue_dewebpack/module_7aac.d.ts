/**
 * Cookie utilities module for browser environments
 * Provides cookie read/write/remove operations with browser detection
 * @module CookieUtils
 */

import * as Utils from 'c532';

/**
 * Cookie操作接口
 * Interface for cookie operations
 */
interface ICookieHandler {
  /**
   * 写入Cookie
   * Write a cookie to the browser
   * @param name - Cookie名称 / Cookie name
   * @param value - Cookie值 / Cookie value
   * @param expires - 过期时间戳(毫秒) / Expiration timestamp in milliseconds
   * @param path - Cookie路径 / Cookie path
   * @param domain - Cookie域名 / Cookie domain
   * @param secure - 是否仅HTTPS传输 / Whether to use secure flag (HTTPS only)
   */
  write(
    name: string,
    value: string,
    expires?: number,
    path?: string,
    domain?: string,
    secure?: boolean
  ): void;

  /**
   * 读取Cookie
   * Read a cookie value by name
   * @param name - Cookie名称 / Cookie name
   * @returns Cookie值,不存在则返回null / Cookie value or null if not found
   */
  read(name: string): string | null;

  /**
   * 删除Cookie
   * Remove a cookie by name
   * @param name - Cookie名称 / Cookie name
   */
  remove(name: string): void;
}

/**
 * 标准浏览器环境的Cookie处理器
 * Cookie handler for standard browser environments
 */
declare const cookieHandler: ICookieHandler;

export default cookieHandler;