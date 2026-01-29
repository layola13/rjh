interface LoadingState {
  global: number;
  models: Record<string, number>;
  effects: Record<string, Record<string, number>>;
}

interface LoadingAction {
  name: string;
  action: string;
}

interface LoadingPluginConfig {
  name?: string;
  asNumber?: boolean;
  whitelist?: string[];
  blacklist?: string[];
}

interface ModelConfig {
  name: string;
}

interface DispatchEffect {
  (...args: unknown[]): Promise<unknown>;
  isEffect?: boolean;
}

interface Dispatch {
  [modelName: string]: Record<string, DispatchEffect>;
}

interface PluginContext {
  dispatch: Dispatch & {
    loading: {
      show: (action: LoadingAction) => void;
      hide: (action: LoadingAction) => void;
    };
  };
}

const initialState: LoadingState = {
  global: 0,
  models: {},
  effects: {}
};

const internalState: LoadingState = {
  global: 0,
  models: {},
  effects: {}
};

function createReducer(
  formatter: (value: number) => number | boolean,
  delta: number
) {
  return function (state: LoadingState, payload: LoadingAction): LoadingState {
    const { name: modelName, action: actionName } = payload;

    internalState.global += delta;

    if (internalState.models[modelName] === undefined) {
      internalState.models[modelName] = 0;
    }
    internalState.models[modelName] += delta;

    if (internalState.effects[modelName] === undefined) {
      internalState.effects[modelName] = {};
    }
    if (internalState.effects[modelName][actionName] === undefined) {
      internalState.effects[modelName][actionName] = 0;
    }
    internalState.effects[modelName][actionName] += delta;

    return {
      ...state,
      global: formatter(internalState.global),
      models: {
        ...state.models,
        [modelName]: formatter(internalState.models[modelName])
      },
      effects: {
        ...state.effects,
        [modelName]: {
          ...state.effects[modelName],
          [actionName]: formatter(internalState.effects[modelName][actionName])
        }
      }
    };
  };
}

function validateConfig(config: LoadingPluginConfig): void {
  if (config.name && typeof config.name !== 'string') {
    throw new Error('loading plugin config name must be a string');
  }
  if (config.asNumber && typeof config.asNumber !== 'boolean') {
    throw new Error('loading plugin config asNumber must be a boolean');
  }
  if (config.whitelist && !Array.isArray(config.whitelist)) {
    throw new Error('loading plugin config whitelist must be an array of strings');
  }
  if (config.blacklist && !Array.isArray(config.blacklist)) {
    throw new Error('loading plugin config blacklist must be an array of strings');
  }
  if (config.whitelist && config.blacklist) {
    throw new Error('loading plugin config cannot have both a whitelist & a blacklist');
  }
}

export default function createLoadingPlugin(config: LoadingPluginConfig = {}) {
  validateConfig(config);

  const pluginName = config.name || 'loading';
  const formatter = config.asNumber === true
    ? (value: number) => value
    : (value: number) => value > 0;

  const loadingModel = {
    name: pluginName,
    reducers: {
      hide: createReducer(formatter, -1),
      show: createReducer(formatter, 1)
    },
    state: {
      ...initialState
    }
  };

  internalState.global = 0;
  loadingModel.state.global = formatter(internalState.global);

  return {
    config: {
      models: {
        loading: loadingModel
      }
    },
    onModel(this: PluginContext, modelConfig: ModelConfig): void {
      const modelName = modelConfig.name;

      if (modelName === pluginName) {
        return;
      }

      internalState.models[modelName] = 0;
      loadingModel.state.models[modelName] = formatter(internalState.models[modelName]);
      loadingModel.state.effects[modelName] = {};

      const modelDispatch = this.dispatch[modelName];

      Object.keys(modelDispatch).forEach((actionName) => {
        if (modelDispatch[actionName].isEffect === true) {
          internalState.effects[modelName][actionName] = 0;
          loadingModel.state.effects[modelName][actionName] = formatter(
            internalState.effects[modelName][actionName]
          );

          const effectKey = `${modelName}/${actionName}`;

          const isWhitelisted = !config.whitelist || config.whitelist.includes(effectKey);
          const isNotBlacklisted = !config.blacklist || !config.blacklist.includes(effectKey);

          if (isWhitelisted && isNotBlacklisted) {
            const originalEffect = modelDispatch[actionName];

            const wrappedEffect = async (...args: unknown[]): Promise<unknown> => {
              try {
                this.dispatch.loading.show({
                  name: modelName,
                  action: actionName
                });
                const result = await originalEffect(...args);
                this.dispatch.loading.hide({
                  name: modelName,
                  action: actionName
                });
                return result;
              } catch (error) {
                this.dispatch.loading.hide({
                  name: modelName,
                  action: actionName
                });
                throw error;
              }
            };

            wrappedEffect.isEffect = true;
            this.dispatch[modelName][actionName] = wrappedEffect;
          }
        }
      });
    }
  };
}