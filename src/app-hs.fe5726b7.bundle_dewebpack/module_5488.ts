/**
 * Creates a throttle wrapper that limits function execution frequency.
 * Allows maximum 800 consecutive calls within 16ms intervals before throttling.
 * 
 * @param fn - The function to be throttled
 * @returns A throttled version of the input function
 */
export default function createThrottle<T extends (...args: any[]) => any>(
  fn: T
): T {
  const now = Date.now;
  let consecutiveCount = 0;
  let lastTimestamp = 0;

  return function (this: any, ...args: Parameters<T>): ReturnType<T> | any {
    const currentTimestamp = now();
    const timeSinceLastCall = 16 - (currentTimestamp - lastTimestamp);

    lastTimestamp = currentTimestamp;

    if (timeSinceLastCall > 0) {
      if (++consecutiveCount >= 800) {
        return args[0];
      }
    } else {
      consecutiveCount = 0;
    }

    return fn.apply(this, args);
  } as T;
}