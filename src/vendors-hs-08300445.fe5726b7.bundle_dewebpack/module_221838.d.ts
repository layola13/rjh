/**
 * Redux Store Management Types
 * Core type definitions for Redux state management library
 */

/**
 * Base action interface that all actions must extend
 */
export interface Action<T = any> {
  type: T;
}

/**
 * Action with additional payload data
 */
export interface AnyAction extends Action {
  [extraProps: string]: any;
}

/**
 * Reducer function type that processes state updates
 * @template S - State type
 * @template A - Action type
 */
export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S;

/**
 * Store state type
 */
export type State = any;

/**
 * Action creator function type
 */
export type ActionCreator<A = any> = (...args: any[]) => A;

/**
 * Map of action creators
 */
export type ActionCreatorsMapObject<A = any> = {
  [key: string]: ActionCreator<A>;
};

/**
 * Dispatch function type for dispatching actions
 * @template A - Action type
 */
export type Dispatch<A extends Action = AnyAction> = (action: A) => A;

/**
 * Unsubscribe function returned by store.subscribe()
 */
export type Unsubscribe = () => void;

/**
 * Store observer for Observable pattern
 */
export interface Observer<T> {
  next?(value: T): void;
}

/**
 * Observable interface for reactive programming
 */
export interface Observable<T> {
  subscribe(observer: Observer<T>): { unsubscribe: Unsubscribe };
  [Symbol.observable](): Observable<T>;
}

/**
 * Redux store interface
 * @template S - State type
 * @template A - Action type
 */
export interface Store<S = any, A extends Action = AnyAction> {
  /** Dispatches an action to update state */
  dispatch: Dispatch<A>;
  
  /** Returns the current state */
  getState(): S;
  
  /** Subscribes to state changes */
  subscribe(listener: () => void): Unsubscribe;
  
  /** Replaces the current reducer */
  replaceReducer(nextReducer: Reducer<S, A>): void;
  
  /** Returns an observable of the store */
  [Symbol.observable](): Observable<S>;
}

/**
 * Store enhancer function type
 * @template S - State type
 * @template A - Action type
 */
export type StoreEnhancer<Ext = {}, StateExt = never> = (
  next: StoreEnhancerStoreCreator
) => StoreEnhancerStoreCreator<Ext, StateExt>;

/**
 * Store creator with enhancements
 */
export type StoreEnhancerStoreCreator<Ext = {}, StateExt = never> = <
  S = any,
  A extends Action = AnyAction
>(
  reducer: Reducer<S, A>,
  preloadedState?: S | undefined
) => Store<S & StateExt, A> & Ext;

/**
 * Middleware API provided to middleware functions
 * @template S - State type
 * @template D - Dispatch type
 */
export interface MiddlewareAPI<D extends Dispatch = Dispatch, S = any> {
  /** Gets the current state */
  getState(): S;
  
  /** Dispatches an action */
  dispatch: D;
}

/**
 * Middleware function type
 * @template D - Dispatch type
 * @template S - State type
 * @template A - Action type
 */
export type Middleware<
  D extends Dispatch = Dispatch,
  S = any,
  A extends Action = AnyAction
> = (api: MiddlewareAPI<D, S>) => (next: Dispatch<A>) => (action: A) => any;

/**
 * Reducers map object for combineReducers
 */
export type ReducersMapObject<S = any, A extends Action = AnyAction> = {
  [K in keyof S]: Reducer<S[K], A>;
};

/**
 * Internal Redux action types (DO NOT USE in application code)
 */
export const __DO_NOT_USE__ActionTypes: {
  readonly INIT: string;
  readonly REPLACE: string;
  readonly PROBE_UNKNOWN_ACTION: () => string;
};

/**
 * Creates a Redux store
 * @template S - State type
 * @template A - Action type
 * @param reducer - Root reducer function
 * @param preloadedState - Initial state (optional)
 * @param enhancer - Store enhancer (optional)
 * @returns Redux store instance
 */
export function createStore<S, A extends Action>(
  reducer: Reducer<S, A>,
  preloadedState?: S,
  enhancer?: StoreEnhancer
): Store<S, A>;

export function createStore<S, A extends Action>(
  reducer: Reducer<S, A>,
  enhancer?: StoreEnhancer
): Store<S, A>;

/**
 * Legacy alias for createStore (deprecated)
 * @deprecated Use createStore instead
 */
export const legacy_createStore: typeof createStore;

/**
 * Combines multiple reducers into a single reducer function
 * @template S - Combined state type
 * @param reducers - Map of reducer functions
 * @returns Combined reducer function
 */
export function combineReducers<S>(
  reducers: ReducersMapObject<S, any>
): Reducer<S>;

export function combineReducers<S, A extends Action = AnyAction>(
  reducers: ReducersMapObject<S, A>
): Reducer<S, A>;

/**
 * Binds action creators to dispatch function
 * @param actionCreators - Action creator function or map of action creators
 * @param dispatch - Dispatch function
 * @returns Bound action creators
 */
export function bindActionCreators<A, C extends ActionCreator<A>>(
  actionCreator: C,
  dispatch: Dispatch
): C;

export function bindActionCreators<
  A extends ActionCreator<any>,
  B extends ActionCreator<any>
>(actionCreator: A, dispatch: Dispatch): B;

export function bindActionCreators<
  A,
  M extends ActionCreatorsMapObject<A>
>(actionCreators: M, dispatch: Dispatch): M;

export function bindActionCreators<
  M extends ActionCreatorsMapObject,
  N extends ActionCreatorsMapObject
>(actionCreators: M, dispatch: Dispatch): N;

/**
 * Applies middleware to the store
 * @param middlewares - Middleware functions to apply
 * @returns Store enhancer
 */
export function applyMiddleware<Ext, S = any>(
  ...middlewares: Middleware<any, S, any>[]
): StoreEnhancer<{ dispatch: Ext }>;

/**
 * Composes multiple functions from right to left
 * @param funcs - Functions to compose
 * @returns Composed function
 */
export function compose(): <R>(a: R) => R;

export function compose<F extends Function>(f: F): F;

export function compose<A, R>(
  f1: (b: A) => R,
  f2: (...args: any[]) => A
): (...args: any[]) => R;

export function compose<A, B, R>(
  f1: (b: B) => R,
  f2: (a: A) => B,
  f3: (...args: any[]) => A
): (...args: any[]) => R;

export function compose<R>(
  f1: (a: any) => R,
  ...funcs: Function[]
): (...args: any[]) => R;

export function compose<R>(...funcs: Function[]): (...args: any[]) => R;