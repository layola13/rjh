/**
 * 通用工具函数类型定义
 * 包含URL解析、环境配置、API请求、Cookie操作、日志记录等功能
 */

/**
 * URL查询字符串键值对映射
 */
export interface QueryStrings {
  [key: string]: string;
}

/**
 * 环境配置类型
 * @property configEnv - 配置环境：prod(生产)/pre(预发)/daily(日常)/alpha(测试)
 * @property biz - 业务线标识：homestyler/ea/global
 */
export interface EnvConfig {
  configEnv: 'prod' | 'pre' | 'daily' | 'alpha';
  biz: 'homestyler' | 'ea' | 'global' | 'icbu' | 'shejishi';
}

/**
 * Cookie选项配置
 */
export interface CookieOptions {
  /** Cookie最大存活时间（毫秒） */
  maxage?: number;
  /** Cookie过期时间 */
  expires?: Date;
  /** Cookie路径 */
  path?: string;
  /** Cookie域名 */
  domain?: string;
  /** 是否仅HTTPS传输 */
  secure?: boolean;
}

/**
 * API请求数据选项
 */
export interface APIRequestOptions {
  /** 请求数据 */
  data?: Record<string, unknown>;
  /** 额外配置选项 */
  options?: Record<string, unknown>;
}

/**
 * API请求额外参数
 */
export interface APIExtraOptions {
  /** 自定义请求头 */
  headers?: Record<string, string>;
}

/**
 * Homestyler信息
 */
export interface HSInfo {
  /** 广告ID */
  adid?: string;
  /** Homestyler会话ID */
  hsi?: string;
  /** Homestyler行为数据 */
  hsb?: string;
}

/**
 * 用户信息
 */
export interface UserInfo {
  /** 用户ID */
  userId: string;
  /** 业务线 */
  biz: string;
  /** 环境域名 */
  env: string;
  /** 案例ID */
  caseId?: string;
  /** 资产ID */
  assetId?: string;
  /** 包ID */
  packageId?: string;
}

/**
 * 日志自定义信息
 */
export interface LogCustomizedInfo {
  /** 案例ID */
  caseId?: string;
  /** 设计ID */
  designId?: string;
  /** 包ID */
  packageId?: string;
  /** 描述信息 */
  description: string;
  /** 分组 */
  group: string;
  /** 分组名称 */
  groupName: string;
  /** API信息 */
  apiInfo?: string;
  /** 状态 */
  state?: string;
  /** 错误信息 */
  errInfo?: string;
}

/**
 * 日志记录结构
 */
export interface LogEntry {
  /** 操作类型 */
  actionType: string;
  /** 当前时间戳 */
  currentTime: number;
  /** 日志名称 */
  logName: string;
  /** 追踪ID */
  traceId: string;
  /** 自定义信息 */
  customizedInfo: LogCustomizedInfo;
  /** 用户信息 */
  userInfo: Partial<UserInfo>;
}

/**
 * POST请求配置
 */
export interface PostAPIConfig {
  /** 内容类型 */
  contentType?: string;
  /** 自定义请求头 */
  headers?: Record<string, string | boolean>;
}

/**
 * 从URL中解析查询字符串参数
 * @param url - 包含查询参数的URL字符串
 * @returns 查询参数键值对对象
 */
export function getQueryStringsFromUrl(url: string): QueryStrings;

/**
 * 根据应用配置获取环境信息
 * @param appConfig - 应用配置URL或标识
 * @param biz - 业务线标识
 * @returns 环境配置对象
 */
export function getEnvByAppconfig(appConfig?: string, biz?: string): EnvConfig;

/**
 * 发起API请求（基于MTOP）
 * @param apiName - API名称
 * @param env - 环境标识
 * @param platform - 平台环境
 * @param data - 请求数据
 * @param extraOptions - 额外请求选项
 * @returns Promise包装的API响应
 */
export function getAPIPromise<T = unknown>(
  apiName: string,
  env: string,
  platform?: string,
  data?: Record<string, unknown>,
  extraOptions?: APIExtraOptions
): Promise<T>;

/**
 * 为URL添加查询参数
 * @param url - 原始URL
 * @param params - 要添加的参数键值对
 * @returns 添加参数后的URL
 */
export function addParams(url: string, params: Record<string, string | number>): string;

/**
 * 获取当前日期字符串（格式：YYYYMMDD）
 * @returns 日期字符串
 */
export function getDateString(): string;

/**
 * 获取所有Cookie
 * @returns Cookie键值对对象
 */
export function getCookies(): Record<string, string>;

/**
 * 设置Cookie
 * @param name - Cookie名称
 * @param value - Cookie值
 * @param options - Cookie选项配置
 */
export function setCookie(name: string, value: string | null, options?: CookieOptions): void;

/**
 * 创建Homestyler信息Cookie
 * 包含会话ID和广告ID
 */
export function createHSInfo(): void;

/**
 * 获取Homestyler相关信息
 * @returns 包含adid、hsi、hsb的对象
 */
export function getHSInfo(): HSInfo;

/**
 * 生成UUID（格式：xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx）
 * @returns UUID字符串
 */
export function getUUID(): string;

/**
 * 检查是否为32位浏览器（Windows且非x64）
 * @returns Promise，resolve布尔值表示是否为32位
 */
export function check32BitBrowser(): Promise<boolean>;

/**
 * 发送POST请求
 * @param url - 请求URL
 * @param data - 请求体数据
 * @param config - 请求配置
 * @returns Promise包装的响应JSON
 */
export function postAPI<T = unknown>(
  url: string,
  data?: unknown,
  config?: PostAPIConfig
): Promise<T>;

/**
 * 发送日志到日志服务
 * @param logEntry - 日志条目
 */
export function sendLog(logEntry: LogEntry): void;

/**
 * 登录错误提示并记录日志
 * @param userInfo - 用户信息
 * @param state - 状态信息
 * @param apiInfo - API信息
 * @param errorInfo - 错误详情
 */
export function hintOnLoginError(
  userInfo: UserInfo,
  state: string,
  apiInfo: string,
  errorInfo: string
): void;

/**
 * 版本为空时提示并记录日志
 * @param userInfo - 用户信息
 * @param state - 状态信息
 * @param apiInfo - API信息
 * @param errorInfo - 错误详情
 */
export function hintOnNullVersion(
  userInfo: UserInfo,
  state: string,
  apiInfo: string,
  errorInfo: string
): void;

/**
 * 判断是否为新版FP工具
 * @param version - 版本号（格式：x.y.z）
 * @param env - 环境标识
 * @param platform - 平台标识
 * @returns 是否为新版工具
 */
export function isNewFpTool(version: string, env: string, platform: string): boolean;

/**
 * 跳转到目标URL（支持iframe内外跳转）
 * @param url - 目标URL
 */
export function jumpToTargetUrl(url: string): void;

/**
 * 判断是否为"智造"业务线
 * @returns 是否为智造业务
 */
export function isZhiZao(): boolean;

/**
 * 比较版本号是否早于指定版本
 * @param version1 - 待比较的版本号
 * @param version2 - 目标版本号
 * @returns version1是否早于version2
 */
export function isEarlierThan(version1: string, version2: string): boolean;

export const __esModule: true;