/**
 * Axios default configuration module
 * Provides default settings for HTTP requests including headers, transformers, and adapters
 */

/**
 * HTTP request/response transformer function type
 */
type TransformerFunction = (data: any, headers?: Record<string, string>) => any;

/**
 * Adapter function type for handling HTTP requests
 */
type AdapterFunction = (config: AxiosRequestConfig) => Promise<AxiosResponse>;

/**
 * HTTP headers configuration
 */
interface HeadersConfig {
  /** Common headers applied to all requests */
  common: Record<string, string>;
  /** Headers specific to DELETE requests */
  delete: Record<string, string>;
  /** Headers specific to GET requests */
  get: Record<string, string>;
  /** Headers specific to HEAD requests */
  head: Record<string, string>;
  /** Headers specific to POST requests */
  post: Record<string, string>;
  /** Headers specific to PUT requests */
  put: Record<string, string>;
  /** Headers specific to PATCH requests */
  patch: Record<string, string>;
}

/**
 * Axios request configuration interface
 */
interface AxiosRequestConfig {
  /** Adapter function to handle the request */
  adapter: AdapterFunction;
  /** Array of functions to transform request data */
  transformRequest: TransformerFunction[];
  /** Array of functions to transform response data */
  transformResponse: TransformerFunction[];
  /** Request timeout in milliseconds (0 means no timeout) */
  timeout: number;
  /** Name of the cookie to use as a value for XSRF token */
  xsrfCookieName: string;
  /** Name of the HTTP header that carries the XSRF token value */
  xsrfHeaderName: string;
  /** Maximum allowed size of the response content in bytes (-1 means unlimited) */
  maxContentLength: number;
  /** Function to determine if response status is valid */
  validateStatus: (status: number) => boolean;
  /** Default headers configuration for different request methods */
  headers: HeadersConfig;
}

/**
 * Axios response interface
 */
interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: AxiosRequestConfig;
}

/**
 * Default Axios configuration
 * Exported as the module's default export
 */
declare const defaultConfig: AxiosRequestConfig;

export default defaultConfig;