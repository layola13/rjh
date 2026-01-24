/**
 * Axios HTTP client library
 * 
 * A promise-based HTTP client for the browser and Node.js
 * @module axios
 */

/**
 * Utility functions for extending objects and binding methods
 */
interface Utils {
  extend(target: any, source: any, context?: any): any;
}

/**
 * Core Axios class handling HTTP requests
 */
declare class Axios {
  constructor(config: AxiosRequestConfig);
  
  /**
   * Make an HTTP request
   * @param config - Request configuration
   * @returns Promise resolving to response
   */
  request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R>;
}

/**
 * Configuration options for Axios requests
 */
interface AxiosRequestConfig {
  url?: string;
  method?: string;
  baseURL?: string;
  headers?: Record<string, string>;
  params?: any;
  data?: any;
  timeout?: number;
  [key: string]: any;
}

/**
 * Axios response structure
 */
interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: AxiosRequestConfig;
  request?: any;
}

/**
 * Cancel token for request cancellation
 */
declare class CancelToken {
  constructor(executor: (cancel: Canceler) => void);
  static source(): CancelTokenSource;
  promise: Promise<Cancel>;
  reason?: Cancel;
}

/**
 * Cancel token source with token and cancel function
 */
interface CancelTokenSource {
  token: CancelToken;
  cancel: Canceler;
}

/**
 * Function to cancel a request
 */
type Canceler = (message?: string) => void;

/**
 * Cancel error object
 */
declare class Cancel {
  constructor(message?: string);
  message: string;
}

/**
 * Main Axios instance with factory and utility methods
 */
interface AxiosStatic extends AxiosInstance {
  /**
   * The Axios class constructor
   */
  Axios: typeof Axios;

  /**
   * Create a new Axios instance with custom configuration
   * @param config - Custom configuration to merge with defaults
   * @returns New Axios instance
   */
  create(config?: AxiosRequestConfig): AxiosInstance;

  /**
   * Cancel class for request cancellation
   */
  Cancel: typeof Cancel;

  /**
   * CancelToken class for creating cancellation tokens
   */
  CancelToken: typeof CancelToken;

  /**
   * Check if a value is a Cancel object
   * @param value - Value to check
   * @returns True if value is a Cancel object
   */
  isCancel(value: any): value is Cancel;

  /**
   * Execute multiple requests in parallel
   * @param promises - Array of promises to resolve
   * @returns Promise resolving to array of results
   */
  all<T>(promises: Array<Promise<T>>): Promise<T[]>;

  /**
   * Spread array of arguments to function parameters
   * @param callback - Function to call with spread arguments
   * @returns Function that spreads array to callback
   */
  spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R;

  /**
   * Default configuration for all requests
   */
  defaults: AxiosRequestConfig;
}

/**
 * Axios instance with request methods
 */
interface AxiosInstance {
  <T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R>;
  <T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
  
  defaults: AxiosRequestConfig;
  request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R>;
}

/**
 * Default Axios instance export
 */
declare const axios: AxiosStatic;

export default axios;
export {
  AxiosStatic,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Axios,
  Cancel,
  CancelToken,
  CancelTokenSource,
  Canceler
};