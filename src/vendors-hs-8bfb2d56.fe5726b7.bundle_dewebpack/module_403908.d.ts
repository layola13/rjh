/**
 * Mtop SDK - Mobile Taobao Open Platform JavaScript SDK
 * Provides API request functionality with support for H5, WindVane, and Alipay JSBridge
 */

declare global {
  interface Window {
    ctrl?: Record<string, any>;
    lib?: Record<string, any>;
    mtop?: MtopInstance;
    __etReady?: boolean;
    etSign?: (url: string) => string;
    etReady?: () => void;
    dpr?: number;
    windvane?: {
      call: (className: string, method: string, params: any, success: Function, error: Function, timeout?: number) => void;
    };
    AlipayJSBridge?: {
      call: (api: string, params: any, callback: (result: any) => void) => void;
    };
    webkit?: {
      messageHandlers?: any;
    };
    login?: {
      goLoginAsync: () => Promise<any>;
      goLogin: () => void;
    };
  }
}

/**
 * Response type enumeration
 */
export enum ResponseType {
  /** Request error */
  ERROR = -1,
  /** Request success */
  SUCCESS = 0,
  /** Token expired */
  TOKEN_EXPIRED = 1,
  /** Session expired */
  SESSION_EXPIRED = 2,
}

/**
 * Request method type
 */
type RequestMethod = 'get' | 'post';

/**
 * Response data type
 */
type DataType = 'jsonp' | 'originaljsonp' | 'json' | 'originaljson';

/**
 * Value type for response formatting
 */
type ValueType = 'original' | 'string';

/**
 * Session option for authentication
 */
type SessionOption = 'AutoLoginOnly' | 'AutoLoginAndManualLogin';

/**
 * Request parameters configuration
 */
export interface MtopRequestParams {
  /** API name (e.g., 'mtop.taobao.detail.getdetail') */
  api: string;
  /** API version */
  v: string;
  /** Request data, can be object or JSON string */
  data?: Record<string, any> | string;
  /** Request method, default 'get' */
  type?: RequestMethod;
  /** Response data type, default 'jsonp' */
  dataType?: DataType;
  /** Request timeout in milliseconds, default 20000 */
  timeout?: number;
  /** Application key */
  appKey?: string;
  /** User agent string */
  ua?: string;
  /** Whether user login is required */
  needLogin?: boolean;
  /** Whether to use security mode */
  isSec?: number;
  /** Security type (alias for isSec) */
  secType?: number;
  /** Whether to use ECode signing */
  ecode?: number;
  /** Session authentication option */
  sessionOption?: SessionOption;
  /** Custom request headers */
  headers?: Record<string, string>;
  /** Extended request headers */
  ext_headers?: Record<string, string>;
  /** Extended query parameters */
  ext_querys?: Record<string, string>;
  /** Response value type */
  valueType?: ValueType;
  /** Timer value for WindVane requests */
  timer?: number;
  /** TTID (Transaction Type ID) */
  ttid?: string;
  /** JSONP callback prefix increment */
  jsonpIncPrefix?: string;
  /** Custom WindVane class name */
  customWindVaneClassName?: string;
  /** Custom Alipay JSBridge API name */
  customAlipayJSBridgeApi?: string;
  /** Use Nebula JSBridge with AMap */
  useNebulaJSbridgeWithAMAP?: boolean;
  /** Force anti-creep verification */
  forceAntiCreep?: boolean;
  /** Dangerous: custom WindVane parameters */
  dangerouslySetWindvaneParams?: Record<string, any>;
  /** Dangerous: custom Alipay parameters */
  dangerouslySetAlipayParams?: Record<string, any>;
  /** SV version for special handling */
  SV?: string;
}

/**
 * Request options configuration
 */
