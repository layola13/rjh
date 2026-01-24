/**
 * Global logging utility module
 * Provides a comprehensive logging API with multiple log levels and assertion capabilities
 */

import { Logger, LogLevelEnum } from './module_41861';

/**
 * Log level type definition
 */
type LogLevel = 'debug' | 'info' | 'warning' | 'error';

/**
 * Log collector interface for custom log handling
 */
interface LogCollector {
  collect(level: LogLevel, message: string, context?: string, metadata?: unknown): void;
}

/**
 * Log processor interface for log message transformation
 */
interface LogProcessor {
  process(level: LogLevel, message: string, context?: string, metadata?: unknown): string | void;
}

/**
 * Logger instance interface
 */
interface LoggerInstance {
  debug(message: string, metadata?: unknown): void;
  info(message: string, metadata?: unknown): void;
  warning(message: string, metadata?: unknown): void;
  error(message: string, metadata?: unknown, stackTrace?: Error): void;
  time(label: string): void;
  timeEnd(label: string, metadata?: unknown): void;
  assert(condition: boolean, message: string, metadata?: unknown): void;
}

/**
 * Main logging function
 * @param message - The log message to output
 * @param level - The log level (default: debug)
 * @param context - Optional context/namespace for the log
 * @param metadata - Additional metadata to attach to the log entry
 */
declare function log(
  message: string,
  level?: LogLevel,
  context?: string,
  metadata?: unknown
): void;

declare namespace log {
  /**
   * Log a debug-level message
   * @param message - The debug message
   * @param context - Optional context/namespace
   */
  function debug(message: string, context?: string): void;

  /**
   * Log an info-level message
   * @param message - The info message
   * @param context - Optional context/namespace
   * @param metadata - Additional metadata
   */
  function info(message: string, context?: string, metadata?: unknown): void;

  /**
   * Log a warning-level message
   * @param message - The warning message
   * @param context - Optional context/namespace
   * @param metadata - Additional metadata
   */
  function warning(message: string, context?: string, metadata?: unknown): void;

  /**
   * Log an error-level message
   * @param message - The error message
   * @param context - Optional context/namespace
   * @param metadata - Additional metadata
   * @param stackTrace - Optional error stack trace
   */
  function error(
    message: string,
    context?: string,
    metadata?: unknown,
    stackTrace?: Error
  ): void;

  /**
   * Start a timer with the given label
   * @param label - Unique identifier for the timer
   * @param context - Optional context/namespace
   */
  function time(label: string, context?: string): void;

  /**
   * End a timer and log the elapsed time
   * @param label - Timer identifier to end
   * @param context - Optional context/namespace
   * @param metadata - Additional metadata
   */
  function timeEnd(label: string, context?: string, metadata?: unknown): void;

  /**
   * Data analysis hook (reserved for future implementation)
   * @param data - Data to analyze
   */
  function dataAnalyse(data: unknown): void;

  /**
   * Get a logger instance for a specific context
   * @param context - The context/namespace for the logger
   * @returns A logger instance bound to the given context
   */
  function logger(context?: string): LoggerInstance;

  /**
   * Set a custom log collector for handling log output
   * @param collector - The collector implementation
   */
  function setCollector(collector: LogCollector): void;

  /**
   * Register a log processor for message transformation
   * @param processor - The processor implementation to add
   */
  function registerProcessor(processor: LogProcessor): void;

  /**
   * Unregister a previously registered log processor
   * @param processor - The processor implementation to remove
   */
  function unregisterProcessor(processor: LogProcessor): void;
}

/**
 * Assertion function that logs an error if condition is false
 * @param condition - The condition to assert
 * @param message - Error message if assertion fails
 * @param context - Optional context/namespace
 * @param metadata - Additional metadata
 */
declare function assert(
  condition: boolean,
  message: string,
  context?: string,
  metadata?: unknown
): void;

declare namespace assert {
  /**
   * Unconditionally log an assertion error
   * @param message - The error message
   * @param context - Optional context/namespace
   */
  function error(message: string, context?: string): void;
}

declare global {
  /**
   * Global logging utility
   */
  const log: typeof log;

  /**
   * Global assertion utility
   */
  const assert: typeof assert;
}

export { log, assert, LogLevel, LogCollector, LogProcessor, LoggerInstance };