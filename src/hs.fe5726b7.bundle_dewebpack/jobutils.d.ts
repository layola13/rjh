import { Observable, Subscription, of } from 'rxjs';
import { retryWhen, catchError } from 'rxjs/operators';

/**
 * Job status types
 */
export type JobStatus = 'finish' | 'fail' | 'error';

/**
 * Job result interface
 */
export interface JobResult {
  /** Current status of the job */
  status: JobStatus;
  /** Error information if status is 'error' */
  error?: unknown;
  /** Error object if request failed */
  err?: unknown;
  /** Additional job data */
  [key: string]: unknown;
}

/**
 * Watch options configuration
 */
export interface WatchOptions {
  /** Maximum number of retry attempts (default: 23) */
  maxRetryAttempts?: number;
  /** Duration scaling factor for retries in milliseconds (default: 1500) */
  scalingDuration?: number;
  /** Number of static retry attempts before scaling (default: 5) */
  staticRetryAttempts?: number;
}

/**
 * Job polling function type
 */
export type JobPollingFunction = () => Promise<JobResult>;

/**
 * Success callback type
 */
export type SuccessCallback = (result: JobResult) => void;

/**
 * Error callback type
 */
export type ErrorCallback = (error: unknown) => void;

/**
 * Utility class for managing job polling and retry logic
 */
export declare class JobUtils {
  /** Internal subscription for watching job status */
  private watch$?: Subscription;

  /**
   * Creates a new JobUtils instance
   */
  constructor();

  /**
   * Watch a job's status with automatic retry logic
   * 
   * @param pollingFn - Function that returns a promise resolving to job status
   * @param onSuccess - Callback invoked when job completes successfully or fails
   * @param onError - Optional callback invoked when an error occurs
   * @param options - Configuration options for retry behavior
   * 
   * @example
   *