interface IntervalProvider {
  setInterval: (handler: TimerHandler, timeout?: number, ...args: unknown[]) => number;
  clearInterval: (handle: number) => void;
  delegate?: IntervalProvider;
}

export const intervalProvider: IntervalProvider = {
  setInterval(handler: TimerHandler, timeout?: number, ...args: unknown[]): number {
    const delegate = intervalProvider.delegate;
    
    if (delegate?.setInterval) {
      return delegate.setInterval(handler, timeout, ...args);
    }
    
    return setInterval(handler, timeout, ...args);
  },

  clearInterval(handle: number): void {
    const delegate = intervalProvider.delegate;
    const clearFn = delegate?.clearInterval ?? clearInterval;
    clearFn(handle);
  },

  delegate: undefined
};