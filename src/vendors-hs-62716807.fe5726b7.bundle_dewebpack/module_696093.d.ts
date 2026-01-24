/**
 * Axios TypeScript Type Definitions
 * Based on Axios v1.13.2
 */

/**
 * HTTP method types supported by Axios
 */
export type Method =
  | 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH';

/**
 * Response types that can be requested
 */
export type ResponseType =
  | 'arraybuffer'
  | 'blob'
  | 'document'
  | 'json'
  | 'text'
  | 'stream';

/**
 * Basic authentication credentials
 */
export interface AxiosBasicCredentials {
  username: string;
  password: string;
}

/**
 * Proxy configuration options
 */
export interface AxiosProxyConfig {
  host: string;
  port: number;
  auth?: {
    username: string;
    password: string;
  };
  protocol?: string;
}

/**
 * Adapter function type for custom request adapters
 */
export type AxiosAdapter = (config: AxiosRequestConfig) => Promise<AxiosResponse>;

/**
 * Core request configuration interface
 */
export interface AxiosRequestConfig<D = any> {
  url?: string;
  method?: Method;
  baseURL?: string;
  transformRequest?: AxiosRequestTransformer | AxiosRequestTransformer[];
  transformResponse?: AxiosResponseTransformer | AxiosResponseTransformer[];
  headers?: AxiosRequestHeaders;
  params?: any;
  paramsSerializer?: ParamsSerializerOptions;
  data?: D;
  timeout?: number;
  timeoutErrorMessage?: string;
  withCredentials?: boolean;
  withXSRFToken?: boolean | ((config: AxiosRequestConfig) => boolean);
  adapter?: AxiosAdapter | AxiosAdapter[];
  auth?: AxiosBasicCredentials;
  responseType?: ResponseType;
  responseEncoding?: string;
  xsrfCookieName?: string;
  xsrfHeaderName?: string;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;
  maxContentLength?: number;
  maxBodyLength?: number;
  validateStatus?: (status: number) => boolean;
  maxRedirects?: number;
  beforeRedirect?: (options: Record<string, any>, responseDetails: {headers: Record<string, string>}) => void;
  socketPath?: string | null;
  httpAgent?: any;
  httpsAgent?: any;
  proxy?: AxiosProxyConfig | false;
  cancelToken?: CancelToken;
  signal?: AbortSignal;
  decompress?: boolean;
  transitional?: TransitionalOptions;
  env?: {
    FormData?: new (...args: any[]) => object;
    Blob?: new (...args: any[]) => object;
  };
  formSerializer?: FormSerializerOptions;
  allowAbsoluteUrls?: boolean;
  fetchOptions?: Record<string, any>;
}

/**
 * Request headers type
 */
export type AxiosRequestHeaders = Record<string, string | number | boolean>;

/**
 * Response headers type
 */
export type AxiosResponseHeaders = Record<string, string> & {
  "set-cookie"?: string[];
};

/**
 * HTTP response interface
 */
export interface AxiosResponse<T = any, D = any> {
  data: T;
  status: number;
  statusText: string;
  headers: AxiosResponseHeaders;
  config: AxiosRequestConfig<D>;
  request?: any;
}

/**
 * Error response interface for failed requests
 */
export interface AxiosError<T = unknown, D = any> extends Error {
  config?: AxiosRequestConfig<D>;
  code?: string;
  request?: any;
  response?: AxiosResponse<T, D>;
  isAxiosError: boolean;
  status?: number;
  toJSON: () => object;
  cause?: Error;
}

/**
 * Promise-based response type
 */
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

/**
 * Interceptor manager for requests
 */
export interface AxiosInterceptorManager<V> {
  use(
    onFulfilled?: (value: V) => V | Promise<V>,
    onRejected?: (error: any) => any,
    options?: AxiosInterceptorOptions
  ): number;
  eject(id: number): void;
  clear(): void;
  forEach(fn: (interceptor: AxiosInterceptor<V>) => void): void;
}

