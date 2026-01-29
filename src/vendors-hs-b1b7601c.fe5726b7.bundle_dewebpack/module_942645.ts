export interface TimeoutProvider {
  setTimeout(handler: TimerHandler, timeout?: number, ...args: unknown[]): number;
  clearTimeout(handle: number): void;
  delegate?: TimeoutProvider;
}

export const timeoutProvider: TimeoutProvider = {
  setTimeout(handler: TimerHandler, timeout?: number, ...args: unknown[]): number {
    const delegate = timeoutProvider.delegate;
    if (delegate?.setTimeout) {
      return delegate.setTimeout(handler, timeout, ...args);
    }
    return setTimeout(handler, timeout, ...args);
  },

  clearTimeout(handle: number): void {
    const delegate = timeoutProvider.delegate;
    const clearFn = delegate?.clearTimeout ?? clearTimeout;
    clearFn(handle);
  },

  delegate: undefined
};