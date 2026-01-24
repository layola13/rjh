/**
 * 推荐配饰插件的日志监听器模块
 * 用于追踪用户在推荐配饰功能中的交互行为
 */

import { LogData } from './log-types';

/**
 * 推荐配饰操作类型
 */
export type RecommendAccessoriesActionType = 'recommendAccessories' | 'reset' | 'changeScheme';

/**
 * 推荐配饰操作名称映射
 */
interface ActionNameMap {
  /** 一键摆饰 */
  recommendAccessories: string;
  /** 一键还原 */
  reset: string;
  /** 换一套 */
  changeScheme: string;
}

/**
 * 点击事件数据
 */
interface ClickEventData {
  /** 操作类型 */
  type: RecommendAccessoriesActionType;
}

/**
 * 插件管理器上下文
 */
interface PluginContext {
  /** 插件管理器实例 */
  pluginManager: {
    /**
     * 获取指定类型的插件
     * @param pluginType - 插件类型
     */
    getPlugin(pluginType: string): RecommendAccessoriesPlugin;
  };
}

/**
 * 推荐配饰插件接口
 */
interface RecommendAccessoriesPlugin {
  /** 推荐配饰日志信号 */
  signalRecommendAccessoriesToLog: unknown;
}

/**
 * 监听器事件参数
 */
interface ListenerEventParams {
  /** 事件数据 */
  data: ClickEventData;
}

/**
 * 日志监听器配置
 */
interface LogListener {
  /**
   * 获取监听信号
   * @param context - 插件上下文
   * @returns 监听信号对象
   */
  getListenSignal(context: PluginContext): unknown;

  /**
   * 监听事件处理函数
   * @param event - 事件参数
   * @returns 日志数据数组
   */
  listen(event: ListenerEventParams): LogData[];
}

/**
 * 推荐配饰日志监听器数组
 * 导出的默认监听器配置
 */
declare const recommendAccessoriesLogListeners: LogListener[];

export default recommendAccessoriesLogListeners;