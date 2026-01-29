import { createContext, createElement, Context } from 'react';

interface ModelConfig {
  [key: string]: any;
}

interface StoreOptions {
  disableImmer?: boolean;
  disableLoading?: boolean;
  disableError?: boolean;
  plugins?: Plugin[];
  redux?: ReduxConfig;
}

interface ReduxConfig {
  middlewares?: Middleware[];
  [key: string]: any;
}

interface Plugin {
  [key: string]: any;
}

interface Middleware {
  [key: string]: any;
}

interface Store {
  Provider: React.ComponentType<any>;
  getModelAPIs: (modelName: string) => any;
  [key: string]: any;
}

interface ModelAPIs {
  [key: string]: any;
}

type MapStateToProps<T = any> = (modelAPIs: ModelAPIs) => T;

let storeCounter = 0;

export function createStore(
  models: ModelConfig,
  options?: StoreOptions
): Store {
  const {
    disableImmer,
    disableLoading,
    disableError,
    plugins = [],
    redux = {}
  } = options || {};

  const middlewares: Middleware[] = redux.middlewares || [];
  const context: Context<any> = createContext(null);

  middlewares.push(/* thunk middleware */);
  plugins.push(/* context plugin */{ context });
  plugins.push(/* model plugin */{ context });
  plugins.push(/* effects plugin */);

  const blacklist: string[] = [];

  if (!disableLoading) {
    plugins.push(/* loading plugin */);
    blacklist.push('loading');
  }

  if (!disableError) {
    plugins.push(/* error plugin */);
    blacklist.push('error');
  }

  if (!disableImmer) {
    plugins.push(/* immer plugin */{ blacklist });
  }

  const storeName = options?.redux?.name || storeCounter.toString();
  storeCounter += 1;

  const storeConfig = {
    name: storeName,
    models,
    plugins,
    redux: {
      ...redux,
      middlewares
    }
  };

  const store = initializeStore(storeConfig);
  return store;
}

function initializeStore(config: any): Store {
  // Store initialization logic
  return {
    Provider: () => null,
    getModelAPIs: (modelName: string) => ({}),
    ...config
  };
}

export function withModel<P = any>(
  model: ModelConfig,
  mapStateToProps?: MapStateToProps,
  options?: StoreOptions
): (Component: React.ComponentType<P>) => React.ComponentType<any> {
  const modelKey = 'model';
  
  const defaultMapStateToProps: MapStateToProps = (modelAPIs: ModelAPIs) => ({
    [modelKey]: modelAPIs
  });

  const mapFunc = mapStateToProps || defaultMapStateToProps;
  
  const store = createStore(
    { [modelKey]: model },
    options
  );

  const { Provider, getModelAPIs } = store;
  const connectedProps = mapFunc(getModelAPIs(modelKey));

  return function withModelWrapper(Component: React.ComponentType<P>) {
    return function WrappedComponent(props: any) {
      return createElement(
        Provider,
        null,
        createElement(Component, { ...connectedProps, ...props })
      );
    };
  };
}

export default createStore;

export * from './types';