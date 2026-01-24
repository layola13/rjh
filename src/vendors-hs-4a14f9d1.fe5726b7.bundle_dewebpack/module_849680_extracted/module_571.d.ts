/**
 * MTOP SDK 类型定义
 * MTOP是阿里系应用的统一API网关调用SDK
 */

/**
 * 响应类型枚举
 */
export enum ResponseType {
  /** 错误 */
  ERROR = -1,
  /** 成功 */
  SUCCESS = 0,
  /** Token过期 */
  TOKEN_EXPIRED = 1,
  /** Session过期 */
  SESSION_EXPIRED = 2,
}

/**
 * MTOP请求参数配置
 */
export interface MtopRequestParams {
  /** API名称，如 'mtop.user.getUserInfo' */
  api: string;
  /** API版本号 */
  v: string;
  /** 请求数据，支持对象或JSON字符串 */
  data?: Record<string, any> | string;
  /** 请求类型：'get' | 'post' */
  type?: 'get' | 'post';
  /** 数据类型：'jsonp' | 'json' | 'originaljsonp' */
  dataType?: 'jsonp' | 'json' | 'originaljsonp';
  /** 返回值类型：'original' 原始格式 | 'string' 字符串格式 */
  valueType?: 'original' | 'string';
  /** 请求超时时间（毫秒） */
  timeout?: number;
  /** WindVane定时器（毫秒） */
  timer?: number;
  /** 应用密钥 */
  appKey?: string;
  /** 用户代理信息 */
  ua?: string;
  /** 是否需要登录 */
  needLogin?: boolean;
  /** Session选项：'AutoLoginOnly' | 'AutoLoginAndManualLogin' */
  sessionOption?: 'AutoLoginOnly' | 'AutoLoginAndManualLogin';
  /** 是否安全请求 */
  isSec?: 0 | 1;
  /** 安全类型（已废弃，使用isSec） */
  secType?: 0 | 1;
  /** 是否需要ecode签名 */
  ecode?: 0 | 1;
  /** 扩展请求头 */
  ext_headers?: Record<string, string>;
  /** 扩展查询参数 */
  ext_querys?: Record<string, string>;
  /** 自定义请求头（向后兼容） */
  headers?: Record<string, string>;
  /** JSONP回调前缀 */
  jsonpIncPrefix?: string;
  /** TTID标识 */
  ttid?: string;
  /** 是否使用Nebula JSBridge（高德地图） */
  useNebulaJSbridgeWithAMAP?: boolean;
  /** 危险操作：自定义WindVane参数 */
  dangerouslySetWindvaneParams?: Record<string, any>;
  /** 危险操作：自定义支付宝参数 */
  dangerouslySetAlipayParams?: Record<string, any>;
  /** 自定义WindVane类名 */
  customWindVaneClassName?: string;
  /** 自定义支付宝JSBridge API名称 */
  customAlipayJSBridgeApi?: string;
  /** 服务版本（如'5.0'） */
  SV?: string;
}

/**
 * MTOP请求选项配置
 */
export interface MtopRequestOptions {
  /** 强制使用H5请求方式 */
  H5Request?: boolean;
  /** 强制使用WindVane请求方式 */
  WindVaneRequest?: boolean;
  /** 是否为登录请求 */
  LoginRequest?: boolean;
  /** 防爬虫配置 */
  AntiCreep?: boolean;
  /** 防刷配置 */
  AntiFlood?: boolean;
  /** 成功回调 */
  successCallback?: (response: MtopResponse) => void;
  /** 失败回调 */
  failureCallback?: (error: MtopError) => void;
  /** 主域名 */
  mainDomain?: string;
  /** 子域名 */
  subDomain?: string;
  /** 页面域名（用于CDR） */
  pageDomain?: string;
  /** API前缀 */
  prefix?: string;
  /** 是否启用CDR（跨域请求） */
  CDR?: boolean;
  /** 同步Cookie模式 */
  syncCookieMode?: boolean;
  /** 最大重试次数 */
  maxRetryTimes?: number;
  /** 是否使用支付宝JSBridge */
  useAlipayJSBridge?: boolean;
  /** 是否使用JSONP结果类型 */
  useJsonpResultType?: boolean;
  /** 危险操作：设置请求协议（http/https） */
  dangerouslySetProtocol?: string;
  /** 危险操作：设置WindVane TTID */
  dangerouslySetWVTtid?: boolean;
  /** 自定义超时错误消息 */
  timeoutErrMsg?: string;
  /** 自定义中断错误消息 */
  abortErrMsg?: string;
  /** 主机配置映射 */
  hostSetting?: Record<string, {
    prefix?: string;
    subDomain?: string;
    mainDomain?: string;
  }>;
  /** 等待WKWebView Cookie函数 */
  waitWKWebViewCookieFn?: (callback: () => void) => void;
  /** 风险盾配置 */
  bxOption?: Record<string, any>;
  /** Cookie安全标志 */
  secure?: boolean;
  /** Cookie SameSite属性 */
  sameSite?: 'Strict' | 'Lax' | 'None';
}

/**
 * MTOP响应数据结构
 */
export interface MtopResponse<T = any> {
  /** 返回码数组 */
  ret: string[];
  /** 响应数据 */
  data: T;
  /** 响应类型 */
  retType?: ResponseType;
  /** API名称 */
  api?: string;
  /** API版本 */
  v?: string;
  /** CDR Cookie */
  c?: string;
  /** 响应头（仅JSON请求） */
  responseHeaders?: string;
  /** 统计信息 */
  stat?: {
    falcoId?: string;
  };
}

/**
 * MTOP错误对象
 */
