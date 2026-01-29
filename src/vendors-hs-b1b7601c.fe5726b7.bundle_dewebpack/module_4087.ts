type AnimationFrameCallback = (timestamp: number) => void;

interface FrameRequest {
  handle: number;
  callback: AnimationFrameCallback;
  cancelled: boolean;
}

const performance = typeof window !== 'undefined' && window.performance;
const getTimestamp = (): number => {
  return performance && performance.now ? performance.now() : Date.now();
};

const globalContext: Window & typeof globalThis = 
  typeof window !== 'undefined' ? window : globalThis;

const vendorPrefixes = ['moz', 'webkit'];
const ANIMATION_FRAME = 'AnimationFrame';
const TARGET_FPS = 60;
const FRAME_DURATION = 1000 / TARGET_FPS;

let nativeRequestAnimationFrame = globalContext['request' + ANIMATION_FRAME] as 
  ((callback: FrameRequestCallback) => number) | undefined;

let nativeCancelAnimationFrame = (globalContext['cancel' + ANIMATION_FRAME] || 
  globalContext['cancelRequest' + ANIMATION_FRAME]) as 
  ((handle: number) => void) | undefined;

for (let i = 0; !nativeRequestAnimationFrame && i < vendorPrefixes.length; i++) {
  nativeRequestAnimationFrame = globalContext[
    vendorPrefixes[i] + 'Request' + ANIMATION_FRAME
  ] as ((callback: FrameRequestCallback) => number) | undefined;
  
  nativeCancelAnimationFrame = (globalContext[
    vendorPrefixes[i] + 'Cancel' + ANIMATION_FRAME
  ] || globalContext[
    vendorPrefixes[i] + 'CancelRequest' + ANIMATION_FRAME
  ]) as ((handle: number) => void) | undefined;
}

let requestAnimationFrame: (callback: AnimationFrameCallback) => number;
let cancelAnimationFrame: (handle: number) => void;

if (!nativeRequestAnimationFrame || !nativeCancelAnimationFrame) {
  let lastFrameTime = 0;
  let nextHandle = 0;
  const frameQueue: FrameRequest[] = [];

  requestAnimationFrame = (callback: AnimationFrameCallback): number => {
    if (frameQueue.length === 0) {
      const currentTime = getTimestamp();
      const timeSinceLastFrame = currentTime - lastFrameTime;
      const targetDelay = Math.max(0, FRAME_DURATION - timeSinceLastFrame);
      
      lastFrameTime = targetDelay + currentTime;
      
      setTimeout(() => {
        const requestsToProcess = frameQueue.slice(0);
        frameQueue.length = 0;
        
        for (let i = 0; i < requestsToProcess.length; i++) {
          const request = requestsToProcess[i];
          if (!request.cancelled) {
            try {
              request.callback(lastFrameTime);
            } catch (error) {
              setTimeout(() => {
                throw error;
              }, 0);
            }
          }
        }
      }, Math.round(targetDelay));
    }

    const handle = ++nextHandle;
    frameQueue.push({
      handle,
      callback,
      cancelled: false
    });
    
    return handle;
  };

  cancelAnimationFrame = (handle: number): void => {
    for (let i = 0; i < frameQueue.length; i++) {
      if (frameQueue[i].handle === handle) {
        frameQueue[i].cancelled = true;
      }
    }
  };
} else {
  requestAnimationFrame = (callback: AnimationFrameCallback): number => {
    return nativeRequestAnimationFrame!.call(globalContext, callback);
  };

  cancelAnimationFrame = (handle: number): void => {
    nativeCancelAnimationFrame!.apply(globalContext, [handle]);
  };
}

export function request(callback: AnimationFrameCallback): number {
  return requestAnimationFrame.call(globalContext, callback);
}

export function cancel(handle: number): void {
  cancelAnimationFrame.apply(globalContext, [handle]);
}

export function polyfill(target?: Window & typeof globalThis): void {
  const context = target ?? globalContext;
  context.requestAnimationFrame = requestAnimationFrame;
  context.cancelAnimationFrame = cancelAnimationFrame;
}

export default request;