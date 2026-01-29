interface ErrorState {
  error: Error | null;
  value: number;
}

interface GlobalErrorState {
  global: ErrorState;
  models: Record<string, ErrorState>;
  effects: Record<string, Record<string, ErrorState>>;
}

interface ErrorConfig {
  name?: string;
  asNumber?: boolean;
  whitelist?: string[];
  blacklist?: string[];
}

interface ActionPayload {
  name: string;
  action: string;
}

interface ModelConfig {
  name: string;
}

const initialErrorState: ErrorState = {
  error: null,
  value: 0
};

const initialState: GlobalErrorState = {
  global: { ...initialErrorState },
  models: {},
  effects: {}
};

const state: GlobalErrorState = {
  global: { ...initialState.global },
  models: { ...initialState.models },
  effects: { ...initialState.effects }
};

function clampValue(value: number): number {
  return value < 0 ? 0 : value;
}

function createReducer(
  formatter: (state: ErrorState) => ErrorState | { value: boolean; error: Error | null },
  delta: number
) {
  return (
    reducerState: GlobalErrorState,
    payload: ActionPayload,
    error: Error | null
  ): GlobalErrorState => {
    const { name: modelName, action: actionName } = payload;

    state.global = {
      value: clampValue(state.global.value + delta),
      error
    };

    if (state.models[modelName] === undefined) {
      state.models[modelName] = { ...initialErrorState };
    }

    state.models[modelName] = {
      value: clampValue(state.models[modelName].value + delta),
      error
    };

    if (state.effects[modelName] === undefined) {
      state.effects[modelName] = {};
    }

    if (state.effects[modelName][actionName] === undefined) {
      state.effects[modelName][actionName] = { ...initialErrorState };
    }

    state.effects[modelName][actionName] = {
      value: clampValue(state.effects[modelName][actionName].value + delta),
      error
    };

    return {
      ...reducerState,
      global: formatter(state.global),
      models: {
        ...reducerState.models,
        [modelName]: formatter(state.models[modelName])
      },
      effects: {
        ...reducerState.effects,
        [modelName]: {
          ...reducerState.effects[modelName],
          [actionName]: formatter(state.effects[modelName][actionName])
        }
      }
    };
  };
}

function validateConfig(config: ErrorConfig): void {
  if (config.name && typeof config.name !== 'string') {
    throw new Error('error plugin config name must be a string');
  }
  if (config.asNumber && typeof config.asNumber !== 'boolean') {
    throw new Error('error plugin config asNumber must be a boolean');
  }
  if (config.whitelist && !Array.isArray(config.whitelist)) {
    throw new Error('error plugin config whitelist must be an array of strings');
  }
  if (config.blacklist && !Array.isArray(config.blacklist)) {
    throw new Error('error plugin config blacklist must be an array of strings');
  }
  if (config.whitelist && config.blacklist) {
    throw new Error('error plugin config cannot have both a whitelist & a blacklist');
  }
}

export default function createErrorPlugin(config: ErrorConfig = {}) {
  validateConfig(config);

  const pluginName = config.name || 'error';
  const formatter = config.asNumber === true
    ? (state: ErrorState) => state
    : (state: ErrorState) => ({
        ...state,
        value: state.value > 0
      });

  const errorModel = {
    name: pluginName,
    reducers: {
      hide: createReducer(formatter, -1),
      show: createReducer(formatter, 1)
    },
    state: { ...initialState }
  };

  initialState.global = { ...initialErrorState };
  errorModel.state.global = formatter(initialState.global);

  return {
    config: {
      models: {
        error: errorModel
      }
    },
    onModel(this: any, modelConfig: ModelConfig): void {
      const modelName = modelConfig.name;

      if (modelName === pluginName) {
        return;
      }

      initialState.models[modelName] = { ...initialErrorState };
      errorModel.state.models[modelName] = formatter(initialState.models[modelName]);
      errorModel.state.effects[modelName] = {};

      const modelDispatch = this.dispatch[modelName];

      Object.keys(modelDispatch).forEach((actionName) => {
        if (modelDispatch[actionName].isEffect === true) {
          initialState.effects[modelName][actionName] = { ...initialErrorState };
          errorModel.state.effects[modelName][actionName] = formatter(
            initialState.effects[modelName][actionName]
          );

          const effectPath = `${modelName}/${actionName}`;

          const isWhitelisted = !config.whitelist || config.whitelist.includes(effectPath);
          const isNotBlacklisted = !config.blacklist || !config.blacklist.includes(effectPath);

          if (isWhitelisted && isNotBlacklisted) {
            const originalEffect = modelDispatch[actionName];

            const wrappedEffect = async (...args: any[]): Promise<any> => {
              const hasError = state.effects[modelName]?.[actionName]?.error;
              if (hasError) {
                this.dispatch.error.hide({ name: modelName, action: actionName }, null);
              }

              try {
                return await originalEffect(...args);
              } catch (error) {
                console.error(error);
                this.dispatch.error.show({ name: modelName, action: actionName }, error);
              }
            };

            wrappedEffect.isEffect = true;
            modelDispatch[actionName] = wrappedEffect;
          }
        }
      });
    }
  };
}