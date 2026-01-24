/**
 * Utility module for retrying asynchronous operations
 * @module RetryUtil
 */

/**
 * Retry configuration options
 */
export interface RetryOptions {
  /** Maximum number of retry attempts (default: 2) */
  maxRetries?: number;
  /** Delay between retries in milliseconds */
  delayMs?: number;
  /** Custom logger instance */
  logger?: Logger;
}

/**
 * Logger interface for retry operations
 */
export interface Logger {
  warning(message: string): void;
  error(message: string): void;
  info(message: string): void;
}

/**
 * Async function type that returns a promise
 */
export type AsyncFunction<T> = () => Promise<T>;

/**
 * Retries an asynchronous function a specified number of times upon failure
 * 
 * @template T - The return type of the async function
 * @param asyncFunc - The asynchronous function to retry
 * @param maxRetries - Maximum number of retry attempts (default: 2)
 * @returns Promise that resolves with the function result or rejects after all retries fail
 * 
 * @example
 *