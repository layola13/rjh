interface TimerHandle {
  _id: number;
  _clearFn: (id: number) => void;
  unref(): void;
  ref(): void;
  close(): void;
}

interface EnrollableObject {
  _idleTimeoutId?: number;
  _idleTimeout: number;
  _onTimeout?: () => void;
}

const globalContext: typeof globalThis = 
  (typeof globalThis !== 'undefined' && globalThis) ||
  (typeof self !== 'undefined' && self) ||
  (typeof window !== 'undefined' && window) ||
  ({} as typeof globalThis);

const functionApply = Function.prototype.apply;

class Timer implements TimerHandle {
  _id: number;
  _clearFn: (id: number) => void;

  constructor(id: number, clearFn: (id: number) => void) {
    this._id = id;
    this._clearFn = clearFn;
  }

  unref(): void {}

  ref(): void {}

  close(): void {
    this._clearFn.call(globalContext, this._id);
  }
}

export function setTimeout(...args: Parameters<typeof globalThis.setTimeout>): TimerHandle {
  return new Timer(
    functionApply.call(globalContext.setTimeout, globalContext, args) as number,
    clearTimeout
  );
}

export function setInterval(...args: Parameters<typeof globalThis.setInterval>): TimerHandle {
  return new Timer(
    functionApply.call(globalContext.setInterval, globalContext, args) as number,
    clearInterval
  );
}

export function clearTimeout(handle?: TimerHandle | number): void {
  if (handle && typeof handle === 'object' && 'close' in handle) {
    handle.close();
  }
}

export function clearInterval(handle?: TimerHandle | number): void {
  if (handle && typeof handle === 'object' && 'close' in handle) {
    handle.close();
  }
}

export function enroll(item: EnrollableObject, delay: number): void {
  if (item._idleTimeoutId !== undefined) {
    globalContext.clearTimeout(item._idleTimeoutId);
  }
  item._idleTimeout = delay;
}

export function unenroll(item: EnrollableObject): void {
  if (item._idleTimeoutId !== undefined) {
    globalContext.clearTimeout(item._idleTimeoutId);
  }
  item._idleTimeout = -1;
}

export function active(item: EnrollableObject): void {
  if (item._idleTimeoutId !== undefined) {
    globalContext.clearTimeout(item._idleTimeoutId);
  }

  const delay = item._idleTimeout;
  if (delay >= 0) {
    item._idleTimeoutId = globalContext.setTimeout(() => {
      if (item._onTimeout) {
        item._onTimeout();
      }
    }, delay) as unknown as number;
  }
}

export const _unrefActive = active;

export const setImmediate: typeof globalThis.setImmediate =
  (typeof self !== 'undefined' && self.setImmediate) ||
  (typeof globalThis !== 'undefined' && globalThis.setImmediate) ||
  (globalContext.setImmediate as typeof globalThis.setImmediate);

export const clearImmediate: typeof globalThis.clearImmediate =
  (typeof self !== 'undefined' && self.clearImmediate) ||
  (typeof globalThis !== 'undefined' && globalThis.clearImmediate) ||
  (globalContext.clearImmediate as typeof globalThis.clearImmediate);