/**
 * 自定义错误日志处理器模块
 * 用于收集和推送应用程序中的自定义错误信息到日志系统
 */

import { HSCore } from './HSCore';
import { HSApp } from './HSApp';

/**
 * 错误数据接口
 */
interface ErrorData {
  /** 错误名称 */
  errorName: string;
  /** 错误描述 */
  description?: string;
  /** 错误堆栈信息 */
  errorStack?: string;
  /** 错误分组，默认为 "customizeError" */
  group?: string;
  /** 附加参数 */
  params?: Record<string, unknown>;
}

/**
 * 信号事件数据接口
 */
interface SignalEventData {
  /** 错误数据 */
  data: ErrorData;
}

/**
 * 日志条目接口
 */
interface LogEntry {
  /** 错误名称 */
  name: string;
  /** 附加参数 */
  params?: Record<string, unknown>;
  /** 是否立即发送 */
  sendNow?: boolean;
  /** 当前时间戳 */
  currentTime?: number;
  /** 性能时间戳 */
  performanceCurrentTime?: number;
}

/**
 * 日志推送选项接口
 */
interface LogPushOptions {
  /** 是否立即发送 */
  sendNow?: boolean;
  /** 当前时间戳 */
  currentTime?: number;
  /** 性能时间戳 */
  performanceCurrentTime?: number;
}

/**
 * 自定义错误日志处理器类
 * 继承自基础组件，负责监听错误信号并将错误信息推送到日志系统
 */
declare class CustomErrorLogger extends BaseComponent {
  /**
   * 错误信号实例，用于发布和订阅错误事件
   */
  signalError: HSCore.Util.Signal<CustomErrorLogger>;

  /**
   * 构造函数
   * @param element - 关联的DOM元素
   */
  constructor(element: HTMLElement);

  /**
   * 错误信号监听回调函数
   * 当错误信号触发时，处理错误数据并推送到日志系统
   * @param event - 信号事件数据
   */
  signalErrorListen(event: SignalEventData): void;

  /**
   * 批量推送日志条目
   * @param entries - 日志条目数组
   */
  pushLog(entries: LogEntry[] | null | undefined): void;
}

export default CustomErrorLogger;