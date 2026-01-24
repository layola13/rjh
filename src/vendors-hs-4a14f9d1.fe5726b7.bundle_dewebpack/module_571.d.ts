/**
 * MTOP (Mobile Taobao Open Platform) TypeScript Type Definitions
 * 提供移动端接口请求的完整类型定义
 */

/**
 * 响应类型枚举
 * 定义接口返回的状态码
 */
export enum RESPONSE_TYPE {
  /** 错误 */
  ERROR = -1,
  /** 成功 */
  SUCCESS = 0,
  /** Token过期 */
  TOKEN_EXPIRED = 1,
  /** 会话过期 */
  SESSION_EXPIRED = 2,
}

/**
 * HTTP请求方法类型
 */
export type RequestMethod = 'get' | 'post' | 'GET' | 'POST';

/**
 * 数据类型
 */
export type DataType = 'jsonp' | 'originaljsonp' | 'json' | 'originaljson';

/**
 * 返回值类型
 */
export type ValueType = 'original' | 'string';

/**
 * 会话选项
 */
export type SessionOption = 'AutoLoginOnly' | 'AutoLoginAndManualLogin';

/**
 * 请求参数接口
 * 定义调用MTOP接口时的参数结构
 */
export interface RequestParams {
  /** API接口名称，如 'mtop.taobao.detail.getdetail' */
  api: string;
  
  /** API版本号，如 '1.0' */
  v: string;
  
  /** 请求数据，可以是对象或JSON字符串 */
  data?: Record<string, unknown> | string;
  
  /** 请求类型 */
  type?: RequestMethod;
  
  /** 数据类型 */
  dataType?: DataType;
  
  /** 返回值类型 */
  valueType?: ValueType;
  
  /** 超时时间（毫秒） */
  timeout?: number;
  
  /** WindVane定时器时间（毫秒） */
  timer?: number;
  
  /** 应用Key */
  appKey?: string;
  
  /** 是否需要登录 */
  needLogin?: boolean;
  
  /** 会话选项 */
  sessionOption?: SessionOption;
  
  /** 是否需要加密 */
  isSec?: number;
  
  /** 安全类型 */
  secType?: number;
  
  /** 是否需要ecode签名 */
  ecode?: number;
  
  /** 用户代理信息 */
  ua?: string;
  
  /** TTID标识 */
  ttid?: string;
  
  /** 扩展请求头 */
  headers?: Record<string, string>;
  
  /** 扩展请求头（别名） */
  ext_headers?: Record<string, string>;
  
  /** 扩展查询参数 */
  ext_querys?: Record<string, string>;
  
  /** JSONP回调前缀 */
  jsonpIncPrefix?: string;
  
  /** 自定义WindVane类名 */
  customWindVaneClassName?: string;
  
  /** 自定义支付宝JSBridge API名称 */
  customAlipayJSBridgeApi?: string;
  
  /** 危险：设置WindVane参数 */
  dangerouslySetWindvaneParams?: Record<string, unknown>;
  
  /** 危险：设置支付宝参数 */
  dangerouslySetAlipayParams?: Record<string, unknown>;
  
  /** 是否使用Nebula JSBridge（高德地图） */
  useNebulaJSbridgeWithAMAP?: boolean;
  
  /** 服务版本 */
  SV?: string;
}

/**
 * 请求选项接口
 * 定义请求执行时的配置选项
 */
export interface RequestOptions {
  /** 强制使用H5请求 */
  H5Request?: boolean;
  
  /** 强制使用WindVane请求 */
  WindVaneRequest?: boolean;
  
  /** 需要登录 */
  LoginRequest?: boolean;
  
  /** 防爬虫 */
  AntiCreep?: boolean;
  
  /** 防刷 */
  AntiFlood?: boolean;
  
  /** Token字符串 */
  token?: string;
  
  /** 主域名 */
  mainDomain?: string;
  
  /** 子域名 */
  subDomain?: string;
  
  /** 页面域名 */
  pageDomain?: string;
  
  /** API前缀 */
  prefix?: string;
  
  /** 最大重试次数 */
  maxRetryTimes?: number;
  
  /** 失败次数计数器 */
  failTimes?: number;
  
  /** 是否使用CDR（Cookie Domain Rewrite） */
  CDR?: boolean;
  
