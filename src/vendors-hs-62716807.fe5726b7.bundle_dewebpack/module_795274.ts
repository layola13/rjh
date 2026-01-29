interface ScheduledTask {
  (): void;
}

interface ScheduledTasks {
  [key: number]: ScheduledTask;
}

interface WindowWithDispatch extends Window {
  Dispatch?: {
    now: (callback: () => void) => void;
  };
}

const globalObject = globalThis as WindowWithDispatch;
const nativeSetImmediate = globalObject.setImmediate;
const nativeClearImmediate = globalObject.clearImmediate;
const process = globalObject.process;
const Dispatch = globalObject.Dispatch;
const Function = globalObject.Function;
const MessageChannel = globalObject.MessageChannel;
const String = globalObject.String;

let taskIdCounter = 0;
const scheduledTasks: ScheduledTasks = {};
const READY_STATE_CHANGE = "onreadystatechange";

let locationOrigin: Location | undefined;
let scheduleTask: (taskId: number) => void;
let messageChannelPort: MessagePort;

try {
  locationOrigin = globalObject.location;
} catch {
  // Location access may fail in some contexts
}

function executeTask(taskId: number): void {
  if (taskId in scheduledTasks) {
    const task = scheduledTasks[taskId];
    delete scheduledTasks[taskId];
    task();
  }
}

function createTaskExecutor(taskId: number): () => void {
  return (): void => {
    executeTask(taskId);
  };
}

function handleMessageEvent(event: MessageEvent): void {
  executeTask(event.data as number);
}

function postMessageToSelf(taskId: number): void {
  if (locationOrigin) {
    globalObject.postMessage(String(taskId), locationOrigin.protocol + "//" + locationOrigin.host);
  }
}

function isCallable(value: unknown): value is (...args: unknown[]) => unknown {
  return typeof value === "function";
}

function arraySlice<T>(args: ArrayLike<T>, start: number): T[] {
  return Array.prototype.slice.call(args, start);
}

function invokeFunction(fn: (...args: unknown[]) => unknown, context: unknown, args: unknown[]): unknown {
  return fn.apply(context, args);
}

function createScriptElement(tagName: string): HTMLElement {
  return document.createElement(tagName);
}

function validateArgumentCount(actualCount: number, expectedCount: number): void {
  if (actualCount < expectedCount) {
    throw new TypeError(`Expected at least ${expectedCount} arguments, got ${actualCount}`);
  }
}

let setImmediate: (callback: (...args: unknown[]) => unknown, ...args: unknown[]) => number;
let clearImmediate: (taskId: number) => void;

if (nativeSetImmediate && nativeClearImmediate) {
  setImmediate = nativeSetImmediate;
  clearImmediate = nativeClearImmediate;
} else {
  setImmediate = function (callback: (...args: unknown[]) => unknown, ...args: unknown[]): number {
    validateArgumentCount(arguments.length, 1);
    
    const fn = isCallable(callback) ? callback : Function(callback as string) as (...args: unknown[]) => unknown;
    const taskArgs = arraySlice(arguments, 1);
    
    const taskId = ++taskIdCounter;
    scheduledTasks[taskId] = (): void => {
      invokeFunction(fn, undefined, taskArgs);
    };
    
    scheduleTask(taskId);
    return taskId;
  };

  clearImmediate = function (taskId: number): void {
    delete scheduledTasks[taskId];
  };

  if (process?.nextTick) {
    scheduleTask = (taskId: number): void => {
      process.nextTick(createTaskExecutor(taskId));
    };
  } else if (Dispatch?.now) {
    scheduleTask = (taskId: number): void => {
      Dispatch.now(createTaskExecutor(taskId));
    };
  } else if (MessageChannel && !globalObject.Bun) {
    const channel = new MessageChannel();
    messageChannelPort = channel.port2;
    channel.port1.onmessage = handleMessageEvent;
    scheduleTask = (taskId: number): void => {
      messageChannelPort.postMessage(taskId);
    };
  } else if (
    globalObject.addEventListener &&
    isCallable(globalObject.postMessage) &&
    !globalObject.importScripts &&
    locationOrigin &&
    locationOrigin.protocol !== "file:"
  ) {
    try {
      postMessageToSelf(0);
      scheduleTask = postMessageToSelf;
      globalObject.addEventListener("message", handleMessageEvent, false);
    } catch {
      scheduleTask = (taskId: number): void => {
        setTimeout(createTaskExecutor(taskId), 0);
      };
    }
  } else if (READY_STATE_CHANGE in createScriptElement("script")) {
    scheduleTask = (taskId: number): void => {
      const scriptElement = createScriptElement("script") as HTMLScriptElement;
      scriptElement[READY_STATE_CHANGE] = function (): void {
        scriptElement.parentNode?.removeChild(scriptElement);
        executeTask(taskId);
      };
      document.documentElement.appendChild(scriptElement);
    };
  } else {
    scheduleTask = (taskId: number): void => {
      setTimeout(createTaskExecutor(taskId), 0);
    };
  }
}

export { setImmediate as set, clearImmediate as clear };