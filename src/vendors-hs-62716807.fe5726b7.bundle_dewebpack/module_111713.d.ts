/**
 * Loading Plugin for Rematch
 * Tracks loading states for models and their effects
 */

/**
 * Configuration options for the loading plugin
 */
export interface LoadingPluginConfig {
  /**
   * Name of the loading model (default: "loading")
   */
  name?: string;

  /**
   * If true, loading states will be numbers (count of active effects)
   * If false, loading states will be booleans
   * @default false
   */
  asNumber?: boolean;

  /**
   * Whitelist of effects to track (format: "modelName/effectName")
   * Cannot be used together with blacklist
   */
  whitelist?: string[];

  /**
   * Blacklist of effects to exclude from tracking (format: "modelName/effectName")
   * Cannot be used together with whitelist
   */
  blacklist?: string[];
}

/**
 * Loading state for effects within a model
 */
export interface EffectsLoadingState {
  [effectName: string]: number | boolean;
}

/**
 * Loading state for all models
 */
export interface ModelsLoadingState {
  [modelName: string]: number | boolean;
}

/**
 * Loading state for all effects grouped by model
 */
export interface AllEffectsLoadingState {
  [modelName: string]: EffectsLoadingState;
}

/**
 * Complete loading state structure
 */
export interface LoadingState<TAsNumber extends boolean = false> {
  /**
   * Global loading state (count or boolean of all active effects)
   */
  global: TAsNumber extends true ? number : boolean;

  /**
   * Loading states per model
   */
  models: ModelsLoadingState;

  /**
   * Loading states per effect, grouped by model
   */
  effects: AllEffectsLoadingState;
}

/**
 * Payload for show/hide actions
 */
export interface LoadingActionPayload {
  /**
   * Name of the model
   */
  name: string;

  /**
   * Name of the effect/action
   */
  action: string;
}

/**
 * Loading model reducers
 */
export interface LoadingReducers {
  /**
   * Increment loading counter for a specific effect
   */
  show: (state: LoadingState, payload: LoadingActionPayload) => LoadingState;

  /**
   * Decrement loading counter for a specific effect
   */
  hide: (state: LoadingState, payload: LoadingActionPayload) => LoadingState;
}

/**
 * Loading model definition
 */
export interface LoadingModel<TAsNumber extends boolean = false> {
  /**
   * Model name
   */
  name: string;

  /**
   * Initial state
   */
  state: LoadingState<TAsNumber>;

  /**
   * Reducers for managing loading state
   */
  reducers: LoadingReducers;
}

/**
 * Plugin configuration returned by the loading plugin
 */
export interface LoadingPluginOutput<TAsNumber extends boolean = false> {
  /**
   * Plugin configuration to be merged into Rematch config
   */
  config: {
    models: {
      loading: LoadingModel<TAsNumber>;
    };
  };

  /**
   * Lifecycle hook called when a model is registered
   * Wraps effect functions to track loading states
   */
  onModel: (model: { name: string }) => void;
}

/**
 * Creates a loading plugin for Rematch that automatically tracks
 * loading states for asynchronous effects
 *
 * @param config - Configuration options for the loading plugin
 * @returns Plugin configuration object for Rematch
 *
 * @example
 *