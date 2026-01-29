type ResetConfig = string | symbol | {
  type?: string | symbol;
  data?: string;
};

type Reducer<S, A> = (state: S, action: A) => S;

type EnhancedReducer<S, A> = (
  reducer: Reducer<S, A>,
  preloadedState?: S,
  enhancer?: unknown
) => unknown;

interface Action {
  type: string | symbol;
  [key: string]: unknown;
}

export function A(config: ResetConfig): <S, A extends Action>(
  createReducer: (
    reducer: Reducer<S, A>,
    preloadedState?: S,
    enhancer?: unknown
  ) => unknown
) => EnhancedReducer<S, A> {
  return function <S, A extends Action>(
    createReducer: (
      reducer: Reducer<S, A>,
      preloadedState?: S,
      enhancer?: unknown
    ) => unknown
  ): EnhancedReducer<S, A> {
    return function (
      reducer: Reducer<S, A>,
      preloadedState?: S,
      enhancer?: unknown
    ): unknown {
      const DEFAULT_RESET_TYPE = "RESET";
      const DEFAULT_STATE_KEY = "state";

      let resetType: string | symbol = DEFAULT_RESET_TYPE;
      let stateKey: string = DEFAULT_STATE_KEY;

      const configType = typeof config;

      if (
        configType === "string" &&
        (config as string).length > 0 ||
        configType === "symbol"
      ) {
        resetType = config as string | symbol;
      } else if (configType === "object" && config !== null) {
        const configObj = config as { type?: string | symbol; data?: string };
        
        if (
          typeof configObj.type === "string" && configObj.type.length > 0 ||
          typeof configObj.type === "symbol"
        ) {
          resetType = configObj.type;
        }
        
        if (typeof configObj.data === "string" && configObj.data.length > 0) {
          stateKey = configObj.data;
        }
      }

      const wrappedReducer: Reducer<S, A> = (state: S, action: A): S => {
        if (action.type === resetType) {
          return action[stateKey] as S;
        }
        return reducer(state, action);
      };

      return createReducer(wrappedReducer, preloadedState, enhancer);
    };
  };
}