export interface MtopRequestOptions {
  /** Force H5 request mode */
  H5Request?: boolean;
  /** Force WindVane request mode */
  WindVaneRequest?: boolean;
  /** Enable login request middleware */
  LoginRequest?: boolean;
  /** Enable anti-creep verification */
  AntiCreep?: boolean;
  /** Enable anti-flood protection */
  AntiFlood?: boolean;
  /** Success callback function */
  successCallback?: (result: MtopResponse) => void;
  /** Failure callback function */
  failureCallback?: (error: MtopResponse) => void;
  /** Main domain (e.g., 'taobao.com') */
  mainDomain?: string;
  /** Subdomain (e.g., 'm', 'waptest') */
  subDomain?: string;
  /** Page domain for cookie setting */
  pageDomain?: string;
  /** API prefix (e.g., 'h5api') */
  prefix?: string;
  /** WindVane version string */
  WindVaneVersion?: string;
  /** Use Alipay JSBridge */
  useAlipayJSBridge?: boolean;
  /** Safari navigate to login page */
  safariGoLogin?: boolean;
  /** Use JSONP result type */
  useJsonpResultType?: boolean;
  /** Authentication token */
  token?: string;
  /** Enable CDR (Cross-Domain Request) mode */
  CDR?: boolean;
  /** Sync cookie mode */
  syncCookieMode?: boolean;
  /** Maximum retry times */
  maxRetryTimes?: number;
  /** Current failure times */
  failTimes?: number;
  /** Host configuration mapping */
  hostSetting?: Record<string, { prefix?: string; subDomain?: string; mainDomain?: string }>;
  /** Query string parameters */
  querystring?: Record<string, any>;
  /** POST data parameters */
  postdata?: Record<string, any>;
  /** Request path */
  path?: string;
  /** Request results array */
  results?: any[];
  /** Parsed response JSON */
  retJson?: MtopResponse;
  /** Custom timeout error message */
  timeoutErrMsg?: string;
  /** Custom abort error message */
  abortErrMsg?: string;
  /** Anti-flood referer URL */
  AntiFloodReferer?: string;
  /** Save anti-creep token */
  saveAntiCreepToken?: boolean;
  /** Wait for WKWebView cookie function */
  waitWKWebViewCookieFn?: (callback: () => void) => void;
  /** Dangerous: set custom protocol */
  dangerouslySetProtocol?: string;
  /** Dangerous: set TTID in WindVane/Alipay */
  dangerouslySetWVTtid?: boolean;
  /** Secure cookie flag */
  secure?: boolean;
  /** Cookie SameSite attribute */
  sameSite?: 'Strict' | 'Lax' | 'None';
  /** Internal: GET JSONP flag */
  getJSONP?: boolean;
  /** Internal: GET original JSONP flag */
  getOriginalJSONP?: boolean;
  /** Internal: GET JSON flag */
  getJSON?: boolean;
  /** Internal: POST JSON flag */
  postJSON?: boolean;
}

/**
 * Mtop response structure
 */
export interface MtopResponse<T = any> {
  /** Return status codes array */
  ret: string[];
  /** Response data */
  data: T;
  /** Response type indicator */
  retType?: ResponseType;
  /** Error message (if any) */
  error?: string;
  /** Error message description */
  errorMessage?: string;
  /** API name */
  api?: string;
  /** API version */
  v?: string;
  /** UUID for tracking */
  uuid?: string;
  /** Server ID */
  serid?: string;
  /** Cookie value for CDR */
  c?: string;
  /** Response headers (H5 requests) */
  responseHeaders?: string;
  /** Statistics data */
  stat?: {
    falcoId?: string;
  };
}

/**
 * Middleware function type
 */
export type MtopMiddleware = (
  next: (onResolve?: () => void | Promise<void>, onReject?: (error: any) => void | Promise<void>) => Promise<void>,
  reject: (error: any) => void | Promise<void>
) => void | Promise<void>;

/**
 * Deferred promise structure
 */
interface Deferred<T = any> {
  promise: Promise<T>;
  resolve: (value?: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
}

/**
 * Global configuration interface
 */
export interface MtopConfig {
  /** Use JSONP result type */
  useJsonpResultType: boolean;
  /** Safari navigate to login */
  safariGoLogin: boolean;
  /** Use Alipay JSBridge */
  useAlipayJSBridge: boolean;
  /** Main domain */
  mainDomain?: string;
  /** Subdomain */
  subDomain?: string;
  /** API prefix */
  prefix?: string;
  /** WindVane version */
  WindVaneVersion?: string;
  /** AliApp name */
  AliAppName?: string;
  /** AliApp version */
  AliAppVersion?: string;
  /** Force H5 request */
  H5Request?: boolean;
  /** Force WindVane request */
  WindVaneRequest?: boolean;
  /** Enable anti-flood */
  AntiFlood?: boolean;
  /** Enable anti-creep */
  AntiCreep?: boolean;
  /** Enable login request */
  LoginRequest?: boolean;
  /** Enable ET request */
  EtRequest?: boolean;
  /** ET load timeout */
  EtLoadTimeout?: number;
}

/**
 * Mtop request class
 */
export declare class MtopRequest {
  /** Unique request ID */
  readonly id: string;
  /** Request parameters */
  params: MtopRequestParams;
  /** Request options */
  options: MtopRequestOptions;
  /** Middleware chain */
  middlewares: MtopMiddleware[];
  
