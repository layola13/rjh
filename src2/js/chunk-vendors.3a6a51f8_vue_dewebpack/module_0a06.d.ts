/**
 * Axios Core Module
 * Defines the main Axios class with request/response interceptors and HTTP method helpers
 */

/**
 * Configuration object for an HTTP request
 */
export interface RequestConfig {
  /** Request URL */
  url?: string;
  /** HTTP method (get, post, put, delete, etc.) */
  method?: string;
  /** Base URL to prepend to relative URLs */
  baseURL?: string;
  /** Request headers */
  headers?: Record<string, string>;
  /** URL parameters to be sent with the request */
  params?: Record<string, any>;
  /** Custom function to serialize params */
  paramsSerializer?: (params: Record<string, any>) => string;
  /** Request body data */
  data?: any;
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Indicates whether credentials should be sent with the request */
  withCredentials?: boolean;
  /** Response type (arraybuffer, blob, document, json, text, stream) */
  responseType?: string;
  /** Custom configuration properties */
  [key: string]: any;
}

/**
 * Interceptor handler functions
 */
export interface InterceptorHandler<T> {
  /** Handler called on successful request/response */
  fulfilled: (value: T) => T | Promise<T>;
  /** Handler called on request/response error */
  rejected: (error: any) => any;
}

/**
 * Interceptor manager for handling request/response interceptors
 */
export interface InterceptorManager<T> {
  /** Register an interceptor handler */
  use(fulfilled: (value: T) => T | Promise<T>, rejected?: (error: any) => any): number;
  /** Unregister an interceptor by ID */
  eject(id: number): void;
  /** Iterate over all registered interceptors */
  forEach(fn: (handler: InterceptorHandler<T>) => void): void;
}

/**
 * Response object returned by Axios
 */
export interface AxiosResponse<T = any> {
  /** Response data */
  data: T;
  /** HTTP status code */
  status: number;
  /** HTTP status message */
  statusText: string;
  /** Response headers */
  headers: Record<string, string>;
  /** Request configuration that generated this response */
  config: RequestConfig;
  /** Original request object */
  request?: any;
}

/**
 * Main Axios class for making HTTP requests
 */
export default class Axios {
  /** Default configuration for all requests */
  defaults: RequestConfig;

  /** Request and response interceptors */
  interceptors: {
    /** Interceptors applied before the request is sent */
    request: InterceptorManager<RequestConfig>;
    /** Interceptors applied after the response is received */
    response: InterceptorManager<AxiosResponse>;
  };

  /**
   * Creates an instance of Axios
   * @param defaults - Default configuration to apply to all requests
   */
  constructor(defaults: RequestConfig);

  /**
   * Make an HTTP request
   * @param config - Request configuration
   * @returns Promise resolving to the response
   */
  request<T = any>(config: RequestConfig): Promise<AxiosResponse<T>>;

  /**
   * Make an HTTP request with URL as first parameter
   * @param url - Request URL
   * @param config - Optional request configuration
   * @returns Promise resolving to the response
   */
  request<T = any>(url: string, config?: RequestConfig): Promise<AxiosResponse<T>>;

  /**
   * Generate a full request URI with parameters
   * @param config - Request configuration including url and params
   * @returns Complete URI string without leading '?'
   */
  getUri(config: RequestConfig): string;

  /**
   * Make a DELETE request
   * @param url - Request URL
   * @param config - Optional request configuration
   * @returns Promise resolving to the response
   */
  delete<T = any>(url: string, config?: RequestConfig): Promise<AxiosResponse<T>>;

  /**
   * Make a GET request
   * @param url - Request URL
   * @param config - Optional request configuration
   * @returns Promise resolving to the response
   */
  get<T = any>(url: string, config?: RequestConfig): Promise<AxiosResponse<T>>;

  /**
   * Make a HEAD request
   * @param url - Request URL
   * @param config - Optional request configuration
   * @returns Promise resolving to the response
   */
  head<T = any>(url: string, config?: RequestConfig): Promise<AxiosResponse<T>>;

  /**
   * Make an OPTIONS request
   * @param url - Request URL
   * @param config - Optional request configuration
   * @returns Promise resolving to the response
   */
  options<T = any>(url: string, config?: RequestConfig): Promise<AxiosResponse<T>>;

  /**
   * Make a POST request
   * @param url - Request URL
   * @param data - Request body data
   * @param config - Optional request configuration
   * @returns Promise resolving to the response
   */
  post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<AxiosResponse<T>>;

  /**
   * Make a PUT request
   * @param url - Request URL
   * @param data - Request body data
   * @param config - Optional request configuration
   * @returns Promise resolving to the response
   */
  put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<AxiosResponse<T>>;

  /**
   * Make a PATCH request
   * @param url - Request URL
   * @param data - Request body data
   * @param config - Optional request configuration
   * @returns Promise resolving to the response
   */
  patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<AxiosResponse<T>>;
}