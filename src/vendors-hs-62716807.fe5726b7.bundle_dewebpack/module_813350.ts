interface MicrotaskQueue {
  head: (() => void) | null;
  get(): (() => void) | undefined;
  add(task: () => void): void;
}

class TaskQueue implements MicrotaskQueue {
  head: (() => void) | null = null;
  private tail: (() => void) | null = null;

  get(): (() => void) | undefined {
    const task = this.head;
    if (task) {
      this.head = this.tail;
      this.tail = null;
    }
    return task ?? undefined;
  }

  add(task: () => void): void {
    if (this.head) {
      this.tail = task;
    } else {
      this.head = task;
    }
  }
}

const global = globalThis as typeof globalThis & {
  MutationObserver?: typeof MutationObserver;
  WebKitMutationObserver?: typeof MutationObserver;
  document?: Document;
  process?: NodeJS.Process;
  Promise?: PromiseConstructor;
  queueMicrotask?: (callback: () => void) => void;
};

const taskQueue = new TaskQueue();

let scheduleFlush: (() => void) | undefined;

/**
 * Flushes all queued microtasks
 */
function flush(): void {
  let domain: NodeJS.Domain | undefined;
  let task: (() => void) | undefined;

  const isNode = typeof global.process !== 'undefined' && global.process.domain;
  
  if (isNode) {
    domain = global.process?.domain;
    domain?.exit();
  }

  while ((task = taskQueue.get())) {
    try {
      task();
    } catch (error) {
      if (taskQueue.head && scheduleFlush) {
        scheduleFlush();
      }
      throw error;
    }
  }

  if (domain) {
    domain.enter();
  }
}

/**
 * Queues a microtask to be executed
 */
export function queueMicrotask(callback: () => void): void {
  if (!taskQueue.head && scheduleFlush) {
    scheduleFlush();
  }
  taskQueue.add(callback);
}

// Initialize scheduling mechanism
const nativeMutationObserver = global.MutationObserver || global.WebKitMutationObserver;
const hasDocument = typeof global.document !== 'undefined';
const hasProcess = typeof global.process !== 'undefined';
const hasPromise = typeof global.Promise !== 'undefined';
const hasSetImmediate = typeof setImmediate !== 'undefined';

if (hasPromise && global.Promise?.resolve) {
  const resolvedPromise = global.Promise.resolve(undefined);
  scheduleFlush = (): void => {
    resolvedPromise.then(flush);
  };
} else if (hasProcess && global.process?.nextTick) {
  scheduleFlush = (): void => {
    global.process!.nextTick(flush);
  };
} else if (nativeMutationObserver && hasDocument) {
  let toggle = true;
  const textNode = global.document!.createTextNode('');
  new nativeMutationObserver(flush).observe(textNode, {
    characterData: true
  });
  scheduleFlush = (): void => {
    toggle = !toggle;
    textNode.data = String(toggle);
  };
} else if (hasSetImmediate) {
  scheduleFlush = (): void => {
    setImmediate(flush);
  };
} else {
  scheduleFlush = (): void => {
    setTimeout(flush, 0);
  };
}