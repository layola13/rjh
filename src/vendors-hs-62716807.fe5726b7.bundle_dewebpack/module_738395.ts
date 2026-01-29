const SET_STATE = 'setState';

interface Reducers {
  setState?: (state: any, payload: any) => any;
  [SET_STATE]?: (state: any, payload: any) => any;
  [key: string]: any;
}

interface ModelConfig {
  reducers?: Reducers;
  [key: string]: any;
}

interface ModelsConfig {
  [modelName: string]: ModelConfig;
}

export default function normalizeModels(models: ModelsConfig): ModelsConfig {
  const normalizedModels: ModelsConfig = {};

  Object.keys(models).forEach((modelName) => {
    const model = models[modelName];

    if (!model.reducers) {
      model.reducers = {};
    }

    if (!model.reducers.setState) {
      model.reducers.setState = function (state: any, payload: any) {
        return { ...state, ...payload };
      };
    }

    if (!model.reducers[SET_STATE]) {
      model.reducers[SET_STATE] = function (state: any, payload: any) {
        return payload;
      };
    }

    normalizedModels[modelName] = model;
  });

  return normalizedModels;
}