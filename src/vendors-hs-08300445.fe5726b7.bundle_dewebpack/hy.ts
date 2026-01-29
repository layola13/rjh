type Reducer<S = any, A extends Action = Action> = (state: S | undefined, action: A) => S;

type ReducersMapObject<S = any, A extends Action = Action> = {
  [K in keyof S]: Reducer<S[K], A>;
};

interface Action {
  type: string;
  [key: string]: any;
}

interface Store<S = any, A extends Action = Action> {
  dispatch: Dispatch<A>;
  subscribe: (listener: () => void) => Unsubscribe;
  getState: () => S;
  replaceReducer: (nextReducer: Reducer<S, A>) => void;
  [Symbol.observable]: () => Observable<S>;
}

type Dispatch<A extends Action = Action> = (action: A) => A;

type Unsubscribe = () => void;

interface Observer<T> {
  next?: (value: T) => void;
}

interface Observable<T> {
  subscribe: (observer: Observer<T>) => { unsubscribe: Unsubscribe };
  [Symbol.observable]: () => Observable<T>;
}

type StoreEnhancer<Ext = {}, StateExt = never> = (
  createStore: StoreCreator
) => StoreCreatorWithEnhancer<Ext, StateExt>;

type StoreCreator = <S = any, A extends Action = Action>(
  reducer: Reducer<S, A>,
  preloadedState?: S
) => Store<S, A>;

type StoreCreatorWithEnhancer<Ext = {}, StateExt = never> = <S = any, A extends Action = Action>(
  reducer: Reducer<S, A>,
  preloadedState?: S
) => Store<S & StateExt, A> & Ext;

const INIT_ACTION_TYPE = '@@redux/INIT';
const REPLACE_ACTION_TYPE = '@@redux/REPLACE';
const PROBE_UNKNOWN_ACTION_TYPE = '@@redux/PROBE_UNKNOWN_ACTION';

function randomString(): string {
  return Math.random().toString(36).substring(7).split('').join('.');
}

const ActionTypes = {
  INIT: `${INIT_ACTION_TYPE}${randomString()}`,
  REPLACE: `${REPLACE_ACTION_TYPE}${randomString()}`,
  PROBE_UNKNOWN_ACTION: (): string => `${PROBE_UNKNOWN_ACTION_TYPE}${randomString()}`
};

function isPlainObject(obj: any): obj is object {
  if (typeof obj !== 'object' || obj === null) return false;
  
  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  
  return Object.getPrototypeOf(obj) === proto;
}

function getUndefinedStateErrorMessage(key: string, action: Action): string {
  const actionType = action?.type;
  const actionDescription = actionType ? `action "${String(actionType)}"` : 'an action';
  
  return `Given ${actionDescription}, reducer "${key}" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.`;
}

function assertReducerShape<S>(reducers: ReducersMapObject<S>): void {
  Object.keys(reducers).forEach((key) => {
    const reducer = reducers[key];
    const initialState = reducer(undefined, { type: ActionTypes.INIT });
    
    if (initialState === undefined) {
      throw new Error(
        `Reducer "${key}" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.`
      );
    }
    
    const probeState = reducer(undefined, { type: ActionTypes.PROBE_UNKNOWN_ACTION() });
    
    if (probeState === undefined) {
      throw new Error(
        `Reducer "${key}" returned undefined when probed with a random type. Don't try to handle ${ActionTypes.INIT} or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.`
      );
    }
  });
}

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
  
  return function combination(state: S | undefined = {} as S, action: Action): S {
    if (shapeAssertionError) {
      throw shapeAssertionError;
    }
    
    let hasChanged = false;
    const nextState: Partial<S> = {};
    
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i];
      const reducer = finalReducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);
      
      if (nextStateForKey === undefined) {
        const errorMessage = getUndefinedStateErrorMessage(key, action);
        throw new Error(errorMessage);
      }
      
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    
    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    
    return hasChanged ? (nextState as S) : state;
  };
}

export function createStore<S, A extends Action>(
  reducer: Reducer<S, A>,
  preloadedState?: S | StoreEnhancer,
  enhancer?: StoreEnhancer
): Store<S, A> {
  if (
    (typeof preloadedState === 'function' && typeof enhancer === 'function') ||
    (typeof enhancer === 'function' && typeof arguments[3] === 'function')
  ) {
    throw new Error(
      'It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function.'
    );
  }
  
  if (typeof preloadedState === 'function' && enhancer === undefined) {
    enhancer = preloadedState as StoreEnhancer;
    preloadedState = undefined;
  }
  
  if (enhancer !== undefined) {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }
    
    return enhancer(createStore)(reducer, preloadedState as S);
  }
  
  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
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
      throw new Error(
        'You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.'
      );
    }
    
    return currentState;
  }
  
  function subscribe(listener: () => void): Unsubscribe {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }
    
    if (isDispatching) {
      throw new Error(
        'You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api-reference/store#subscribelistener for more details.'
      );
    }
    
    let isSubscribed = true;
    
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    
    return function unsubscribe(): void {
      if (!isSubscribed) {
        return;
      }
      
      if (isDispatching) {
        throw new Error(
          'You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api-reference/store#subscribelistener for more details.'
        );
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
      throw new Error('Actions must be plain objects. Use custom middleware for async actions.');
    }
    
    if (action.type === undefined) {
      throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');
    }
    
    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
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
      throw new Error('Expected the nextReducer to be a function.');
    }
    
    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.REPLACE } as A);
  }
  
  function observable(): Observable<S> {
    const outerSubscribe = subscribe;
    
    return {
      subscribe(observer: Observer<S>): { unsubscribe: Unsubscribe } {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.');
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
  
  dispatch({ type: ActionTypes.INIT } as A);
  
  const store: Store<S, A> = {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [Symbol.observable]: observable
  };
  
  return store;
}

export function compose<R>(...funcs: Array<(...args: any[]) => any>): (...args: any[]) => R {
  if (funcs.length === 0) {
    return <T>(arg: T): T => arg as any;
  }
  
  if (funcs.length === 1) {
    return funcs[0];
  }
  
  return funcs.reduce((a, b) => (...args: any[]) => a(b(...args)));
}