/**
 * Axios default configuration module
 * Defines default settings for HTTP requests including headers, transformers, and validation
 */

/**
 * HTTP method types
 */
type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options';

/**
 * HTTP headers configuration
 */
interface Headers {
  [key: string]: string | undefined;
  'Content-Type'?: string;
  'Accept'?: string;
}

/**
 * Method-specific headers configuration
 */
interface MethodHeaders {
  common: Headers;
  delete?: Headers;
  get?: Headers;
  head?: Headers;
  post?: Headers;
  put?: Headers;
  patch?: Headers;
  [key: string]: Headers | undefined;
}

/**
 * Request transformer function type
 * @param data - Request data to transform
 * @param headers - Request headers
 * @returns Transformed data
 */
type RequestTransformer = (data: any, headers?: Headers) => any;

/**
 * Response transformer function type
 * @param data - Response data to transform
 * @returns Transformed data
 */
type ResponseTransformer = (data: any) => any;

/**
 * HTTP status validator function type
 * @param status - HTTP status code
 * @returns true if status is valid, false otherwise
 */
type ValidateStatus = (status: number) => boolean;

/**
 * HTTP adapter type (e.g., XMLHttpRequest, Node.js http)
 */
type Adapter = any;

/**
 * Axios default configuration interface
 */
interface AxiosDefaults {
  /** HTTP adapter (XMLHttpRequest for browsers, http for Node.js) */
  adapter: Adapter;
  
  /** Array of request data transformers */
  transformRequest: RequestTransformer[];
  
  /** Array of response data transformers */
  transformResponse: ResponseTransformer[];
  
  /** Request timeout in milliseconds (0 = no timeout) */
  timeout: number;
  
  /** CSRF token cookie name */
  xsrfCookieName: string;
  
  /** CSRF token header name */
  xsrfHeaderName: string;
  
  /** Maximum allowed response content length in bytes (-1 = no limit) */
  maxContentLength: number;
  
  /** Function to validate HTTP status codes */
  validateStatus: ValidateStatus;
  
  /** Default headers configuration per HTTP method */
  headers: MethodHeaders;
}

/**
 * Sets Content-Type header if not already defined
 * @param headers - Headers object to modify
 * @param contentType - Content-Type value to set
 */
declare function setContentTypeIfUnset(headers: Headers | undefined, contentType: string): void;

/**
 * Default Axios configuration object
 * Exported as module default
 */
declare const defaults: AxiosDefaults;

export default defaults;
export {
  AxiosDefaults,
  Headers,
  MethodHeaders,
  RequestTransformer,
  ResponseTransformer,
  ValidateStatus,
  Adapter,
  HttpMethod,
  setContentTypeIfUnset
};