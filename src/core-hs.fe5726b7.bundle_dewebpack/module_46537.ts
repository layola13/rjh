interface PromiseInternalState {
  type: string;
  done: boolean;
  notified: boolean;
  parent: boolean;
  reactions: ReactionQueue;
  rejection: number | boolean;
  state: number;
  value: any;
}

interface PromiseReaction {
  ok: ((value: any) => any) | boolean;
  fail: ((reason: any) => any) | boolean;
  resolve: (value: any) => void;
  reject: (reason: any) => void;
  promise: any;
  domain?: Domain;
}

interface Domain {
  enter(): void;
  exit(): void;
}

interface ReactionQueue {
  add(reaction: PromiseReaction): void;
  get(): PromiseReaction | undefined;
}

interface PromiseEvent extends Event {
  promise: any;
  reason: any;
}

const PROMISE_TYPE = "Promise";
const UNHANDLED_REJECTION_EVENT = "unhandledrejection";
const REJECTION_HANDLED_EVENT = "rejectionhandled";

const REJECTION_STATE_NONE = 0;
const REJECTION_STATE_HANDLED = 1;
const REJECTION_STATE_UNHANDLED = 2;

const PROMISE_STATE_PENDING = 0;
const PROMISE_STATE_FULFILLED = 1;
const PROMISE_STATE_REJECTED = 2;

const isNode = typeof process !== 'undefined' && process.emit;
const hasDocumentAndDispatch = typeof document !== 'undefined' && document.createEvent && typeof dispatchEvent === 'function';
const supportsUnhandledRejectionEvent = true; // Placeholder for actual check

function isThenable(value: unknown): ((resolve: any, reject: any) => void) | false {
  if (!isObject(value)) return false;
  const then = (value as any).then;
  return isCallable(then) ? then : false;
}

function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null;
}

function isCallable(value: unknown): value is Function {
  return typeof value === 'function';
}

function performReaction(reaction: PromiseReaction, state: PromiseInternalState): void {
  if (state.notified) return;
  
  const resultValue = state.value;
  const isFulfilled = state.state === PROMISE_STATE_FULFILLED;
  const handler = isFulfilled ? reaction.ok : reaction.fail;
  const resolve = reaction.resolve;
  const reject = reaction.reject;
  const domain = reaction.domain;

  try {
    if (handler) {
      if (!isFulfilled) {
        if (state.rejection === REJECTION_STATE_UNHANDLED) {
          notifyRejectionHandled(state);
        }
        state.rejection = REJECTION_STATE_HANDLED;
      }

      let result: any;
      if (handler === true) {
        result = resultValue;
      } else {
        if (domain) domain.enter();
        result = (handler as Function)(resultValue);
        if (domain) {
          domain.exit();
        }
      }

      if (result === reaction.promise) {
        reject(new TypeError("Promise-chain cycle"));
      } else {
        const thenable = isThenable(result);
        if (thenable) {
          thenable.call(result, resolve, reject);
        } else {
          resolve(result);
        }
      }
    } else {
      reject(resultValue);
    }
  } catch (error) {
    if (domain && domain.exit) {
      domain.exit();
    }
    reject(error);
  }
}

function notifyReactionQueue(state: PromiseInternalState, shouldCheckUnhandled: boolean): void {
  if (state.notified) return;
  
  state.notified = true;
  
  microtask(() => {
    let reaction: PromiseReaction | undefined;
    while ((reaction = state.reactions.get())) {
      performReaction(reaction, state);
    }
    
    state.notified = false;
    
    if (shouldCheckUnhandled && !state.rejection) {
      scheduleUnhandledRejectionCheck(state);
    }
  });
}

function dispatchPromiseEvent(eventName: string, promise: any, reason: any): void {
  let event: PromiseEvent | { promise: any; reason: any };
  
  if (hasDocumentAndDispatch) {
    event = document.createEvent("Event") as PromiseEvent;
    event.promise = promise;
    event.reason = reason;
    event.initEvent(eventName, false, true);
    dispatchEvent(event);
  } else {
    event = { promise, reason };
  }

  if (!supportsUnhandledRejectionEvent) {
    const handler = (globalThis as any)["on" + eventName];
    if (handler) {
      handler(event);
    } else if (eventName === UNHANDLED_REJECTION_EVENT) {
      console.error("Unhandled promise rejection", reason);
    }
  }
}

