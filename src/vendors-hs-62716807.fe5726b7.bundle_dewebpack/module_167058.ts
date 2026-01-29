interface ReduxConfig {
  initialStates?: Record<string, any>;
  reducers?: Record<string, any>;
  rootReducers?: Record<string, any>;
  enhancers?: any[];
  middlewares?: any[];
  devtoolOptions?: Record<string, any>;
  combineReducers?: any;
  createStore?: any;
}

interface PluginConfig {
  models?: Record<string, any>;
  plugins?: Plugin[];
  redux?: ReduxConfig;
}

interface Plugin {
  config?: PluginConfig;
}

interface StoreConfig {
  name: string;
  models?: Record<string, any>;
  plugins?: Plugin[];
  redux?: ReduxConfig;
}

interface NormalizedConfig {
  name: string;
  models: Record<string, any>;
  plugins: Plugin[];
  redux: {
    reducers: Record<string, any>;
    rootReducers: Record<string, any>;
    enhancers: any[];
    middlewares: any[];
    devtoolOptions: Record<string, any>;
    initialStates?: Record<string, any>;
    combineReducers?: any;
    createStore?: any;
  };
}

function mergeConfig<T>(target: T | undefined, source: T | undefined): T {
  if (!source) {
    return (target || {}) as T;
  }
  return { ...(source || {}), ...(target || {}) } as T;
}

export default function normalizeConfig(config: StoreConfig): NormalizedConfig {
  const normalized: NormalizedConfig = {
    name: config.name,
    models: {},
    plugins: [],
    ...config,
    redux: {
      reducers: {},
      rootReducers: {},
      enhancers: [],
      middlewares: [],
      ...(config.redux || {}),
      devtoolOptions: {
        name: config.name,
        ...(config.redux?.devtoolOptions || {}),
      },
    },
  };

  for (const plugin of normalized.plugins) {
    if (plugin.config) {
      const mergedModels = mergeConfig(normalized.models, plugin.config.models);
      normalized.models = mergedModels;

      normalized.plugins = [
        ...normalized.plugins,
        ...(plugin.config.plugins || []),
      ];

      if (plugin.config.redux) {
        normalized.redux.initialStates = mergeConfig(
          normalized.redux.initialStates,
          plugin.config.redux.initialStates
        );

        normalized.redux.reducers = mergeConfig(
          normalized.redux.reducers,
          plugin.config.redux.reducers
        );

        normalized.redux.rootReducers = mergeConfig(
          normalized.redux.rootReducers,
          plugin.config.redux.reducers
        );

        normalized.redux.enhancers = [
          ...normalized.redux.enhancers,
          ...(plugin.config.redux.enhancers || []),
        ];

        normalized.redux.middlewares = [
          ...normalized.redux.middlewares,
          ...(plugin.config.redux.middlewares || []),
        ];

        normalized.redux.combineReducers =
          normalized.redux.combineReducers || plugin.config.redux.combineReducers;

        normalized.redux.createStore =
          normalized.redux.createStore || plugin.config.redux.createStore;
      }
    }
  }

  return normalized;
}