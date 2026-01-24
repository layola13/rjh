/**
 * Browser Logger SDK - 浏览器日志记录器单例模块
 * 提供日志收集、性能监控、资源监控等功能
 */

/**
 * 浏览器日志记录器配置选项
 */
export interface BrowserLoggerConfig {
  /** 是否自动发送页面浏览量(PV) */
  autoSendPv?: boolean;
  /** 是否使用首次有意义绘制(FMP)监控 */
  useFmp?: boolean;
  /** 是否发送资源加载信息 */
  sendResource?: boolean;
  /** 是否为实例启用自动发送 */
  enableInstanceAutoSend?: boolean;
  [key: string]: unknown;
}

/**
 * 浏览器日志记录器类
 * 负责收集和发送浏览器端的日志、性能数据
 */
export declare class BrowserLogger {
  /** 内部配置对象 */
  _conf: BrowserLoggerConfig;

  /**
   * 构造函数
   * @param config - 日志记录器配置选项
   */
  constructor(config: BrowserLoggerConfig);

  /**
   * 发送管道中的数据
   * @param pipeData - 管道数据数组
   */
  sendPipe(pipeData: unknown[]): void;

  /**
   * 发送页面浏览量(Page View)数据
   */
  sendPV(): void;

  /**
   * 发送性能监控数据
   */
  sendPerformance(): void;

  /**
   * 发送资源加载监控数据
   */
  sendResources(): void;

  /**
   * 单例模式获取日志记录器实例
   * 如果已初始化则返回现有实例，否则创建新实例
   * @param config - 日志记录器配置选项
   * @param pipeData - 初始管道数据
   * @returns BrowserLogger实例
   */
  static singleton(config: BrowserLoggerConfig, pipeData?: unknown[]): BrowserLogger;

  /**
   * 创建额外的独立日志记录器实例
   * 默认不自动发送数据，除非显式配置
   * @param config - 日志记录器配置选项
   * @returns 新的BrowserLogger实例
   */
  static createExtraInstance(config: BrowserLoggerConfig): BrowserLogger;

  /**
   * 获取或初始化浏览器日志记录器
   * @returns BrowserLogger实例或undefined
   */
  static bl?: BrowserLogger;
}

/**
 * Window对象扩展接口
 */
declare global {
  interface Window {
    /** 浏览器日志记录器类 */
    BrowserLogger: typeof BrowserLogger;
    /** SDK初始化标记 */
    __hasInitBlSdk?: boolean;
    /** 日志记录器实例存储键 */
    [key: string]: unknown;
  }
}

export default BrowserLogger;