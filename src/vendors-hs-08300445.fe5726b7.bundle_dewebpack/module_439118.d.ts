/**
 * Redux Thunk Middleware
 * Allows action creators to return functions instead of action objects.
 * The returned function receives dispatch and getState as arguments.
 */

/**
 * Dispatch function type from Redux store
 */
type Dispatch = (action: any) => any;

/**
 * GetState function type from Redux store
 */
type GetState = () => any;

/**
 * Standard Redux action type
 */
type Action = {
  type: string;
  [key: string]: any;
};

/**
 * Thunk action function type
 * @template TExtraArgument - Type of extra argument injected into thunk
 */
type ThunkAction<TExtraArgument = undefined> = (
  dispatch: Dispatch,
  getState: GetState,
  extraArgument: TExtraArgument
) => any;

/**
 * Middleware API provided by Redux
 */
interface MiddlewareAPI {
  dispatch: Dispatch;
  getState: GetState;
}

/**
 * Redux middleware function type
 */
type Middleware = (next: Dispatch) => (action: Action | ThunkAction<any>) => any;

/**
 * Creates a thunk middleware with optional extra argument
 * @template TExtraArgument - Type of extra argument to inject into thunks
 * @param extraArgument - Additional argument to pass to thunk functions
 * @returns Redux middleware that handles thunk actions
 */
declare function createThunkMiddleware<TExtraArgument = undefined>(
  extraArgument?: TExtraArgument
): (api: MiddlewareAPI) => Middleware;

/**
 * Default thunk middleware instance without extra argument
 */
declare const thunk: {
  (api: MiddlewareAPI): Middleware;
  /**
   * Create thunk middleware with custom extra argument
   * @template TExtraArgument - Type of extra argument
   * @param extraArgument - Custom argument to inject
   */
  withExtraArgument: typeof createThunkMiddleware;
};

export default thunk;
export { createThunkMiddleware as withExtraArgument };