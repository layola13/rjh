export interface ModelDefinition {
  effects?: () => Record<string, (...args: any[]) => any>;
  actions?: unknown;
  reducers?: Record<string, (...args: any[]) => any>;
  state?: unknown;
}

export type Models = Record<string, ModelDefinition>;

function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

export function checkModels(models: Models): void {
  Object.keys(models).forEach((modelName: string) => {
    const model = models[modelName];

    if (model.effects && !isFunction(model.effects)) {
      throw new Error(
        `Model(${modelName}): Defining effects as objects has been detected, please use \`{ effects: () => ({ effectName: () => {} }) }\` instead. \n\n\n Visit https://github.com/ice-lab/icestore/blob/master/docs/upgrade-guidelines.md#define-model-effects to learn about how to upgrade.`
      );
    }

    if (model.actions) {
      throw new Error(
        `Model(${modelName}): The actions field has been detected, please use \`reducers\` and \`effects\` instead. Visit https://github.com/ice-lab/icestore/blob/master/docs/upgrade-guidelines.md#define-model-actions to learn about how to upgrade.`
      );
    }
  });
}