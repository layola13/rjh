/**
 * Mtop H5 API SDK Type Definitions
 * 阿里移动端接口调用框架类型定义
 */

declare global {
  interface Window {
    ctrl?: Record<string, unknown>;
    lib?: {
      mtop?: MtopInstance;
      login?: LoginService;
      Promise?: PromiseConstructor;
    };
    dpr?: number;
    etSign?: (url: string) => string;
    etReady?: () => void;
    __etReady?: boolean;
    __fyModule?: ModuleStatus;
    __umModule?: ModuleStatus;
    __uabModule?: ModuleStatus;
    __ncModule?: ModuleStatus;
    __nsModule?: ModuleStatus;
    __etModule?: ModuleStatus;
    _bxPunishFun?: (context: RequestContext) => void;
    windvane?: WindVaneAPI;
    AlipayJSBridge?: AlipayJSBridgeAPI;
    webkit?: {
      messageHandlers?: Record<string, unknown>;
    };
  }
}

/**
 * 模块加载状态
 */
interface ModuleStatus {
  load: boolean;
  init: boolean;
}

/**
 * Mtop 响应类型枚举
 */
export enum ResponseType {
  /** 错误 */
  ERROR = -1,
  /** 成功 */
  SUCCESS = 0,
  /** Token 过期 */
  TOKEN_EXPIRED = 1,
  /** 会话过期 */
  SESSION_EXPIRED = 2,
}

/**
 * Mtop 请求参数
 */
export interface MtopRequestParams {
  /** API 名称，如 'mtop.trade.order.list' */
  api: string;
  /** API 版本号 */
  v: string;
  /** 请求数据 */
  data?: string | Record<string, unknown>;
  /** 请求类型 */
  type?: 'get' | 'post';
  /** 数据类型 */
  dataType?: 'json' | 'jsonp' | 'originaljsonp';
  /** 应用密钥 */
  appKey?: string;
  /** 请求超时时间（毫秒） */
  timeout?: number;
  /** WindVane 定时器时间 */
  timer?: number;
  /** 是否需要登录 */
  needLogin?: boolean;
  /** 会话选项 */
  sessionOption?: 'AutoLoginOnly' | 'AutoLoginAndManualLogin';
  /** 是否使用安全通道 */
  isSec?: number;
  /** 安全类型（已废弃，使用 isSec） */
  secType?: number;
  /** 错误码 */
  ecode?: number;
  /** 扩展请求头 */
  ext_headers?: Record<string, string>;
  /** 扩展查询参数 */
  ext_querys?: Record<string, string>;
  /** 自定义 HTTP 头（已废弃，使用 ext_headers） */
  headers?: Record<string, string>;
  /** 用户代理 */
  ua?: string;
  /** 返回值类型：'original' 原始数据 | 'string' 字符串 */
  valueType?: 'original' | 'string';
  /** TTID（已废弃） */
  ttid?: string;
  /** JSONP 回调前缀 */
  jsonpIncPrefix?: string;
  /** API 版本标识 */
  SV?: string;
  /** 强制防爬 */
  forceAntiCreep?: boolean;
  /** WindVane 类名 */
  customWindVaneClassName?: string;
  /** 支付宝 JSBridge API 名称 */
  customAlipayJSBridgeApi?: string;
  /** 使用高德地图 Nebula JSBridge */
  useNebulaJSbridgeWithAMAP?: boolean;
  /** 危险设置：WindVane 参数（慎用） */
  dangerouslySetWindvaneParams?: Record<string, unknown>;
  /** 危险设置：支付宝参数（慎用） */
  dangerouslySetAlipayParams?: Record<string, unknown>;
}

/**
 * Mtop 请求选项
 */
export interface MtopRequestOptions {
  /** 强制使用 H5 请求 */
  H5Request?: boolean;
  /** 强制使用 WindVane 请求 */
  WindVaneRequest?: boolean;
  /** 启用登录请求 */
  LoginRequest?: boolean;
  /** 启用防爬 */
  AntiCreep?: boolean;
  /** 启用防刷 */
  AntiFlood?: boolean;
  /** 成功回调 */
  successCallback?: (response: MtopResponse) => void;
  /** 失败回调 */
  failureCallback?: (response: MtopResponse) => void;
  /** 主域名 */
  mainDomain?: string;
  /** 子域名 */
  subDomain?: string;
  /** 页面域名 */
  pageDomain?: string;
  /** API 前缀 */
  prefix?: string;
  /** 使用 JSONP 结果类型 */
  useJsonpResultType?: boolean;
  /** Safari 跳转登录 */
  safariGoLogin?: boolean;
  /** 使用支付宝 JSBridge */
  useAlipayJSBridge?: boolean;
  /** 跨域请求（Cross-Domain Request） */
  CDR?: boolean;
  /** 同步 Cookie 模式 */
  syncCookieMode?: boolean;
  /** 最大重试次数 */
  maxRetryTimes?: number;
  /** 已失败次数 */
  failTimes?: number;
  /** WindVane 版本 */
  WindVaneVersion?: string;
  /** 超时错误消息 */
  timeoutErrMsg?: string;
  /** 中止错误消息 */
  abortErrMsg?: string;
  /** 保存防爬 Token */
  saveAntiCreepToken?: boolean;
  /** 防洪水攻击 Referer */
  AntiFloodReferer?: string;
  /** 等待 WKWebView Cookie 函数 */
  waitWKWebViewCookieFn?: (callback: () => void) => void;
  /** 危险设置：TTID（慎用） */
  dangerouslySetWVTtid?: boolean;
  /** 危险设置：协议（慎用） */
  dangerouslySetProtocol?: 'http' | 'https';
  /** 主机设置 */
  hostSetting?: Record<string, {
    prefix?: string;
    subDomain?: string;
    mainDomain?: string;
  }>;
  /** Cookie 安全标志 */
  secure?: boolean;
  /** Cookie SameSite 属性 */
  sameSite?: 'Strict' | 'Lax' | 'None';
  /** 百川选项 */
  bxOption?: Record<string, unknown>;
}

