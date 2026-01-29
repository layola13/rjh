import { ReactNode, createElement } from 'react';
import { Provider } from 'react-redux';
import { Context } from 'react';

const SET_STATE = 'SET_STATE';

interface InitialStates {
  [key: string]: unknown;
}

interface ProviderProps {
  children: ReactNode;
  initialStates?: InitialStates;
}

interface Dispatch {
  [modelName: string]: {
    [SET_STATE]?: (state: unknown) => void;
    [action: string]: any;
  };
}

interface Store {
  dispatch: Dispatch;
  [key: string]: any;
}

interface PluginOptions {
  context: Context<any>;
}

interface OnStoreCreatedResult {
  Provider: (props: ProviderProps) => JSX.Element;
  context: Context<any>;
}

interface Plugin {
  onStoreCreated: (store: Store) => OnStoreCreatedResult;
}

export default function (options: PluginOptions): Plugin {
  const { context } = options;

  return {
    onStoreCreated: (store: Store) => {
      return {
        Provider: (props: ProviderProps) => {
          const { children, initialStates } = props;

          if (initialStates) {
            Object.keys(initialStates).forEach((modelName: string) => {
              const state = initialStates[modelName];
              if (state && store.dispatch[modelName]?.[SET_STATE]) {
                store.dispatch[modelName][SET_STATE](state);
              }
            });
          }

          return createElement(Provider, {
            store,
            context
          }, children);
        },
        context
      };
    }
  };
}