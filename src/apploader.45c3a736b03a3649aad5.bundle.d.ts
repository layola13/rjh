/**
 * 应用配置常量
 */
export interface AppConfig {
  /** MTOP配置 */
  readonly homestyler: {
    readonly MTOPPREFIX: string;
    readonly MTOPSUBDOMAIN: string;
    readonly MTOPMAINDOMIAN: string;
    readonly PAGEDOMAIN: string;
  };
  readonly ea: {
    readonly MTOPPREFIX: string;
    readonly MTOPSUBDOMAIN: string;
    readonly MTOPMAINDOMIAN: string;
    readonly PAGEDOMAIN: string;
  };
  /** 主机地址 */
  readonly HOST: string;
  /** 工具授权失败页面 */
  readonly TOOL_LICENSE_FAILURE: string;
  readonly HAI_XUN_TOOL_LICENSE_FAILURE: string;
  /** 平台登录URL映射 */
  readonly PLATFORM_LOGIN_URL: Record<string, string>;
  /** Passport服务地址 */
  readonly IPASSPORT_SERVER: string;
  readonly PASSPORT_SERVER: string;
  /** 网络检测图片 */
  readonly NETWORK_CHECK_IMG: string;
  /** 日志服务API */
  readonly LOG_SERVICE_API_SERVER: string;
  /** 部署资源桶 */
  readonly DEPLOY_3D_RES_BUCKET: string;
  /** 提示类型 */
  readonly HINT_ON_NULL_VERSION: string;
  readonly HINT_ON_LOGIN_ERROR: string;
  /** 默认页面资源 */
  readonly DEFAULT_TITLE: string;
  readonly DEFAULT_FAV_ICON: string;
  readonly DEFAULT_LOADING_IMG: string;
  readonly DEFAULT_LOADING_DESCRIPTION: string;
  readonly DEFAULT_LOGO_IMG: string;
}

/**
 * URL查询参数接口
 */
export interface QueryParams {
  env?: string;
  packageId?: string;
  version?: string;
  preciseFP?: string;
  hxrr?: string;
  webClient?: string;
  clientVersion?: string;
  channelCode?: string;
  serviceType?: string;
  caseId?: string;
  biz?: string;
  assetId?: string;
  userId?: string;
  enableInternalNet?: string;
  biz_tag?: string;
  mpdomain?: string;
  adid?: string;
}

/**
 * 应用版本配置
 */
export interface AppVersionConfig {
  versionType?: string;
  webConfigVersion: {
    paths: string[];
  };
}

/**
 * 网络检测等级
 */
export enum NetworkIntensity {
  Good = 'good',
  Bad = 'bad',
  OffLine = 'offLine'
}

/**
 * 网络检测结果
 */
export interface NetworkDetectResult {
  intensity: NetworkIntensity;
  duration: number;
  status: 'success' | 'fail';
  grade: {
    good: number;
    average: number;
    poor: number;
  };
}

/**
 * 网络检测器类
 */
export declare class NetworkDetect {
  constructor(biz: string);
  
  /**
   * 检测网络速度
   * @param imageUrl - 检测用图片URL
   */
  detectNetworkSpeed(imageUrl: string): Promise<NetworkDetectResult>;
  
  /**
   * 检测打开工具时的网络状况
   * @param imageUrl - 检测用图片URL
   */
  detectOpenToolNetwork(imageUrl: string): Promise<NetworkDetectResult>;
  
  /**
   * 检测内网访问
   */
  detectinternalNetwork(): Promise<[string, string]>;
}

/**
 * 数据分析服务
 */
export declare class AnalyticsService {
  constructor(options: { biz: string });
  
  /** 启动分析服务 */
  start(): void;
  
  /** 发送页面访问(PV) */
  sendPV(): void;
  
  /**
   * 设置ADSK用户信息
   * @param user - 用户数据
   */
  setAdskUser(user: { memberId: string; umsId: string }): void;
  
  /**
   * 发送用户访问(UV)
   * @param eventName - 事件名称
   * @param extraData - 额外数据
   */
  sendUV(eventName: string, extraData?: Record<string, unknown>): void;
}

/**
 * API方法定义
 */
export interface APIMethod {
  method: 'post';
  url: string;
  description: string;
  isTpzz?: boolean;
  removeEaSuffix?: boolean;
  baseApi?: boolean;
}

/**
 * API响应
 */
export interface APIResponse<T = unknown> {
  ret: string[];
  data?: T;
  status?: {
    code: number;
  };
}

