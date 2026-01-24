/**
 * Rematch Error Plugin
 * Tracks loading states and errors for models and effects
 */

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Error state with value counter and error object
 */
interface ErrorState {
  /** Number of active errors (or boolean if asNumber is false) */
  value: number;
  /** The error object if present */
  error: Error | null;
}

/**
 * Effect identifier containing model name and action name
 */
interface EffectIdentifier {
  /** Model name */
  name: string;
  /** Action/effect name */
  action: string;
}

/**
 * State shape for the error plugin
 */
interface ErrorPluginState {
  /** Global error state across all models */
  global: ErrorState;
  /** Error states per model */
  models: Record<string, ErrorState>;
  /** Error states per model effect */
  effects: Record<string, Record<string, ErrorState>>;
}

/**
 * Configuration options for the error plugin
 */
interface ErrorPluginConfig {
  /** Name of the error model (default: "error") */
  name?: string;
  /** If true, keep value as number; if false, convert to boolean */
  asNumber?: boolean;
  /** Array of effect names to track (format: "modelName/effectName") */
  whitelist?: string[];
  /** Array of effect names to ignore (format: "modelName/effectName") */
  blacklist?: string[];
}

/**
 * Reducer payload for show/hide actions
 */
interface ReducerPayload {
  identifier: EffectIdentifier;
  error: Error | null;
}

// ============================================================================
// Constants
// ============================================================================

/** Default error state */
const DEFAULT_ERROR_STATE: ErrorState = {
  error: null,
  value: 0,
};

/** Initial plugin state structure */
const INITIAL_STATE: ErrorPluginState = {
  global: { ...DEFAULT_ERROR_STATE },
  models: {},
  effects: {},
};

// ============================================================================
// Internal State Management
// ============================================================================

/**
 * Internal state tracker for error counts
 * Maintains cumulative error states across the application
 */
const internalState: ErrorPluginState = {
  global: { ...INITIAL_STATE.global },
  models: { ...INITIAL_STATE.models },
  effects: { ...INITIAL_STATE.effects },
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Ensures a value is non-negative
 * @param value - The value to clamp
 * @returns The clamped value (minimum 0)
 */
function clampToZero(value: number): number {
  return value < 0 ? 0 : value;
}

/**
 * Validates the plugin configuration
 * @param config - Configuration object to validate
 * @throws Error if configuration is invalid
 */
function validateConfig(config: ErrorPluginConfig): void {
  if (config.name !== undefined && typeof config.name !== 'string') {
    throw new Error('error plugin config name must be a string');
  }

  if (config.asNumber !== undefined && typeof config.asNumber !== 'boolean') {
    throw new Error('error plugin config asNumber must be a boolean');
  }

  if (config.whitelist !== undefined && !Array.isArray(config.whitelist)) {
    throw new Error('error plugin config whitelist must be an array of strings');
  }

  if (config.blacklist !== undefined && !Array.isArray(config.blacklist)) {
    throw new Error('error plugin config blacklist must be an array of strings');
  }

  if (config.whitelist && config.blacklist) {
    throw new Error('error plugin config cannot have both a whitelist & a blacklist');
  }
}

/**
 * Checks if an effect should be tracked based on whitelist/blacklist
 * @param effectPath - Full effect path (e.g., "modelName/effectName")
 * @param config - Plugin configuration
 * @returns true if the effect should be tracked
 */
function shouldTrackEffect(effectPath: string, config: ErrorPluginConfig): boolean {
  if (config.whitelist && !config.whitelist.includes(effectPath)) {
    return false;
  }

  if (config.blacklist && config.blacklist.includes(effectPath)) {
    return false;
  }

  return true;
}

// ============================================================================
// State Updater Factory
// ============================================================================

/**
 * Creates a reducer function that updates error state
 * @param transformer - Function to transform the error state
 * @param delta - Value to add to error counters (1 for show, -1 for hide)
 * @returns Reducer function
 */
function createStateUpdater(
  transformer: (state: ErrorState) => ErrorState,
  delta: number
) {
  return (
    state: ErrorPluginState,
    payload: ReducerPayload,
    error: Error | null = null
  ): ErrorPluginState => {
    const { name: modelName, action: actionName } = payload.identifier;

    // Update global state
    internalState.global = {
      value: clampToZero(internalState.global.value + delta),
      error,
    };

    // Initialize model state if needed
    if (internalState.models[modelName] === undefined) {
      internalState.models[modelName] = { ...DEFAULT_ERROR_STATE };
    }

    // Update model state
    internalState.models[modelName] = {
      value: clampToZero(internalState.models[modelName].value + delta),
      error,
    };

    // Initialize effects state if needed
    if (internalState.effects[modelName] === undefined) {
      internalState.effects[modelName] = {};
    }

    if (internalState.effects[modelName][actionName] === undefined) {
      internalState.effects[modelName][actionName] = { ...DEFAULT_ERROR_STATE };
    }

    // Update effect state
    internalState.effects[modelName][actionName] = {
      value: clampToZero(internalState.effects[modelName][actionName].value + delta),
      error,
    };

    // Return new state with transformed values
    return {
      ...state,
      global: transformer(internalState.global),
      models: {
        ...state.models,
        [modelName]: transformer(internalState.models[modelName]),
      },
      effects: {
        ...state.effects,
        [modelName]: {
          ...state.effects[modelName],
          [actionName]: transformer(internalState.effects[modelName][actionName]),
        },
      },
    };
  };
}

// ============================================================================
// Main Plugin Factory
// ============================================================================

/**
 * Creates a Rematch error plugin
 * Automatically tracks loading states and errors for all model effects
 * 
 * @example
 *