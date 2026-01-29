/**
 * Redux action types used internally by the store
 */
export const __DO_NOT_USE__ActionTypes = {
  INIT: `@@redux/INIT${randomString()}`,
  REPLACE: `@@redux/REPLACE${randomString()}`,
  PROBE_UNKNOWN_ACTION: (): string => `@@redux/PROBE_UNKNOWN_ACTION${randomString()}`
} as const;

/**
 * Action interface
 */
interface Action<T = string> {
  type: T;
  [key: string]: unknown;
}

/**
 * Reducer function type
 */
type Reducer<S = any, A extends Action = Action> = (state: S | undefined, action: A) => S;

/**
 * Store interface
 */
interface Store<S = any, A extends Action = Action> {
  dispatch: Dispatch<A>;
  subscribe: (listener: () => void) => Unsubscribe;
  getState: () => S;
  replaceReducer: (nextReducer: Reducer<S, A>) => void;
  [Symbol.observable]?: () => Observable<S>;
}

/**
 * Dispatch function type
 */
type Dispatch<A extends Action = Action> = (action: A) => A;

/**
 * Unsubscribe function type
 */
type Unsubscribe = () => void;

/**
 * Middleware type
 */
interface Middleware<S = any, A extends Action = Action> {
  (api: MiddlewareAPI<S, A>): (next: Dispatch<A>) => (action: A) => A;
}

/**
 * Middleware API
 */
interface MiddlewareAPI<S = any, A extends Action = Action> {
  getState: () => S;
  dispatch: Dispatch<A>;
}

/**
 * Store enhancer type
 */
type StoreEnhancer<S = any, A extends Action = Action> = (
  next: StoreCreator<S, A>
) => StoreCreator<S, A>;

/**
 * Store creator type
 */
type StoreCreator<S = any, A extends Action = Action> = (
  reducer: Reducer<S, A>,
  preloadedState?: S
) => Store<S, A>;

/**
 * Observable interface
 */
interface Observable<T> {
  subscribe: (observer: Observer<T>) => { unsubscribe: Unsubscribe };
  [Symbol.observable]: () => Observable<T>;
}

/**
 * Observer interface
 */
interface Observer<T> {
  next?: (value: T) => void;
}

/**
 * Action creators map
 */
interface ActionCreatorsMapObject {
  [key: string]: (...args: any[]) => Action;
}

/**
 * Reducers map object
 */
interface ReducersMapObject<S = any, A extends Action = Action> {
  [K in keyof S]: Reducer<S[K], A>;
}

const SYMBOL_OBSERVABLE = (typeof Symbol === 'function' && Symbol.observable) || '@@observable';

/**
 * Generate a random string for action types
 */
function randomString(): string {
  return Math.random().toString(36).substring(7).split('').join('.');
}

/**
 * Format error message
 */
function formatErrorMessage(errorCode: number): string {
  return `Minified Redux error #${errorCode}; visit https://redux.js.org/Errors?code=${errorCode} for the full message or use the non-minified dev environment for full errors. `;
}

/**
 * Check if value is a plain object
 */
function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  
  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  
  return Object.getPrototypeOf(value) === proto;
}

/**
 * Create a Redux store
 */
export function createStore<S = any, A extends Action = Action>(
  reducer: Reducer<S, A>,
  preloadedState?: S | StoreEnhancer<S, A>,
  enhancer?: StoreEnhancer<S, A>
): Store<S, A> {
  if (typeof preloadedState === 'function' && typeof enhancer === 'function') {
    throw new Error(formatErrorMessage(0));
  }
  
  if (typeof preloadedState === 'function' && enhancer === undefined) {
    enhancer = preloadedState as StoreEnhancer<S, A>;
    preloadedState = undefined;
  }
  
  if (enhancer !== undefined) {
    if (typeof enhancer !== 'function') {
      throw new Error(formatErrorMessage(1));
    }
    return enhancer(createStore)(reducer, preloadedState as S);
  }
  
  if (typeof reducer !== 'function') {
    throw new Error(formatErrorMessage(2));
  }
  
  let currentReducer = reducer;
  let currentState = preloadedState as S;
  let currentListeners: Array<() => void> = [];
  let nextListeners = currentListeners;
  let isDispatching = false;
  
  function ensureCanMutateNextListeners(): void {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  
  function getState(): S {
    if (isDispatching) {
      throw new Error(formatErrorMessage(3));
    }
    return currentState;
  }
  
  function subscribe(listener: () => void): Unsubscribe {
    if (typeof listener !== 'function') {
      throw new Error(formatErrorMessage(4));
    }
    
    if (isDispatching) {
      throw new Error(formatErrorMessage(5));
    }
    
    let isSubscribed = true;
    
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    
    return function unsubscribe(): void {
      if (!isSubscribed) {
        return;
      }
      
      if (isDispatching) {
        throw new Error(formatErrorMessage(6));
      }
      
      isSubscribed = false;
      ensureCanMutateNextListeners();
      const index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = [];
    };
  }
  
  function dispatch(action: A): A {
    if (!isPlainObject(action)) {
      throw new Error(formatErrorMessage(7));
    }
    
    if (action.type === undefined) {
      throw new Error(formatErrorMessage(8));
    }
    
    if (isDispatching) {
      throw new Error(formatErrorMessage(9));
    }
    
    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }
    
    const listeners = (currentListeners = nextListeners);
    for (let i = 0; i < listeners.length; i++) {
      listeners[i]();
    }
    
    return action;
  }
  
  function replaceReducer(nextReducer: Reducer<S, A>): void {
    if (typeof nextReducer !== 'function') {
      throw new Error(formatErrorMessage(10));
    }
    
    currentReducer = nextReducer;
    dispatch({ type: __DO_NOT_USE__ActionTypes.REPLACE } as A);
  }
  
  function observable(): Observable<S> {
    const outerSubscribe = subscribe;
    
    return {
      subscribe(observer: Observer<S>): { unsubscribe: Unsubscribe } {
        if (typeof observer !== 'object' || observer === null) {
          throw new Error(formatErrorMessage(11));
        }
        
        function observeState(): void {
          if (observer.next) {
            observer.next(getState());
          }
        }
        
        observeState();
        return { unsubscribe: outerSubscribe(observeState) };
      },
      [Symbol.observable](): Observable<S> {
        return this;
      }
    };
  }
  
  dispatch({ type: __DO_NOT_USE__ActionTypes.INIT } as A);
  
  const store: Store<S, A> = {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [SYMBOL_OBSERVABLE]: observable
  };
  
  return store;
}

