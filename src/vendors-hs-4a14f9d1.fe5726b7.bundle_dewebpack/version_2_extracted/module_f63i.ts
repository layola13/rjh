interface ProcessTask {
  fun: Function;
  array: unknown[];
}

class Task implements ProcessTask {
  constructor(
    public fun: Function,
    public array: unknown[]
  ) {}

  run(): void {
    this.fun.apply(null, this.array);
  }
}

let cachedSetTimeout: typeof setTimeout | undefined;
let cachedClearTimeout: typeof clearTimeout | undefined;

function defaultSetTimeout(): never {
  throw new Error("setTimeout has not been defined");
}

function defaultClearTimeout(): never {
  throw new Error("clearTimeout has not been defined");
}

(function initializeTimers() {
  try {
    cachedSetTimeout = typeof setTimeout === "function" ? setTimeout : defaultSetTimeout;
  } catch {
    cachedSetTimeout = defaultSetTimeout;
  }
  try {
    cachedClearTimeout = typeof clearTimeout === "function" ? clearTimeout : defaultClearTimeout;
  } catch {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(callback: Function): ReturnType<typeof setTimeout> {
  if (cachedSetTimeout === setTimeout) {
    return setTimeout(callback as TimerHandler, 0);
  }
  if ((cachedSetTimeout === defaultSetTimeout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(callback as TimerHandler, 0);
  }
  try {
    return cachedSetTimeout(callback as TimerHandler, 0);
  } catch {
    try {
      return cachedSetTimeout.call(null, callback as TimerHandler, 0);
    } catch {
      return cachedSetTimeout.call(globalThis, callback as TimerHandler, 0);
    }
  }
}

function runClearTimeout(marker: ReturnType<typeof setTimeout>): void {
  if (cachedClearTimeout === clearTimeout) {
    clearTimeout(marker);
    return;
  }
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    clearTimeout(marker);
    return;
  }
  try {
    cachedClearTimeout(marker);
  } catch {
    try {
      cachedClearTimeout.call(null, marker);
    } catch {
      cachedClearTimeout.call(globalThis, marker);
    }
  }
}

let queue: Task[] = [];
let draining = false;
let currentQueue: Task[] | null = null;
let queueIndex = -1;

function cleanUpNextTick(): void {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length > 0) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length > 0) {
    drainQueue();
  }
}

function drainQueue(): void {
  if (draining) {
    return;
  }
  const timeout = runTimeout(cleanUpNextTick);
  draining = true;

  let len = queue.length;
  while (len > 0) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      currentQueue?.[queueIndex]?.run();
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

function nextTick(callback: Function, ...args: unknown[]): void {
  queue.push(new Task(callback, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}

function noop(): void {}

function throwNotSupported(method: string): never {
  throw new Error(`process.${method} is not supported`);
}

export const process = {
  nextTick,
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
  listeners: (): unknown[] => [],
  binding: (): never => throwNotSupported("binding"),
  cwd: (): string => "/",
  chdir: (): never => throwNotSupported("chdir"),
  umask: (): number => 0,
};