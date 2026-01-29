interface ModelConfig<S = any> {
  name: string;
  state?: S;
  baseReducer?: (state: S, action: any) => S;
  reducers?: Record<string, (state: S, payload: any) => S>;
}

interface ReduxConfig {
  middlewares: any[];
  rootReducers?: Record<string, any>;
}

interface RematchConfig {
  name: string;
  models: Record<string, Omit<ModelConfig, 'name'>>;
  plugins: Plugin[];
  redux: ReduxConfig;
}

interface Plugin {
  middleware?: any;
  onModel?: (model: ModelConfig) => void;
  onStoreCreated?: (store: RematchStore) => Partial<RematchStore> | void;
}

interface PluginFactory {
  create: (plugin: Plugin) => Plugin;
}

interface StoreResult {
  store: any;
  mergeReducers: (reducers: any) => void;
  createModelReducer: (model: ModelConfig) => any;
  createRootReducer: (rootReducers?: Record<string, any>) => any;
}

interface RematchStore {
  name: string;
  dispatch: any;
  getState: any;
  replaceReducer: any;
  subscribe: any;
  model: (modelConfig: ModelConfig) => void;
  [key: string]: any;
}

const DEFAULT_PLUGINS: Plugin[] = [];

class Rematch {
  private plugins: Plugin[] = [];
  private pluginFactory: PluginFactory;
  private config: RematchConfig;
  private models: ModelConfig[] = [];

  constructor(config: RematchConfig) {
    this.config = config;
    this.pluginFactory = createPluginFactory(config);

    const allPlugins = [...DEFAULT_PLUGINS, ...this.config.plugins];
    for (const plugin of allPlugins) {
      this.plugins.push(this.pluginFactory.create(plugin));
    }

    this.forEachPlugin('middleware', (middleware) => {
      this.config.redux.middlewares.push(middleware);
    });
  }

  private getModels(modelsConfig: Record<string, Omit<ModelConfig, 'name'>>): ModelConfig[] {
    return Object.keys(modelsConfig).map((name) => ({
      name,
      ...modelsConfig[name],
      reducers: modelsConfig[name].reducers ?? {}
    }));
  }

  private forEachPlugin<K extends keyof Plugin>(
    hookName: K,
    callback: (hook: NonNullable<Plugin[K]>) => void
  ): void {
    for (const plugin of this.plugins) {
      const hook = plugin[hookName];
      if (hook) {
        callback(hook);
      }
    }
  }

  public addModel(modelConfig: ModelConfig): void {
    validate([
      [!modelConfig, 'model config is required'],
      [typeof modelConfig.name !== 'string', 'model "name" [string] is required'],
      [
        modelConfig.state === undefined && modelConfig.baseReducer === undefined,
        `model(${modelConfig.name}) "state" is required`
      ],
      [
        modelConfig.baseReducer !== undefined && typeof modelConfig.baseReducer !== 'function',
        `model(${modelConfig.name}) "baseReducer" must be a function`
      ]
    ]);

    this.forEachPlugin('onModel', (onModelHook) => {
      return onModelHook(modelConfig);
    });
  }

  public init(): RematchStore {
    this.models = this.getModels(this.config.models);

    for (const model of this.models) {
      this.addModel(model);
    }

    const storeResult: StoreResult = createReduxStore.call(this, {
      redux: this.config.redux,
      models: this.models
    });

    const store: RematchStore = {
      name: this.config.name,
      ...storeResult.store,
      model: (modelConfig: ModelConfig) => {
        this.addModel(modelConfig);
        storeResult.mergeReducers(storeResult.createModelReducer(modelConfig));
        storeResult.store.replaceReducer(
          storeResult.createRootReducer(this.config.redux.rootReducers)
        );
        storeResult.store.dispatch({ type: '@@redux/REPLACE' });
      }
    };

    this.forEachPlugin('onStoreCreated', (onStoreCreatedHook) => {
      const result = onStoreCreatedHook(store);
      if (result) {
        Object.keys(result ?? {}).forEach((key) => {
          store[key] = result[key];
        });
      }
    });

    return store;
  }
}

export default Rematch;

// External dependencies (assumed to be imported from other modules)
declare function createPluginFactory(config: RematchConfig): PluginFactory;
declare function createReduxStore(this: Rematch, options: { redux: ReduxConfig; models: ModelConfig[] }): StoreResult;
declare function validate(validations: Array<[boolean, string]>): void;