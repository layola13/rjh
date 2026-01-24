/**
 * Redux combineReducers utility type definitions
 * Combines multiple reducer functions into a single reducer function
 */

/**
 * Generic action type with string type property
 */
export interface Action<T = string> {
  type: T;
}

/**
 * Action with additional payload data
 */
export interface AnyAction extends Action {
  [key: string]: any;
}

/**
 * Reducer function type
 * @template S - State type
 * @template A - Action type
 */
export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S;

/**
 * Map of reducer functions by key
 */
export interface ReducersMapObject<S = any, A extends Action = AnyAction> {
  [K in keyof S]: Reducer<S[K], A>;
}

/**
 * Combined state type derived from reducers map
 */
export type StateFromReducersMapObject<M> = M extends ReducersMapObject<
  any,
  any
>
  ? { [P in keyof M]: M[P] extends Reducer<infer S, any> ? S : never }
  : never;

/**
 * Combined reducer function type
 */
export type CombinedReducer<S = any, A extends Action = AnyAction> = Reducer<
  S,
  A
>;

/**
 * Combines multiple reducer functions into a single reducing function.
 * The resulting reducer calls every child reducer and gathers their results into a single state object.
 * The state produced by combineReducers() namespaces the states of each reducer under their keys.
 *
 * @template S - Combined state type
 * @template A - Action type
 * @param reducers - An object whose values correspond to different reducing functions that need to be combined into one
 * @returns A reducer function that invokes every reducer inside the reducers object, and constructs a state object with the same shape
 *
 * @example
 *