function scheduleUnhandledRejectionCheck(state: PromiseInternalState): void {
  setTimeout(() => {
    const promiseFacade = state.facade;
    const rejectionValue = state.value;
    
    if (isUnhandledRejection(state)) {
      const result = tryCatch(() => {
        if (isNode) {
          process.emit("unhandledRejection", rejectionValue, promiseFacade);
        } else {
          dispatchPromiseEvent(UNHANDLED_REJECTION_EVENT, promiseFacade, rejectionValue);
        }
      });
      
      state.rejection = isNode || isUnhandledRejection(state) 
        ? REJECTION_STATE_UNHANDLED 
        : REJECTION_STATE_HANDLED;
      
      if (result.error) {
        throw result.value;
      }
    }
  }, 0);
}

function isUnhandledRejection(state: PromiseInternalState): boolean {
  return state.rejection !== REJECTION_STATE_HANDLED && !state.parent;
}

function notifyRejectionHandled(state: PromiseInternalState): void {
  setTimeout(() => {
    const promiseFacade = state.facade;
    if (isNode) {
      process.emit("rejectionHandled", promiseFacade);
    } else {
      dispatchPromiseEvent(REJECTION_HANDLED_EVENT, promiseFacade, state.value);
    }
  }, 0);
}

function createResolveFunction(state: PromiseInternalState): (value: any) => void {
  return (value: any) => internalResolve(state, value, undefined);
}

function createRejectFunction(state: PromiseInternalState): (reason: any) => void {
  return (reason: any) => internalReject(state, reason, undefined);
}

function internalReject(state: PromiseInternalState, reason: any, parentState?: PromiseInternalState): void {
  if (state.done) return;
  
  state.done = true;
  const targetState = parentState ?? state;
  
  targetState.value = reason;
  targetState.state = PROMISE_STATE_REJECTED;
  notifyReactionQueue(targetState, true);
}

function internalResolve(state: PromiseInternalState, value: any, parentState?: PromiseInternalState): void {
  if (state.done) return;
  
  state.done = true;
  const targetState = parentState ?? state;
  
  try {
    if (targetState.facade === value) {
      throw new TypeError("Promise can't be resolved itself");
    }
    
    const thenable = isThenable(value);
    if (thenable) {
      microtask(() => {
        const wrappedState = { done: false };
        try {
          thenable.call(
            value,
            createResolveFunction({ ...wrappedState, ...targetState } as PromiseInternalState),
            createRejectFunction({ ...wrappedState, ...targetState } as PromiseInternalState)
          );
        } catch (error) {
          internalReject({ ...wrappedState } as PromiseInternalState, error, targetState);
        }
      });
    } else {
      targetState.value = value;
      targetState.state = PROMISE_STATE_FULFILLED;
      notifyReactionQueue(targetState, false);
    }
  } catch (error) {
    internalReject({ done: false } as PromiseInternalState, error, targetState);
  }
}

function microtask(callback: () => void): void {
  queueMicrotask(callback);
}

function tryCatch(fn: () => void): { error: boolean; value?: any } {
  try {
    fn();
    return { error: false };
  } catch (error) {
    return { error: true, value: error };
  }
}

export class PromisePolyfill<T = any> {
  constructor(executor: (resolve: (value: T) => void, reject: (reason: any) => void) => void) {
    const state: PromiseInternalState = {
      type: PROMISE_TYPE,
      done: false,
      notified: false,
      parent: false,
      reactions: createReactionQueue(),
      rejection: false,
      state: PROMISE_STATE_PENDING,
      value: undefined
    };
    
    (this as any)[Symbol.for('[[PromiseState]]')] = state;
    state.facade = this;
    
    try {
      executor(createResolveFunction(state), createRejectFunction(state));
    } catch (error) {
      internalReject(state, error);
    }
  }

  then<TResult1 = T, TResult2 = never>(
    onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
  ): PromisePolyfill<TResult1 | TResult2> {
    const state = (this as any)[Symbol.for('[[PromiseState]]')] as PromiseInternalState;
    const newPromise = new PromisePolyfill<TResult1 | TResult2>(() => {});
    
    state.parent = true;
    
    const reaction: PromiseReaction = {
      ok: isCallable(onFulfilled) ? onFulfilled : true,
      fail: isCallable(onRejected) ? onRejected : false,
      resolve: createResolveFunction((newPromise as any)[Symbol.for('[[PromiseState]]')]),
      reject: createRejectFunction((newPromise as any)[Symbol.for('[[PromiseState]]')]),
      promise: newPromise,
      domain: isNode ? (process as any).domain : undefined
    };
    
    if (state.state === PROMISE_STATE_PENDING) {
      state.reactions.add(reaction);
    } else {
      microtask(() => performReaction(reaction, state));
    }
    
    return newPromise;
  }
}

function createReactionQueue(): ReactionQueue {
  const queue: PromiseReaction[] = [];
  return {
    add(reaction: PromiseReaction): void {
      queue.push(reaction);
    },
    get(): PromiseReaction | undefined {
      return queue.shift();
    }
  };
}