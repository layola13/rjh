/**
 * Redux store configuration module
 * Creates and configures a Redux store with model-based reducer management
 */

import { Store, Reducer, StoreEnhancer, combineReducers, createStore, applyMiddleware, compose, AnyAction } from 'redux';

/**
 * Redux configuration options
 */
interface ReduxConfig<TState = any> {
  /** Custom reducers map */
  reducers?: ReducersMapObject<TState>;
  
  /** Root-level reducers that can intercept all actions */
  rootReducers?: RootReducersMapObject<TState>;
  
  /** Redux middleware array */
  middlewares?: Middleware[];
  
  /** Store enhancers */
  enhancers?: StoreEnhancer[];
  
  /** Initial state for each slice */
  initialStates?: Partial<TState>;
  
  /** Redux DevTools options */
  devtoolOptions?: DevToolsOptions;
  
  /** Custom combineReducers function */
  combineReducers?: typeof combineReducers;
  
  /** Custom createStore function */
  createStore?: typeof createStore;
}

/**
 * Model definition for creating reducers
 */
interface Model<TState = any> {
  /** Model name (used as reducer key) */
  name: string;
  
  /** Initial state for this model */
  state: TState;
  
  /** Reducers map for this model */
  reducers?: ModelReducersMap<TState>;
  
  /** Base reducer to wrap model reducers */
  baseReducer?: Reducer<TState>;
}

/**
 * Store initialization options
 */
interface StoreInitOptions<TState = any> {
  /** Redux configuration */
  redux: ReduxConfig<TState>;
  
  /** Array of model definitions */
  models: Model[];
}

/**
 * Map of reducer functions
 */
interface ReducersMapObject<TState = any> {
  [key: string]: Reducer<any>;
}

/**
 * Map of root-level reducer functions
 */
interface RootReducersMapObject<TState = any> {
  [actionType: string]: (state: TState, action: AnyAction) => TState;
}

/**
 * Model-specific reducers map
 */
interface ModelReducersMap<TState = any> {
  [key: string]: (state: TState, payload?: any, meta?: any) => TState;
}

/**
 * Redux middleware type
 */
type Middleware = any;

/**
 * Redux DevTools extension options
 */
interface DevToolsOptions {
  /** Disable DevTools integration */
  disabled?: boolean;
  
  /** Additional DevTools configuration */
  [key: string]: any;
}

/**
 * Redux DevTools extension compose function
 */
interface ReduxDevToolsExtension {
  (options?: DevToolsOptions): typeof compose;
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: ReduxDevToolsExtension;
  }
}

/**
 * Redux store creator with model-based reducer management
 * Provides utilities for creating and managing reducers based on model definitions
 */
export default class StoreCreator<TState = any> {
  /** Current reducers map */
  reducers: ReducersMapObject<TState>;
  
  /** The created Redux store instance */
  store: Store<TState>;

  /**
   * Initialize store with redux config and models
   * @param options - Store initialization options
   */
  constructor(options: StoreInitOptions<TState>): this;

  /**
   * Merge additional reducers into the existing reducers map
   * @param additionalReducers - Reducers to merge
   * @returns Combined reducer function
   */
  mergeReducers(additionalReducers?: ReducersMapObject<TState>): Reducer<TState>;

  /**
   * Create a reducer for a specific model
   * Converts model reducer definitions into Redux-compatible reducers
   * @param model - Model definition
   */
  createModelReducer(model: Model): void;

  /**
   * Create the root reducer with optional root-level action handlers
   * @param rootReducers - Map of action types to root reducer functions
   * @returns Root reducer function
   */
  createRootReducer(rootReducers?: RootReducersMapObject<TState>): Reducer<TState>;
}