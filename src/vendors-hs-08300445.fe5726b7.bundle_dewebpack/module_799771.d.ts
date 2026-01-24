/**
 * Redux Thunk Middleware
 * 
 * A middleware that allows action creators to return functions instead of action objects.
 * The returned functions receive `dispatch` and `getState` as arguments, plus optional extra arguments.
 * 
 * @module ReduxThunkMiddleware
 */

/**
 * Redux dispatch function type
 */
type Dispatch = <A>(action: A) => A;

/**
 * Redux getState function type
 */
type GetState<S = unknown> = () => S;

/**
 * Thunk action function type
 * @template S - State type
 * @template E - Extra argument type
 * @template R - Return type
 */
type ThunkAction<S = unknown, E = unknown, R = unknown> = (
  dispatch: Dispatch,
  getState: GetState<S>,
  extraArgument: E
) => R;

/**
 * Action type that can be either a plain action or a thunk function
 */
type Action<S = unknown, E = unknown> = 
  | ThunkAction<S, E, unknown>
  | Record<string, unknown>;

/**
 * Next function in middleware chain
 */
type Next = (action: unknown) => unknown;

/**
 * Middleware API provided by Redux
 * @template S - State type
 */
interface MiddlewareAPI<S = unknown> {
  dispatch: Dispatch;
  getState: GetState<S>;
}

/**
 * Redux middleware function type
 */
type Middleware<S = unknown, E = unknown> = (
  api: MiddlewareAPI<S>
) => (next: Next) => (action: Action<S, E>) => unknown;

/**
 * Thunk middleware with configuration options
 */
interface ThunkMiddleware<E = undefined> {
  /**
   * The middleware function
   */
  <S = unknown>(api: MiddlewareAPI<S>): (next: Next) => (action: Action<S, E>) => unknown;
  
  /**
   * Create a new thunk middleware with an extra argument
   * @param extraArgument - Additional argument passed to thunk functions
   * @returns Configured thunk middleware
   */
  withExtraArgument: <NewE>(extraArgument?: NewE) => ThunkMiddleware<NewE>;
}

/**
 * Creates a Redux thunk middleware
 * 
 * @template E - Type of extra argument passed to thunk functions
 * @param extraArgument - Optional extra argument available in thunk functions
 * @returns Redux middleware that handles thunk actions
 * 
 * @example
 *