/**
 * HTTP request adapter using XMLHttpRequest for browser environments.
 * Handles authentication, CSRF protection, request/response transformation, and cancellation.
 * 
 * @module XHRAdapter
 * @dependencies
 * - c532: Utils module for type checking and iteration
 * - 467f: Response settlement handler
 * - 30b5: URL builder with query parameters
 * - 83b9: URL combiner for baseURL and relative URL
 * - c345: Response headers parser
 * - 3934: Same-origin URL checker
 * - 2d83: Error factory for creating structured errors
 * - 7aac: Cookie reader utility
 */

/**
 * Authentication credentials for basic auth
 */
export interface AuthConfig {
  /** Username for basic authentication */
  username?: string;
  /** Password for basic authentication */
  password?: string;
}

/**
 * Cancel token for request cancellation
 */
export interface CancelToken {
  /** Promise that resolves when cancellation is requested */
  promise: Promise<Cancel>;
}

/**
 * Cancellation reason object
 */
export interface Cancel {
  /** Human-readable cancellation message */
  message?: string;
}

/**
 * HTTP request configuration
 */
export interface RequestConfig {
  /** Request payload data */
  data?: any;
  /** HTTP request headers */
  headers: Record<string, string>;
  /** Authentication configuration */
  auth?: AuthConfig;
  /** Base URL to prepend to relative URLs */
  baseURL?: string;
  /** Request URL (absolute or relative) */
  url: string;
  /** HTTP method (GET, POST, etc.) */
  method: string;
  /** Request timeout in milliseconds */
  timeout: number;
  /** Query parameters to append to URL */
  params?: Record<string, any>;
  /** Custom serializer for query parameters */
  paramsSerializer?: (params: Record<string, any>) => string;
  /** Expected response type (json, text, blob, etc.) */
  responseType?: XMLHttpRequestResponseType;
  /** Whether to send credentials (cookies) with cross-origin requests */
  withCredentials?: boolean;
  /** Name of cookie containing CSRF token */
  xsrfCookieName?: string;
  /** Name of HTTP header to set with CSRF token */
  xsrfHeaderName?: string;
  /** Custom timeout error message */
  timeoutErrorMessage?: string;
  /** Progress callback for downloads */
  onDownloadProgress?: (event: ProgressEvent) => void;
  /** Progress callback for uploads */
  onUploadProgress?: (event: ProgressEvent) => void;
  /** Token for request cancellation */
  cancelToken?: CancelToken;
}

/**
 * HTTP response structure
 */
export interface Response<T = any> {
  /** Response payload data */
  data: T;
  /** HTTP status code */
  status: number;
  /** HTTP status text */
  statusText: string;
  /** Response headers */
  headers: Record<string, string> | null;
  /** Original request configuration */
  config: RequestConfig;
  /** Underlying XMLHttpRequest instance */
  request: XMLHttpRequest;
}

/**
 * Utility functions for type checking and iteration
 */
declare const utils: {
  isFormData(value: any): value is FormData;
  isStandardBrowserEnv(): boolean;
  isUndefined(value: any): value is undefined;
  forEach<T>(obj: Record<string, T>, fn: (value: T, key: string) => void): void;
};

/**
 * Settles the promise based on response validity
 * 
 * @param resolve - Promise resolve function
 * @param reject - Promise reject function
 * @param response - HTTP response object
 */
declare function settle(
  resolve: (value: Response) => void,
  reject: (reason: any) => void,
  response: Response
): void;

/**
 * Builds a complete URL with query parameters
 * 
 * @param url - Base URL
 * @param params - Query parameters object
 * @param paramsSerializer - Optional custom serializer
 * @returns Complete URL with serialized query string
 */
declare function buildURL(
  url: string,
  params?: Record<string, any>,
  paramsSerializer?: (params: Record<string, any>) => string
): string;

/**
 * Combines base URL with relative URL
 * 
 * @param baseURL - Base URL
 * @param relativeURL - Relative URL path
 * @returns Combined absolute URL
 */
declare function combineURLs(baseURL: string | undefined, relativeURL: string): string;

/**
 * Parses raw HTTP headers string into object
 * 
 * @param rawHeaders - Raw headers string from getAllResponseHeaders()
 * @returns Parsed headers object
 */
declare function parseHeaders(rawHeaders: string): Record<string, string>;

/**
 * Checks if URL is same-origin (for CSRF protection)
 * 
 * @param requestURL - URL to check
 * @returns True if URL is same-origin
 */
declare function isURLSameOrigin(requestURL: string): boolean;

/**
 * Creates a structured error object
 * 
 * @param message - Error message
 * @param config - Request configuration
 * @param code - Error code (e.g., 'ECONNABORTED')
 * @param request - XMLHttpRequest instance
 * @returns Structured error object
 */
declare function createError(
  message: string,
  config: RequestConfig,
  code: string | null,
  request: XMLHttpRequest
): Error;

/**
 * Cookie utilities
 */
declare const cookies: {
  /**
   * Reads a cookie value by name
   * 
   * @param name - Cookie name
   * @returns Cookie value or undefined
   */
  read(name: string): string | undefined;
};

/**
 * XMLHttpRequest-based HTTP adapter for browser environments.
 * 
 * Features:
 * - Supports all HTTP methods
 * - Handles authentication (Basic Auth)
 * - CSRF protection via cookies/headers
 * - Request/response progress tracking
 * - Request cancellation
 * - Timeout handling
 * - Automatic FormData Content-Type handling
 * 
 * @param config - Request configuration object
 * @returns Promise resolving to HTTP response
 * 
 * @example
 *