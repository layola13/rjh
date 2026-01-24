/**
 * Effects Plugin for Rematch State Management
 * 
 * This plugin enables asynchronous side effects (API calls, timers, etc.)
 * to be handled alongside regular reducers in Rematch models.
 */

/**
 * Effect function type - handles asynchronous operations
 * @template TPayload - The payload type passed to the effect
 * @template TRootState - The root state type of the store
 * @template TResult - The return type of the effect
 */
export type Effect<TPayload = any, TRootState = any, TResult = any> = (
  payload: TPayload,
  rootState: TRootState,
  meta?: any
) => Promise<TResult> | TResult;

/**
 * Collection of effects for a model
 * Can be either an object of effects or a factory function
 */
export type ModelEffects<TModels = any> = {
  [key: string]: Effect;
} | ((dispatch: RematchDispatch<TModels>) => {
  [key: string]: Effect;
});

/**
 * Rematch dispatch interface
 */
export interface RematchDispatch<TModels = any> {
  [modelName: string]: {
    [actionName: string]: (payload?: any, meta?: any) => any;
  };
}

/**
 * Store interface with getState method
 */
export interface RematchStore<TRootState = any> {
  getState(): TRootState;
  dispatch: RematchDispatch;
}

/**
 * Model definition interface
 */
export interface Model<TState = any, TModels = any> {
  /** Model name */
  name: string;
  /** Initial state */
  state?: TState;
  /** Reducers for synchronous state updates */
  reducers?: {
    [key: string]: (state: TState, payload?: any) => TState;
  };
  /** Effects for asynchronous operations */
  effects?: ModelEffects<TModels>;
}

/**
 * Effects Plugin Configuration
 */
export interface EffectsPlugin {
  /** Exposed plugin API */
  exposed: {
    /** Registry of all effect functions */
    effects: {
      [effectName: string]: Effect;
    };
  };

  /**
   * Called when a model is registered
   * Processes and registers the model's effects
   * @param model - The model being registered
   */
  onModel(model: Model): void;

  /**
   * Redux middleware factory for handling effect dispatches
   * @param store - The Rematch store instance
   * @returns Redux middleware function
   */
  middleware(store: RematchStore): (
    next: (action: any) => any
  ) => (action: any) => Promise<any> | any;

  /**
   * Effect dispatcher registry
   * Maps "modelName/effectName" to bound effect functions
   */
  effects: {
    [key: string]: Effect;
  };

  /**
   * Creates a dispatcher function for an effect
   * @param modelName - Name of the model
   * @param effectName - Name of the effect
   * @returns Dispatcher function with isEffect flag
   */
  createDispatcher(modelName: string, effectName: string): EffectDispatcher;

  /**
   * Validates plugin configuration
   * @param validations - Array of [condition, errorMessage] tuples
   */
  validate(validations: Array<[boolean, string]>): void;

  /**
   * Dispatch instance for triggering actions
   */
  dispatch: RematchDispatch;
}

/**
 * Effect dispatcher function with metadata
 */
export interface EffectDispatcher {
  (payload?: any, meta?: any): Promise<any>;
  /** Flag indicating this is an effect dispatcher */
  isEffect: true;
}

/**
 * Default export: Effects Plugin instance
 */
declare const effectsPlugin: EffectsPlugin;

export default effectsPlugin;