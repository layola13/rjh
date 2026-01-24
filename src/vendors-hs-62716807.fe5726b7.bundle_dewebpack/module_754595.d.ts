/**
 * Redux-like store integration utilities with async action support
 * Provides dispatch helpers and model registration for a state management system
 */

/**
 * Represents an action dispatched to the store
 */
interface Action<TPayload = unknown, TMeta = unknown> {
  /** Action type in the format "modelName/reducerName" */
  type: string;
  /** Optional action payload data */
  payload?: TPayload;
  /** Optional action metadata */
  meta?: TMeta;
}

/**
 * Redux-compatible store interface
 */
interface Store<TState = unknown> {
  /** Dispatch an action to the store */
  dispatch: <TPayload = unknown, TMeta = unknown>(action: Action<TPayload, TMeta>) => void;
  /** Get the current state */
  getState: () => TState;
}

/**
 * Model definition for registering reducers
 */
interface Model<TState = unknown> {
  /** Unique model name */
  name: string;
  /** Optional reducer functions mapped by name */
  reducers?: {
    [key: string]: (state: TState, payload?: unknown) => TState;
  };
}

/**
 * Dispatcher function created for a specific model reducer
 * @template TPayload - Type of the action payload
 * @template TMeta - Type of the action metadata
 * @template TResult - Type of the dispatch result
 */
type Dispatcher<TPayload = unknown, TMeta = unknown, TResult = void> = (
  payload?: TPayload,
  meta?: TMeta
) => Promise<TResult>;

/**
 * Nested dispatch object structure
 * Maps model names to their reducer dispatchers
 */
interface DispatchMap {
  [modelName: string]: {
    [reducerName: string]: Dispatcher;
  };
}

/**
 * Extended dispatch function with model-specific dispatchers
 */
interface ExtendedDispatch extends DispatchMap {
  <TPayload = unknown, TMeta = unknown>(action: Action<TPayload, TMeta>): void;
}

/**
 * Validation rule tuple: [condition, errorMessage]
 */
type ValidationRule = [boolean, string];

/**
 * Plugin interface for store integration
 */
interface StorePlugin {
  exposed: {
    /**
     * Internal store dispatch reference
     * @param action - Action to dispatch
     */
    storeDispatch: <TPayload = unknown, TMeta = unknown>(
      action: Action<TPayload, TMeta>
    ) => void;

    /**
     * Internal store state getter reference
     * @returns Current store state
     */
    storeGetState: <TState = unknown>() => TState;

    /**
     * Dispatch an action to the store
     * @param action - Action to dispatch
     */
    dispatch: <TPayload = unknown, TMeta = unknown>(
      action: Action<TPayload, TMeta>
    ) => void;

    /**
     * Create a dispatcher function for a specific model reducer
     * @param modelName - Name of the model
     * @param reducerName - Name of the reducer
     * @returns Async dispatcher function
     */
    createDispatcher: <TPayload = unknown, TMeta = unknown, TResult = void>(
      modelName: string,
      reducerName: string
    ) => Dispatcher<TPayload, TMeta, TResult>;
  };

  /**
   * Hook called when the store is created
   * @param store - The created store instance
   * @returns Object with dispatch function
   */
  onStoreCreated: <TState = unknown>(store: Store<TState>) => {
    dispatch: ExtendedDispatch;
  };

  /**
   * Hook called when a model is registered
   * Validates and creates dispatchers for all model reducers
   * @param model - The model to register
   */
  onModel: <TState = unknown>(model: Model<TState>) => void;

  /**
   * Validate conditions and throw on first failure
   * @param rules - Array of validation rules
   * @throws Error with the first failing rule's message
   */
  validate?: (rules: ValidationRule[]) => void;
}

/**
 * Default export: Store plugin for dispatch helpers
 * Integrates with Redux-like stores to provide typed dispatchers
 */
declare const plugin: StorePlugin;

export default plugin;