  /** 是否同步Cookie模式 */
  syncCookieMode?: boolean;
  
  /** 是否使用支付宝JSBridge */
  useAlipayJSBridge?: boolean;
  
  /** 是否使用JSONP结果类型 */
  useJsonpResultType?: boolean;
  
  /** 危险：设置协议（http/https） */
  dangerouslySetProtocol?: string;
  
  /** 危险：是否设置WindVane TTID */
  dangerouslySetWVTtid?: boolean;
  
  /** 主机配置映射 */
  hostSetting?: Record<string, HostConfig>;
  
  /** 盒马选项（内部使用） */
  bxOption?: Record<string, unknown>;
  
  /** 超时错误消息 */
  timeoutErrMsg?: string;
  
  /** 中止错误消息 */
  abortErrMsg?: string;
  
  /** Cookie安全标志 */
  secure?: boolean;
  
  /** Cookie SameSite属性 */
  sameSite?: 'Strict' | 'Lax' | 'None';
  
  /** 等待WKWebView Cookie函数 */
  waitWKWebViewCookieFn?: (callback: () => void) => void;
  
  /** 成功回调 */
  successCallback?: (response: MtopResponse) => void;
  
  /** 失败回调 */
  failureCallback?: (error: MtopError) => void;
  
  /** WindVane版本 */
  WindVaneVersion?: string;
  
  /** 查询字符串参数（内部使用） */
  querystring?: Record<string, unknown>;
  
  /** POST数据（内部使用） */
  postdata?: Record<string, unknown>;
  
  /** 请求路径（内部使用） */
  path?: string;
  
  /** 请求结果（内部使用） */
  results?: unknown[];
  
  /** 返回JSON对象（内部使用） */
  retJson?: MtopResponse;
  
  /** 是否GET JSONP请求（内部使用） */
  getJSONP?: boolean;
  
  /** 是否GET原始JSONP请求（内部使用） */
  getOriginalJSONP?: boolean;
  
  /** 是否GET JSON请求（内部使用） */
  getJSON?: boolean;
  
  /** 是否POST JSON请求（内部使用） */
  postJSON?: boolean;
}

/**
 * 主机配置
 */
export interface HostConfig {
  /** API前缀 */
  prefix?: string;
  
  /** 子域名 */
  subDomain?: string;
  
  /** 主域名 */
  mainDomain?: string;
}

/**
 * MTOP响应接口
 * 定义接口返回的数据结构
 */
export interface MtopResponse<T = unknown> {
  /** 返回码数组，如 ['SUCCESS::调用成功'] */
  ret: string[];
  
  /** 业务数据 */
  data: T;
  
  /** 响应类型 */
  retType?: RESPONSE_TYPE;
  
  /** API名称 */
  api?: string;
  
  /** API版本 */
  v?: string;
  
  /** CDR Cookie值 */
  c?: string;
  
  /** 响应头信息 */
  responseHeaders?: string;
  
  /** 统计信息 */
  stat?: {
    /** Falco追踪ID */
    falcoId?: string;
  };
  
  /** 错误码（支付宝通道） */
  error?: string;
  
  /** 错误消息（支付宝通道） */
  errorMessage?: string;
}

/**
 * MTOP错误接口
 */
export interface MtopError {
  /** 错误信息数组 */
  ret: string[];
  
  /** 错误堆栈（仅当为Error对象时） */
  stack?: string[];
  
  /** 返回JSON对象 */
  retJson: RESPONSE_TYPE;
}

/**
 * 中间件函数类型
 * @param next - 调用下一个中间件
 * @param reject - 拒绝请求
 * @returns Promise或void
 */
export type Middleware = (
  next: (result?: unknown) => Promise<unknown>,
  reject: (error: unknown) => Promise<unknown>
) => Promise<unknown> | void;

/**
 * 全局配置接口
 */
export interface GlobalConfig {
  /** 主域名 */
  mainDomain: string;
  
  /** 子域名 */
  subDomain: string;
  
  /** API前缀 */
  prefix: string;
  
  /** 是否使用JSONP结果类型 */
  useJsonpResultType: boolean;
  
  /** Safari是否跳转登录 */
  safariGoLogin: boolean;
  
  /** 是否使用支付宝JSBridge */
  useAlipayJSBridge: boolean;
  
