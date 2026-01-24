/**
 * Cookie management and locale utilities
 */

/**
 * Cookie options for setting browser cookies
 */
interface CookieOptions {
  /** Maximum age of the cookie in milliseconds */
  maxage?: number;
  /** Cookie expiration date */
  expires?: Date;
  /** Cookie path */
  path?: string;
  /** Cookie domain */
  domain?: string;
  /** Whether the cookie requires a secure connection (HTTPS) */
  secure?: boolean;
}

/**
 * Application parameters
 */
interface AppParams {
  /** Tenant identifier (e.g., "fp") */
  tenant: string;
}

/**
 * Application context
 */
interface AppContext {
  /** Application parameters */
  appParams: AppParams;
}

/**
 * Query parameters from URL or request
 */
interface QueryParams {
  /** Language code */
  lang?: string;
  /** Locale identifier */
  locale?: string;
}

/**
 * Cookie storage object with key-value pairs
 */
type CookieStorage = Record<string, string>;

/**
 * Global HSApp configuration
 */
declare global {
  const HSApp: {
    Config: {
      /** List of supported language codes */
      LOCAL_SUPPORT_LANGUAGE: readonly string[];
    };
  };
}

/**
 * Retrieves all cookies as a key-value object
 * @returns Object containing all decoded cookie key-value pairs
 */
export function getCookies(): CookieStorage;

/**
 * Sets a cookie with the specified name, value, and options
 * @param name - Cookie name
 * @param value - Cookie value (will be URI encoded)
 * @param options - Cookie configuration options
 */
export function setCookie(name: string, value: string | null, options?: CookieOptions): void;

/**
 * Caches the source page information in cookies
 * @param sourcePage - Source page identifier to cache
 */
export function cacheSourcePage(sourcePage: string | null | undefined): void;

/**
 * Determines and returns the appropriate locale based on query parameters and existing cookies
 * @param context - Application context containing tenant information
 * @param queryParams - Query parameters containing lang or locale
 * @param defaultLocale - Default locale to use if none is found
 * @returns Resolved locale string
 */
export function getLocale(context: AppContext, queryParams: QueryParams, defaultLocale: string): string;