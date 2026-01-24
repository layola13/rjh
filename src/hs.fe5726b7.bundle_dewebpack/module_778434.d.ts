/**
 * API 服务模块类型定义
 * 提供邮件发送、微信功能、日志记录、数据分析等服务接口
 */

/**
 * HTTP 客户端接口
 * 用于发起网络请求
 */
interface HttpClient {
  /**
   * 发起 GET 请求
   * @param url - 请求地址
   * @param config - 请求配置
   */
  get<T = unknown>(url: string, config?: RequestConfig): Promise<T>;

  /**
   * 发起 POST 请求
   * @param url - 请求地址
   * @param data - 请求数据
   * @param config - 请求配置
   */
  post<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<T>;
}

/**
 * 请求配置选项
 */
interface RequestConfig {
  /** 自定义请求头 */
  headers?: Record<string, string | boolean>;
  /** 其他配置项 */
  [key: string]: unknown;
}

/**
 * 邮件发送参数
 */
interface EmailParams {
  /** 邮件主题 */
  subject: string;
  /** 邮件正文 */
  body: string;
  /** 发件人地址 */
  from: string;
  /** 收件人地址 */
  to: string;
}

/**
 * 微信签名响应
 */
interface WeChatSignature {
  /** 微信 JS-SDK 签名 */
  signature: string;
  /** 时间戳 */
  timestamp: number;
  /** 随机字符串 */
  nonceStr: string;
}

/**
 * 短链接服务响应
 */
interface ShortenUrlResponse {
  /** 错误码，-1 表示成功 */
  er: number;
  /** 短链接 */
  short_url: string;
}

/**
 * 日志事件项
 */
interface LogEvent {
  /** 事件类型 */
  type?: string;
  /** 事件数据 */
  [key: string]: unknown;
}

/**
 * 日志发送参数
 */
interface LogParams {
  /** 事件列表 */
  events: LogEvent[];
  /** 其他日志属性 */
  [key: string]: unknown;
}

/**
 * 追踪日志项
 */
interface TrackLogItem {
  /** 追踪数据 */
  [key: string]: unknown;
}

/**
 * 追踪日志类型
 */
type TrackLogType = 'userTrack' | 'error' | 'api' | 'performance';

/**
 * 页面浏览量响应
 */
interface PVResponse {
  /** 错误码，-1 表示成功 */
  er: number;
  /** 浏览量计数 */
  count?: number;
}

/**
 * 地址信息项
 */
interface AddressInfo {
  /** 地址 ID */
  id?: string;
  /** 地址名称 */
  name?: string;
  /** 其他地址属性 */
  [key: string]: unknown;
}

/**
 * 中国地址信息响应
 */
interface ChinaAddressResponse {
  /** 返回状态码数组 */
  ret: string[];
  /** 响应数据 */
  data?: {
    /** 地址列表 */
    items?: AddressInfo[];
  };
}

/**
 * API 服务集合接口
 * 包含所有可用的 API 方法
 */
interface ApiService {
  /**
   * 发送邮件
   * @param subject - 邮件主题
   * @param body - 邮件正文
   * @param from - 发件人地址
   * @param to - 收件人地址
   * @returns 发送结果 Promise
   */
  sendMail(subject: string, body: string, from: string, to: string): Promise<unknown>;

  /**
   * 生成短链接
   * @param url - 原始 URL
   * @returns 短链接字符串
   */
  shortenUrl(url: string): Promise<string>;

  /**
   * 获取微信 JS-SDK 签名
   * @param url - 当前页面 URL
   * @returns 微信签名信息
   */
  getWeChatSignature(url: string): Promise<WeChatSignature>;

  /**
   * 发送应用日志
   * @param logParams - 日志参数对象
   * @returns 日志发送结果
   */
  sendLog(logParams: LogParams): Promise<unknown>;

  /**
   * 发送追踪日志（通用方法）
   * @param items - 追踪项列表
   * @param type - 日志类型
   * @returns 日志发送结果
   */
  sendTrackLog(items: TrackLogItem[], type: TrackLogType): Promise<unknown>;

  /**
   * 发送用户行为追踪日志
   * @param items - 用户行为追踪项
   * @returns 日志发送结果
   */
  sendUserTrackLog(items: TrackLogItem[]): Promise<unknown>;

  /**
   * 发送错误日志
   * @param items - 错误信息项
   * @returns 日志发送结果
   */
  sendErrorLog(items: TrackLogItem[]): Promise<unknown>;

  /**
   * 发送 Mtop API 调用日志
   * @param items - API 调用信息项
   * @returns 日志发送结果
   */
  sendMtopApiLog(items: TrackLogItem[]): Promise<unknown>;

  /**
   * 发送性能监控日志
   * @param items - 性能数据项
   * @returns 日志发送结果
   */
  sendPerformanceLog(items: TrackLogItem[]): Promise<unknown>;

  /**
   * 获取页面浏览量
   * @param pageId - 页面标识符
   * @returns 页面浏览量数值
   */
  getPV(pageId: string): Promise<number>;

  /**
   * 获取中国地址信息（V2版本）
   * @returns 地址信息列表
   */
  getChinaAddressInfoV2(): Promise<AddressInfo[]>;

  /**
   * 新手任务获取积分
   * @param params - 任务参数
   * @returns 执行结果
   */
  earnPointsByNoviceTask(params: unknown): Promise<void>;
}

/**
 * API 服务工厂函数
 * @param httpClient - HTTP 客户端实例
 * @returns API 服务实例
 */
declare function createApiService(httpClient: HttpClient): ApiService;

export { ApiService, HttpClient, EmailParams, WeChatSignature, LogParams, TrackLogItem, TrackLogType, AddressInfo, createApiService };
export default createApiService;