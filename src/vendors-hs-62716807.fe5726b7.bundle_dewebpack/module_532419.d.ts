/**
 * Core request dispatcher for HTTP client
 * Handles request/response transformation, header merging, and cancellation
 * @module RequestDispatcher
 */

import type { AxiosRequestConfig, AxiosResponse, AxiosError, CancelToken } from 'axios';

/**
 * Configuration object for HTTP requests
 */
export interface RequestConfig extends AxiosRequestConfig {
  /** Request cancellation token */
  cancelToken?: CancelToken;
  /** Request/response headers */
  headers: {
    /** Common headers applied to all requests */
    common?: Record<string, string>;
    /** Method-specific headers (get, post, etc.) */
    [method: string]: Record<string, string> | undefined;
  };
  /** Request body data */
  data?: unknown;
  /** HTTP method (get, post, put, delete, etc.) */
  method: string;
  /** Array of functions to transform request data */
  transformRequest?: Array<(data: unknown, headers: Record<string, string>) => unknown>;
  /** Array of functions to transform response data */
  transformResponse?: Array<(data: unknown, headers: Record<string, string>) => unknown>;
  /** Adapter function to execute the actual HTTP request */
  adapter?: (config: RequestConfig) => Promise<AxiosResponse>;
}

/**
 * HTTP response object
 */
export interface Response<T = unknown> extends AxiosResponse<T> {
  /** Response body data */
  data: T;
  /** Response headers */
  headers: Record<string, string>;
}

/**
 * HTTP error object with optional response
 */
export interface HttpError extends AxiosError {
  /** Error response if request was sent and server responded */
  response?: Response;
}

/**
 * Utility module for merging objects
 */
declare const utils: {
  merge(...objects: Array<Record<string, unknown>>): Record<string, unknown>;
  forEach<T>(
    array: T[],
    callback: (item: T, index: number, array: T[]) => void
  ): void;
};

/**
 * Transforms data based on provided transformation functions
 * @param data - Data to transform
 * @param headers - Request/response headers
 * @param transformFunctions - Array of transformation functions
 * @returns Transformed data
 */
declare function transformData(
  data: unknown,
  headers: Record<string, string>,
  transformFunctions?: Array<(data: unknown, headers: Record<string, string>) => unknown>
): unknown;

/**
 * Checks if an error is a cancellation error
 * @param error - Error to check
 * @returns True if error is a cancellation error
 */
declare function isCancel(error: unknown): boolean;

/**
 * Default configuration object
 */
declare const defaults: {
  adapter: (config: RequestConfig) => Promise<Response>;
};

/**
 * Throws an error if the request has been cancelled via cancel token
 * @param config - Request configuration
 * @throws {Cancel} If cancellation has been requested
 */
function throwIfCancellationRequested(config: RequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatches an HTTP request with full request/response transformation pipeline
 * 
 * Pipeline steps:
 * 1. Check for cancellation
 * 2. Initialize headers
 * 3. Transform request data
 * 4. Merge headers (common + method-specific + request-specific)
 * 5. Clean up method-specific header properties
 * 6. Execute request via adapter
 * 7. Transform response data
 * 8. Handle errors and transform error response data
 * 
 * @param config - Request configuration
 * @returns Promise resolving to response with transformed data
 * @throws {HttpError} Request failed or was cancelled
 */
export default function dispatchRequest(config: RequestConfig): Promise<Response> {
  // Check if request was cancelled before starting
  throwIfCancellationRequested(config);

  // Initialize headers if not present
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(config.data, config.headers, config.transformRequest);

  // Merge headers: common headers + method-specific headers + request headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  // Remove method-specific header properties to avoid sending them in request
  const methodsToClean: string[] = ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'];
  utils.forEach(methodsToClean, (method: string): void => {
    delete config.headers[method];
  });

  // Use configured adapter or default adapter
  const adapter = config.adapter || defaults.adapter;

  return adapter(config).then(
    (response: Response): Response => {
      // Check for cancellation after response received
      throwIfCancellationRequested(config);

      // Transform response data
      response.data = transformData(
        response.data,
        response.headers,
        config.transformResponse
      );

      return response;
    },
    (error: HttpError): Promise<never> => {
      // If not a cancellation error, check for cancellation and transform error response
      if (!isCancel(error)) {
        throwIfCancellationRequested(config);

        // Transform error response data if present
        if (error?.response) {
          error.response.data = transformData(
            error.response.data,
            error.response.headers,
            config.transformResponse
          );
        }
      }

      return Promise.reject(error);
    }
  );
}