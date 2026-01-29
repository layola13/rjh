interface DebounceOptions {
  leading?: boolean;
  maxWait?: number;
  trailing?: boolean;
}

interface DebouncedFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T> | undefined;
  cancel: () => void;
  flush: () => ReturnType<T> | undefined;
}

function isObject(value: unknown): value is Record<string, any> {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}

function toNumber(value: unknown): number {
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string') {
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  }
  return 0;
}

function now(): number {
  return Date.now();
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options?: DebounceOptions
): DebouncedFunction<T> {
  let args: any[] | undefined;
  let thisArg: any;
  let maxing: boolean = false;
  let result: ReturnType<T> | undefined;
  let timerId: ReturnType<typeof setTimeout> | undefined;
  let lastCallTime: number | undefined;
  let lastInvokeTime: number = 0;
  let maxWait: number | undefined;
  let leading: boolean = false;
  let trailing: boolean = true;

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }

  wait = toNumber(wait) || 0;

  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? Math.max(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time: number): ReturnType<T> {
    const callArgs = args;
    const callThisArg = thisArg;

    args = thisArg = undefined;
    lastInvokeTime = time;
    result = func.apply(callThisArg, callArgs);
    return result;
  }

  function shouldInvoke(time: number): boolean {
    const timeSinceLastCall = time - (lastCallTime ?? 0);
    const timeSinceLastInvoke = time - lastInvokeTime;

    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= (maxWait ?? 0))
    );
  }

  function remainingWait(time: number): number {
    const timeSinceLastCall = time - (lastCallTime ?? 0);
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;

    return maxing ? Math.min(timeWaiting, (maxWait ?? 0) - timeSinceLastInvoke) : timeWaiting;
  }

  function timerExpired(): void {
    const time = now();
    if (shouldInvoke(time)) {
      trailingEdge(time);
      return;
    }
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function leadingEdge(time: number): ReturnType<T> | undefined {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }

  function trailingEdge(time: number): ReturnType<T> | undefined {
    timerId = undefined;

    if (trailing && args) {
      return invokeFunc(time);
    }
    args = thisArg = undefined;
    return result;
  }

  function debounced(this: any, ...callArgs: Parameters<T>): ReturnType<T> | undefined {
    const time = now();
    const isInvoking = shouldInvoke(time);

    args = callArgs;
    thisArg = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }

    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }

    return result;
  }

  debounced.cancel = function (): void {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    args = lastCallTime = thisArg = timerId = undefined;
  };

  debounced.flush = function (): ReturnType<T> | undefined {
    return timerId === undefined ? result : trailingEdge(now());
  };

  return debounced;
}