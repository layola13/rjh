import debounce from './debounce';
import isObject from './isObject';

interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

/**
 * Creates a throttled function that only invokes the provided function at most once per every `wait` milliseconds.
 * 
 * @param func - The function to throttle
 * @param wait - The number of milliseconds to throttle invocations to
 * @param options - The options object
 * @returns Returns the new throttled function
 */
export default function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options?: ThrottleOptions
): T & { cancel: () => void; flush: () => void } {
  let leading = true;
  let trailing = true;

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }

  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  return debounce(func, wait, {
    leading,
    maxWait: wait,
    trailing
  });
}