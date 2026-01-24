/**
 * FPS监控模块 - 用于监控和记录应用程序的帧率性能
 * Module: module_554430
 * Original ID: 554430
 */

/**
 * FPS变化事件数据接口
 */
export interface FPSChangeEvent {
  /** 当前帧率值 */
  fps: number;
  /** 时间戳 */
  timestamp?: number;
  /** 其他可能的性能指标 */
  [key: string]: unknown;
}

/**
 * 监控配置接口
 */
export interface MonitorConfig {
  /** 文档打开信号 */
  signalDocumentOpening: string | symbol;
  /** 其他配置选项 */
  [key: string]: unknown;
}

/**
 * FPS度量收集器接口
 */
interface FPSMetrics {
  /** 启用FPS度量收集 */
  enable(): void;
  /** 禁用FPS度量收集 */
  disable(): void;
  /** 绑定FPS变化回调 */
  bind(callback: (event: FPSChangeEvent) => void): void;
  /** 销毁度量收集器 */
  destroy(): void;
}

/**
 * 日志记录器接口
 */
interface Logger {
  /** 记录FPS数据 */
  log(event: FPSChangeEvent): void;
}

/**
 * 信号钩子接口
 */
interface SignalHook {
  /** 监听信号 */
  listen(signal: string | symbol, handler: () => void): void;
  /** 释放所有监听器 */
  dispose(): void;
}

/**
 * 性能监控管理器类
 * 负责协调FPS度量收集、日志记录和生命周期管理
 */
declare class PerformanceMonitor {
  /** 监控是否已启动 */
  private _started: boolean;
  
  /** 文档是否就绪 */
  private _isReady: boolean;
  
  /** 信号钩子实例 */
  private _signalHook: SignalHook;
  
  /** 定时器句柄 */
  private _timer: NodeJS.Timeout | undefined;
  
  /** FPS度量收集器 */
  public fpsMetrics: FPSMetrics;
  
  /** 日志记录器 */
  public logger: Logger;

  /**
   * 构造函数
   * @param config - 监控配置对象
   */
  constructor(config: MonitorConfig);

  /**
   * 销毁监控器，清理所有资源
   */
  destroy(): void;

  /**
   * 启动性能监控
   * 每5分钟切换一次FPS度量收集状态以节省资源
   */
  start(): void;

  /**
   * 通知监控器文档已就绪
   * 启用FPS度量收集
   */
  documentReady(): void;

  /**
   * 停止性能监控
   */
  stop(): void;

  /**
   * 文档打开事件处理器
   * @private
   */
  private _onDocumentOpening(): void;

  /**
   * FPS变化事件处理器
   * @param event - FPS变化事件数据
   * @private
   */
  private _onFPSChanged(event: FPSChangeEvent): void;
}

/**
 * 默认导出：性能监控器类
 */
export default PerformanceMonitor;