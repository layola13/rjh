/**
 * jQuery Cookie Plugin
 * A simple, lightweight jQuery plugin for reading, writing and deleting cookies.
 */

/**
 * Cookie configuration options
 */
export interface CookieOptions {
  /**
   * Expiration time in days (number) or specific Date object
   */
  expires?: number | Date;
  
  /**
   * Cookie path. Defaults to the path of the page where the cookie was created
   */
  path?: string;
  
  /**
   * Cookie domain. Defaults to the domain of the page where the cookie was created
   */
  domain?: string;
  
  /**
   * If true, the cookie transmission requires a secure protocol (HTTPS)
   */
  secure?: boolean;
}

/**
 * Cookie converter function type
 */
export type CookieConverter<T = string> = (value: string) => T;

/**
 * jQuery cookie plugin interface
 */
export interface JQueryCookie {
  /**
   * Get a cookie value
   * @param name - Cookie name
   * @returns Cookie value or undefined if not found
   */
  (name: string): string | undefined;
  
  /**
   * Get a cookie value with custom converter
   * @param name - Cookie name
   * @param converter - Function to convert the raw cookie value
   * @returns Converted cookie value or undefined if not found
   */
  <T>(name: string, converter: CookieConverter<T>): T | undefined;
  
  /**
   * Get all cookies as an object
   * @returns Object containing all cookies as key-value pairs
   */
  (): Record<string, string>;
  
  /**
   * Set a cookie
   * @param name - Cookie name
   * @param value - Cookie value (will be JSON stringified if options.json is true)
   * @param options - Cookie configuration options
   * @returns The cookie string that was set
   */
  (name: string, value: unknown, options?: CookieOptions): string;
  
  /**
   * Default options for cookie operations
   */
  defaults: CookieOptions & {
    /**
     * If true, values will be stored/retrieved as JSON
     */
    json?: boolean;
    
    /**
     * If true, cookie values will not be encoded/decoded
     */
    raw?: boolean;
  };
}

/**
 * Remove a cookie
 * @param name - Cookie name to remove
 * @param options - Cookie options (path and domain should match the original cookie)
 * @returns true if cookie was successfully removed, false otherwise
 */
export function removeCookie(name: string, options?: CookieOptions): boolean;

/**
 * jQuery static members extension
 */
declare global {
  interface JQueryStatic {
    /**
     * Cookie plugin for reading, writing and deleting cookies
     */
    cookie: JQueryCookie;
    
    /**
     * Remove a cookie
     * @param name - Cookie name to remove
     * @param options - Cookie options (path and domain should match the original cookie)
     * @returns true if cookie was successfully removed, false otherwise
     */
    removeCookie(name: string, options?: CookieOptions): boolean;
  }
}

export {};