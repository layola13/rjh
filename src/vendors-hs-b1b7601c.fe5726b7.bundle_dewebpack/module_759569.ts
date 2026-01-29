import { Subscription } from 'rxjs';

interface AnimationFrameDelegate {
  requestAnimationFrame: (callback: FrameRequestCallback) => number;
  cancelAnimationFrame: (handle: number) => void;
}

interface AnimationFrameProvider {
  schedule(callback: (timestamp: number) => void): Subscription;
  requestAnimationFrame(callback: FrameRequestCallback): number;
  cancelAnimationFrame(handle: number): void;
  delegate?: AnimationFrameDelegate;
}

export const animationFrameProvider: AnimationFrameProvider = {
  schedule(callback: (timestamp: number) => void): Subscription {
    let requestFunc = requestAnimationFrame;
    let cancelFunc: ((handle: number) => void) | undefined = cancelAnimationFrame;
    const delegate = animationFrameProvider.delegate;

    if (delegate) {
      requestFunc = delegate.requestAnimationFrame;
      cancelFunc = delegate.cancelAnimationFrame;
    }

    const handle = requestFunc((timestamp: number) => {
      cancelFunc = undefined;
      callback(timestamp);
    });

    return new Subscription(() => {
      cancelFunc?.(handle);
    });
  },

  requestAnimationFrame(...args: Parameters<typeof requestAnimationFrame>): number {
    const delegate = animationFrameProvider.delegate;
    const func = delegate?.requestAnimationFrame ?? requestAnimationFrame;
    return func(...args);
  },

  cancelAnimationFrame(...args: Parameters<typeof cancelAnimationFrame>): void {
    const delegate = animationFrameProvider.delegate;
    const func = delegate?.cancelAnimationFrame ?? cancelAnimationFrame;
    return func(...args);
  },

  delegate: undefined
};