type FrameCallback = () => void;
type CancelFunction = (id: number) => void;

let requestFrame: (callback: FrameCallback) => number = (callback: FrameCallback): number => {
  return +setTimeout(callback, 16);
};

let cancelFrame: CancelFunction = (id: number): void => {
  clearTimeout(id);
};

if (typeof window !== 'undefined' && 'requestAnimationFrame' in window) {
  requestFrame = (callback: FrameCallback): number => {
    return window.requestAnimationFrame(callback);
  };
  
  cancelFrame = (id: number): void => {
    window.cancelAnimationFrame(id);
  };
}

let frameIdCounter = 0;
const activeFrames = new Map<number, number>();

function removeFrame(frameId: number): void {
  activeFrames.delete(frameId);
}

interface RafFunction {
  (callback: FrameCallback, frames?: number): number;
  cancel: (frameId: number) => void;
}

const raf: RafFunction = (callback: FrameCallback, frames: number = 1): number => {
  const currentFrameId = ++frameIdCounter;
  
  function scheduleFrame(remainingFrames: number): void {
    if (remainingFrames === 0) {
      removeFrame(currentFrameId);
      callback();
    } else {
      const nativeFrameId = requestFrame(() => {
        scheduleFrame(remainingFrames - 1);
      });
      activeFrames.set(currentFrameId, nativeFrameId);
    }
  }
  
  scheduleFrame(frames);
  return currentFrameId;
};

raf.cancel = (frameId: number): void => {
  const nativeFrameId = activeFrames.get(frameId);
  removeFrame(frameId);
  if (nativeFrameId !== undefined) {
    cancelFrame(nativeFrameId);
  }
};

export default raf;