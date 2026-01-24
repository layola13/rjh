/**
 * 智能推荐插件类型定义模块
 * 
 * 该模块定义了智能搭配功能的日志监听器配置
 */

/**
 * 插件管理器接口
 * 负责管理和获取各类插件实例
 */
export interface PluginManager {
  /**
   * 根据插件类型获取插件实例
   * @param pluginType - 插件类型标识
   */
  getPlugin(pluginType: string): AutoRecommendPlugin;
}

/**
 * 智能推荐插件接口
 * 提供智能搭配推荐模型的日志信号
 */
export interface AutoRecommendPlugin {
  /**
   * 推荐模型日志信号
   * 用于触发推荐操作的日志记录
   */
  signalRecommendModelToLog: Signal<RecommendModelData>;
}

/**
 * 信号接口（观察者模式）
 * @template T - 信号传递的数据类型
 */
export interface Signal<T> {
  /** 信号携带的数据 */
  data: T;
}

/**
 * 推荐操作类型枚举
 */
export type RecommendActionType = 'autoRecommend' | 'reset' | 'changeScheme';

/**
 * 推荐操作显示名称映射
 */
export interface RecommendActionLabels {
  /** 智能搭配 */
  autoRecommend: string;
  /** 一键还原 */
  reset: string;
  /** 换一套 */
  changeScheme: string;
}

/**
 * 推荐模型数据
 * 包含用户触发的推荐操作类型
 */
export interface RecommendModelData {
  /** 推荐操作类型 */
  type: RecommendActionType;
}

/**
 * 点击率统计数据
 */
export interface ClickRatioData {
  /** 操作类型ID */
  id: RecommendActionType;
  /** 操作显示名称 */
  name: string;
}

/**
 * 日志数据配置
 */
export interface LogDataConfig {
  /** 日志描述 */
  description: string;
  /** 活动区域标识 */
  activeSection: string;
  /** 活动区域显示名称 */
  activeSectionName: string;
  /** 点击率统计数据 */
  clicksRatio: ClickRatioData;
}

/**
 * 日志数据对象
 */
export interface LogData {
  /** 事件类型 */
  event: string;
  /** 事件配置数据 */
  config: LogDataConfig;
}

/**
 * 监听事件参数
 */
export interface ListenEventParams {
  /** 插件管理器实例 */
  pluginManager: PluginManager;
}

/**
 * 监听处理参数
 */
export interface ListenHandlerParams {
  /** 信号数据 */
  data: RecommendModelData;
}

/**
 * 日志监听器配置接口
 * 定义如何获取监听信号以及如何处理监听事件
 */
export interface LogListenerConfig {
  /**
   * 获取需要监听的信号
   * @param params - 包含插件管理器的参数对象
   * @returns 返回推荐模型日志信号
   */
  getListenSignal(params: ListenEventParams): Signal<RecommendModelData>;

  /**
   * 监听事件处理函数
   * @param params - 包含信号数据的参数对象
   * @returns 返回日志数据数组
   */
  listen(params: ListenHandlerParams): LogData[];
}

/**
 * HSFP 常量定义
 */
export declare namespace HSFPConstants {
  /**
   * 插件类型枚举
   */
  enum PluginType {
    /** 智能推荐插件 */
    AutoRecommend = 'AutoRecommend'
  }
}

/**
 * 创建日志数据
 * @param eventType - 事件类型（如 "click.recommendmodel"）
 * @param config - 日志配置数据
 * @returns 返回格式化的日志数据对象
 */
export declare function createLogData(
  eventType: string,
  config: LogDataConfig
): LogData;

/**
 * 智能推荐日志监听器配置数组
 * 
 * 导出默认配置，包含：
 * - autoRecommend: 智能搭配
 * - reset: 一键还原
 * - changeScheme: 换一套
 */
declare const logListenerConfigs: LogListenerConfig[];

export default logListenerConfigs;