  /**
   * Create a new Mtop request instance
   * @param params - Request parameters
   */
  constructor(params?: MtopRequestParams);
  
  /**
   * Add middleware to the request chain
   * @param middleware - Middleware function
   * @returns Current instance for chaining
   */
  use(middleware: MtopMiddleware): this;
  
  /**
   * Execute the request
   * @param options - Request options
   * @returns Promise resolving to response data
   */
  request<T = any>(options?: MtopRequestOptions): Promise<MtopResponse<T>>;
  
  /** Static: first processor promise */
  static __firstProcessor?: Promise<any>;
  /** Static: cookie processor promise */
  static __cookieProcessor?: Promise<any>;
  /** Static: cookie processor ID */
  static __cookieProcessorId?: string;
}

/**
 * Main Mtop instance interface
 */
export interface MtopInstance {
  /**
   * Create a new Mtop request
   * @param params - Request parameters
   * @returns Mtop request instance
   */
  (params?: MtopRequestParams): MtopRequest;
  
  /**
   * Execute a standard request
   * @param params - Request parameters
   * @param successCallback - Success callback
   * @param failureCallback - Failure callback
   * @returns Promise resolving to response
   */
  request<T = any>(
    params: MtopRequestParams,
    successCallback?: (result: MtopResponse<T>) => void,
    failureCallback?: (error: MtopResponse<T>) => void
  ): Promise<MtopResponse<T>>;
  
  /**
   * Execute an H5 request
   * @param params - Request parameters
   * @param successCallback - Success callback
   * @param failureCallback - Failure callback
   * @returns Promise resolving to response
   */
  H5Request<T = any>(
    params: MtopRequestParams,
    successCallback?: (result: MtopResponse<T>) => void,
    failureCallback?: (error: MtopResponse<T>) => void
  ): Promise<MtopResponse<T>>;
  
  /**
   * Execute a login-required request
   * @param params - Request parameters
   * @param successCallback - Success callback
   * @param failureCallback - Failure callback
   * @returns Promise resolving to response
   */
  loginRequest<T = any>(
    params: MtopRequestParams,
    successCallback?: (result: MtopResponse<T>) => void,
    failureCallback?: (error: MtopResponse<T>) => void
  ): Promise<MtopResponse<T>>;
  
  /**
   * Execute an anti-flood protected request
   * @param params - Request parameters
   * @param successCallback - Success callback
   * @param failureCallback - Failure callback
   * @returns Promise resolving to response
   */
  antiFloodRequest<T = any>(
    params: MtopRequestParams,
    successCallback?: (result: MtopResponse<T>) => void,
    failureCallback?: (error: MtopResponse<T>) => void
  ): Promise<MtopResponse<T>>;
  
  /**
   * Execute an anti-creep protected request
   * @param params - Request parameters
   * @param successCallback - Success callback
   * @param failureCallback - Failure callback
   * @returns Promise resolving to response
   */
  antiCreepRequest<T = any>(
    params: MtopRequestParams,
    successCallback?: (result: MtopResponse<T>) => void,
    failureCallback?: (error: MtopResponse<T>) => void
  ): Promise<MtopResponse<T>>;
  
  /** Global middleware array */
  middlewares: MtopMiddleware[];
  
  /** Global configuration object */
  config: MtopConfig;
  
  /** Response type enumeration */
  RESPONSE_TYPE: typeof ResponseType;
  
  /** Mtop request class */
  CLASS: typeof MtopRequest;
  
  /** Error listener callback */
  errorListener?: (error: { api: string; data: any; v: string; retJson: MtopResponse }) => void;
  
  /** Error message (if initialization failed) */
  ERROR?: string;
}

declare const mtop: MtopInstance;

export default mtop;