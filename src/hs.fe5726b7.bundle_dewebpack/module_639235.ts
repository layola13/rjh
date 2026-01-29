import { timer } from 'rxjs';
import { mergeMap, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface RetryStrategyOptions {
  maxRetryAttempts?: number;
  staticRetryAttempts?: number;
  scalingDuration?: number;
  excludedStatusCodes?: number[];
}

interface RetryError extends Error {
  type?: string;
  status?: number;
}

/**
 * Creates a generic retry strategy for RxJS observables with exponential backoff.
 * 
 * @param options - Configuration options for the retry strategy
 * @returns A function that applies retry logic to an observable stream
 */
export function genericRetryStrategy(options: RetryStrategyOptions = {}) {
  const {
    maxRetryAttempts = 3,
    staticRetryAttempts = 0,
    scalingDuration = 1000,
    excludedStatusCodes = []
  } = options;

  return function<T>(errors: Observable<RetryError>): Observable<T> {
    return errors.pipe(
      mergeMap((error: RetryError, attemptIndex: number) => {
        const currentAttempt = attemptIndex + 1;

        if (currentAttempt > maxRetryAttempts) {
          error.type = 'timeout';
          throw error;
        }

        const isExcludedStatus = excludedStatusCodes.find(
          (statusCode: number) => statusCode === error.status
        );

        if (isExcludedStatus) {
          throw error;
        }

        const delayMultiplier = Math.max(currentAttempt - staticRetryAttempts, 1);
        const retryDelay = delayMultiplier * scalingDuration;

        console.log(`Attempt ${currentAttempt}: retrying in ${retryDelay}ms`);

        return timer(retryDelay);
      }),
      finalize(() => {
        console.log('We are done!');
      })
    );
  };
}