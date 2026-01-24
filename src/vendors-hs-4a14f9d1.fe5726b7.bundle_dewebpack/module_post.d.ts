/**
 * HTTP POST request wrapper
 * @module module_post
 */

/**
 * Performs an HTTP POST request
 * @template T - The expected response data type
 * @param url - The target URL endpoint
 * @param data - The request payload to send
 * @param config - Optional request configuration (headers, timeout, etc.)
 * @returns A promise that resolves with the response data
 */
declare function post<T = unknown>(
  url: string,
  data?: Record<string, unknown> | FormData | string,
  config?: RequestConfig
): Promise<T>;

/**
 * Request configuration options
 */
interface RequestConfig {
  /** Request headers */
  headers?: Record<string, string>;
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Enable credentials (cookies, authorization headers) */
  withCredentials?: boolean;
  /** Response type expected from server */
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer';
  /** Request signal for cancellation */
  signal?: AbortSignal;
}

export default post;