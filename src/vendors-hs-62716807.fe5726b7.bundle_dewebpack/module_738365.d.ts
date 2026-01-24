/**
 * XMLHttpRequest adapter for making HTTP requests in browser environments.
 * Handles authentication, XSRF protection, upload/download progress, and request cancellation.
 * 
 * @module XHRAdapter
 */

import type { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';

/**
 * Authentication credentials for basic auth
 */
interface AuthConfig {
  /** Username for basic authentication */
  username?: string;
  /** Password for basic authentication */
  password?: string;
}

/**
 * Extended Axios request configuration with XHR-specific options
 */
interface XHRRequestConfig extends AxiosRequestConfig {
  /** Request data payload */
  data?: any;
  /** Request headers */
  headers: Record<string, string>;
  /** HTTP method (GET, POST, etc.) */
  method: string;
  /** Base URL for the request */
  baseURL?: string;
  /** Request URL path */
  url?: string;
  /** URL query parameters */
  params?: any;
  /** Custom params serializer function */
  paramsSerializer?: (params: any) => string;
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Expected response data type */
  responseType?: XMLHttpRequestResponseType;
  /** Enable credentials for cross-origin requests */
  withCredentials?: boolean;
  /** Basic authentication configuration */
  auth?: AuthConfig;
  /** XSRF cookie name to read token from */
  xsrfCookieName?: string;
  /** XSRF header name to set token in */
  xsrfHeaderName?: string;
  /** Custom timeout error message */
  timeoutErrorMessage?: string;
  /** Callback for download progress events */
  onDownloadProgress?: (progressEvent: ProgressEvent) => void;
  /** Callback for upload progress events */
  onUploadProgress?: (progressEvent: ProgressEvent) => void;
  /** Token for request cancellation */
  cancelToken?: CancelToken;
}

/**
 * Cancel token interface for aborting requests
 */
interface CancelToken {
  /** Promise that resolves when cancellation is requested */
  promise: Promise<Cancel>;
}

/**
 * Cancellation reason object
 */
interface Cancel {
  /** Cancellation message */
  message?: string;
}

/**
 * Axios response structure
 */
interface XHRResponse<T = any> {
  /** Response data */
  data: T;
  /** HTTP status code */
  status: number;
  /** HTTP status text */
  statusText: string;
  /** Response headers */
  headers: Record<string, string> | null;
  /** Original request configuration */
  config: XHRRequestConfig;
  /** Underlying XMLHttpRequest instance */
  request: XMLHttpRequest;
}

/**
 * XMLHttpRequest adapter function that returns a Promise-based HTTP request.
 * Supports all standard Axios features including auth, XSRF, progress events, and cancellation.
 * 
 * @param config - The request configuration object
 * @returns Promise that resolves with the response or rejects with an error
 * 
 * @example
 *