interface PromiseState<T = any> {
  type: string;
  done: boolean;
  notified: boolean;
  parent: boolean;
  reactions: ReactionQueue;
  rejection: number | boolean;
  state: number;
  value: T;
}

interface PromiseReaction<T = any> {
  ok: boolean | ((value: any) => any);
  fail: boolean | ((reason: any) => any);
  resolve: (value: any) => void;
  reject: (reason: any) => void;
  promise: any;
  domain?: Domain;
}

interface Domain {
  enter: () => void;
  exit: () => void;
}

interface ReactionQueue {
  add: (reaction: PromiseReaction) => void;
  get: () => PromiseReaction | undefined;
}

interface PromiseCapability<T = any> {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason: any) => void;
}

interface PromiseEvent {
  promise: Promise<any>;
  reason: any;
  initEvent?: (type: string, bubbles: boolean, cancelable: boolean) => void;
}

const PROMISE_TYPE = "Promise";
const STATE_PENDING = 0;
const STATE_FULFILLED = 1;
const STATE_REJECTED = 2;
const REJECTION_UNHANDLED = 1;
const REJECTION_HANDLED = 2;
const UNHANDLED_REJECTION_EVENT = "unhandledrejection";
const REJECTION_HANDLED_EVENT = "rejectionhandled";

const isNode = typeof process !== 'undefined';
const hasDocument = typeof document !== 'undefined';
const hasDispatchEvent = hasDocument && document.createEvent && typeof dispatchEvent === 'function';
const hasRejectionEvent = true; // Placeholder for actual feature detection

const globalObject = typeof globalThis !== 'undefined' ? globalThis : window;
const nativePromise = globalObject.Promise;
const nativePromisePrototype = nativePromise?.prototype;

const internalStateGetter = (promise: any): PromiseState => {
  // Placeholder for internal state access
  return (promise as any).__internalState__;
};

const internalStateSetter = (promise: any, state: PromiseState): void => {
  (promise as any).__internalState__ = state;
};

const isCallable = (value: any): value is Function => {
  return typeof value === 'function';
};

const isObject = (value: any): value is object => {
  return typeof value === 'object' && value !== null;
};

const getThenable = (value: any): Function | false => {
  if (!isObject(value)) return false;
  const then = value.then;
  return isCallable(then) ? then : false;
};

const microtask = (callback: () => void): void => {
  queueMicrotask(callback);
};

const executeReaction = (reaction: PromiseReaction, state: PromiseState): void => {
  if (state.notified) return;
  
  const value = state.value;
  const isFulfilled = state.state === STATE_FULFILLED;
  const handler = isFulfilled ? reaction.ok : reaction.fail;
  const resolve = reaction.resolve;
  const reject = reaction.reject;
  const domain = reaction.domain;
  
  let result: any;
  let domainExited = false;

  try {
    if (handler) {
      if (!isFulfilled) {
        if (state.rejection === REJECTION_HANDLED) {
          emitRejectionHandled(state);
        }
        state.rejection = REJECTION_UNHANDLED;
      }

      if (handler === true) {
        result = value;
      } else {
        if (domain) domain.enter();
        result = (handler as Function)(value);
        if (domain) {
          domain.exit();
          domainExited = true;
        }
      }

      if (result === reaction.promise) {
        reject(new TypeError("Promise-chain cycle"));
      } else {
        const thenable = getThenable(result);
        if (thenable) {
          (thenable as Function).call(result, resolve, reject);
        } else {
          resolve(result);
        }
      }
    } else {
      reject(value);
    }
  } catch (error) {
    if (domain && !domainExited) domain.exit();
    reject(error);
  }
};

const notifyReactions = (state: PromiseState, isReject: boolean): void => {
  if (state.notified) return;
  
  state.notified = true;
  
  microtask(() => {
    const reactions = state.reactions;
    let reaction: PromiseReaction | undefined;
    
    while ((reaction = reactions.get())) {
      executeReaction(reaction, state);
    }
    
    state.notified = false;
    
    if (isReject && !state.rejection) {
      scheduleUnhandledRejectionCheck(state);
    }
  });
};

const dispatchRejectionEvent = (
  eventType: string,
  promise: Promise<any>,
  reason: any
): void => {
  let event: PromiseEvent;

  if (hasDispatchEvent) {
    const domEvent = document.createEvent("Event") as any;
    domEvent.promise = promise;
    domEvent.reason = reason;
    domEvent.initEvent(eventType, false, true);
    globalObject.dispatchEvent(domEvent);
  } else {
    event = { promise, reason };
  }

  if (!hasRejectionEvent) {
    const handler = (globalObject as any)["on" + eventType];
    if (handler) {
      handler(event!);
    } else if (eventType === UNHANDLED_REJECTION_EVENT) {
      console.error("Unhandled promise rejection", reason);
    }
  }
};

