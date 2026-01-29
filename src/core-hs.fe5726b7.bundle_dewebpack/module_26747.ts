/**
 * 日志模块类型定义
 * 提供全局日志记录和断言功能
 */

import { LogLevelEnum, Logger } from './module_41861';

/**
 * 日志级别枚举
 */
export enum LogLevel {
  debug = 'debug',
  info = 'info',
  warning = 'warning',
  error = 'error'
}

/**
 * 日志处理器接口
 */
export interface LogProcessor {
  process(level: LogLevel, message: string, context?: string, extra?: unknown): void;
}

/**
 * 日志收集器接口
 */
export interface LogCollector {
  collect(level: LogLevel, message: string, context?: string, extra?: unknown): void;
}

/**
 * 日志记录器实例接口
 */
export interface LoggerInstance {
  debug(message: string, extra?: unknown): void;
  info(message: string, extra?: unknown): void;
  warning(message: string, extra?: unknown): void;
  error(message: string, extra?: unknown, errorObj?: Error): void;
  time(label: string): void;
  timeEnd(label: string, extra?: unknown): void;
  assert(condition: boolean, message: string, extra?: unknown): void;
}

/**
 * 全局日志函数接口
 * @param message - 日志消息
 * @param level - 日志级别，默认为 debug
 * @param context - 日志上下文/分类
 * @param extra - 附加数据
 */
export interface LogFunction {
  (message: string, level?: LogLevelEnum, context?: string, extra?: unknown): void;

  /**
   * 记录调试级别日志
   * @param message - 日志消息
   * @param context - 日志上下文
   */
  debug(message: string, context?: string): void;

  /**
   * 记录信息级别日志
   * @param message - 日志消息
   * @param context - 日志上下文
   * @param extra - 附加数据
   */
  info(message: string, context?: string, extra?: unknown): void;

  /**
   * 记录警告级别日志
   * @param message - 日志消息
   * @param context - 日志上下文
   * @param extra - 附加数据
   */
  warning(message: string, context?: string, extra?: unknown): void;

  /**
   * 记录错误级别日志
   * @param message - 日志消息
   * @param context - 日志上下文
   * @param extra - 附加数据
   * @param errorObj - 错误对象
   */
  error(message: string, context?: string, extra?: unknown, errorObj?: Error): void;

  /**
   * 开始性能计时
   * @param label - 计时标签
   * @param context - 日志上下文
   */
  time(label: string, context?: string): void;

  /**
   * 结束性能计时
   * @param label - 计时标签
   * @param context - 日志上下文
   * @param extra - 附加数据
   */
  timeEnd(label: string, context?: string, extra?: unknown): void;

  /**
   * 数据分析（占位方法）
   * @param data - 分析数据
   */
  dataAnalyse(data: unknown): void;

  /**
   * 获取指定上下文的日志记录器实例
   * @param context - 日志上下文
   * @returns 日志记录器实例
   */
  logger(context?: string): LoggerInstance;

  /**
   * 设置日志收集器
   * @param collector - 日志收集器实例
   */
  setCollector(collector: LogCollector): void;

  /**
   * 注册日志处理器
   * @param processor - 日志处理器实例
   */
  registerProcessor(processor: LogProcessor): void;

  /**
   * 注销日志处理器
   * @param processor - 日志处理器实例
   */
  unregisterProcessor(processor: LogProcessor): void;
}

/**
 * 断言函数接口
 * @param condition - 断言条件
 * @param message - 断言失败时的消息
 * @param context - 日志上下文
 * @param extra - 附加数据
 */
export interface AssertFunction {
  (condition: boolean, message: string, context?: string, extra?: unknown): void;

  /**
   * 强制记录错误（断言失败）
   * @param message - 错误消息
   * @param context - 日志上下文
   */
  error(message: string, context?: string): void;
}

/**
 * 全局日志函数
 */
export const log: LogFunction;

/**
 * 全局断言函数
 */
export const assert: AssertFunction;

declare global {
  /**
   * 全局日志记录函数
   */
  const log: LogFunction;

  /**
   * 全局断言函数
   */
  const assert: AssertFunction;
}