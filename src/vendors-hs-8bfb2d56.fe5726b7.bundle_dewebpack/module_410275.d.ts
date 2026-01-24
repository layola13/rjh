/**
 * Mtop API 请求模块
 * 提供统一的API请求封装,支持Homestyler平台的网络通信
 */

/**
 * Mtop 配置选项
 */
export interface MtopConfig {
  /** API前缀,默认为 'h5api' */
  prefix?: string;
  /** 子域名,默认为 'm' */
  subDomain?: string;
  /** 主域名,默认为 'taobao.com' */
  mainDomain?: string;
}

/**
 * 初始化配置参数
 */
export interface InitOptions {
  /** Mtop配置 */
  config: MtopConfig;
}

/**
 * 客户端信息
 */
export interface ClientInfo {
  /** 平台类型 (如: 'web', 'mobile', 'app') */
  platform: string;
  /** 语言设置 */
  language: string;
}

/**
 * Mtop 请求数据
 */
export interface MtopRequestData {
  /** 客户端信息JSON字符串 */
  clientInfo?: string;
  /** 平台系统标识 */
  platformSystem?: string;
  /** 是否需要登录验证 */
  needLogin?: boolean;
  /** 其他动态参数 */
  [key: string]: unknown;
}

/**
 * Mtop 请求选项
 */
export interface MtopRequestOptions {
  /** API版本,默认 '1.0' */
  v?: string;
  /** 错误码,默认 0 */
  ecode?: number;
  /** 数据类型,默认 'json' */
  dataType?: string;
  /** 超时时间(毫秒),默认 8000 */
  timeout?: number;
  /** API接口路径 */
  api?: string;
  /** 请求类型 */
  type?: 'get' | 'post' | 'GET' | 'POST';
  /** 请求数据 */
  data?: MtopRequestData;
  /** 应用密钥,默认 '24770048' */
  appKey?: string;
  /** 扩展请求头 */
  ext_headers?: Record<string, unknown>;
  /** H5请求标识(仅在useHomestylerTop模式下) */
  H5Request?: boolean;
}

/**
 * Mtop 响应数据
 */
export interface MtopResponse<T = unknown> {
  /** 返回状态码数组 */
  ret?: string[];
  /** 响应数据 */
  data?: T;
}

/**
 * 请求上下文
 */
export interface RequestContext<T = unknown> {
  /** 请求参数 */
  params: MtopRequestOptions;
  /** 请求选项 */
  opts: MtopRequestOptions;
  /** 请求开始时间戳 */
  begin: number;
  /** 响应结果 */
  res: MtopResponse<T>;
}

/**
 * 发送请求的额外选项
 */
export interface SendRequestOptions {
  /** 是否处理emoji字符转义 */
  processEmoji?: boolean;
}

/**
 * 网络消息事件详情
 */
export interface NetworkMessageDetail {
  /** 消息类型 */
  type: 'login' | 'error';
  /** 消息内容 */
  msg: string;
  /** API地址 */
  URL: string;
}

/**
 * 网络消息自定义事件
 */
declare global {
  interface WindowEventMap {
    newtWorkMsg: CustomEvent<NetworkMessageDetail>;
  }
}

/**
 * Mtop API 请求类
 * 提供统一的API调用、错误处理、登录验证等功能
 */
export default class MtopClient {
  /**
   * 构造函数
   * @param options - 初始化选项
   */
  constructor(options: InitOptions);

  /**
   * 静态方法: 设置全局配置
   * @param config - Mtop配置对象
   */
  static setConfig(config: MtopConfig): void;

  /**
   * 发送Mtop请求前的钩子
   * 在请求发送前添加语言等扩展头信息
   * @param options - 请求选项
   */
  protected sendMtopBefore(options: MtopRequestOptions): void;

  /**
   * 发送Mtop请求后的钩子
   * 处理响应数据并提取data字段
   * @param context - 请求上下文
   * @returns 提取后的响应数据
   */
  protected sendMtopAfter<T = unknown>(context: RequestContext<T>): T | undefined;

  /**
   * Mtop请求错误处理器
   * 处理会话过期、登录失效等错误场景
   * @param context - 请求上下文
   * @returns 处理后的响应数据
   */
  protected sendMtopErrorHandler<T = unknown>(context: RequestContext<T>): MtopResponse<T>;

  /**
   * 处理Emoji字符转义
   * 将emoji字符转换为Unicode转义序列
   * @param data - 待处理的数据(对象或字符串)
   * @returns 处理后的数据
   */
  protected processEmoji(data: unknown): unknown;

  /**
   * 发送Mtop API请求
   * @param params - 请求参数
   * @returns Promise,resolve时返回响应数据
   */
  sendMtop<T = unknown>(params: {
    /** API URL路径 */
    url?: string;
    /** 请求方法,默认 'get' */
    method?: 'get' | 'post' | 'GET' | 'POST';
    /** 请求数据 */
    data?: MtopRequestData;
    /** Mtop请求选项 */
    opts?: MtopRequestOptions;
    /** 额外请求选项 */
    requestOptions?: SendRequestOptions;
  }): Promise<T>;
}

/**
 * 是否使用Homestyler顶级模式
 * 通过URL参数 'useHomestylerTop' 判断
 */
export const useHomestylerTop: boolean;