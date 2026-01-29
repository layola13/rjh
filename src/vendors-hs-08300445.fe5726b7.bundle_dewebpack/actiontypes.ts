import isPlainObject from './isPlainObject';
import $$observable from './observable';

export const ActionTypes = {
  INIT: "@@redux/INIT"
} as const;

type Reducer<S = any, A = any> = (state: S, action: A) => S;

type Listener = () => void;

type Unsubscribe = () => void;

interface Action {
  type: string;
  [key: string]: any;
}

interface Observer<T> {
  next?(value: T): void;
}

interface Observable<T> {
  subscribe(observer: Observer<T>): { unsubscribe: Unsubscribe };
  [Symbol.observable](): Observable<T>;
}

interface Store<S = any, A extends Action = Action> {
  dispatch(action: A): A;
  subscribe(listener: Listener): Unsubscribe;
  getState(): S;
  replaceReducer(nextReducer: Reducer<S, A>): void;
  [Symbol.observable](): Observable<S>;
}

type StoreEnhancer<S = any, A extends Action = Action> = (
  createStore: StoreCreator
) => (reducer: Reducer<S, A>, preloadedState?: S) => Store<S, A>;

type StoreCreator = <S = any, A extends Action = Action>(
  reducer: Reducer<S, A>,
  preloadedState?: S
) => Store<S, A>;

export default function createStore<S = any, A extends Action = Action>(
  reducer: Reducer<S, A>,
  preloadedState?: S | StoreEnhancer<S, A>,
  enhancer?: StoreEnhancer<S, A>
): Store<S, A> {
  if (typeof preloadedState === "function" && enhancer === undefined) {
    enhancer = preloadedState as StoreEnhancer<S, A>;
    preloadedState = undefined;
  }

  if (enhancer !== undefined) {
    if (typeof enhancer !== "function") {
      throw new Error("Expected the enhancer to be a function.");
    }
    return enhancer(createStore)(reducer, preloadedState as S);
  }

  if (typeof reducer !== "function") {
    throw new Error("Expected the reducer to be a function.");
  }

  let currentReducer = reducer;
  let currentState = preloadedState as S;
  let currentListeners: Listener[] = [];
  let nextListeners = currentListeners;
  let isDispatching = false;

  function ensureCanMutateNextListeners(): void {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  function getState(): S {
    return currentState;
  }

  function subscribe(listener: Listener): Unsubscribe {
    if (typeof listener !== "function") {
      throw new Error("Expected listener to be a function.");
    }

    let isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe(): void {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      const index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  function dispatch(action: A): A {
    if (!isPlainObject(action)) {
      throw new Error(
        "Actions must be plain objects. Use custom middleware for async actions."
      );
    }

    if (action.type === undefined) {
      throw new Error(
        'Actions may not have an undefined "type" property. Have you misspelled a constant?'
      );
    }

    if (isDispatching) {
      throw new Error("Reducers may not dispatch actions.");
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
    if (typeof nextReducer !== "function") {
      throw new Error("Expected the nextReducer to be a function.");
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT } as A);
  }

  function observable(): Observable<S> {
    const outerSubscribe = subscribe;

    const observableObject: Observable<S> = {
      subscribe(observer: Observer<S>): { unsubscribe: Unsubscribe } {
        if (typeof observer !== "object" || observer === null) {
          throw new TypeError("Expected the observer to be an object.");
        }

        function observeState(): void {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();

        return {
          unsubscribe: outerSubscribe(observeState)
        };
      },

      [Symbol.observable](): Observable<S> {
        return this;
      }
    };

    return observableObject;
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