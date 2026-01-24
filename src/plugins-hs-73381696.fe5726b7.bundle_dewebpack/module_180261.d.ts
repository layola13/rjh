/**
 * 2D画布移动事件监听器配置模块
 * @module Canvas2DMoveListeners
 */

import { LogTriggerType } from './log-trigger-types';

/**
 * 2D视图接口
 * 提供画布移动相关的信号
 */
interface Main2DView {
  /** 画布移动开始信号 */
  signalCanvasMoveStart: unknown;
  /** 画布移动结束信号 */
  signalCanvasMoveEnd: unknown;
}

/**
 * 应用程序上下文接口
 * 提供获取主2D视图的方法
 */
interface AppContext {
  /**
   * 获取主2D视图实例
   * @returns 2D视图实例或undefined
   */
  getMain2DView(): Main2DView | undefined;
}

/**
 * 事件监听数据
 */
interface ListenEventData {
  /** 事件相关数据 */
  data: unknown;
}

/**
 * 日志操作选项
 */
interface LogActionOptions {
  /** 触发类型：START表示开始，END表示结束 */
  triggerType: LogTriggerType;
  /** 是否不发送日志（可选） */
  notSend?: boolean;
}

/**
 * 日志参数
 */
interface LogActionParams {
  /** 操作描述 */
  description: string;
  /** 操作分组标识 */
  group: string;
  /** 操作分组显示名称 */
  groupName: string;
}

/**
 * 日志操作对象
 */
interface LogAction {
  /** 操作类型 */
  actionType: string;
  /** 操作选项 */
  options: LogActionOptions;
  /** 操作参数 */
  params: LogActionParams;
}

/**
 * 事件监听器配置
 */
interface EventListenerConfig {
  /**
   * 获取监听信号
   * @param context - 应用程序上下文
   * @returns 信号对象或undefined
   */
  getListenSignal(context: AppContext): unknown | undefined;

  /**
   * 处理监听事件
   * @param event - 事件数据
   * @returns 日志操作数组
   */
  listen(event: ListenEventData): LogAction[];
}

/**
 * 2D画布移动事件监听器配置数组
 * 包含画布移动开始和结束两个监听器
 */
declare const canvas2DMoveListeners: EventListenerConfig[];

export default canvas2DMoveListeners;