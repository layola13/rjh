/**
 * API 监控钩子模块
 * 用于拦截和监控浏览器的 fetch 和 XMLHttpRequest 请求
 */

import type { RetcodeInstance } from './retcode';
import type { UtilsModule } from './utils';

/**
 * 请求配置接口
 */
interface RequestConfig {
  /** 忽略规则配置 */
  ignore?: {
    /** 需要忽略的 API 列表 */
    ignoreApis?: string[];
  };
  /** 忽略的 API 路径规则 */
  ignoreApiPath?: string | RegExp | Array<string | RegExp>;
  /** API 辅助过滤规则 */
  apiHelper?: string | RegExp | Array<string | RegExp>;
  /** 是否启用链路追踪 */
  enableLinkTrace?: boolean;
  /** 响应解析函数 */
  parseResponse?: (response: unknown, context: unknown) => ParsedResponse | null;
}

/**
 * 解析后的响应结果
 */
interface ParsedResponse {
  /** 业务状态码 */
  code?: number | string;
  /** 是否成功 */
  success?: boolean;
  /** 响应消息 */
  msg?: string;
}

/**
 * Uber Trace ID 结构
 */
interface UberTraceIdResult {
  /** HTTP 头中的完整 trace ID */
  'uber-trace-id': string;
  /** 提取的 trace ID */
  traceId: string;
}

/**
 * EagleEye Trace ID 结构
 */
interface EagleEyeTraceIdResult {
  'EagleEye-TraceID': string;
}

/**
 * EagleEye Session ID 结构
 */
interface EagleEyeSessionIdResult {
  'EagleEye-SessionID': string;
}

/**
 * 全局 Window 接口扩展
 */
interface WindowWithHooks extends Window {
  /** 原始 fetch 函数备份 */
  __oFetch_?: typeof fetch;
  /** 原始 XMLHttpRequest 构造函数备份 */
  __oXMLHttpRequest_?: typeof XMLHttpRequest;
}

/**
 * API 监控钩子类
 * 负责拦截和上报浏览器的网络请求
 */
export interface ApiHook {
  /**
   * 移除钩子拦截
   * @param context - 执行上下文
   * @param force - 是否强制移除
   * @returns 当前实例
   */
  removeHook(context?: unknown, force?: boolean): this;

  /**
   * 添加钩子拦截
   * @param context - 执行上下文
   * @returns 当前实例
   */
  addHook(context?: unknown): this;

  /**
   * 初始化钩子
   * @returns 当前实例
   */
  initHook(): this;

  /** 是否已初始化钩子 */
  hasInitHook?: boolean;

  /** 内部配置 */
  _conf?: RequestConfig;

  /**
   * 上报 API 调用数据
   * @param apiPath - API 路径
   * @param success - 是否成功
   * @param duration - 请求耗时（毫秒）
   * @param code - 状态码
   * @param message - 响应消息
   * @param timestamp - 请求开始时间戳
   * @param traceId - 链路追踪 ID
   * @param sessionId - 会话 ID
   * @param snapshot - 请求快照数据
   * @param domain - 请求域名
   * @param traceIdSource - trace ID 来源（'response' 表示从响应头获取）
   * @param samplingFlag - 采样标志（0 或 1）
   */
  api(
    apiPath: string,
    success: boolean,
    duration: number,
    code: number | string,
    message: string,
    timestamp: number,
    traceId: string,
    sessionId: string,
    snapshot: Record<string, unknown>,
    domain: string,
    traceIdSource?: string | null,
    samplingFlag?: number
  ): void;

  /**
   * 获取配置项
   * @param key - 配置键名
   * @returns 配置值
   */
  getConfig(key: string): unknown;

  /**
   * 判断是否需要采样
   * @param sampleRate - 采样率
   * @returns 是否采样
   */
  sampling(sampleRate: number): boolean;

