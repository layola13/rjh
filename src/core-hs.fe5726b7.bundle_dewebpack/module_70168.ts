interface ScheduledTask {
  (): void;
}

interface ScheduledTasks {
  [id: number]: ScheduledTask;
}

interface GlobalWithTimers {
  setImmediate?: (callback: (...args: unknown[]) => void, ...args: unknown[]) => number;
  clearImmediate?: (id: number) => void;
  process?: {
    nextTick: (callback: () => void) => void;
  };
  Dispatch?: {
    now: (callback: () => void) => void;
  };
  Function: FunctionConstructor;
  MessageChannel?: {
    new (): {
      port1: MessagePort;
      port2: MessagePort;
    };
  };
  String: StringConstructor;
  location?: Location;
  postMessage?: (message: string, targetOrigin: string) => void;
  addEventListener?: (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => void;
  importScripts?: unknown;
}

declare const global: GlobalWithTimers;

import { invoke } from './utils/invoke';
import { createElement } from './dom/create-element';
import { bind } from './utils/bind';
import { isCallable } from './types/is-callable';
import { hasOwnProperty } from './utils/has-own-property';
import { fails } from './utils/fails';
import { documentElement } from './dom/document-element';
import { arraySlice } from './utils/array-slice';
import { validateArgumentsLength } from './utils/validate-arguments-length';
import { isNode } from './env/is-node';

const globalObject = global as GlobalWithTimers;
const nativeSetImmediate = globalObject.setImmediate;
const nativeClearImmediate = globalObject.clearImmediate;
const process = globalObject.process;
const Dispatch = globalObject.Dispatch;
const FunctionConstructor = globalObject.Function;
const MessageChannel = globalObject.MessageChannel;
const StringConstructor = globalObject.String;

let location: Location | undefined;
let scheduleTask: (id: number) => void;
let messagePort: MessagePort;
let channel: { port1: MessagePort; port2: MessagePort };

const ON_READY_STATE_CHANGE = 'onreadystatechange';
const SCRIPT_TAG = 'script';
const MESSAGE_EVENT = 'message';
const FILE_PROTOCOL = 'file:';

let taskIdCounter = 0;
const scheduledTasks: ScheduledTasks = {};

fails(() => {
  location = globalObject.location;
});

const runTask = (id: number): void => {
  if (hasOwnProperty(scheduledTasks, id)) {
    const task = scheduledTasks[id];
    delete scheduledTasks[id];
    task();
  }
};

const createTaskRunner = (id: number): (() => void) => {
  return (): void => {
    runTask(id);
  };
};

const handleMessage = (event: MessageEvent): void => {
  runTask(event.data as number);
};

const postMessageToSelf = (id: number): void => {
  if (location) {
    globalObject.postMessage?.(StringConstructor(id), `${location.protocol}//${location.host}`);
  }
};

let setImmediate: (callback: (...args: unknown[]) => void, ...args: unknown[]) => number;
let clearImmediate: (id: number) => void;

if (!nativeSetImmediate || !nativeClearImmediate) {
  setImmediate = (callback: (...args: unknown[]) => void, ...args: unknown[]): number => {
    validateArgumentsLength(arguments.length, 1);
    
    const executableCallback = isCallable(callback) ? callback : FunctionConstructor(callback as string);
    const callbackArgs = arraySlice(arguments, 1);
    
    const taskId = ++taskIdCounter;
    scheduledTasks[taskId] = (): void => {
      invoke(executableCallback, undefined, callbackArgs);
    };
    
    scheduleTask(taskId);
    return taskId;
  };

  clearImmediate = (id: number): void => {
    delete scheduledTasks[id];
  };

  if (isNode) {
    scheduleTask = (id: number): void => {
      process?.nextTick(createTaskRunner(id));
    };
  } else if (Dispatch?.now) {
    scheduleTask = (id: number): void => {
      Dispatch.now(createTaskRunner(id));
    };
  } else if (MessageChannel && !isNode) {
    channel = new MessageChannel();
    messagePort = channel.port2;
    channel.port1.onmessage = handleMessage;
    scheduleTask = bind(messagePort.postMessage, messagePort);
  } else if (
    globalObject.addEventListener &&
    isCallable(globalObject.postMessage) &&
    !globalObject.importScripts &&
    location &&
    location.protocol !== FILE_PROTOCOL &&
    !fails(postMessageToSelf)
  ) {
    scheduleTask = postMessageToSelf;
    globalObject.addEventListener(MESSAGE_EVENT, handleMessage, false);
  } else if (ON_READY_STATE_CHANGE in createElement(SCRIPT_TAG)) {
    scheduleTask = (id: number): void => {
      const script = createElement(SCRIPT_TAG);
      (script as HTMLScriptElement).onreadystatechange = function (): void {
        documentElement.removeChild(this);
        runTask(id);
      };
      documentElement.appendChild(script);
    };
  } else {
    scheduleTask = (id: number): void => {
      setTimeout(createTaskRunner(id), 0);
    };
  }
} else {
  setImmediate = nativeSetImmediate;
  clearImmediate = nativeClearImmediate;
}

export { setImmediate as set, clearImmediate as clear };