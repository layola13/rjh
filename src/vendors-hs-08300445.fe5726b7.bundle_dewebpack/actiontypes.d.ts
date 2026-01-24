/**
 * Redux ActionTypes constants for internal store initialization
 */
export const ActionTypes: {
  /** Internal action type dispatched when the store is initialized */
  readonly INIT: '@@redux/INIT';
};

/**
 * Base action interface that all Redux actions must extend
 */
export interface Action<T = string> {
  /** Action type identifier */
  type: T;
}

/**
 * Action with additional payload and metadata
 */
export interface AnyAction extends Action {
  [extraProps: string]: unknown;
}

/**
 * Reducer function that computes the next state based on the current state and action
 * @template S - State type
 * @template A - Action type
 */
export type Reducer<S = unknown, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S;

/**
 * Listener callback invoked whenever an action is dispatched
 */
export type Listener = () => void;

/**
 * Function to unsubscribe a listener from the store
 */
export type Unsubscribe = () => void;

/**
 * Dispatch function to send actions to the store
 * @template A - Action type
 */
export interface Dispatch<A extends Action = AnyAction> {
  <T extends A>(action: T): T;
}

/**
 * Store enhancer that wraps createStore to add additional capabilities
 * @template S - State type
 */
export type StoreEnhancer<S = unknown> = (
  createStore: StoreCreator
) => StoreCreator<S>;

/**
 * Store creator function signature
 */
export interface StoreCreator {
  <S, A extends Action>(
    reducer: Reducer<S, A>,
    preloadedState?: S,
    enhancer?: StoreEnhancer<S>
  ): Store<S, A>;
}

/**
 * Observer pattern interface for subscribing to store changes
 */
export interface Observer<T> {
  /** Called when the observed value changes */
  next?(value: T): void;
  /** Called when an error occurs */
  error?(error: unknown): void;
  /** Called when observation is complete */
  complete?(): void;
}

/**
 * Observable interface compatible with the TC39 Observable proposal
 * @template T - Value type emitted by the observable
 */
export interface Observable<T> {
  /**
   * Subscribe to state changes with an observer
   * @param observer - Observer object with next/error/complete callbacks
   * @returns Subscription object with unsubscribe method
   */
  subscribe(observer: Observer<T>): { unsubscribe: Unsubscribe };
  
  /** Symbol.observable implementation for interoperability */
  [Symbol.observable](): Observable<T>;
}

/**
 * Redux store interface providing access to state and dispatch functionality
 * @template S - State type
 * @template A - Action type
 */
export interface Store<S = unknown, A extends Action = AnyAction> {
  /**
   * Dispatch an action to trigger state changes
   * @param action - Action object with type property
   * @returns The dispatched action
   */
  dispatch: Dispatch<A>;

  /**
   * Get the current state snapshot
   * @returns Current state
   */
  getState(): S;

  /**
   * Subscribe a listener to be invoked on every dispatch
   * @param listener - Callback function invoked after each action
   * @returns Unsubscribe function to remove the listener
   */
  subscribe(listener: Listener): Unsubscribe;

  /**
   * Replace the current reducer with a new one
   * Useful for code splitting and hot reloading
   * @param nextReducer - New reducer function
   */
  replaceReducer(nextReducer: Reducer<S, A>): void;

  /**
   * Interoperability point for observable/reactive libraries
   * @returns Observable of state changes
   */
  [Symbol.observable](): Observable<S>;
}

/**
 * Create a Redux store that holds the complete state tree
 * 
 * The only way to change data in the store is by dispatching actions.
 * There should only be a single store in your app.
 * 
 * @template S - State type
 * @template A - Action type
 * @param reducer - Pure function that returns the next state tree given current state and action
 * @param preloadedState - Initial state (optional). Can be omitted if second argument is enhancer
 * @param enhancer - Store enhancer to add third-party capabilities like middleware, time travel, persistence
 * @returns Redux store with dispatch, getState, subscribe, and replaceReducer methods
 * 
 * @example
 *