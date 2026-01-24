/**
 * 视图模式切换监听器模块
 * 用于监听主视图模式变化并记录日志
 */

import { createLogData, LogData } from './log-utils';

/**
 * 视图模式名称映射
 */
interface ViewNames {
  [key: string]: string;
}

/**
 * 日志分组类型枚举
 */
interface LogGroupTypes {
  ViewOperation: string;
  [key: string]: string;
}

/**
 * HSF平台常量定义
 */
declare const HSFPConstants: {
  /** 视图模式名称映射表 */
  viewNames: ViewNames;
  /** 日志分组类型 */
  LogGroupTypes: LogGroupTypes;
};

/**
 * 视图模式切换事件数据
 */
interface ViewModeChangeData {
  /** 新视图模式 */
  newViewMode: string;
  /** 旧视图模式 */
  oldViewMode: string;
}

/**
 * 监听事件参数
 */
interface ListenEventParams {
  /** 事件携带的数据 */
  data: ViewModeChangeData;
}

/**
 * 信号源对象
 */
interface SignalSource {
  /** 主视图模式变化信号 */
  signalPrimaryViewModeChanged: unknown;
}

/**
 * 视图模式切换监听器配置
 */
interface ViewModeChangeListener {
  /**
   * 获取需要监听的信号
   * @param source - 信号源对象
   * @returns 主视图模式变化信号
   */
  getListenSignal(source: SignalSource): unknown;

  /**
   * 监听视图模式切换事件并生成日志
   * @param event - 包含视图模式变化数据的事件参数
   * @returns 日志数据数组
   */
  listen(event: ListenEventParams): LogData[];
}

/**
 * 默认导出：视图模式切换监听器配置数组
 */
declare const listeners: ViewModeChangeListener[];

export default listeners;