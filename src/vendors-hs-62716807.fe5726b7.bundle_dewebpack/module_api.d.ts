/**
 * API tracking configuration options
 */
interface ApiTrackingOptions {
  /** API endpoint URL or identifier */
  api: string;
  /** Whether the API call was successful (1) or failed (0) */
  success?: boolean | number;
  /** API call duration in milliseconds */
  time?: number;
  /** Response status code or error code */
  code?: string | number;
  /** Response message or error message (max 1000 characters) */
  msg?: string;
  /** API call start timestamp */
  begin?: number;
  /** Distributed tracing ID */
  traceId?: string;
  /** Page view ID */
  pv_id?: string;
  /** API snapshot data (removed on success, kept on failure) */
  apiSnapshot?: unknown;
  /** API domain */
  domain?: string;
  /** Custom flag for categorization */
  flag?: string | number;
  /** Document location URL (max 500 characters) */
  dl?: string;
  /** Trace origin information */
  traceOrigin?: unknown;
}

/**
 * Configuration for ignoring API calls
 */
interface IgnoreConfig {
  /** List of API patterns to ignore */
  ignoreApis?: Array<string | RegExp>;
}

/**
 * Retcode SDK instance interface
 */
interface RetcodeInstance {
  /**
   * Gets configuration value by key
   * @param key - Configuration key
   * @returns Configuration value
   */
  getConfig(key: string): unknown;
  
  /**
   * Hook called before sending tracking data
   * @param type - Event type (e.g., 'api')
   * @param data - Event data
   */
  beforeSend?(type: string, data: ApiTrackingOptions): void;
  
  /**
   * Internal logging method
   * @param type - Log type
   * @param data - Log data
   * @param sample - Whether to sample
   * @param flag - Custom flag
   */
  _lg(type: string, data: ApiTrackingOptions, sample: boolean, flag?: string | number): RetcodeInstance;
}

/**
 * Utility functions interface
 */
interface RetcodeUtils {
  /**
   * Logs warning message
   * @param message - Warning message
   */
  warn(message: string): void;
  
  /**
   * Extracts subset of properties from object
   * @param source - Source object
   * @param keys - Keys to extract
   * @returns Subset object
   */
  sub<T extends Record<string, unknown>>(source: T, keys: Array<keyof T>): Partial<T>;
  
  /**
   * Validates API endpoint format
   * @param api - API endpoint
   * @param strict - Whether to use strict validation
   * @returns Whether API is valid
   */
  checkAPI(api: string, strict: boolean): boolean;
  
  /**
   * Checks if value matches ignore rules
   * @param value - Value to check
   * @param rules - Ignore rules
   * @returns Whether value should be ignored
   */
  ignoreByRule(value: string, rules?: Array<string | RegExp>): boolean;
  
  /**
   * Decodes URL-encoded string
   * @param encoded - Encoded string
   * @returns Decoded string
   */
  decode(encoded: string): string;
}

/**
 * Tracks API call performance and status
 * 
 * @param api - API endpoint or configuration object
 * @param success - Whether the API call succeeded
 * @param time - API call duration in milliseconds
 * @param code - Response/error code
 * @param msg - Response/error message
 * @param begin - Call start timestamp
 * @param traceId - Distributed tracing ID
 * @param pv_id - Page view identifier
 * @param apiSnapshot - Snapshot data for debugging failures
 * @param domain - API domain name
 * @param flag - Custom categorization flag
 * @param _unused1 - Unused parameter (reserved)
 * @param _unused2 - Unused parameter (reserved)
 * @param traceOrigin - Trace origin metadata
 * 
 * @returns The retcode instance for method chaining
 * 
 * @example
 * // String-based call
 * api('/api/users', true, 150, 200, 'OK');
 * 
 * @example
 * // Object-based call
 * api({
 *   api: '/api/users',
 *   success: true,
 *   time: 150,
 *   code: 200,
 *   msg: 'OK'
 * });
 */
declare function api(
  api: string | ApiTrackingOptions,
  success?: boolean,
  time?: number,
  code?: string | number,
  msg?: string,
  begin?: number,
  traceId?: string,
  pv_id?: string,
  apiSnapshot?: unknown,
  domain?: string,
  flag?: string | number,
  _unused1?: unknown,
  _unused2?: unknown,
  traceOrigin?: unknown
): RetcodeInstance;

export { api, ApiTrackingOptions, IgnoreConfig, RetcodeInstance, RetcodeUtils };