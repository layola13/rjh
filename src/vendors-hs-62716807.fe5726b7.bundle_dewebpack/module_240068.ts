import { combineReducers, createStore, applyMiddleware, compose, Reducer, Store, StoreEnhancer, AnyAction } from 'redux';

interface ReduxConfig {
  combineReducers?: typeof combineReducers;
  createStore?: typeof createStore;
  initialStates?: Record<string, any>;
  reducers: Record<string, Reducer>;
  middlewares: any[];
  enhancers: StoreEnhancer[];
  rootReducers?: Record<string, Reducer>;
  devtoolOptions?: DevToolOptions;
}

interface ModelConfig {
  name: string;
  state: any;
  reducers?: Record<string, (state: any, payload: any, meta?: any) => any>;
  baseReducer?: Reducer;
}

interface DevToolOptions {
  disabled?: boolean;
  [key: string]: any;
}

interface StoreInitConfig {
  redux: ReduxConfig;
  models: ModelConfig[];
}

interface ReduxDevToolsExtension {
  (options?: any): (...args: StoreEnhancer[]) => StoreEnhancer;
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: ReduxDevToolsExtension;
  }
}

function isAbsoluteActionType(actionType: string): boolean {
  return actionType.includes('/');
}

function getDevToolsCompose(options: DevToolOptions = {}): typeof compose {
  const { disabled, ...composerOptions } = options;

  if (!disabled && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(composerOptions);
  }

  return compose;
}

export default function createReduxStore(this: any, config: StoreInitConfig): any {
  const { redux, models } = config;
  const combineReducersFunc = redux.combineReducers || combineReducers;
  const createStoreFunc = redux.createStore || createStore;
  const initialStates = redux.initialStates !== undefined ? redux.initialStates : {};

  this.reducers = redux.reducers;

  this.mergeReducers = (additionalReducers: Record<string, Reducer> = {}): Reducer => {
    this.reducers = {
      ...this.reducers,
      ...additionalReducers
    };

    return Object.keys(this.reducers).length > 0
      ? combineReducersFunc(this.reducers)
      : (state: any) => state;
  };

  this.createModelReducer = (model: ModelConfig): void => {
    const { baseReducer, reducers: modelReducers } = model;
    const actionTypeMap: Record<string, (state: any, payload: any, meta?: any) => any> = {};

    for (const key of Object.keys(modelReducers || {})) {
      const actionType = isAbsoluteActionType(key) ? key : `${model.name}/${key}`;
      actionTypeMap[actionType] = modelReducers![key];
    }

    const modelReducer = (state: any = model.state, action: AnyAction): any => {
      if (typeof actionTypeMap[action.type] === 'function') {
        return actionTypeMap[action.type](state, action.payload, action.meta);
      }
      return state;
    };

    this.reducers[model.name] = baseReducer
      ? (state: any, action: AnyAction) => modelReducer(baseReducer(state, action), action)
      : modelReducer;
  };

  for (const model of models) {
    this.createModelReducer(model);
  }

  this.createRootReducer = (rootReducers: Record<string, Reducer> = {}): Reducer => {
    const combinedReducer = this.mergeReducers();

    if (Object.keys(rootReducers).length > 0) {
      return (state: any, action: AnyAction): any => {
        const rootReducer = rootReducers[action.type];
        const nextState = rootReducer ? rootReducer(state, action) : state;
        return combinedReducer(nextState, action);
      };
    }

    return combinedReducer;
  };

  const rootReducer = this.createRootReducer(redux.rootReducers);
  const middlewareEnhancer = applyMiddleware(...redux.middlewares);
  const composeEnhancers = getDevToolsCompose(redux.devtoolOptions);
  const storeEnhancer = composeEnhancers(...redux.enhancers, middlewareEnhancer);

  this.store = createStoreFunc(rootReducer, initialStates, storeEnhancer);

  return this;
}