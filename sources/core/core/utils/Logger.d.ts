/**
 * Log module - 提供日志记录功能
 * 
 * 此模块导出日志相关的核心类型和类，用于应用程序的日志记录和管理。
 * 
 * @module Log
 * @exports LogLevelEnum - 日志级别枚举
 * @exports Logger - 日志记录器类
 * @exports LogObject - 日志对象类
 */

/**
 * 日志级别枚举
 * 定义日志的严重程度级别
 */
export enum LogLevelEnum {
  /** 调试级别 - 详细的调试信息 */
  DEBUG = 'DEBUG',
  /** 信息级别 - 一般信息性消息 */
  INFO = 'INFO',
  /** 警告级别 - 警告信息 */
  WARN = 'WARN',
  /** 错误级别 - 错误信息 */
  ERROR = 'ERROR',
  /** 致命级别 - 严重错误信息 */
  FATAL = 'FATAL'
}

/**
 * 日志对象接口
 * 表示单个日志条目的数据结构
 */
export interface LogObject {
  /** 日志级别 */
  level: LogLevelEnum;
  /** 日志消息内容 */
  message: string;
  /** 时间戳 - 日志创建时间 */
  timestamp: Date;
  /** 可选的附加数据 */
  metadata?: Record<string, unknown>;
  /** 可选的错误堆栈信息 */
  stack?: string;
}

/**
 * 日志记录器类
 * 提供统一的日志记录接口和方法
 */
export class Logger {
  /** 当前日志记录器的名称 */
  private readonly name: string;
  /** 最小日志级别 */
  private minLevel: LogLevelEnum;

  /**
   * 创建日志记录器实例
   * @param name - 日志记录器名称
   * @param minLevel - 最小日志级别，默认为 INFO
   */
  constructor(name: string, minLevel?: LogLevelEnum);

  /**
   * 记录调试级别日志
   * @param message - 日志消息
   * @param metadata - 可选的附加数据
   */
  debug(message: string, metadata?: Record<string, unknown>): void;

  /**
   * 记录信息级别日志
   * @param message - 日志消息
   * @param metadata - 可选的附加数据
   */
  info(message: string, metadata?: Record<string, unknown>): void;

  /**
   * 记录警告级别日志
   * @param message - 日志消息
   * @param metadata - 可选的附加数据
   */
  warn(message: string, metadata?: Record<string, unknown>): void;

  /**
   * 记录错误级别日志
   * @param message - 日志消息
   * @param error - 可选的错误对象
   * @param metadata - 可选的附加数据
   */
  error(message: string, error?: Error, metadata?: Record<string, unknown>): void;

  /**
   * 记录致命级别日志
   * @param message - 日志消息
   * @param error - 可选的错误对象
   * @param metadata - 可选的附加数据
   */
  fatal(message: string, error?: Error, metadata?: Record<string, unknown>): void;

  /**
   * 设置最小日志级别
   * @param level - 新的最小日志级别
   */
  setMinLevel(level: LogLevelEnum): void;

  /**
   * 获取当前最小日志级别
   * @returns 当前最小日志级别
   */
  getMinLevel(): LogLevelEnum;
}