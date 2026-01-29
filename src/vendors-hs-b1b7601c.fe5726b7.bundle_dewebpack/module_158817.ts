import { config } from './config';
import { timeoutProvider } from './timeoutProvider';

/**
 * Reports an unhandled error by scheduling it to be thrown or handled
 * in the next microtask using the configured error handler.
 * 
 * @param error - The error to be reported
 */
export function reportUnhandledError(error: unknown): void {
  timeoutProvider.setTimeout(() => {
    const onUnhandledError = config.onUnhandledError;
    
    if (!onUnhandledError) {
      throw error;
    }
    
    onUnhandledError(error);
  });
}