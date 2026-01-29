interface PromiseHandler<T = any> {
  owner: PromisePolyfill<T>;
  then: PromisePolyfill<any>;
  fulfilled?: ((value: T) => any) | null;
  rejected?: ((reason: any) => any) | null;
}

type PromiseState = "pending" | "sealed" | "fulfilled" | "rejected";

type PromiseExecutor<T> = (
  resolve: (value: T | PromiseLike<T>) => void,
  reject: (reason?: any) => void
) => void;

const PENDING: PromiseState = "pending";
const SEALED: PromiseState = "sealed";
const FULFILLED: PromiseState = "fulfilled";
const REJECTED: PromiseState = "rejected";

const noop = (): void => {};

function isArray(value: any): value is any[] {
  return Object.prototype.toString.call(value) === "[object Array]";
}

const setImmediateShim = typeof setImmediate !== "undefined" ? setImmediate : setTimeout;

let scheduledQueue: Array<[() => void, any]> = [];
let isScheduled = false;

function flushQueue(): void {
  for (let i = 0; i < scheduledQueue.length; i++) {
    scheduledQueue[i][0](scheduledQueue[i][1]);
  }
  scheduledQueue = [];
  isScheduled = false;
}

function scheduleTask(task: () => void, arg: any): void {
  scheduledQueue.push([task, arg]);
  if (!isScheduled) {
    isScheduled = true;
    setImmediateShim(flushQueue, 0);
  }
}

function executeHandler<T>(handler: PromiseHandler<T>): void {
  const ownerPromise = handler.owner;
  const state = ownerPromise.state_;
  const data = ownerPromise.data_;
  const callback = handler[state === FULFILLED ? "fulfilled" : "rejected"];
  const nextPromise = handler.then;

  if (typeof callback === "function") {
    let newState: PromiseState = FULFILLED;
    let newData: any;
    try {
      newData = callback(data);
    } catch (error) {
      rejectPromise(nextPromise, error);
      return;
    }

    if (!tryResolveThenable(nextPromise, newData)) {
      if (newState === FULFILLED) {
        fulfillPromise(nextPromise, newData);
      }
      if (newState === REJECTED) {
        rejectPromise(nextPromise, newData);
      }
    }
  } else {
    if (state === FULFILLED) {
      fulfillPromise(nextPromise, data);
    }
    if (state === REJECTED) {
      rejectPromise(nextPromise, data);
    }
  }
}

function tryResolveThenable<T>(promise: PromisePolyfill<T>, value: any): boolean {
  let called = false;
  try {
    if (promise === value) {
      throw new TypeError("A promises callback cannot return that same promise.");
    }
    if (value && (typeof value === "function" || typeof value === "object")) {
      const then = value.then;
      if (typeof then === "function") {
        then.call(
          value,
          (resolvedValue: any) => {
            if (!called) {
              called = true;
              if (value !== resolvedValue) {
                resolvePromise(promise, resolvedValue);
              } else {
                fulfillPromise(promise, resolvedValue);
              }
            }
          },
          (reason: any) => {
            if (!called) {
              called = true;
              rejectPromise(promise, reason);
            }
          }
        );
        return true;
      }
    }
  } catch (error) {
    if (!called) {
      rejectPromise(promise, error);
    }
    return true;
  }
  return false;
}

function resolvePromise<T>(promise: PromisePolyfill<T>, value: any): void {
  if (promise !== value && !tryResolveThenable(promise, value)) {
    fulfillPromise(promise, value);
  } else if (promise === value) {
    fulfillPromise(promise, value);
  }
}

function fulfillPromise<T>(promise: PromisePolyfill<T>, value: T): void {
  if (promise.state_ === PENDING) {
    promise.state_ = SEALED;
    promise.data_ = value;
    scheduleTask(transitionToFulfilled, promise);
  }
}

function rejectPromise<T>(promise: PromisePolyfill<T>, reason: any): void {
  if (promise.state_ === PENDING) {
    promise.state_ = SEALED;
    promise.data_ = reason;
    scheduleTask(transitionToRejected, promise);
  }
}

