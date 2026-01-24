/**
 * Axios error enhancement function
 * Enhances an error object with Axios-specific properties and methods
 */

/**
 * Configuration object for an Axios request
 */
export interface AxiosRequestConfig {
  url?: string;
  method?: string;
  baseURL?: string;
  headers?: Record<string, string>;
  params?: unknown;
  data?: unknown;
  timeout?: number;
  [key: string]: unknown;
}

/**
 * Axios response object
 */
export interface AxiosResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: AxiosRequestConfig;
  request?: unknown;
}

/**
 * Serialized error object returned by toJSON method
 */
export interface SerializedAxiosError {
  message: string;
  name: string;
  description?: string;
  number?: number;
  fileName?: string;
  lineNumber?: number;
  columnNumber?: number;
  stack?: string;
  config?: AxiosRequestConfig;
  code?: string;
}

/**
 * Enhanced Axios error object with additional properties
 */
export interface AxiosError<T = unknown> extends Error {
  config?: AxiosRequestConfig;
  code?: string;
  request?: unknown;
  response?: AxiosResponse<T>;
  isAxiosError: boolean;
  toJSON(): SerializedAxiosError;
}

/**
 * Enhances a standard Error object with Axios-specific properties and methods
 * 
 * @param error - The base error object to enhance
 * @param config - The Axios request configuration
 * @param code - Optional error code (e.g., 'ECONNABORTED', 'ERR_NETWORK')
 * @param request - The request object that generated the error
 * @param response - The response object if received
 * @returns The enhanced error object with Axios properties
 */
export default function createAxiosError<T = unknown>(
  error: Error,
  config?: AxiosRequestConfig,
  code?: string,
  request?: unknown,
  response?: AxiosResponse<T>
): AxiosError<T>;