/**
 * Individual interceptor configuration
 */
export interface AxiosInterceptor<V> {
  fulfilled: (value: V) => V | Promise<V>;
  rejected?: (error: any) => any;
  synchronous?: boolean;
  runWhen?: (config: AxiosRequestConfig) => boolean;
}

/**
 * Options for interceptor registration
 */
export interface AxiosInterceptorOptions {
  synchronous?: boolean;
  runWhen?: (config: AxiosRequestConfig) => boolean;
}

/**
 * Main Axios instance interface
 */
export interface AxiosInstance {
  (config: AxiosRequestConfig): AxiosPromise;
  (url: string, config?: AxiosRequestConfig): AxiosPromise;
  
  defaults: AxiosRequestConfig;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
  
  getUri(config?: AxiosRequestConfig): string;
  request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R>;
  get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  head<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  options<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  patch<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  postForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  putForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  patchForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
}

/**
 * Static Axios interface with factory method
 */
export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance;
  
  Cancel: typeof Cancel;
  CancelToken: typeof CancelToken;
  CanceledError: typeof CanceledError;
  Axios: typeof Axios;
  AxiosError: typeof AxiosError;
  AxiosHeaders: typeof AxiosHeaders;
  HttpStatusCode: typeof HttpStatusCode;
  
  readonly VERSION: string;
  
  isCancel(value: any): value is Cancel;
  isAxiosError(payload: any): payload is AxiosError;
  
  all<T>(values: Array<T | Promise<T>>): Promise<T[]>;
  spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R;
  
  toFormData(sourceObj: object, targetFormData?: FormData, options?: FormSerializerOptions): FormData;
  formToJSON(form: FormData | HTMLFormElement): object;
  
  mergeConfig(config1: AxiosRequestConfig, config2?: AxiosRequestConfig): AxiosRequestConfig;
  getAdapter(adapters: AxiosAdapter | AxiosAdapter[], config?: AxiosRequestConfig): AxiosAdapter;
}

/**
 * Axios main class
 */
export class Axios {
  constructor(config?: AxiosRequestConfig);
  defaults: AxiosRequestConfig;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
  request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R>;
  getUri(config?: AxiosRequestConfig): string;
}

/**
 * Request transformer function
 */
export interface AxiosRequestTransformer {
  (data: any, headers: AxiosRequestHeaders): any;
}

/**
 * Response transformer function
 */
export interface AxiosResponseTransformer {
  (data: any, headers?: AxiosResponseHeaders, status?: number): any;
}

/**
 * Progress event for upload/download tracking
 */
export interface AxiosProgressEvent {
  loaded: number;
  total?: number;
  progress?: number;
  bytes: number;
  rate?: number;
  estimated?: number;
  upload?: boolean;
  download?: boolean;
  event?: ProgressEvent;
  lengthComputable: boolean;
}

/**
 * Cancellation token for request abortion
 */
export class CancelToken {
  constructor(executor: (cancel: CancelExecutor) => void);
  promise: Promise<Cancel>;
  reason?: Cancel;
  throwIfRequested(): void;
  subscribe(listener: (cancel: Cancel) => void): void;
  unsubscribe(listener: (cancel: Cancel) => void): void;
  toAbortSignal(): AbortSignal;
  static source(): CancelTokenSource;
}

/**
 * Cancel executor function type
 */
export type CancelExecutor = (cancel: Cancel) => void;

/**
 * Cancel token source with cancellation control
 */
export interface CancelTokenSource {
  token: CancelToken;
  cancel: CancelExecutor;
}

/**
 * Cancellation error class
 */
export class Cancel {
  constructor(message?: string);
  message: string;
}

/**
 * Canceled error class (new API)
 */
export class CanceledError extends Error {
  constructor(message?: string, code?: string, config?: AxiosRequestConfig, request?: any);
  config?: AxiosRequestConfig;
  code?: string;
  request?: any;
}

