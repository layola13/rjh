type RequestAnimationFrameCallback = (time: number) => void;

interface AnimationFrameFunction {
  (callback: RequestAnimationFrameCallback): number;
  cancel: (id: number) => void;
}

const isBrowser = typeof window !== 'undefined';

let lastTime = new Date().getTime();
let cancelMethodName = 'clearTimeout';

let requestAnimationFramePolyfill: (callback: RequestAnimationFrameCallback) => number = (
  callback: RequestAnimationFrameCallback
): number => {
  const currentTime = new Date().getTime();
  const timeToCall = Math.max(0, 16 - (currentTime - lastTime));
  const timerId = setTimeout(callback, timeToCall);
  lastTime = currentTime;
  return timerId;
};

const buildMethodName = (prefix: string, method: string): string => {
  return prefix + (prefix ? method[0].toUpperCase() + method.substr(1) : method) + 'AnimationFrame';
};

if (isBrowser) {
  const vendors = ['', 'webkit', 'moz', 'o', 'ms'];
  
  vendors.some((vendor: string): boolean => {
    const requestMethod = buildMethodName(vendor, 'request');
    
    if (requestMethod in window) {
      cancelMethodName = buildMethodName(vendor, 'cancel');
      requestAnimationFramePolyfill = (callback: RequestAnimationFrameCallback): number => {
        return (window as any)[requestMethod](callback);
      };
      return true;
    }
    
    return false;
  });
}

const animationFrame: AnimationFrameFunction = Object.assign(
  (callback: RequestAnimationFrameCallback): number => {
    return requestAnimationFramePolyfill(callback);
  },
  {
    cancel: (id: number): void => {
      const cancelFn = (window as any)[cancelMethodName];
      if (cancelFn && typeof cancelFn === 'function') {
        cancelFn(id);
      }
    }
  }
);

export default animationFrame;