export const legacy_createStore = createStore;

/**
 * Bind action creator to dispatch
 */
function bindActionCreator<A extends Action>(
  actionCreator: (...args: any[]) => A,
  dispatch: Dispatch<A>
): (...args: any[]) => A {
  return function (this: any): A {
    return dispatch(actionCreator.apply(this, arguments as any));
  };
}

/**
 * Bind action creators to dispatch
 */
export function bindActionCreators<A extends Action, M extends ActionCreatorsMapObject>(
  actionCreators: M,
  dispatch: Dispatch<A>
): M;
export function bindActionCreators<A extends Action>(
  actionCreators: (...args: any[]) => A,
  dispatch: Dispatch<A>
): (...args: any[]) => A;
export function bindActionCreators<A extends Action>(
  actionCreators: any,
  dispatch: Dispatch<A>
): any {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }
  
  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error(formatErrorMessage(16));
  }
  
  const boundActionCreators: ActionCreatorsMapObject = {};
  
  for (const key in actionCreators) {
    const actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  
  return boundActionCreators;
}

/**
 * Combine multiple reducers into one
 */
export function combineReducers<S>(reducers: ReducersMapObject<S>): Reducer<S> {
  const reducerKeys = Object.keys(reducers);
  const finalReducers: ReducersMapObject<S> = {} as ReducersMapObject<S>;
  
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i];
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  
  const finalReducerKeys = Object.keys(finalReducers);
  
  let shapeAssertionError: Error | undefined;
  
  try {
    assertReducerShape(finalReducers);
  } catch (error) {
    shapeAssertionError = error as Error;
  }
  
  return function combination(state: S = {} as S, action: Action): S {
    if (shapeAssertionError) {
      throw shapeAssertionError;
    }
    
    let hasChanged = false;
    const nextState: any = {};
    
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i];
      const reducer = finalReducers[key as keyof S];
      const previousStateForKey = state[key as keyof S];
      const nextStateForKey = reducer(previousStateForKey, action);
      
      if (nextStateForKey === undefined) {
        throw new Error(formatErrorMessage(14));
      }
      
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    
    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    
    return hasChanged ? nextState : state;
  };
}

/**
 * Assert reducer shape is valid
 */
function assertReducerShape(reducers: ReducersMapObject): void {
  Object.keys(reducers).forEach((key) => {
    const reducer = reducers[key];
    const initialState = reducer(undefined, { type: __DO_NOT_USE__ActionTypes.INIT });
    
    if (initialState === undefined) {
      throw new Error(formatErrorMessage(12));
    }
    
    const probeState = reducer(undefined, {
      type: __DO_NOT_USE__ActionTypes.PROBE_UNKNOWN_ACTION()
    });
    
    if (probeState === undefined) {
      throw new Error(formatErrorMessage(13));
    }
  });
}

/**
 * Compose functions from right to left
 */
export function compose<R>(...funcs: Array<(arg: R) => R>): (arg: R) => R;
export function compose<T, R>(...funcs: Array<(arg: T) => R>): (arg: T) => R;
export function compose(...funcs: Array<Function>): Function {
  if (funcs.length === 0) {
    return <T>(arg: T): T => arg;
  }
  
  if (funcs.length === 1) {
    return funcs[0];
  }
  
  return funcs.reduce((accumulated, current) => {
    return function (this: any): any {
      return accumulated(current.apply(this, arguments as any));
    };
  });
}

/**
 * Apply middleware to store
 */
export function applyMiddleware<S = any, A extends Action = Action>(
  ...middlewares: Array<Middleware<S, A>>
): StoreEnhancer<S, A> {
  return (createStore: StoreCreator<S, A>) => {
    return (reducer: Reducer<S, A>, preloadedState?: S): Store<S, A> => {
      const store = createStore(reducer, preloadedState);
      
      let dispatch: Dispatch<A> = (): A => {
        throw new Error(formatErrorMessage(15));
      };
      
      const middlewareAPI: MiddlewareAPI<S, A> = {
        getState: store.getState,
        dispatch: (action: A): A => dispatch(action)
      };
      
      const chain = middlewares.map((middleware) => middleware(middlewareAPI));
      dispatch = compose<Dispatch<A>>(...chain)(store.dispatch);
      
      return {
        ...store,
        dispatch
      };
    };
  };
}