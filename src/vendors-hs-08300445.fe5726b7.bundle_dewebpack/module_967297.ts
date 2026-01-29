type CancelFunction = (id: number) => void;

interface RafFunction {
  (callback: () => void, frame?: number): number;
  cancel: CancelFunction;
}

let scheduleFrame = (callback: () => void): number => {
  return +setTimeout(callback, 16);
};

let cancelFrame = (id: number): void => {
  clearTimeout(id);
};

if (typeof window !== "undefined" && "requestAnimationFrame" in window) {
  scheduleFrame = (callback: () => void): number => {
    return window.requestAnimationFrame(callback);
  };
  
  cancelFrame = (id: number): void => {
    window.cancelAnimationFrame(id);
  };
}

let uniqueId = 0;
const frameMap = new Map<number, number>();

function removeFromMap(id: number): void {
  frameMap.delete(id);
}

const raf: RafFunction = (callback: () => void, frameCount: number = 1): number => {
  const currentId = ++uniqueId;
  
  function executeFrame(remainingFrames: number): void {
    if (remainingFrames === 0) {
      removeFromMap(currentId);
      callback();
    } else {
      const scheduledId = scheduleFrame(() => {
        executeFrame(remainingFrames - 1);
      });
      frameMap.set(currentId, scheduledId);
    }
  }
  
  executeFrame(frameCount);
  return currentId;
};

raf.cancel = (id: number): void => {
  const scheduledId = frameMap.get(id);
  removeFromMap(id);
  if (scheduledId !== undefined) {
    cancelFrame(scheduledId);
  }
};

export default raf;