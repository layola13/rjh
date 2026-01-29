/**
 * Redux Thunk Middleware
 * Allows action creators to return functions instead of plain action objects.
 * The returned function receives `dispatch` and `getState` as arguments.
 */

/**
 * Dispatch function type from Redux store
 */
type Dispatch = (action: any) => any;

/**
 * Function that returns the current state from Redux store
 */
type GetState = () => any;

/**
 * A thunk action - a function that receives dispatch, getState, and optional extra argument
 */
type ThunkAction<ExtraArgument = undefined> = (
  dispatch: Dispatch,
  getState: GetState,
  extraArgument: ExtraArgument
) => any;

/**
 * Standard Redux action object
 */
type Action = {
  type: string;
  [key: string]: any;
};

/**
 * Redux middleware API object
 */
interface MiddlewareAPI {
  dispatch: Dispatch;
  getState: GetState;
}

/**
 * Next middleware function in the chain
 */
type Next = (action: Action) => any;

/**
 * Creates a Redux Thunk middleware with an optional extra argument
 * @param extraArgument - Optional extra argument to pass to thunk functions
 * @returns Redux middleware function
 */
export declare function createThunkMiddleware<ExtraArgument = undefined>(
  extraArgument?: ExtraArgument
): (api: MiddlewareAPI) => (next: Next) => (action: Action | ThunkAction<ExtraArgument>) => any;

/**
 * Default thunk middleware instance without extra argument
 */
declare const thunk: ReturnType<typeof createThunkMiddleware> & {
  /**
   * Creates a thunk middleware with a custom extra argument
   * @param extraArgument - Extra argument to inject into thunk functions
   */
  withExtraArgument: typeof createThunkMiddleware;
};

export default thunk;