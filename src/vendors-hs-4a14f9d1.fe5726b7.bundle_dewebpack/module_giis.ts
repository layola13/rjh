interface ImmediateTask {
  callback: Function;
  args: any[];
}

type ImmediateTaskRegistry = Record<number, ImmediateTask>;

type ScheduleFunction = (handle: number) => void;

(function(global: any, process: any): void {
  "use strict";

  if (global.setImmediate) {
    return;
  }

  let scheduleImmediate: ScheduleFunction;
  let nextHandle: number = 1;
  const taskRegistry: ImmediateTaskRegistry = {};
  let isExecutingTask: boolean = false;
  const document = global.document;

  const target = Object.getPrototypeOf && Object.getPrototypeOf(global);
  const installTarget = target && target.setTimeout ? target : global;

  const isNodeProcess = {}.toString.call(global.process) === "[object process]";

  if (isNodeProcess) {
    scheduleImmediate = function(handle: number): void {
      process.nextTick(function(): void {
        executeTask(handle);
      });
    };
  } else if (canUsePostMessage()) {
    const messagePrefix = `setImmediate$${Math.random()}$`;
    
    const handleMessage = function(event: MessageEvent): void {
      if (
        event.source === global &&
        typeof event.data === "string" &&
        event.data.indexOf(messagePrefix) === 0
      ) {
        const handle = +event.data.slice(messagePrefix.length);
        executeTask(handle);
      }
    };

    if (global.addEventListener) {
      global.addEventListener("message", handleMessage, false);
    } else {
      global.attachEvent("onmessage", handleMessage);
    }

    scheduleImmediate = function(handle: number): void {
      global.postMessage(messagePrefix + handle, "*");
    };
  } else if (global.MessageChannel) {
    const channel = new MessageChannel();
    
    channel.port1.onmessage = function(event: MessageEvent): void {
      executeTask(event.data);
    };

    scheduleImmediate = function(handle: number): void {
      channel.port2.postMessage(handle);
    };
  } else if (
    document &&
    "onreadystatechange" in document.createElement("script")
  ) {
    const documentElement = document.documentElement;

    scheduleImmediate = function(handle: number): void {
      const script = document.createElement("script");
      
      script.onreadystatechange = function(): void {
        executeTask(handle);
        script.onreadystatechange = null;
        documentElement.removeChild(script);
      };

      documentElement.appendChild(script);
    };
  } else {
    scheduleImmediate = function(handle: number): void {
      setTimeout(executeTask, 0, handle);
    };
  }

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

  installTarget.setImmediate = function(callback: Function, ...args: any[]): number {
    if (typeof callback !== "function") {
      callback = new Function(String(callback));
    }

    const task: ImmediateTask = {
      callback,
      args
    };

    taskRegistry[nextHandle] = task;
    scheduleImmediate(nextHandle);

    return nextHandle++;
  };

  installTarget.clearImmediate = function(handle: number): void {
    delete taskRegistry[handle];
  };

  function executeTask(handle: number): void {
    if (isExecutingTask) {
      setTimeout(executeTask, 0, handle);
      return;
    }

    const task = taskRegistry[handle];

    if (task) {
      isExecutingTask = true;

      try {
        runTask(task);
      } finally {
        delete taskRegistry[handle];
        isExecutingTask = false;
      }
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
})(typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : this, typeof process !== "undefined" ? process : undefined);