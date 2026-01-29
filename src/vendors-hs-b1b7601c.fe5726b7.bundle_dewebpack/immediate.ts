interface ImmediateHandle {
  [key: number]: boolean;
}

let pendingPromise: Promise<void> | undefined;
let nextHandle = 1;
const immediateHandles: ImmediateHandle = {};

function clearHandle(handle: number): boolean {
  if (handle in immediateHandles) {
    delete immediateHandles[handle];
    return true;
  }
  return false;
}

export const Immediate = {
  setImmediate(callback: () => void): number {
    const handle = nextHandle++;
    immediateHandles[handle] = true;
    
    if (!pendingPromise) {
      pendingPromise = Promise.resolve();
    }
    
    pendingPromise.then(() => {
      if (clearHandle(handle)) {
        callback();
      }
    });
    
    return handle;
  },

  clearImmediate(handle: number): void {
    clearHandle(handle);
  }
};

export const TestTools = {
  pending(): number {
    return Object.keys(immediateHandles).length;
  }
};