import { produce, enableES5 } from 'immer';
import { combineReducers as reduxCombineReducers, Reducer, AnyAction } from 'redux';

enableES5();

interface ImmerReducerPluginOptions {
  blacklist?: string[];
}

interface PluginConfig {
  config: {
    redux: {
      combineReducers: (reducers: Record<string, Reducer>) => Reducer;
    };
  };
}

export default function createImmerReducerPlugin(
  options: ImmerReducerPluginOptions = {}
): PluginConfig {
  const { blacklist = [] } = options;

  return {
    config: {
      redux: {
        combineReducers: (reducers: Record<string, Reducer>) => {
          const wrappedReducers: Record<string, Reducer> = {};

          Object.keys(reducers).forEach((key) => {
            const originalReducer = reducers[key];

            wrappedReducers[key] = (state: unknown, action: AnyAction): unknown => {
              const isObject = typeof state === 'object' && state !== null;
              const isBlacklisted = blacklist.includes(key);

              if (!isObject || isBlacklisted) {
                return originalReducer(state, action);
              }

              return produce(state, (draft) => {
                const result = originalReducer(draft, action);
                if (typeof result === 'object' && result !== null) {
                  return result;
                }
              });
            };
          });

          return reduxCombineReducers(wrappedReducers);
        },
      },
    },
  };
}