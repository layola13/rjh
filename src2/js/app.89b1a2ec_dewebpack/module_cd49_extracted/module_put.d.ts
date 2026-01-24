/**
 * HTTP Response type representing the raw response from the HTTP client
 */
interface HttpResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

/**
 * Configuration options for HTTP requests
 */
interface HttpRequestConfig<D = unknown> {
  /** HTTP method (GET, POST, PUT, DELETE, etc.) */
  method: string;
  /** Target URL for the request */
  url: string;
  /** Request payload data */
  data?: D;
  /** Request headers */
  headers?: Record<string, string>;
  /** Request timeout in milliseconds */
  timeout?: number;
}

/**
 * Processed response data after transformation
 */
interface ProcessedResponse<T = unknown> {
  data: T;
  success: boolean;
  error?: string;
}

/**
 * Sends an HTTP PUT request to the specified URL with the provided data
 * 
 * @template TRequest - Type of the request payload
 * @template TResponse - Type of the expected response data
 * 
 * @param url - The target endpoint URL
 * @param data - The data to be sent in the request body
 * 
 * @returns A promise that resolves to the processed response data
 * 
 * @example
 *