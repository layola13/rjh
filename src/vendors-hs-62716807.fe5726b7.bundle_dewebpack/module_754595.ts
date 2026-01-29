interface DispatchAction {
  type: string;
  payload?: unknown;
  meta?: unknown;
}

interface Store {
  dispatch: (action: DispatchAction) => unknown;
  getState: () => unknown;
}

interface ModelReducers {
  [key: string]: (...args: any[]) => unknown;
}

interface Model {
  name: string;
  reducers?: ModelReducers;
}

type Dispatcher = (payload?: unknown, meta?: unknown) => Promise<unknown>;

interface DispatchNamespace {
  [reducerName: string]: Dispatcher;
}

interface DispatchRegistry {
  [modelName: string]: DispatchNamespace;
}

interface ValidationRule {
  0: boolean;
  1: string;
}

interface ExposedPlugin {
  storeDispatch: (action: DispatchAction, extraArg?: unknown) => void;
  storeGetState: () => unknown;
  dispatch: (action: DispatchAction) => unknown;
  createDispatcher: (modelName: string, reducerName: string) => Dispatcher;
  onStoreCreated: (store: Store) => { dispatch: (action: DispatchAction) => unknown };
  onModel: (model: Model) => void;
  validate?: (rules: ValidationRule[]) => void;
}

const dispatchPlugin: { exposed: ExposedPlugin } = {
  exposed: {
    storeDispatch(action: DispatchAction, extraArg?: unknown): void {
      console.warn("Warning: store not yet loaded");
    },

    storeGetState(): unknown {
      console.warn("Warning: store not yet loaded");
    },

    dispatch(action: DispatchAction): unknown {
      return this.storeDispatch(action);
    },

    createDispatcher(modelName: string, reducerName: string): Dispatcher {
      return async (payload?: unknown, meta?: unknown): Promise<unknown> => {
        const action: DispatchAction = {
          type: `${modelName}/${reducerName}`
        };

        if (payload !== undefined) {
          action.payload = payload;
        }

        if (meta !== undefined) {
          action.meta = meta;
        }

        return this.dispatch(action);
      };
    },

    onStoreCreated(store: Store): { dispatch: (action: DispatchAction) => unknown } {
      this.storeDispatch = store.dispatch;
      this.storeGetState = store.getState;

      return {
        dispatch: this.dispatch
      };
    },

    onModel(model: Model): void {
      (this.dispatch as unknown as DispatchRegistry)[model.name] = {};

      if (model.reducers) {
        for (const reducerName of Object.keys(model.reducers)) {
          this.validate?.([
            [!!reducerName.match(/\/.+\//), `Invalid reducer name (${model.name}/${reducerName})`],
            [typeof model.reducers[reducerName] !== "function", `Invalid reducer (${model.name}/${reducerName}). Must be a function`]
          ]);

          (this.dispatch as unknown as DispatchRegistry)[model.name][reducerName] = 
            this.createDispatcher(model.name, reducerName);
        }
      }
    }
  }
};

export default dispatchPlugin;