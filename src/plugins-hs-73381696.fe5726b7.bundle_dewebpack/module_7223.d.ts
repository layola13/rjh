/**
 * 日志监听器配置模块
 * 用于监听事务管理器的撤销/重做操作并生成相应的日志数据
 */

import { createLogData } from './module_858122';
import { getBatchRequestInfo } from './module_508165';

/**
 * 请求信息接口
 */
interface Request {
  /** 请求类型 */
  type: string;
  [key: string]: unknown;
}

/**
 * 事务数据接口
 */
interface TransactionData {
  /** 请求对象 */
  request?: Request;
  [key: string]: unknown;
}

/**
 * 批量请求信息接口
 */
interface BatchRequestInfo {
  /** 参数信息 */
  arg: unknown;
  /** 操作描述 */
  description: string;
  /** 分组信息 */
  group: string;
}

/**
 * 日志数据接口
 */
interface LogData {
  /** 操作类型 */
  type: string;
  /** 操作描述 */
  description: string;
  /** 参数信息 */
  argInfo: unknown;
  /** 分组信息 */
  group: string;
}

/**
 * 信号对象接口
 */
interface Signal {
  [key: string]: unknown;
}

/**
 * 事务管理器接口
 */
interface TransactionManager {
  /** 撤销完成信号 */
  signalUndone: Signal;
  /** 重做完成信号 */
  signalRedone: Signal;
}

/**
 * 监听器上下文接口
 */
interface ListenerContext {
  /** 事务管理器实例 */
  transManager: TransactionManager;
  [key: string]: unknown;
}

/**
 * 监听事件数据接口
 */
interface ListenEventData {
  /** 事务数据 */
  data: TransactionData;
}

/**
 * 日志监听器接口
 */
interface LogListener {
  /**
   * 获取要监听的信号对象
   * @param context - 监听器上下文
   * @returns 信号对象
   */
  getListenSignal(context: ListenerContext): Signal;

  /**
   * 监听回调函数
   * @param event - 监听事件数据
   * @returns 日志数据数组
   */
  listen(event: ListenEventData): LogData[];
}

/**
 * 撤销操作日志监听器
 */
const undoListener: LogListener = {
  getListenSignal(context: ListenerContext): Signal {
    return context.transManager.signalUndone;
  },

  listen(event: ListenEventData): LogData[] {
    const { data } = event;
    
    if (!data.request) {
      return [];
    }

    const { type } = data.request;
    const { arg, description, group } = getBatchRequestInfo(data.request);

    const logData: LogData = {
      type,
      description: `撤销操作--${description || '需要添加描述'}`,
      argInfo: arg,
      group
    };

    return [createLogData('undo.Design', logData)];
  }
};

/**
 * 重做操作日志监听器
 */
const redoListener: LogListener = {
  getListenSignal(context: ListenerContext): Signal {
    return context.transManager.signalRedone;
  },

  listen(event: ListenEventData): LogData[] {
    const { data } = event;
    
    if (!data.request) {
      return [];
    }

    const { type } = data.request;
    const { arg, description, group } = getBatchRequestInfo(data.request);

    const logData: LogData = {
      type,
      description: `恢复操作--${description || '需要添加描述'}`,
      argInfo: arg,
      group
    };

    return [createLogData('redo.Design', logData)];
  }
};

/**
 * 日志监听器配置数组
 * 导出撤销和重做操作的监听器
 */
const logListeners: LogListener[] = [undoListener, redoListener];

export default logListeners;
export type { LogListener, ListenerContext, ListenEventData, LogData, BatchRequestInfo };