function processHandlers<T>(promise: PromisePolyfill<T>): void {
  const handlers = promise.then_;
  promise.then_ = undefined;
  for (let i = 0; i < handlers!.length; i++) {
    executeHandler(handlers![i]);
  }
}

function transitionToFulfilled<T>(promise: PromisePolyfill<T>): void {
  promise.state_ = FULFILLED;
  processHandlers(promise);
}

function transitionToRejected<T>(promise: PromisePolyfill<T>): void {
  promise.state_ = REJECTED;
  processHandlers(promise);
}

class PromisePolyfill<T = any> {
  state_: PromiseState = PENDING;
  then_: Array<PromiseHandler<T>> | undefined = [];
  data_: any = undefined;

  constructor(executor: PromiseExecutor<T>) {
    if (typeof executor !== "function") {
      throw new TypeError("Promise constructor takes a function argument");
    }
    if (!(this instanceof PromisePolyfill)) {
      throw new TypeError(
        "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
      );
    }

    const handleReject = (reason: any): void => {
      rejectPromise(this, reason);
    };

    try {
      executor((value: T | PromiseLike<T>) => {
        resolvePromise(this, value);
      }, handleReject);
    } catch (error) {
      handleReject(error);
    }
  }

  then<TResult1 = T, TResult2 = never>(
    onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
  ): PromisePolyfill<TResult1 | TResult2> {
    const handler: PromiseHandler<T> = {
      owner: this,
      then: new PromisePolyfill<TResult1 | TResult2>(noop as any),
      fulfilled: onFulfilled,
      rejected: onRejected,
    };

    if (this.state_ === FULFILLED || this.state_ === REJECTED) {
      scheduleTask(executeHandler, handler);
    } else {
      this.then_!.push(handler);
    }

    return handler.then as PromisePolyfill<TResult1 | TResult2>;
  }

  catch<TResult = never>(
    onRejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null
  ): PromisePolyfill<T | TResult> {
    return this.then(null, onRejected);
  }

  static all<T>(values: Array<T | PromiseLike<T>>): PromisePolyfill<T[]> {
    if (!isArray(values)) {
      throw new TypeError("You must pass an array to Promise.all().");
    }

    return new PromisePolyfill<T[]>((resolve, reject) => {
      const results: T[] = [];
      let remaining = 0;

      function resolverFactory(index: number): (value: T) => void {
        remaining++;
        return (value: T): void => {
          results[index] = value;
          if (--remaining === 0) {
            resolve(results);
          }
        };
      }

      for (let i = 0; i < values.length; i++) {
        const item = values[i];
        if (item && typeof (item as any).then === "function") {
          (item as PromiseLike<T>).then(resolverFactory(i), reject);
        } else {
          results[i] = item as T;
        }
      }

      if (remaining === 0) {
        resolve(results);
      }
    });
  }

  static race<T>(values: Array<T | PromiseLike<T>>): PromisePolyfill<T> {
    if (!isArray(values)) {
      throw new TypeError("You must pass an array to Promise.race().");
    }

    return new PromisePolyfill<T>((resolve, reject) => {
      for (let i = 0; i < values.length; i++) {
        const item = values[i];
        if (item && typeof (item as any).then === "function") {
          (item as PromiseLike<T>).then(resolve, reject);
        } else {
          resolve(item as T);
        }
      }
    });
  }

  static resolve<T>(value: T | PromiseLike<T>): PromisePolyfill<T> {
    if (value && typeof value === "object" && (value as any).constructor === PromisePolyfill) {
      return value as PromisePolyfill<T>;
    }
    return new PromisePolyfill<T>((resolve) => {
      resolve(value);
    });
  }

  static reject<T = never>(reason?: any): PromisePolyfill<T> {
    return new PromisePolyfill<T>((_, reject) => {
      reject(reason);
    });
  }
}

export { PromisePolyfill };
export default PromisePolyfill;