/**
 * Mtop 响应数据
 */
export interface MtopResponse<T = unknown> {
  /** 返回码数组 */
  ret: string[];
  /** 返回数据 */
  data: T;
  /** 响应类型 */
  retType?: ResponseType;
  /** API 名称 */
  api?: string;
  /** API 版本 */
  v?: string;
  /** UUID（防爬） */
  uuid?: string;
  /** 序列号（防爬） */
  serid?: string;
  /** 操作类型（防爬） */
  action?: string;
  /** Cookie 值 */
  c?: string;
  /** 错误码（支付宝） */
  error?: string;
  /** 错误消息（支付宝） */
  errorMessage?: string;
  /** 响应头 */
  responseHeaders?: string;
  /** 统计信息 */
  stat?: {
    falcoId?: string;
  };
}

/**
 * 中间件函数类型
 */
export type MiddlewareFunction = (
  next: (successCallback?: () => Promise<void>, errorCallback?: (error: Error) => Promise<void>) => Promise<void>
) => Promise<void>;

/**
 * 请求上下文
 */
interface RequestContext {
  id: string;
  params: MtopRequestParams;
  options: MtopRequestOptions & {
    token?: string;
    retJson?: MtopResponse;
    querystring?: Record<string, string>;
    postdata?: Record<string, unknown>;
    path?: string;
    results?: unknown[];
    getJSONP?: boolean;
    getOriginalJSONP?: boolean;
    getJSON?: boolean;
    postJSON?: boolean;
  };
  middlewares: MiddlewareFunction[];
  resend?: () => void;
  resolve?: (value?: unknown) => void;
  reject?: (reason?: unknown) => void;
  timer?: number | null;
}

/**
 * WindVane API 接口
 */
interface WindVaneAPI {
  call: (
    plugin: string,
    method: string,
    params: Record<string, unknown>,
    successCallback: (result: unknown) => void,
    errorCallback: (error: unknown) => void,
    timeout?: number
  ) => void;
}

/**
 * 支付宝 JSBridge API 接口
 */
interface AlipayJSBridgeAPI {
  call: (
    api: string,
    params: Record<string, unknown>,
    callback: (result: unknown) => void
  ) => void;
}

/**
 * 登录服务接口
 */
interface LoginService {
  goLogin: (options: { apiReferer: string }) => void;
  goLoginAsync: (options: { apiReferer: string }) => Promise<void>;
}

/**
 * Mtop 类
 */
export interface MtopClass {
  new (params: MtopRequestParams): MtopInstance;
}

/**
 * Mtop 实例
 */
export interface MtopInstance {
  /** 使用中间件 */
  use(middleware: MiddlewareFunction): this;
  /** 发起请求 */
  request<T = unknown>(options?: MtopRequestOptions): Promise<MtopResponse<T>>;
}

/**
 * Mtop 静态方法
 */
export interface MtopStatic {
  /**
   * 创建 Mtop 实例
   * @param params 请求参数
   */
  (params: MtopRequestParams): MtopInstance;

  /**
   * 通用请求方法
   * @param params 请求参数
   * @param successCallback 成功回调
   * @param failureCallback 失败回调
   */
  request<T = unknown>(
    params: MtopRequestParams,
    successCallback?: (response: MtopResponse<T>) => void,
    failureCallback?: (response: MtopResponse<T>) => void
  ): Promise<MtopResponse<T>>;

  /**
   * H5 请求
   * @param params 请求参数
   * @param successCallback 成功回调
   * @param failureCallback 失败回调
   */
  H5Request<T = unknown>(
    params: MtopRequestParams,
    successCallback?: (response: MtopResponse<T>) => void,
    failureCallback?: (response: MtopResponse<T>) => void
  ): Promise<MtopResponse<T>>;

  /**
   * 登录请求
   * @param params 请求参数
   * @param successCallback 成功回调
   * @param failureCallback 失败回调
   */
  loginRequest<T = unknown>(
    params: MtopRequestParams,
    successCallback?: (response: MtopResponse<T>) => void,
    failureCallback?: (response: MtopResponse<T>) => void
  ): Promise<MtopResponse<T>>;

  /**
   * 防刷请求
   * @param params 请求参数
   * @param successCallback 成功回调
   * @param failureCallback 失败回调
   */
  antiFloodRequest<T = unknown>(
    params: MtopRequestParams,
    successCallback?: (response: MtopResponse<T>) => void,
    failureCallback?: (response: MtopResponse<T>) => void
  ): Promise<MtopResponse<T>>;

  /**
   * 防爬请求
   * @param params 请求参数
   * @param successCallback 成功回调
   * @param failureCallback 失败回调
   */
  antiCreepRequest<T = unknown>(
    params: MtopRequestParams,
    successCallback?: (response: MtopResponse<T>) => void,
    failureCallback?: (response: MtopResponse<T>) => void
  ): Promise<MtopResponse<T>>;

  /** 中间件数组 */
  middlewares: MiddlewareFunction[];
  /** 全局配置 */
  config: MtopRequestOptions;
  /** 响应类型枚举 */
  RESPONSE_TYPE: typeof ResponseType;
  /** Mtop 类构造函数 */
  CLASS: MtopClass;
  /** 错误监听器 */
  errorListener?: (error: { api: string; data: unknown; v: string; retJson: MtopResponse }) => void;
  /** 错误标识（初始化失败时存在） */
  ERROR?: string;
}

declare const mtop: MtopStatic;
export default mtop;