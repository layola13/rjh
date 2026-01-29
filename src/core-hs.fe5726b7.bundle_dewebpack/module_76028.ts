interface MicrotaskQueue {
  head: (() => void) | null;
  get(): (() => void) | undefined;
  add(task: () => void): void;
}

class SimpleMicrotaskQueue implements MicrotaskQueue {
  head: (() => void) | null = null;
  private tail: { task: () => void; next: any } | null = null;

  get(): (() => void) | undefined {
    if (!this.head) return undefined;
    const task = this.head;
    this.head = null;
    this.tail = null;
    return task;
  }

  add(task: () => void): void {
    const node = { task, next: null };
    if (this.tail) {
      this.tail.next = node;
    } else {
      this.head = task;
    }
    this.tail = node;
  }
}

interface NodeProcess {
  domain?: { exit(): void; enter(): void };
  nextTick(callback: () => void): void;
}

declare const global: {
  MutationObserver?: typeof MutationObserver;
  WebKitMutationObserver?: typeof MutationObserver;
  document?: Document;
  process?: NodeProcess;
  Promise?: PromiseConstructor;
  queueMicrotask?: (callback: () => void) => void;
  setTimeout: typeof setTimeout;
};

const globalObject = (typeof window !== 'undefined' ? window : global) as typeof global;

const NativeMutationObserver = globalObject.MutationObserver || globalObject.WebKitMutationObserver;
const document = globalObject.document;
const process = globalObject.process as NodeProcess | undefined;
const NativePromise = globalObject.Promise;
const queueMicrotaskDescriptor = Object.getOwnPropertyDescriptor(globalObject, 'queueMicrotask');
const nativeQueueMicrotask = queueMicrotaskDescriptor?.value as ((callback: () => void) => void) | undefined;

const isNode = typeof process !== 'undefined' && process?.nextTick !== undefined;
const isIOS = /iP(ad|hone|od)/.test(navigator?.userAgent ?? '');
const isWebWorker = typeof document === 'undefined';
const isMacOS = /Macintosh/.test(navigator?.userAgent ?? '');

let scheduleFlush: () => void;
let toggleState: boolean;
let textNode: Text;
let promiseThen: (callback: () => void) => void;
let resolvedPromise: Promise<void>;

const microtaskQueue = new SimpleMicrotaskQueue();

const flush = (): void => {
  let task: (() => void) | undefined;
  let domain = isNode && process?.domain;

  if (domain) {
    domain.exit();
  }

  while ((task = microtaskQueue.get())) {
    try {
      task();
    } catch (error) {
      if (microtaskQueue.head) {
        scheduleFlush();
      }
      throw error;
    }
  }

  if (domain) {
    domain.enter();
  }
};

if (!nativeQueueMicrotask) {
  if (!isWebWorker && !isNode && !isMacOS && NativeMutationObserver && document) {
    toggleState = true;
    textNode = document.createTextNode('');
    new NativeMutationObserver(flush).observe(textNode, { characterData: true });
    scheduleFlush = (): void => {
      textNode.data = (toggleState = !toggleState) ? '1' : '0';
    };
  } else if (!isIOS && NativePromise && NativePromise.resolve) {
    resolvedPromise = NativePromise.resolve(undefined);
    resolvedPromise.constructor = NativePromise;
    promiseThen = resolvedPromise.then.bind(resolvedPromise);
    scheduleFlush = (): void => {
      promiseThen(flush);
    };
  } else if (isNode && process) {
    scheduleFlush = (): void => {
      process.nextTick(flush);
    };
  } else {
    const boundSetTimeout = globalObject.setTimeout.bind(globalObject);
    scheduleFlush = (): void => {
      boundSetTimeout(flush);
    };
  }
}

const queueMicrotask: (callback: () => void) => void = nativeQueueMicrotask || ((task: () => void): void => {
  if (!microtaskQueue.head) {
    scheduleFlush();
  }
  microtaskQueue.add(task);
});

export default queueMicrotask;