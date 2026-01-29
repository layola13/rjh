interface ProcessEnv {
  [key: string]: string | undefined;
}

interface ProcessVersions {
  [key: string]: string | undefined;
}

interface Process {
  nextTick(callback: (...args: any[]) => void, ...args: any[]): void;
  title: string;
  browser: boolean;
  env: ProcessEnv;
  argv: string[];
  version: string;
  versions: ProcessVersions;
  on(event: string, listener: (...args: any[]) => void): void;
  addListener(event: string, listener: (...args: any[]) => void): void;
  once(event: string, listener: (...args: any[]) => void): void;
  off(event: string, listener: (...args: any[]) => void): void;
  removeListener(event: string, listener: (...args: any[]) => void): void;
  removeAllListeners(event?: string): void;
  emit(event: string, ...args: any[]): void;
  prependListener(event: string, listener: (...args: any[]) => void): void;
  prependOnceListener(event: string, listener: (...args: any[]) => void): void;
  listeners(event: string): Function[];
  binding(name: string): never;
  cwd(): string;
  chdir(directory: string): never;
  umask(): number;
}

type TimeoutFunction = (callback: () => void, delay: number) => any;
type ClearTimeoutFunction = (timeoutId: any) => void;

let timeoutFunc: TimeoutFunction;
let clearTimeoutFunc: ClearTimeoutFunction;

function setTimeoutNotDefined(): never {
  throw new Error("setTimeout has not been defined");
}

function clearTimeoutNotDefined(): never {
  throw new Error("clearTimeout has not been defined");
}

function runTimeout(callback: () => void): any {
  if (timeoutFunc === setTimeout) {
    return setTimeout(callback, 0);
  }
  if ((timeoutFunc === setTimeoutNotDefined || !timeoutFunc) && setTimeout) {
    timeoutFunc = setTimeout;
    return setTimeout(callback, 0);
  }
  try {
    return timeoutFunc(callback, 0);
  } catch (error) {
    try {
      return timeoutFunc.call(null, callback, 0);
    } catch (error) {
      return timeoutFunc.call(globalThis, callback, 0);
    }
  }
}

function initializeTimers(): void {
  try {
    timeoutFunc = typeof setTimeout === "function" ? setTimeout : setTimeoutNotDefined;
  } catch (error) {
    timeoutFunc = setTimeoutNotDefined;
  }
  try {
    clearTimeoutFunc = typeof clearTimeout === "function" ? clearTimeout : clearTimeoutNotDefined;
  } catch (error) {
    clearTimeoutFunc = clearTimeoutNotDefined;
  }
}

initializeTimers();

let currentQueue: Task[] | null;
let queue: Task[] = [];
let draining: boolean = false;
let currentQueueIndex: number = -1;

function drainQueue(): void {
  if (draining && currentQueue) {
    draining = false;
    if (currentQueue.length) {
      queue = currentQueue.concat(queue);
    } else {
      currentQueueIndex = -1;
    }
    if (queue.length) {
      processQueue();
    }
  }
}

function processQueue(): void {
  if (!draining) {
    const timeout = runTimeout(drainQueue);
    draining = true;
    let queueLength = queue.length;
    while (queueLength) {
      currentQueue = queue;
      queue = [];
      while (++currentQueueIndex < queueLength) {
        if (currentQueue) {
          currentQueue[currentQueueIndex].run();
        }
      }
      currentQueueIndex = -1;
      queueLength = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
  }
}

function runClearTimeout(timeoutId: any): void {
  if (clearTimeoutFunc === clearTimeout) {
    clearTimeout(timeoutId);
    return;
  }
  if ((clearTimeoutFunc === clearTimeoutNotDefined || !clearTimeoutFunc) && clearTimeout) {
    clearTimeoutFunc = clearTimeout;
    clearTimeout(timeoutId);
    return;
  }
  try {
    clearTimeoutFunc(timeoutId);
  } catch (error) {
    try {
      clearTimeoutFunc.call(null, timeoutId);
    } catch (error) {
      clearTimeoutFunc.call(globalThis, timeoutId);
    }
  }
}

class Task {
  constructor(public fun: (...args: any[]) => void, public array: any[]) {}

  run(): void {
    this.fun.apply(null, this.array);
  }
}

function noop(): void {}

const process: Process = {
  nextTick(callback: (...args: any[]) => void, ...args: any[]): void {
    const task = new Task(callback, args);
    queue.push(task);
    if (queue.length === 1 && !draining) {
      runTimeout(processQueue);
    }
  },

  title: "browser",
  browser: true,
  env: {},
  argv: [],
  version: "",
  versions: {},
  on: noop,
  addListener: noop,
  once: noop,
  off: noop,
  removeListener: noop,
  removeAllListeners: noop,
  emit: noop,
  prependListener: noop,
  prependOnceListener: noop,

  listeners(event: string): Function[] {
    return [];
  },

  binding(name: string): never {
    throw new Error("process.binding is not supported");
  },

  cwd(): string {
    return "/";
  },

  chdir(directory: string): never {
    throw new Error("process.chdir is not supported");
  },

  umask(): number {
    return 0;
  }
};

export default process;