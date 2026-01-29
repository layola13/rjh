interface ImmediateTask {
  callback: (...args: any[]) => void;
  args: any[];
}

type ImmediateScheduler = (handle: number) => void;

(function(global: Window & typeof globalThis, process: NodeJS.Process): void {
  "use strict";
  
  if (global.setImmediate) {
    return;
  }

  let scheduler: ImmediateScheduler;
  let nextHandle = 1;
  const tasksByHandle: Record<number, ImmediateTask> = {};
  let isExecutingTask = false;
  const document = global.document;
  
  const globalProto = Object.getPrototypeOf && Object.getPrototypeOf(global);
  const targetGlobal = globalProto && globalProto.setTimeout ? globalProto : global;

  // Node.js environment
  if ({}.toString.call(global.process) === "[object process]") {
    scheduler = function(handle: number): void {
      process.nextTick(() => {
        executeTask(handle);
      });
    };
  }
  // Browser with postMessage support
  else if (canUsePostMessage()) {
    const MESSAGE_PREFIX = `setImmediate$${Math.random()}$`;
    
    const onMessage = (event: MessageEvent): void => {
      if (event.source === global && 
          typeof event.data === "string" && 
          event.data.indexOf(MESSAGE_PREFIX) === 0) {
        const handle = +event.data.slice(MESSAGE_PREFIX.length);
        executeTask(handle);
      }
    };
    
    if (global.addEventListener) {
      global.addEventListener("message", onMessage, false);
    } else {
      (global as any).attachEvent("onmessage", onMessage);
    }
    
    scheduler = function(handle: number): void {
      global.postMessage(MESSAGE_PREFIX + handle, "*");
    };
  }
  // MessageChannel fallback
  else if (global.MessageChannel) {
    const channel = new MessageChannel();
    channel.port1.onmessage = (event: MessageEvent): void => {
      executeTask(event.data);
    };
    scheduler = function(handle: number): void {
      channel.port2.postMessage(handle);
    };
  }
  // Script onreadystatechange fallback
  else if (document && "onreadystatechange" in document.createElement("script")) {
    const documentElement = document.documentElement!;
    scheduler = function(handle: number): void {
      const script = document.createElement("script");
      script.onreadystatechange = function(): void {
        executeTask(handle);
        script.onreadystatechange = null;
        documentElement.removeChild(script);
      };
      documentElement.appendChild(script);
    };
  }
  // setTimeout fallback
  else {
    scheduler = function(handle: number): void {
      setTimeout(executeTask, 0, handle);
    };
  }

  targetGlobal.setImmediate = function(callback: (...args: any[]) => void, ...args: any[]): number {
    if (typeof callback !== "function") {
      callback = new Function(String(callback)) as () => void;
    }

    const task: ImmediateTask = {
      callback,
      args
    };
    
    tasksByHandle[nextHandle] = task;
    scheduler(nextHandle);
    
    return nextHandle++;
  };

  targetGlobal.clearImmediate = clearImmediate;

  function canUsePostMessage(): boolean {
    if (global.postMessage && !global.importScripts) {
      let postMessageIsAsync = true;
      const oldOnMessage = global.onmessage;
      
      global.onmessage = function(): void {
        postMessageIsAsync = false;
      };
      global.postMessage("", "*");
      global.onmessage = oldOnMessage;
      
      return postMessageIsAsync;
    }
    return false;
  }

  function clearImmediate(handle: number): void {
    delete tasksByHandle[handle];
  }

  function executeTask(handle: number): void {
    if (isExecutingTask) {
      setTimeout(executeTask, 0, handle);
      return;
    }

    const task = tasksByHandle[handle];
    if (!task) {
      return;
    }

    isExecutingTask = true;
    try {
      runTask(task);
    } finally {
      clearImmediate(handle);
      isExecutingTask = false;
    }
  }

  function runTask(task: ImmediateTask): void {
    const { callback, args } = task;
    
    switch (args.length) {
      case 0:
        callback();
        break;
      case 1:
        callback(args[0]);
        break;
      case 2:
        callback(args[0], args[1]);
        break;
      case 3:
        callback(args[0], args[1], args[2]);
        break;
      default:
        callback.apply(undefined, args);
    }
  }
})(
  typeof self !== "undefined" ? self : (typeof globalThis !== "undefined" ? globalThis : this),
  typeof process !== "undefined" ? process : {} as NodeJS.Process
);