/**
 * 阿里云日志上报服务类型定义
 * 用于跟踪页面浏览(PV)和用户行为(UV)
 */

/**
 * 业务类型
 * - 'global': 国际站业务
 * - 其他值: 国内业务
 */
type BizType = 'global' | string;

/**
 * 阿里设计家用户信息
 */
interface AdskUserInfo {
  /** 会员ID */
  memberId: string;
  /** 用户唯一标识 */
  uid: string;
}

/**
 * 用户信息扩展字段
 */
interface UserInfo {
  /** 会员ID */
  memberId?: string;
  /** 用户唯一标识 */
  uid?: string;
  /** 来源类型: Web/WindowsClient/MacClient */
  source?: string;
  /** 客户端版本号 */
  clientVersion?: string;
  /** 发布版本号 */
  publishVersion?: string;
  /** 环境标识 */
  environment?: string;
  /** 环境域名(仅国内业务) */
  envDomain?: string;
  /** 渠道代码 */
  channelCode?: string;
  /** 来源URL */
  refer_from_url?: string;
  /** 其他动态字段 */
  [key: string]: string | undefined;
}

/**
 * URL查询参数
 */
interface QueryStrings {
  /** 客户端类型: win/mac */
  webClient?: string;
  /** 客户端版本 */
  clientVersion?: string;
  /** 渠道代码 */
  channelCode?: string;
  /** 环境标识 */
  env?: string;
  [key: string]: string | undefined;
}

/**
 * Goldlog队列项
 */
interface GoldlogQueueItem {
  /** 执行的动作 */
  action: string;
  /** 动作参数 */
  arguments: unknown[];
}

/**
 * 全局Goldlog队列声明
 */
declare global {
  interface Window {
    /** Goldlog上报队列 */
    goldlog_queue?: GoldlogQueueItem[];
    /** 发布版本号 */
    publishVersion?: string;
  }
}

/**
 * 日志上报服务构造参数
 */
interface AnalyticsServiceOptions {
  /** 业务类型 */
  biz: BizType;
}

/**
 * HS信息(国际站特有)
 */
interface HSInfo {
  [key: string]: string | number | boolean | undefined;
}

/**
 * 阿里云日志上报服务
 * 支持国内和国际站业务的PV/UV数据采集
 */
export default class AnalyticsService {
  /** 业务类型标识 */
  private readonly biz: BizType;

  /** 用户信息缓存 */
  private userInfo: UserInfo;

  /** 阿里设计家用户信息 */
  private adskUser: AdskUserInfo;

  /**
   * 创建日志上报服务实例
   * @param options - 配置选项
   */
  constructor(options: AnalyticsServiceOptions);

  /**
   * 初始化并启动日志采集
   * - 注入阿里云aplus日志SDK
   * - 根据业务类型加载不同配置
   */
  start(): void;

  /**
   * 发送页面浏览量(PV)数据
   * 自动附加用户信息和来源URL
   */
  sendPV(): void;

  /**
   * 设置阿里设计家用户信息
   * @param user - 用户信息对象
   */
  setAdskUser(user: AdskUserInfo): void;

  /**
   * 获取并更新用户信息
   * 从URL参数、全局变量等来源聚合用户数据
   * @private
   */
  private getUserInfo(): void;

  /**
   * 发送用户行为(UV)埋点数据
   * @param eventName - 事件名称
   * @param extraParams - 额外的上报参数
   */
  sendUV(eventName: string, extraParams?: Record<string, string | number>): void;
}

/**
 * 工具函数类型定义(来自模块734)
 */

/**
 * 从URL字符串解析查询参数
 * @param search - URL查询字符串(如: "?key=value&foo=bar")
 * @returns 解析后的键值对对象
 */
export function getQueryStringsFromUrl(search: string): QueryStrings;

/**
 * 创建HS信息(仅国际站使用)
 */
export function createHSInfo(): void;

/**
 * 获取HS信息(仅国际站使用)
 * @returns HS信息对象
 */
export function getHSInfo(): HSInfo;