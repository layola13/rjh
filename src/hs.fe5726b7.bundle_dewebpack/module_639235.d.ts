/**
 * Generic retry strategy for handling failed requests with exponential backoff.
 * @module RetryStrategy
 */

import { Observable, timer } from 'rxjs';
import { mergeMap, finalize } from 'rxjs/operators';

/**
 * Configuration options for the generic retry strategy.
 */
export interface RetryStrategyOptions {
  /**
   * Maximum number of retry attempts before giving up.
   * @default 3
   */
  maxRetryAttempts?: number;

  /**
   * Number of initial attempts that use static delay (no scaling).
   * @default 0
   */
  staticRetryAttempts?: number;

  /**
   * Base duration in milliseconds for calculating retry delay.
   * The actual delay is calculated as: max(attemptNumber - staticRetryAttempts, 1) * scalingDuration
   * @default 1000
   */
  scalingDuration?: number;

  /**
   * HTTP status codes that should not trigger a retry.
   * If the error status matches any of these codes, the error is thrown immediately.
   * @default []
   */
  excludedStatusCodes?: number[];
}

/**
 * Error object that may include HTTP status information.
 */
export interface RetryableError extends Error {
  /**
   * Error type identifier.
   */
  type?: string;

  /**
   * HTTP status code of the failed request.
   */
  status?: number;
}

/**
 * Creates a retry strategy operator for RxJS observables with configurable backoff behavior.
 * 
 * @param options - Configuration options for retry behavior
 * @returns An RxJS operator function that implements the retry logic
 * 
 * @example
 *