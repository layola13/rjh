/**
 * HTTP POST request module
 * 
 * Sends a POST request to the specified URL with the provided data
 * and processes the response through a response handler.
 * 
 * @module post
 */

/**
 * Response data structure returned by the API
 * 
 * @template T - The type of the response data payload
 */
export interface ApiResponse<T = unknown> {
  /** Response status code */
  status: number;
  /** Response status text */
  statusText: string;
  /** Response data payload */
  data: T;
  /** Response headers */
  headers: Record<string, string>;
}

/**
 * Configuration options for the POST request
 */
export interface PostRequestConfig {
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Custom headers to include in the request */
  headers?: Record<string, string>;
  /** Request credentials mode */
  withCredentials?: boolean;
}

/**
 * Sends an HTTP POST request to the specified endpoint
 * 
 * @template TData - The type of data being sent in the request body
 * @template TResponse - The type of data expected in the response
 * 
 * @param url - The target endpoint URL
 * @param data - The request payload to be sent
 * @param config - Optional request configuration
 * 
 * @returns A promise that resolves with the processed response data
 * 
 * @throws {Error} When the request fails or the response cannot be processed
 * 
 * @example
 *