/**
 * HTTP headers management class
 */
export class AxiosHeaders {
  constructor(headers?: Record<string, any>);
  set(name: string, value: any, rewrite?: boolean): this;
  get(name: string, parser?: boolean | ((value: string) => any)): any;
  has(name: string, matcher?: (value: any) => boolean): boolean;
  delete(name: string, matcher?: (value: any) => boolean): boolean;
  clear(matcher?: (value: any, name: string) => boolean): boolean;
  normalize(format?: boolean): this;
  concat(...targets: Array<AxiosHeaders | Record<string, any>>): this;
  toJSON(asStrings?: boolean): Record<string, any>;
  static from(thing: AxiosHeaders | Record<string, any>): AxiosHeaders;
  static concat(...targets: Array<AxiosHeaders | Record<string, any>>): AxiosHeaders;
  static accessor(header: string | string[]): void;
  getSetCookie(): string[];
}

/**
 * HTTP status code enumeration
 */
export enum HttpStatusCode {
  Continue = 100,
  SwitchingProtocols = 101,
  Processing = 102,
  EarlyHints = 103,
  Ok = 200,
  Created = 201,
  Accepted = 202,
  NonAuthoritativeInformation = 203,
  NoContent = 204,
  ResetContent = 205,
  PartialContent = 206,
  MultiStatus = 207,
  AlreadyReported = 208,
  ImUsed = 226,
  MultipleChoices = 300,
  MovedPermanently = 301,
  Found = 302,
  SeeOther = 303,
  NotModified = 304,
  UseProxy = 305,
  Unused = 306,
  TemporaryRedirect = 307,
  PermanentRedirect = 308,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  NotAcceptable = 406,
  ProxyAuthenticationRequired = 407,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  LengthRequired = 411,
  PreconditionFailed = 412,
  PayloadTooLarge = 413,
  UriTooLong = 414,
  UnsupportedMediaType = 415,
  RangeNotSatisfiable = 416,
  ExpectationFailed = 417,
  ImATeapot = 418,
  MisdirectedRequest = 421,
  UnprocessableEntity = 422,
  Locked = 423,
  FailedDependency = 424,
  TooEarly = 425,
  UpgradeRequired = 426,
  PreconditionRequired = 428,
  TooManyRequests = 429,
  RequestHeaderFieldsTooLarge = 431,
  UnavailableForLegalReasons = 451,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  HttpVersionNotSupported = 505,
  VariantAlsoNegotiates = 506,
  InsufficientStorage = 507,
  LoopDetected = 508,
  NotExtended = 510,
  NetworkAuthenticationRequired = 511,
  WebServerIsDown = 521,
  ConnectionTimedOut = 522,
  OriginIsUnreachable = 523,
  TimeoutOccurred = 524,
  SslHandshakeFailed = 525,
  InvalidSslCertificate = 526
}

/**
 * Transitional options for backward compatibility
 */
export interface TransitionalOptions {
  silentJSONParsing?: boolean;
  forcedJSONParsing?: boolean;
  clarifyTimeoutError?: boolean;
}

/**
 * Parameters serialization options
 */
export interface ParamsSerializerOptions {
  encode?: (value: string) => string;
  serialize?: (params: Record<string, any>, options?: ParamsSerializerOptions) => string;
}

/**
 * Form data serialization options
 */
export interface FormSerializerOptions {
  visitor?: (
    value: any,
    key: string | number,
    path: Array<string | number>,
    helpers: FormDataVisitorHelpers
  ) => boolean;
  metaTokens?: boolean;
  dots?: boolean;
  indexes?: boolean | null;
  Blob?: new (...args: any[]) => Blob;
}

/**
 * Helper functions for form data visitor
 */
export interface FormDataVisitorHelpers {
  defaultVisitor: FormSerializerOptions['visitor'];
  convertValue: (value: any) => any;
  isVisitable: (value: any) => boolean;
}

declare const axios: AxiosStatic;

export default axios;