/**
 * 用户登录状态响应
 */
export interface UserLoginResponse {
  memberId: string;
  umsId: string;
}

/**
 * 灰度版本响应
 */
export interface GrayVersionResponse {
  result?: {
    toolVersion: string;
  };
}

/**
 * 用户会员信息
 */
export interface UserMemberInfo {
  memberType: number;
  groupUser: boolean;
  stylerMember: boolean;
}

/**
 * 安全工具类
 */
export declare namespace SecurityUtil {
  /**
   * HTML转义
   * @param html - 原始HTML字符串
   */
  function escapeHtml(html: string): string;
  
  /**
   * 获取安全的URL
   * @param url - 待检查的URL
   * @param whitelist - 白名单(可选)
   */
  function getSafeURL(url: string, whitelist?: Array<[string, 'matches' | 'precise']>): string | null;
  
  /**
   * 添加单个URL到白名单
   * @param url - URL
   * @param type - 匹配类型
   */
  function addSingleURLToWhitelist(url: string, type?: 'matches' | 'precise'): boolean;
  
  /**
   * 添加URL白名单
   * @param list - 白名单数组
   */
  function addURLWhitelist(list: Array<[string, 'matches' | 'precise']>): number;
  
  /**
   * 添加协议到白名单
   * @param protocol - 协议名称
   */
  function addProtocolToWhitelist(protocol: string): void;
}

/**
 * 工具函数
 */
export declare namespace Utils {
  /** 从URL中解析查询参数 */
  function getQueryStringsFromUrl(search: string): QueryParams;
  
  /** 根据appconfig获取环境信息 */
  function getEnvByAppconfig(appconfig?: string, env?: string): { configEnv: string; biz: string };
  
  /** 生成UUID */
  function getUUID(): string;
  
  /** 检查是否为32位浏览器 */
  function check32BitBrowser(): Promise<boolean>;
  
  /** 发送日志 */
  function sendLog(logData: Record<string, unknown>): void;
  
  /** 跳转到目标URL */
  function jumpToTargetUrl(url: string): void;
  
  /** 判断是否为智造环境 */
  function isZhiZao(): boolean;
  
  /** 判断是否为新版FP工具 */
  function isNewFpTool(version: string, biz: string, appconfig: string): boolean;
  
  /** 版本比较 */
  function isEarlierThan(version1: string, version2: string): boolean;
  
  /** 添加URL参数 */
  function addParams(url: string, params: Record<string, string>): string;
  
  /** Cookie操作 */
  function getCookies(): Record<string, string>;
  function setCookie(name: string, value: string, options?: {
    maxage?: number;
    path?: string;
    domain?: string;
    expires?: Date;
    secure?: boolean;
  }): void;
  
  /** Homestyler信息 */
  function createHSInfo(): void;
  function getHSInfo(): { adid?: string; hsi?: string; hsb: string };
}

/**
 * 页面加载相关
 */
export declare namespace PageLoader {
  /** 加载Favicon */
  function loadFavIcon(iconUrl: string): void;
  
  /** 加载页面标题 */
  function loadTitle(title: string): void;
  
  /** 加载Loading图片 */
  function LoadingImage(isNewFp: boolean, isProd: boolean, isHaiXun: boolean): void;
  
  /** 根据用户信息加载首页 */
  function loadIndexByUser(biz: string, env?: string): void;
}

/**
 * 登录消息监听器
 * @param biz - 业务类型
 */
export declare function loginMessageListener(biz: string): (message: MessageEvent) => void;

/**
 * 显示浏览器检查提示
 * @param message - 提示消息
 * @param className - 额外CSS类名
 */
export declare function showBrowserCheckTip(message: string, className?: string): void;

/**
 * 显示内网检测提示
 * @param message - 提示消息
 * @param isAnimated - 是否显示动画
 */
export declare function showInternalNetworkTip(message: string, isAnimated: boolean): void;

/**
 * 全局变量扩展
 */
declare global {
  interface Window {
    /** 应用版本配置 */
    AppVersionConfig?: AppVersionConfig;
    /** 发布版本 */
    publishVersion?: string;
    /** 按类型的发布版本 */
    publishVersionByType?: string;
    /** 全局客户端用户 */
    globalClientUser?: {
      messageListener: (message: MessageEvent) => void;
    } | null;
    /** Goldlog队列 */
    goldlog_queue?: Array<{
      action: string;
      arguments: unknown[];
    }>;
  }
}

export {};