export interface MtopError {
  /** 错误码 */
  ret: string[];
  /** 错误堆栈（仅Error实例） */
  stack?: string[];
  /** 响应类型 */
  retJson: ResponseType;
  /** 错误消息 */
  error?: string;
  /** 错误详细描述 */
  errorMessage?: string;
}

/**
 * 中间件函数类型
 * @param next - 调用下一个中间件
 * @param reject - 拒绝请求
 * @returns Promise或void
 */
export type Middleware = (
  next: (value?: any) => Promise<any>,
  reject: (reason?: any) => Promise<any>
) => Promise<any> | void;

/**
 * 全局配置对象
 */
export interface MtopGlobalConfig {
  /** 主域名 */
  mainDomain?: string;
  /** 子域名 */
  subDomain?: string;
  /** API前缀 */
  prefix?: string;
  /** 强制H5请求 */
  H5Request?: boolean;
  /** 强制WindVane请求 */
  WindVaneRequest?: boolean;
  /** 是否启用ET请求 */
  EtRequest?: boolean;
  /** ET加载超时时间 */
  EtLoadTimeout?: number;
  /** WindVane版本 */
  WindVaneVersion?: string;
  /** 阿里应用名称 */
  AliAppName?: string;
  /** 阿里应用版本 */
  AliAppVersion?: string;
  /** 是否在Safari跳转登录 */
  safariGoLogin?: boolean;
  /** 是否使用支付宝JSBridge */
  useAlipayJSBridge?: boolean;
  /** 是否使用JSONP结果类型 */
  useJsonpResultType?: boolean;
}

/**
 * 错误监听器参数
 */
export interface ErrorListenerParams {
  /** API名称 */
  api: string;
  /** 请求数据 */
  data: string | Record<string, any>;
  /** API版本 */
  v: string;
  /** 响应结果 */
  retJson: MtopError;
}

/**
 * MTOP请求类
 * 负责构建和执行MTOP API请求
 */
export declare class MtopRequestClass {
  /** 请求唯一ID */
  readonly id: string;
  /** 请求参数 */
  readonly params: Required<MtopRequestParams>;
  /** 中间件列表 */
  readonly middlewares: Middleware[];
  /** 请求选项（内部） */
  private options: any;
  /** 请求处理器Promise（内部） */
  private __requestProcessor: Promise<any>;

  /**
   * 构造函数
   * @param params - 请求参数
   */
  constructor(params?: MtopRequestParams);

  /**
   * 添加中间件
   * @param middleware - 中间件函数
   * @returns 当前实例（支持链式调用）
   */
  use(middleware: Middleware): this;

  /**
   * 发起请求
   * @param options - 请求选项
   * @returns Promise<响应数据>
   */
  request<T = any>(options?: MtopRequestOptions): Promise<MtopResponse<T>>;

  /** 静态：首次请求处理器（内部） */
  private static __firstProcessor: Promise<any>;
  /** 静态：Cookie处理器（内部） */
  private static __cookieProcessor: Promise<any>;
  /** 静态：Cookie处理器ID（内部） */
  private static __cookieProcessorId: string;
}

/**
 * MTOP主接口
 */
export interface Mtop {
  /**
   * 创建MTOP请求实例
   * @param params - 请求参数
   * @returns MTOP请求实例
   */
  (params?: MtopRequestParams): MtopRequestClass;

  /**
   * 发起请求（快捷方法）
   * @param params - 请求参数
   * @param successCallback - 成功回调
   * @param failureCallback - 失败回调
   * @returns Promise<响应数据>
   */
  request<T = any>(
    params: MtopRequestParams,
    successCallback?: (response: MtopResponse<T>) => void,
    failureCallback?: (error: MtopError) => void
  ): Promise<MtopResponse<T>>;

  /**
   * 强制使用H5方式请求
   * @param params - 请求参数
   * @param successCallback - 成功回调
   * @param failureCallback - 失败回调
   * @returns Promise<响应数据>
   */
  H5Request<T = any>(
    params: MtopRequestParams,
    successCallback?: (response: MtopResponse<T>) => void,
    failureCallback?: (error: MtopError) => void
  ): Promise<MtopResponse<T>>;

  /** 全局中间件列表 */
  middlewares: Middleware[];

  /** 全局配置对象 */
  config: MtopGlobalConfig;

  /** 响应类型枚举 */
  RESPONSE_TYPE: typeof ResponseType;

  /** 请求类构造器 */
  CLASS: typeof MtopRequestClass;

  /** 错误监听器 */
  errorListener?: (params: ErrorListenerParams) => void;

  /** 错误消息（用于不支持Promise的浏览器） */
  ERROR?: string;
}

declare global {
  interface Window {
    /**
     * MTOP SDK全局实例
     * 阿里系应用统一API网关调用工具
     */
    lib: {
      mtop: Mtop;
    };

    /** ET风险盾准备回调 */
    etReady?: () => void;
    /** ET风险盾准备标志 */
    __etReady?: boolean;
    /** ET签名函数 */
    etSign?: (data: string) => string;

    /** WindVane JSBridge对象 */
    windvane?: {
      call: (
        pluginName: string,
        method: string,
        params: any,
        successCallback: (result: any) => void,
        failureCallback: (error: any) => void,
        timeout?: number
      ) => void;
    };

    /** 支付宝JSBridge对象 */
    AlipayJSBridge?: {
      call: (
        apiName: string,
        params: any,
        callback: (result: any) => void
      ) => void;
    };

    /** WebKit消息处理器（iOS WKWebView） */
    webkit?: {
      messageHandlers: Record<string, any>;
    };
  }
}

/**
 * MTOP SDK默认导出
 */
declare const mtop: Mtop;
export default mtop;