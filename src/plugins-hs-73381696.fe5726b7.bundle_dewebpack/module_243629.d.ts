/**
 * 用户引导日志监听器类型定义
 * 用于捕获和记录用户在新手引导过程中的操作行为
 */

/**
 * 引导类型枚举
 */
type GuideType = 'tip' | 'default';

/**
 * 引导操作类型枚举
 */
type GuideActionType = 'start' | 'action' | 'end' | 'skip' | 'learnMore';

/**
 * 引导选项配置
 */
interface GuideOption {
  /** 当前精确步骤编号（从1开始） */
  stepAccurateNum: number;
  [key: string]: unknown;
}

/**
 * 引导事件数据
 */
interface GuideEventData {
  /** 操作类型 */
  type: GuideActionType;
  /** 引导类型 */
  guideType: GuideType;
  /** 引导配置选项 */
  guideOption?: GuideOption;
}

/**
 * 监听器事件参数
 */
interface ListenerEvent {
  /** 事件携带的数据 */
  data: GuideEventData;
}

/**
 * 插件管理器接口
 */
interface PluginManager {
  /**
   * 获取指定类型的插件实例
   * @param pluginType 插件类型标识
   */
  getPlugin(pluginType: string): GuidePlugin;
}

/**
 * 引导插件接口
 */
interface GuidePlugin {
  /** 引导到日志的信号 */
  signalGuideToLog: Signal;
}

/**
 * 信号类型（用于事件通知）
 */
type Signal = unknown;

/**
 * 插件上下文
 */
interface PluginContext {
  /** 插件管理器实例 */
  pluginManager: PluginManager;
}

/**
 * 点击比率数据
 */
interface ClicksRatio {
  /** 唯一标识符 */
  id: string;
  /** 显示名称 */
  name: string;
}

/**
 * 日志数据配置
 */
interface LogDataOptions {
  /** 操作描述 */
  description: string;
  /** 活跃区域标识 */
  activeSection: string;
  /** 活跃区域名称 */
  activeSectionName: string;
  /** 当前步骤编号（可选） */
  activeStepNumber?: number;
  /** 点击率统计数据 */
  clicksRatio: ClicksRatio;
}

/**
 * 日志数据对象
 */
interface LogData {
  /** 事件名称 */
  event: string;
  /** 日志配置选项 */
  options: LogDataOptions;
}

/**
 * 引导监听器配置
 */
interface GuideListener {
  /**
   * 获取监听信号
   * @param context 插件上下文
   * @returns 引导日志信号
   */
  getListenSignal(context: PluginContext): Signal;

  /**
   * 处理引导事件
   * @param event 监听器事件
   * @returns 日志数据数组
   */
  listen(event: ListenerEvent): LogData[];
}

/**
 * 用户引导日志监听器集合
 * 默认导出的监听器数组，用于追踪用户引导流程的各个阶段
 */
declare const guideListeners: GuideListener[];

export default guideListeners;

/**
 * 从外部模块导入的日志创建函数
 * @param eventName 事件名称
 * @param options 日志配置选项
 * @returns 日志数据对象
 */
export declare function createLogData(
  eventName: string,
  options: LogDataOptions
): LogData;