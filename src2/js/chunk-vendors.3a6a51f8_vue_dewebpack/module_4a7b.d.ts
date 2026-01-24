/**
 * Utility module for merging Axios configuration objects.
 * Implements a sophisticated merge strategy for different config property types.
 */

/**
 * Utility functions for object manipulation and type checking.
 * Imported from the utils module (c532).
 */
interface Utils {
  /** Iterates over an array and executes a callback for each element */
  forEach<T>(arr: T[], callback: (item: T) => void): void;
  /** Checks if a value is an object */
  isObject(value: unknown): value is Record<string, unknown>;
  /** Performs a deep merge of objects */
  deepMerge<T extends Record<string, unknown>>(...objects: T[]): T;
}

/**
 * Axios request configuration interface.
 * Defines all possible options for making HTTP requests.
 */
interface AxiosRequestConfig {
  /** The server URL that will be used for the request */
  url?: string;
  /** The request method to be used when making the request */
  method?: string;
  /** URL parameters to be sent with the request */
  params?: Record<string, unknown>;
  /** The data to be sent as the request body */
  data?: unknown;
  /** Custom headers to be sent */
  headers?: Record<string, string>;
  /** HTTP Basic authentication credentials */
  auth?: { username: string; password: string };
  /** Proxy server configuration */
  proxy?: { host: string; port: number; auth?: { username: string; password: string } };
  /** Base URL to prepend to `url` unless `url` is absolute */
  baseURL?: string;
  /** Functions to transform request data before sending */
  transformRequest?: Array<(data: unknown, headers?: Record<string, string>) => unknown>;
  /** Functions to transform response data */
  transformResponse?: Array<(data: unknown) => unknown>;
  /** Custom function to serialize params */
  paramsSerializer?: (params: Record<string, unknown>) => string;
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Indicates whether cross-site requests should include credentials */
  withCredentials?: boolean;
  /** Custom adapter to handle request execution */
  adapter?: (config: AxiosRequestConfig) => Promise<unknown>;
  /** The type of data that the server will respond with */
  responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';
  /** The name of the cookie to use as a value for xsrf token */
  xsrfCookieName?: string;
  /** The name of the http header that carries the xsrf token value */
  xsrfHeaderName?: string;
  /** Callback for monitoring upload progress */
  onUploadProgress?: (progressEvent: ProgressEvent) => void;
  /** Callback for monitoring download progress */
  onDownloadProgress?: (progressEvent: ProgressEvent) => void;
  /** Maximum allowed size of the http response content in bytes */
  maxContentLength?: number;
  /** Function to determine whether to resolve or reject the promise for a given HTTP response status */
  validateStatus?: (status: number) => boolean;
  /** Maximum number of redirects to follow */
  maxRedirects?: number;
  /** Custom http agent for node.js */
  httpAgent?: unknown;
  /** Custom https agent for node.js */
  httpsAgent?: unknown;
  /** Token for request cancellation */
  cancelToken?: unknown;
  /** Unix socket path to use for the request */
  socketPath?: string;
  /** Allow additional properties */
  [key: string]: unknown;
}

/**
 * Merges two Axios configuration objects with intelligent property handling.
 * 
 * Implements three merge strategies:
 * 1. Override strategy: For critical request properties (url, method, params, data) - uses target config only
 * 2. Deep merge strategy: For nested objects (headers, auth, proxy) - merges objects recursively
 * 3. Default strategy: For all other properties - prefers target, falls back to defaults
 * 
 * @param defaultConfig - The default configuration object to merge from
 * @param targetConfig - The target configuration object to merge into (takes precedence)
 * @returns A new merged configuration object
 */
export default function mergeConfig(
  defaultConfig: AxiosRequestConfig,
  targetConfig?: AxiosRequestConfig
): AxiosRequestConfig;