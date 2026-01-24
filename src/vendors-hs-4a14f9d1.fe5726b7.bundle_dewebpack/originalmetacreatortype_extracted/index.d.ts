/**
 * HTTP Request Methods Module Bundle
 * 
 * This module provides type definitions for HTTP request method utilities.
 * Supports POST, SET, PUT, and GET operations.
 */

/**
 * Performs an HTTP POST request
 * 
 * @param url - The target URL for the POST request
 * @param data - The data payload to send in the request body
 * @param options - Optional configuration for the request
 * @returns Promise resolving to the response data
 */
export function post<T = unknown, D = unknown>(
  url: string,
  data?: D,
  options?: RequestOptions
): Promise<ResponseData<T>>;

/**
 * Performs a SET operation (typically for updating or setting data)
 * 
 * @param url - The target URL for the SET request
 * @param data - The data to set or update
 * @param options - Optional configuration for the request
 * @returns Promise resolving to the response data
 */
export function set<T = unknown, D = unknown>(
  url: string,
  data?: D,
  options?: RequestOptions
): Promise<ResponseData<T>>;

/**
 * Performs an HTTP PUT request
 * 
 * @param url - The target URL for the PUT request
 * @param data - The data payload to send in the request body
 * @param options - Optional configuration for the request
 * @returns Promise resolving to the response data
 */
export function put<T = unknown, D = unknown>(
  url: string,
  data?: D,
  options?: RequestOptions
): Promise<ResponseData<T>>;

/**
 * Performs an HTTP GET request
 * 
 * @param url - The target URL for the GET request
 * @param params - Optional query parameters
 * @param options - Optional configuration for the request
 * @returns Promise resolving to the response data
 */
export function get<T = unknown>(
  url: string,
  params?: Record<string, string | number | boolean>,
  options?: RequestOptions
): Promise<ResponseData<T>>;

/**
 * HTTP request configuration options
 */
export interface RequestOptions {
  /** Request headers */
  headers?: Record<string, string>;
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Whether to include credentials (cookies) */
  withCredentials?: boolean;
  /** Response type expected */
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer';
  /** Callback for upload progress */
  onUploadProgress?: (progressEvent: ProgressEvent) => void;
  /** Callback for download progress */
  onDownloadProgress?: (progressEvent: ProgressEvent) => void;
}

/**
 * Standard HTTP response structure
 */
export interface ResponseData<T = unknown> {
  /** Response data payload */
  data: T;
  /** HTTP status code */
  status: number;
  /** HTTP status text */
  statusText: string;
  /** Response headers */
  headers: Record<string, string>;
}

/**
 * Progress event for tracking upload/download progress
 */
export interface ProgressEvent {
  /** Number of bytes loaded */
  loaded: number;
  /** Total number of bytes */
  total: number;
  /** Whether the total size is computable */
  lengthComputable: boolean;
}