const logger = log.logger("RetryUtil");

/**
 * Retry an async function up to a specified number of times
 * @param asyncFunc - The async function to retry
 * @param maxRetries - Maximum number of retry attempts (default: 2)
 * @returns The result of the async function if successful
 * @throws The last error if all retries fail
 */
export async function retryAsyncFunc<T>(
  asyncFunc: () => Promise<T>,
  maxRetries: number = 2
): Promise<T | undefined> {
  let result: T | undefined;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      result = await asyncFunc();
      break;
    } catch (error) {
      if (attempt >= maxRetries - 1) {
        throw error;
      }
      logger.warning(`Trying again: ${attempt + 1}`);
    }
  }

  return result;
}