  /**
   * 获取 Uber Trace ID
   * @param samplingFlag - 采样标志
   * @returns Trace ID 对象
   */
  getUberTraceId(samplingFlag: number): UberTraceIdResult;

  /**
   * 获取 EagleEye Trace ID
   * @returns Trace ID 对象
   */
  getTraceId(): EagleEyeTraceIdResult;

  /**
   * 获取页面浏览 ID
   * @returns Session ID 对象
   */
  getPageviewId(): EagleEyeSessionIdResult;

  /** 当前页面浏览 ID */
  pageview?: string;
}

/**
 * 处理 API 响应并上报
 * @param instance - 监控实例
 * @param parseResponseFn - 响应解析函数
 * @param apiPath - API 路径
 * @param fullUrl - 完整 URL
 * @param responseBody - 响应体
 * @param defaultCode - 默认状态码
 * @param duration - 请求耗时
 * @param timestamp - 请求开始时间
 * @param traceId - 链路追踪 ID
 * @param sessionId - 会话 ID
 * @param snapshot - 请求快照
 * @param traceIdSource - trace ID 来源
 * @param samplingFlag - 采样标志
 * @returns 是否成功处理
 */
declare function handleApiResponse(
  instance: ApiHook,
  parseResponseFn: RequestConfig['parseResponse'],
  apiPath: string,
  fullUrl: string,
  responseBody: unknown,
  defaultCode: number,
  duration: number,
  timestamp: number,
  traceId: string,
  sessionId: string,
  snapshot: Record<string, unknown>,
  traceIdSource: string | null,
  samplingFlag: number
): boolean;

/**
 * 工具函数模块接口
 */
interface Utils {
  /** 安全解析 JSON */
  J(json: string): unknown;
  
  /** 安全调用函数 */
  safetyCall<T, R>(fn: ((...args: T[]) => R) | undefined, args: T[], defaultValue: R): R;
  
  /** 扩展对象属性 */
  ext<T, S>(target: T, source: S): T & S;
  
  /** 获取当前域名 */
  getCurDomain(): string;
  
  /** 移除 URL 查询参数 */
  cutUrlSearch(url: string): string;
  
  /** 检查是否为需要监控的 API */
  checkAPI(url: string, flag: boolean): boolean;
  
  /** 根据规则忽略 API */
  ignoreByRule(url: string, rules?: string | RegExp | Array<string | RegExp>): boolean;
  
  /** 根据规则过滤 API 路径 */
  filterByRule(url: string, rules?: string | RegExp | Array<string | RegExp>): string;
  
  /** 检查是否同源 */
  checkSameOrigin(url: string, origin: string): boolean;
  
  /** 解析 fetch 响应头 */
  parseFetchHeaders(headers: Headers): Record<string, string>;
  
  /** 获取 fetch 请求快照 */
  getFetchSnapshot(args: unknown[], responseText: string, headers: Headers): Record<string, unknown>;
  
  /** 解析 XHR 响应头 */
  parseXhrHeaders(headerString: string): Record<string, string>;
  
  /** 获取 XHR 请求快照 */
  getXhrSnapshot(url: string, method: string, xhr: XMLHttpRequest): Record<string, unknown>;
  
  /** 创建伪造的 toString 方法 */
  createFakeToString(name: string): () => string;
  
  /** 警告日志 */
  warn(message: string, ...args: unknown[]): void;
  
  /** 事件监听 */
  on(target: EventTarget, event: string, handler: EventListener): void;
}

/**
 * 创建 API 监控钩子模块
 * @param RetcodeClass - 监控类构造函数
 * @param globalWindow - 全局 window 对象
 * @returns 增强后的监控类
 */
declare function createApiHookModule(
  RetcodeClass: new (...args: unknown[]) => RetcodeInstance,
  globalWindow: WindowWithHooks
): new (...args: unknown[]) => RetcodeInstance & ApiHook;

export default createApiHookModule;