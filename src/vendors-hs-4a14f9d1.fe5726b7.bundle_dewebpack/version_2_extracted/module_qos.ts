interface TimerHandle {
  _idleTimeoutId?: NodeJS.Timeout;
  _idleTimeout?: number;
  _onTimeout?: () => void;
}

class Timer {
  private _id: number;
  private _clearFn: (id: number) => void;

  constructor(id: number, clearFn: (id: number) => void) {
    this._id = id;
    this._clearFn = clearFn;
  }

  unref(): void {}

  ref(): void {}

  close(): void {
    this._clearFn.call(globalThis, this._id);
  }
}

export function setTimeout(
  callback: (...args: unknown[]) => void,
  delay?: number,
  ...args: unknown[]
): Timer {
  const id = globalThis.setTimeout(callback, delay, ...args) as unknown as number;
  return new Timer(id, globalThis.clearTimeout);
}

export function setInterval(
  callback: (...args: unknown[]) => void,
  delay?: number,
  ...args: unknown[]
): Timer {
  const id = globalThis.setInterval(callback, delay, ...args) as unknown as number;
  return new Timer(id, globalThis.clearInterval);
}

export function clearTimeout(timer?: Timer | null): void {
  timer?.close();
}

export function clearInterval(timer?: Timer | null): void {
  timer?.close();
}

export function enroll(handle: TimerHandle, delay: number): void {
  if (handle._idleTimeoutId !== undefined) {
    globalThis.clearTimeout(handle._idleTimeoutId);
  }
  handle._idleTimeout = delay;
}

export function unenroll(handle: TimerHandle): void {
  if (handle._idleTimeoutId !== undefined) {
    globalThis.clearTimeout(handle._idleTimeoutId);
  }
  handle._idleTimeout = -1;
}

export function active(handle: TimerHandle): void {
  if (handle._idleTimeoutId !== undefined) {
    globalThis.clearTimeout(handle._idleTimeoutId);
  }

  const timeout = handle._idleTimeout ?? -1;

  if (timeout >= 0) {
    handle._idleTimeoutId = globalThis.setTimeout(() => {
      handle._onTimeout?.();
    }, timeout);
  }
}

export const _unrefActive = active;

export const setImmediate =
  (typeof self !== "undefined" && self.setImmediate) ||
  (typeof globalThis !== "undefined" && (globalThis as typeof globalThis & { setImmediate?: typeof globalThis.setTimeout }).setImmediate) ||
  globalThis.setTimeout;

export const clearImmediate =
  (typeof self !== "undefined" && self.clearImmediate) ||
  (typeof globalThis !== "undefined" && (globalThis as typeof globalThis & { clearImmediate?: typeof globalThis.clearTimeout }).clearImmediate) ||
  globalThis.clearTimeout;