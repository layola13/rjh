/**
 * 登录模块类型定义
 * @module LoginModule
 */

/**
 * 登录消息事件数据结构
 */
interface LoginMessageData {
  /** 平台类型 */
  type?: string;
  /** 登录状态 */
  status?: string;
  /** 事件类型 */
  eType?: string;
}

/**
 * 登录消息事件结构
 */
interface LoginMessageEvent {
  /** 操作类型 */
  action?: string;
  /** 消息数据 */
  data?: LoginMessageData;
}

/**
 * URL查询参数结构
 */
interface QueryParams {
  /** Web客户端标识 */
  webClient?: string;
  [key: string]: string | undefined;
}

/**
 * 平台登录URL配置
 */
interface PlatformLoginUrls {
  [platform: string]: string;
}

/**
 * 配置对象结构
 */
interface Config {
  /** 平台登录URL映射表 */
  PLATFORM_LOGIN_URL: PlatformLoginUrls;
  /** Passport服务器地址 */
  PASSPORT_SERVER: string;
  /** iPassport服务器地址 */
  IPASSPORT_SERVER: string;
}

/**
 * 迷你登录嵌入器配置选项
 */
interface MiniLoginEmbedderOptions {
  /** 目标iframe元素ID */
  targetId: string;
  /** iframe加载的URL */
  iframeUrl: string;
  /** 语言设置 */
  lang: string;
  /** 应用名称 */
  appName: string;
  /** 应用入口 */
  appEntrance: string;
  /** 是否不加载SSO视图 */
  notLoadSsoView: string;
  /** 是否保持登录状态 */
  notKeepLogin: boolean;
  /** 是否为移动端 */
  isMobile: boolean;
  /** iframe宽度 */
  iframeWidth: string;
  /** 是否显示社交网络登录 */
  showSnsLogin: boolean;
  /** 额外查询字符串 */
  queryStr: string;
}

/**
 * 迷你登录嵌入器类
 */
declare class MiniLoginEmbedder {
  /**
   * 初始化嵌入器
   * @param options - 配置选项
   */
  init(options: MiniLoginEmbedderOptions): void;

  /**
   * 添加事件监听器
   * @param eventName - 事件名称
   * @param handler - 事件处理函数
   */
  addEvent(eventName: string, handler: (event: LoginMessageEvent) => void): void;
}

/**
 * HTML工具类
 */
interface HtmlUtils {
  /**
   * 转义HTML特殊字符
   * @param html - 原始HTML字符串
   * @returns 转义后的安全字符串
   */
  escapeHtml(html: string): string;
}

/**
 * 全局Window扩展
 */
declare global {
  interface Window {
    /** 迷你登录嵌入器构造函数 */
    MiniLoginEmbedder: typeof MiniLoginEmbedder;
  }
}

/**
 * 创建登录消息监听器
 * @param platform - 平台类型 ("ea" | "global" | "homestyler")
 * @returns 消息事件处理函数
 */
export declare function loginMessageListener(
  platform: string
): (event: LoginMessageEvent) => void;

/**
 * 初始化登录界面
 * @param platform - 平台类型 ("ea" | "global" | "homestyler")
 * @param loginType - 登录类型（当platform为"ea"时使用）
 */
export default function initLogin(platform: string, loginType?: string): void;

/**
 * 从URL获取查询参数
 * @param url - URL字符串
 * @returns 查询参数对象
 */
export declare function getQueryStringsFromUrl(url: string): QueryParams;

/**
 * 向URL添加参数
 * @param url - 基础URL
 * @param params - 要添加的参数对象
 * @returns 拼接后的完整URL
 */
export declare function addParams(url: string, params: Record<string, string>): string;