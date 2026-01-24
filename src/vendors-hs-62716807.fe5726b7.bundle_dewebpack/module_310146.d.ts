/**
 * Model validation utilities for icestore
 * Validates model definitions to ensure correct usage of effects and actions
 */

/**
 * Model definition interface
 */
interface ModelDefinition {
  /** Model state */
  state?: any;
  /** Synchronous state updaters */
  reducers?: Record<string, Function>;
  /** Asynchronous side effects (must be a function returning an object) */
  effects?: (() => Record<string, Function>) | Record<string, Function>;
  /** @deprecated Use reducers and effects instead */
  actions?: any;
}

/**
 * Collection of models keyed by model name
 */
interface Models {
  [modelName: string]: ModelDefinition;
}

/**
 * Validates model definitions to ensure compliance with icestore requirements
 * 
 * @param models - Object containing model definitions
 * @throws {Error} When effects are defined as objects instead of functions
 * @throws {Error} When deprecated actions field is detected
 * 
 * @example
 *