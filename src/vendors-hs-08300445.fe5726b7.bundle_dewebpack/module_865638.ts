interface Middleware<S = any, D extends Dispatch = Dispatch> {
  (api: MiddlewareAPI<D, S>): (next: D) => D;
}

interface Dispatch<A = any> {
  (action: A): A;
}

interface MiddlewareAPI<D extends Dispatch = Dispatch, S = any> {
  dispatch: D;
  getState(): S;
}

interface Store<S = any, A = any> {
  dispatch: Dispatch<A>;
  getState(): S;
  subscribe?(listener: () => void): () => void;
  replaceReducer?(nextReducer: any): void;
}

function compose<R>(...funcs: Array<(arg: R) => R>): (arg: R) => R {
  if (funcs.length === 0) {
    return (arg: R) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args: [R]) => a(b(...args)));
}

export default function applyMiddleware<S = any, A = any>(
  ...middlewares: Array<Middleware<S, Dispatch<A>>>
) {
  return (createStore: any) => {
    return (reducer: any, preloadedState: S, enhancer?: any): Store<S, A> => {
      const store = createStore(reducer, preloadedState, enhancer);
      let dispatch: Dispatch<A> = store.dispatch;

      const middlewareAPI: MiddlewareAPI<Dispatch<A>, S> = {
        getState: store.getState,
        dispatch: (action: A) => dispatch(action)
      };

      const chain = middlewares.map((middleware) => middleware(middlewareAPI));
      dispatch = compose<Dispatch<A>>(...chain)(store.dispatch);

      return {
        ...store,
        dispatch
      };
    };
  };
}