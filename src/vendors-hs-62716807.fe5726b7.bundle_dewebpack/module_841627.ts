type DispatchFunction = (payload?: any, meta?: any) => Promise<any>;

interface DispatchMap {
  [key: string]: DispatchFunction & { isEffect?: boolean };
}

interface ModelEffects {
  [key: string]: (payload?: any, state?: any, meta?: any) => Promise<any> | any;
}

interface Model {
  name: string;
  effects?: ((dispatch: DispatchMap) => ModelEffects) | ModelEffects;
}

interface MiddlewareAPI {
  getState: () => any;
}

interface Action {
  type: string;
  payload?: any;
  meta?: any;
}

type Middleware = (api: MiddlewareAPI) => (next: (action: Action) => any) => (action: Action) => Promise<any>;

interface EffectsPlugin {
  exposed: {
    effects: Record<string, Function>;
  };
  effects: Record<string, Function>;
  dispatch: DispatchMap;
  validate: (validations: Array<[boolean, string]>) => void;
  createDispatcher: (modelName: string, effectName: string) => DispatchFunction;
  onModel: (model: Model) => void;
  middleware: (api: MiddlewareAPI) => (next: (action: Action) => any) => (action: Action) => Promise<any>;
}

function getTypeOf(value: any): string {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

const effectsPlugin: EffectsPlugin = {
  exposed: {
    effects: {}
  },

  onModel(model: Model): void {
    if (!model.effects) {
      return;
    }

    const effects: ModelEffects = typeof model.effects === 'function' 
      ? model.effects(this.dispatch) 
      : model.effects;

    this.validate([
      [getTypeOf(effects) !== 'object', `Invalid effects from Model(${model.name}), effects should return an object`]
    ]);

    for (const effectName of Object.keys(effects)) {
      this.validate([
        [!!effectName.match(/\//), `Invalid effect name (${model.name}/${effectName})`],
        [typeof effects[effectName] !== 'function', `Invalid effect (${model.name}/${effectName}). Must be a function`]
      ]);

      const fullEffectName = `${model.name}/${effectName}`;
      this.effects[fullEffectName] = effects[effectName].bind(this.dispatch[model.name]);
      
      this.dispatch[model.name][effectName] = this.createDispatcher.apply(this, [model.name, effectName]);
      this.dispatch[model.name][effectName].isEffect = true;
    }
  },

  middleware(api: MiddlewareAPI): (next: (action: Action) => any) => (action: Action) => Promise<any> {
    return (next: (action: Action) => any) => {
      return async (action: Action): Promise<any> => {
        if (action.type in this.effects) {
          await next(action);
          return this.effects[action.type](action.payload, api.getState(), action.meta);
        }
        
        return next(action);
      };
    };
  }
};

export default effectsPlugin;