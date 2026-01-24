/**
 * HTTP PUT request module
 * 
 * Executes an HTTP PUT request to update a resource on the server.
 * 
 * @module module_put
 * @since 1.0.0
 */

/**
 * Configuration options for PUT requests
 */
interface PutRequestConfig {
  /** Request headers */
  headers?: Record<string, string>;
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Request credentials mode */
  credentials?: 'include' | 'omit' | 'same-origin';
  /** Additional fetch options */
  [key: string]: unknown;
}

/**
 * Generic response type for PUT requests
 */
interface PutResponse<T = unknown> {
  /** Response data */
  data: T;
  /** HTTP status code */
  status: number;
  /** Response headers */
  headers: Record<string, string>;
}

/**
 * Sends an HTTP PUT request to update a resource
 * 
 * @template TData - Type of the response data
 * @template TPayload - Type of the request payload
 * 
 * @param url - The target URL for the PUT request
 * @param data - The payload data to send in the request body
 * @param config - Optional configuration for the request
 * 
 * @returns A promise that resolves with the server response
 * 
 * @example
 *