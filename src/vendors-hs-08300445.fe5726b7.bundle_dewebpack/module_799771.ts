export interface ThunkExtraArgument {}

export interface ThunkDispatch<TState, TExtraArgument, TAction> {
  (action: TAction | ThunkAction<TState, TExtraArgument, TAction>): any;
}

export type ThunkAction<TState, TExtraArgument, TAction> = (
  dispatch: ThunkDispatch<TState, TExtraArgument, TAction>,
  getState: () => TState,
  extraArgument: TExtraArgument
) => any;

export interface MiddlewareAPI<TState, TAction> {
  dispatch: ThunkDispatch<TState, any, TAction>;
  getState: () => TState;
}

export interface Middleware<TState = any, TExtraArgument = any, TAction = any> {
  (api: MiddlewareAPI<TState, TAction>): (
    next: (action: TAction) => any
  ) => (action: TAction | ThunkAction<TState, TExtraArgument, TAction>) => any;
}

function createThunkMiddleware<TExtraArgument = undefined>(
  extraArgument?: TExtraArgument
): Middleware<any, TExtraArgument, any> {
  return function thunkMiddleware(api) {
    const { dispatch, getState } = api;

    return function next(nextDispatch) {
      return function handleAction(action) {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument as TExtraArgument);
        }

        return nextDispatch(action);
      };
    };
  };
}

const thunk = createThunkMiddleware();

export interface ThunkMiddleware {
  <TExtraArgument = undefined>(extraArgument?: TExtraArgument): Middleware<
    any,
    TExtraArgument,
    any
  >;
  withExtraArgument: typeof createThunkMiddleware;
}

(thunk as any).withExtraArgument = createThunkMiddleware;

export default thunk as Middleware & { withExtraArgument: typeof createThunkMiddleware };