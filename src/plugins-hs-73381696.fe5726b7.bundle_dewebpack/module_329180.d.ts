/**
 * 性能日志记录器模块
 * 用于监控和记录Canvas缩放等性能指标
 */

import { TimeTaskHandle } from './280069';
import { LogTriggerType } from './985785';
import { HSApp } from './518193';

/**
 * 日志参数配置
 */
export interface LogParams {
  /** 日志描述信息 */
  description?: string;
  /** 其他自定义参数 */
  [key: string]: unknown;
}

/**
 * 日志选项配置
 */
export interface LogOptions {
  /** 触发类型：START | END | IMMEDIATE */
  triggerType?: LogTriggerType;
  /** 是否不发送日志 */
  notSend?: boolean;
  /** 操作类型后缀 */
  actionTypeSuffix?: string;
  /** 其他自定义选项 */
  [key: string]: unknown;
}

/**
 * 日志条目
 */
export interface LogEntry {
  /** 操作类型标识 */
  actionType: string;
  /** 日志参数 */
  params: LogParams;
  /** 日志选项 */
  options: LogOptions;
}

/**
 * 2D视图接口
 */
export interface Main2DView {
  /** 缩放信号 */
  signalZoom?: {
    /** 监听缩放事件 */
    listen(callback: () => void): void;
  };
}

/**
 * 编辑器实例接口
 */
export interface Editor {
  /**
   * 获取主2D视图
   */
  getMain2DView(): Main2DView | null | undefined;
}

/**
 * Canvas性能监控器
 * 监控2D画布缩放等操作的性能指标
 */
export default class CanvasPerformanceMonitor {
  /** 时间任务处理器 */
  private readonly timeTaskHandle: TimeTaskHandle;

  /**
   * 构造函数
   * @param editor - 编辑器实例
   */
  constructor(editor: Editor);

  /**
   * 初始化Canvas缩放监控
   * 监听2D视图的缩放信号，记录缩放操作的开始和结束时间
   * @param editor - 编辑器实例
   */
  private canvasZoom(editor: Editor): void;

  /**
   * 推送性能日志
   * 根据日志条目的触发类型，调用相应的时间任务处理方法
   * @param logs - 日志条目数组
   */
  pushLog(logs?: LogEntry[]): void;
}