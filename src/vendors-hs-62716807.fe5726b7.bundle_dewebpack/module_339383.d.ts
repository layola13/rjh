/**
 * Cookie utilities for standard browser environments
 * Provides methods to read, write, and remove cookies with proper encoding
 */

/**
 * Utility functions for type checking
 */
interface Utils {
  /** Check if the current environment is a standard browser */
  isStandardBrowserEnv(): boolean;
  /** Check if value is a number */
  isNumber(value: unknown): value is number;
  /** Check if value is a string */
  isString(value: unknown): value is string;
}

/**
 * Cookie management interface
 */
export interface CookieManager {
  /**
   * Write a cookie to the document
   * @param name - Cookie name
   * @param value - Cookie value (will be URL-encoded)
   * @param expires - Expiration timestamp in milliseconds (optional)
   * @param path - Cookie path (optional)
   * @param domain - Cookie domain (optional)
   * @param secure - Whether to set the secure flag (optional)
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
   * Read a cookie value by name
   * @param name - Cookie name to retrieve
   * @returns Decoded cookie value or null if not found
   */
  read(name: string): string | null;

  /**
   * Remove a cookie by setting its expiration to the past
   * @param name - Cookie name to remove
   */
  remove(name: string): void;
}

/**
 * Cookie manager instance
 * Returns a functional implementation in standard browser environments,
 * or no-op stubs in non-browser environments (e.g., Node.js, workers)
 */
declare const cookieManager: CookieManager;

export default cookieManager;