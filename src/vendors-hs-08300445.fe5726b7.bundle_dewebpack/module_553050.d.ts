/**
 * Redux Core Library Type Definitions
 * 
 * This module exports the main Redux API functions for state management.
 * Redux is a predictable state container for JavaScript applications.
 */

/**
 * Creates a Redux store that holds the complete state tree of your app.
 * There should only be a single store in your app.
 * 
 * @template S - The type of state held in this store
 * @template A - The type of actions which may be dispatched
 * @template Ext - Store extension (middleware, enhancers)
 * @template StateExt - State extension
 * 
 * @param reducer - A reducing function that returns the next state tree, given the current state tree and an action to handle
 * @param preloadedState - The initial state
 * @param enhancer - The store enhancer
 * @returns A Redux store that lets you read the state, dispatch actions and subscribe to changes
 */
export function createStore<S, A extends Action, Ext = {}, StateExt = never>(
  reducer: Reducer<S, A>,
  preloadedState?: PreloadedState<S> | StoreEnhancer<Ext, StateExt>,
  enhancer?: StoreEnhancer<Ext, StateExt>
): Store<S, A, StateExt> & Ext;

/**
 * Turns an object whose values are different reducer functions into a single
 * reducer function. The resulting reducer calls every child reducer and gathers
 * their results into a single state object.
 * 
 * @template S - The combined state object type
 * @param reducers - An object whose values are reducer functions
 * @returns A reducer that invokes every reducer inside the reducers object and constructs a state object with the same shape
 */
export function combineReducers<S>(
  reducers: ReducersMapObject<S, any>
): Reducer<CombinedState<S>>;

/**
 * Turns an object whose values are action creators into an object with the same
 * keys but with every action creator wrapped into a dispatch call so they may be
 * invoked directly.
 * 
 * @template A - Action creators map type
 * @param actionCreators - An object whose values are action creator functions
 * @param dispatch - The dispatch function available on the Redux store
 * @returns An object mimicking the original object but with each function immediately dispatching the action
 */
export function bindActionCreators<A, C extends ActionCreatorsMapObject<A>>(
  actionCreators: C,
  dispatch: Dispatch
): C;

export function bindActionCreators<
  A extends ActionCreator<any>,
  B extends ActionCreator<any>
>(actionCreator: A, dispatch: Dispatch): B;

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. Middleware is useful for logging actions, performing
 * side effects like routing, or turning an asynchronous API call into a series
 * of synchronous actions.
 * 
 * @param middlewares - The middleware chain to be applied
 * @returns A store enhancer applying the middleware
 */
export function applyMiddleware<Ext, S = any>(
  ...middlewares: Middleware<any, S, any>[]
): StoreEnhancer<{ dispatch: Ext }>;

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 * 
 * @param funcs - The functions to compose
 * @returns A function obtained by composing the argument functions from right to left
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

/**
 * Base action interface. All actions must have a type property.
 */
export interface Action<T = any> {
  type: T;
}

/**
 * Action creator function type.
 */
export interface ActionCreator<A> {
  (...args: any[]): A;
}

/**
 * Map of action creators.
 */
export interface ActionCreatorsMapObject<A = any> {
  [key: string]: ActionCreator<A>;
}

/**
 * Reducer function type that computes the next state given current state and action.
 */
export type Reducer<S = any, A extends Action = Action> = (
  state: S | undefined,
  action: A
) => S;

/**
 * Object mapping state keys to their respective reducers.
 */
export type ReducersMapObject<S = any, A extends Action = Action> = {
  [K in keyof S]: Reducer<S[K], A>;
};

/**
 * Combined state type helper.
 */
export type CombinedState<S> = {
  readonly [K in keyof S]: S[K];
};

/**
 * Dispatch function type.
 */
export interface Dispatch<A extends Action = Action> {
  <T extends A>(action: T): T;
}

/**
 * Middleware function type.
 */
export interface Middleware<
  DispatchExt = {},
  S = any,
  D extends Dispatch = Dispatch
> {
  (api: MiddlewareAPI<D, S>): (
    next: Dispatch<Action>
  ) => (action: any) => any;
}

/**
 * Middleware API object.
 */
export interface MiddlewareAPI<D extends Dispatch = Dispatch, S = any> {
  dispatch: D;
  getState(): S;
}

/**
 * Store enhancer type.
 */
export type StoreEnhancer<Ext = {}, StateExt = never> = (
  next: StoreEnhancerStoreCreator<Ext, StateExt>
) => StoreEnhancerStoreCreator<Ext, StateExt>;

export type StoreEnhancerStoreCreator<Ext = {}, StateExt = never> = <
  S = any,
  A extends Action = Action
>(
  reducer: Reducer<S, A>,
  preloadedState?: PreloadedState<S>
) => Store<S, A, StateExt> & Ext;

/**
 * Preloaded state type.
 */
export type PreloadedState<S> = S extends CombinedState<infer P>
  ? {
      [K in keyof P]?: P[K] extends object ? PreloadedState<P[K]> : P[K];
    }
  : S;

/**
 * The Redux store interface.
 */
export interface Store<S = any, A extends Action = Action, StateExt = never> {
  /**
   * Dispatches an action. This is the only way to trigger a state change.
   */
  dispatch: Dispatch<A>;

  /**
   * Returns the current state tree of your application.
   */
  getState(): S;

  /**
   * Adds a change listener. It will be called any time an action is dispatched.
   */
  subscribe(listener: () => void): Unsubscribe;

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   */
  replaceReducer(nextReducer: Reducer<S, A>): void;
}

/**
 * Unsubscribe function type.
 */
export type Unsubscribe = () => void;