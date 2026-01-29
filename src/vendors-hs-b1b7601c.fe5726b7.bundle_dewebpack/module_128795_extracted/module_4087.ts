interface AnimationFrameTask {
  handle: number;
  callback: (timestamp: number) => void;
  cancelled: boolean;
}

type PerformanceNowFunction = () => number;

const performanceNow: PerformanceNowFunction = require(75);

const globalContext: Window | typeof globalThis = 
  typeof window !== "undefined" ? window : globalThis;

const vendorPrefixes: string[] = ["moz", "webkit"];
const animationFrameSuffix: string = "AnimationFrame";

let requestAnimationFrameNative: ((callback: FrameRequestCallback) => number) | undefined = 
  globalContext["request" + animationFrameSuffix];

let cancelAnimationFrameNative: ((handle: number) => void) | undefined = 
  globalContext["cancel" + animationFrameSuffix] || 
  globalContext["cancelRequest" + animationFrameSuffix];

for (let i = 0; !requestAnimationFrameNative && i < vendorPrefixes.length; i++) {
  requestAnimationFrameNative = globalContext[vendorPrefixes[i] + "Request" + animationFrameSuffix];
  cancelAnimationFrameNative = 
    globalContext[vendorPrefixes[i] + "Cancel" + animationFrameSuffix] || 
    globalContext[vendorPrefixes[i] + "CancelRequest" + animationFrameSuffix];
}

const TARGET_FRAME_DURATION = 16.666666666666668;

let requestAnimationFramePolyfill: (callback: FrameRequestCallback) => number;
let cancelAnimationFramePolyfill: (handle: number) => void;

if (!requestAnimationFrameNative || !cancelAnimationFrameNative) {
  let lastFrameTime = 0;
  let nextHandle = 0;
  const frameQueue: AnimationFrameTask[] = [];

  requestAnimationFramePolyfill = function(callback: FrameRequestCallback): number {
    if (frameQueue.length === 0) {
      const currentTime = performanceNow();
      const delay = Math.max(0, TARGET_FRAME_DURATION - (currentTime - lastFrameTime));
      lastFrameTime = delay + currentTime;

      setTimeout(() => {
        const tasksToExecute = frameQueue.slice(0);
        frameQueue.length = 0;

        for (let i = 0; i < tasksToExecute.length; i++) {
          if (!tasksToExecute[i].cancelled) {
            try {
              tasksToExecute[i].callback(lastFrameTime);
            } catch (error) {
              setTimeout(() => {
                throw error;
              }, 0);
            }
          }
        }
      }, Math.round(delay));
    }

    frameQueue.push({
      handle: ++nextHandle,
      callback,
      cancelled: false
    });

    return nextHandle;
  };

  cancelAnimationFramePolyfill = function(handle: number): void {
    for (let i = 0; i < frameQueue.length; i++) {
      if (frameQueue[i].handle === handle) {
        frameQueue[i].cancelled = true;
      }
    }
  };
} else {
  requestAnimationFramePolyfill = requestAnimationFrameNative;
  cancelAnimationFramePolyfill = cancelAnimationFrameNative;
}

export function requestAnimationFrame(callback: FrameRequestCallback): number {
  return requestAnimationFramePolyfill.call(globalContext, callback);
}

export function cancel(...args: [number]): void {
  cancelAnimationFramePolyfill.apply(globalContext, args);
}

export function polyfill(target?: Window | typeof globalThis): void {
  const targetContext = target ?? globalContext;
  targetContext.requestAnimationFrame = requestAnimationFramePolyfill;
  targetContext.cancelAnimationFrame = cancelAnimationFramePolyfill;
}

export default requestAnimationFrame;