  /** AliApp名称 */
  AliAppName?: string;
  
  /** AliApp版本 */
  AliAppVersion?: string;
  
  /** WindVane版本 */
  WindVaneVersion?: string;
  
  /** 强制H5请求 */
  H5Request?: boolean;
  
  /** 强制WindVane请求 */
  WindVaneRequest?: boolean;
  
  /** 是否启用Et请求 */
  EtRequest?: boolean;
  
  /** Et加载超时时间 */
  EtLoadTimeout?: number;
}

/**
 * 错误监听器参数
 */
export interface ErrorListenerParams {
  /** API名称 */
  api: string;
  
  /** 请求数据 */
  data: string | Record<string, unknown>;
  
  /** API版本 */
  v: string;
  
  /** 返回JSON */
  retJson: MtopResponse | MtopError;
}

/**
 * MTOP请求类
 * 核心请求类，封装了完整的请求生命周期
 */
export declare class MtopClass {
  /** 请求唯一ID */
  readonly id: string;
  
  /** 请求参数 */
  readonly params: RequestParams;
  
  /** 中间件数组 */
  readonly middlewares: Middleware[];
  
  /** 请求选项 */
  options: RequestOptions;
  
  /**
   * 构造函数
   * @param params - 请求参数
   */
  constructor(params?: RequestParams);
  
  /**
   * 添加中间件
   * @param middleware - 中间件函数
   * @returns 当前实例，支持链式调用
   */
  use(middleware: Middleware): this;
  
  /**
   * 发起请求
   * @param options - 请求选项
   * @returns Promise，resolve返回响应数据，reject返回错误
   */
  request<T = unknown>(options?: RequestOptions): Promise<MtopResponse<T>>;
}

/**
 * MTOP主接口
 * 提供多种请求方式的入口
 */
export interface Mtop {
  /**
   * 创建MTOP实例
   * @param params - 请求参数
   * @returns MTOP请求实例
   */
  (params?: RequestParams): MtopClass;
  
  /**
   * 通用请求方法
   * @param params - 请求参数
   * @param successCallback - 成功回调
   * @param failureCallback - 失败回调
   * @returns Promise
   */
  request<T = unknown>(
    params: RequestParams,
    successCallback?: (response: MtopResponse<T>) => void,
    failureCallback?: (error: MtopError) => void
  ): Promise<MtopResponse<T>>;
  
  /**
   * 强制H5请求
   * @param params - 请求参数
   * @param successCallback - 成功回调
   * @param failureCallback - 失败回调
   * @returns Promise
   */
  H5Request<T = unknown>(
    params: RequestParams,
    successCallback?: (response: MtopResponse<T>) => void,
    failureCallback?: (error: MtopError) => void
  ): Promise<MtopResponse<T>>;
  
  /** 全局中间件数组 */
  middlewares: Middleware[];
  
  /** 全局配置 */
  config: GlobalConfig;
  
  /** 响应类型枚举 */
  RESPONSE_TYPE: typeof RESPONSE_TYPE;
  
  /** MTOP类引用 */
  CLASS: typeof MtopClass;
  
  /** 错误监听器 */
  errorListener?: (params: ErrorListenerParams) => void;
}

/**
 * 导出MTOP实例
 * 挂载在window.lib.mtop上
 */
declare const mtop: Mtop;

export default mtop;

/**
 * 全局声明
 */
declare global {
  interface Window {
    /** Lib命名空间 */
    lib?: {
      /** MTOP实例 */
      mtop?: Mtop;
      /** WindVane对象 */
      windvane?: {
        call: (
          plugin: string,
          method: string,
          params: Record<string, unknown>,
          success: (result: unknown) => void,
          failure: (error: unknown) => void,
          timeout?: number
        ) => void;
      };
    };
    
    /** 支付宝JSBridge */
    AlipayJSBridge?: {
      call: (
        api: string,
        params: Record<string, unknown>,
        callback: (result: unknown) => void
      ) => void;
    };
    
    /** Et签名函数 */
    etSign?: (data: string) => string;
    
    /** Et准备完成标志 */
    __etReady?: boolean;
    
    /** Et准备完成回调 */
    etReady?: () => void;
    
    /** WebKit消息处理器 */
    webkit?: {
      messageHandlers?: Record<string, unknown>;
    };
  }
}