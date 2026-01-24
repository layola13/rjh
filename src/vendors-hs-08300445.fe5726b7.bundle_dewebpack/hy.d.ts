/**
 * Redux core type definitions
 * Provides type-safe state management utilities including store creation, reducer combination, and action dispatching
 */

/**
 * Base action interface that all actions must extend
 */
export interface Action<T = string> {
  type: T;
}

/**
 * An Action with a string type and additional payload
 */
export interface AnyAction extends Action {
  [extraProps: string]: unknown;
}

/**
 * State type - can be any value
 */
export type State = unknown;

/**
 * Reducer function type
 * @template S - State type
 * @template A - Action type
 */
export type Reducer<S = State, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S;

/**
 * Map of reducer functions keyed by state slice name
 */
export interface ReducersMapObject<S = State, A extends Action = AnyAction> {
  [K in keyof S]: Reducer<S[K], A>;
}

/**
 * Listener function called when state changes
 */
export type Listener = () => void;

/**
 * Function to unsubscribe a listener
 */
export type Unsubscribe = () => void;

/**
 * Observer pattern subscription interface
 */
export interface Observer<T> {
  next?(value: T): void;
}

/**
 * Observable interface for reactive state subscriptions
 */
export interface Observable<T> {
  subscribe(observer: Observer<T>): { unsubscribe: Unsubscribe };
  [Symbol.observable](): Observable<T>;
}

/**
 * Redux store interface providing state management capabilities
 * @template S - State type
 * @template A - Action type
 */
export interface Store<S = State, A extends Action = AnyAction> {
  /**
   * Dispatches an action to trigger state changes
   * @param action - The action to dispatch
   * @returns The dispatched action
   */
  dispatch(action: A): A;

  /**
   * Returns the current state tree
   * @returns The current state
   */
  getState(): S;

  /**
   * Subscribes a listener to state changes
   * @param listener - Callback invoked on state changes
   * @returns Function to unsubscribe the listener
   */
  subscribe(listener: Listener): Unsubscribe;

  /**
   * Replaces the current reducer with a new one
   * @param nextReducer - The new reducer function
   */
  replaceReducer(nextReducer: Reducer<S, A>): void;

  /**
   * Observable interface for reactive subscriptions
   */
  [Symbol.observable](): Observable<S>;
}

/**
 * Store enhancer function type
 * Enhances store with additional capabilities (e.g., middleware, dev tools)
 */
export type StoreEnhancer<Ext = {}, StateExt = never> = (
  next: StoreEnhancerStoreCreator<Ext, StateExt>
) => StoreEnhancerStoreCreator<Ext, StateExt>;

/**
 * Enhanced store creator function
 */
export type StoreEnhancerStoreCreator<Ext = {}, StateExt = never> = <
  S = State,
  A extends Action = AnyAction
>(
  reducer: Reducer<S, A>,
  preloadedState?: S | StateExt
) => Store<S, A> & Ext;

/**
 * Action creator function type
 */
export type ActionCreator<A> = (...args: unknown[]) => A;

/**
 * Map of action creators
 */
export interface ActionCreatorsMapObject<A = unknown> {
  [key: string]: ActionCreator<A>;
}

/**
 * Dispatch function type
 */
export type Dispatch<A extends Action = AnyAction> = (action: A) => A;

/**
 * Combines multiple reducer functions into a single reducer
 * Each reducer manages its own slice of the state tree
 * 
 * @template S - Combined state type
 * @template A - Action type
 * @param reducers - Map of reducers keyed by state slice name
 * @returns A single combined reducer function
 * 
 * @example
 *