const scheduleUnhandledRejectionCheck = (state: PromiseState): void => {
  setTimeout(() => {
    const facade = (state as any).facade;
    const value = state.value;

    if (isUnhandled(state)) {
      const errorResult = captureError(() => {
        if (isNode) {
          process.emit("unhandledRejection", value, facade);
        } else {
          dispatchRejectionEvent(UNHANDLED_REJECTION_EVENT, facade, value);
        }
      });

      state.rejection = isNode || isUnhandled(state) ? REJECTION_HANDLED : REJECTION_UNHANDLED;

      if (errorResult.error) {
        throw errorResult.value;
      }
    }
  }, 0);
};

const isUnhandled = (state: PromiseState): boolean => {
  return state.rejection !== REJECTION_UNHANDLED && !state.parent;
};

const emitRejectionHandled = (state: PromiseState): void => {
  setTimeout(() => {
    const facade = (state as any).facade;
    if (isNode) {
      process.emit("rejectionHandled", facade);
    } else {
      dispatchRejectionEvent(REJECTION_HANDLED_EVENT, facade, state.value);
    }
  }, 0);
};

const captureError = (fn: () => void): { error: boolean; value?: any } => {
  try {
    fn();
    return { error: false };
  } catch (error) {
    return { error: true, value: error };
  }
};

const internalReject = (
  state: PromiseState,
  value: any,
  unwrap?: PromiseState
): void => {
  if (state.done) return;
  
  state.done = true;
  if (unwrap) state = unwrap;
  
  state.value = value;
  state.state = STATE_REJECTED;
  notifyReactions(state, true);
};

const internalResolve = (
  state: PromiseState,
  value: any,
  unwrap?: PromiseState
): void => {
  if (state.done) return;
  
  state.done = true;
  if (unwrap) state = unwrap;

  try {
    if ((state as any).facade === value) {
      throw new TypeError("Promise can't be resolved itself");
    }

    const thenable = getThenable(value);
    
    if (thenable) {
      microtask(() => {
        const wrapper: PromiseState = {
          type: PROMISE_TYPE,
          done: false,
          notified: false,
          parent: false,
          reactions: null as any,
          rejection: false,
          state: STATE_PENDING,
          value: undefined
        };

        try {
          (thenable as Function).call(
            value,
            (val: any) => internalResolve(wrapper, val, state),
            (reason: any) => internalReject(wrapper, reason, state)
          );
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = STATE_FULFILLED;
      notifyReactions(state, false);
    }
  } catch (error) {
    internalReject({ done: false } as PromiseState, error, state);
  }
};

const createResolveRejectCallbacks = (
  state: PromiseState,
  isReject: boolean
) => {
  return (value: any) => {
    if (isReject) {
      internalReject(state, value);
    } else {
      internalResolve(state, value);
    }
  };
};

export class CustomPromise<T = any> {
  constructor(executor: (resolve: (value: T) => void, reject: (reason: any) => void) => void) {
    const state: PromiseState<T> = {
      type: PROMISE_TYPE,
      done: false,
      notified: false,
      parent: false,
      reactions: new ReactionQueueImpl(),
      rejection: false,
      state: STATE_PENDING,
      value: undefined
    };

    internalStateSetter(this, state);
    (state as any).facade = this;

    try {
      executor(
        createResolveRejectCallbacks(state, false),
        createResolveRejectCallbacks(state, true)
      );
    } catch (error) {
      internalReject(state, error);
    }
  }

  then<TResult1 = T, TResult2 = never>(
    onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
  ): CustomPromise<TResult1 | TResult2> {
    const state = internalStateGetter(this);
    const capability = createPromiseCapability(CustomPromise);

    state.parent = true;

    const reaction: PromiseReaction = {
      ok: !isCallable(onFulfilled) || onFulfilled,
      fail: isCallable(onRejected) && onRejected,
      resolve: capability.resolve,
      reject: capability.reject,
      promise: capability.promise,
      domain: isNode ? (process as any).domain : undefined
    };

    if (state.state === STATE_PENDING) {
      state.reactions.add(reaction);
    } else {
      microtask(() => {
        executeReaction(reaction, state);
      });
    }

    return capability.promise as CustomPromise<TResult1 | TResult2>;
  }
}

class ReactionQueueImpl implements ReactionQueue {
  private queue: PromiseReaction[] = [];

  add(reaction: PromiseReaction): void {
    this.queue.push(reaction);
  }

  get(): PromiseReaction | undefined {
    return this.queue.shift();
  }
}

const createPromiseCapability = <T>(PromiseConstructor: any): PromiseCapability<T> => {
  const capability = {} as PromiseCapability<T>;

  capability.promise = new PromiseConstructor((resolve: any, reject: any) => {
    capability.resolve = resolve;
    capability.reject = reject;
  });

  return capability;
};