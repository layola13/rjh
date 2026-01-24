/**
 * Plugin configuration and creation module
 * Provides validation and initialization for plugin lifecycle hooks
 */

/**
 * Plugin lifecycle hooks interface
 */
interface PluginHooks {
  /** Called when the store is created */
  onStoreCreated?: (this: PluginContext) => void;
  /** Called when a model is registered */
  onModel?: (this: PluginContext, model: unknown) => void;
  /** Middleware function for intercepting actions */
  middleware?: (this: PluginContext) => unknown;
  /** Called during plugin initialization */
  onInit?: (this: PluginContext) => void;
  /** Public API exposed by the plugin */
  exposed?: Record<string, unknown>;
}

/**
 * Plugin context with exposed methods and properties
 */
interface PluginContext {
  [key: string]: unknown;
}

/**
 * Bound plugin hooks ready for execution
 */
interface BoundPluginHooks {
  onStoreCreated?: () => void;
  onModel?: (model: unknown) => void;
  middleware?: () => unknown;
}

/**
 * Validation function type
 */
type ValidateFunction = (validations: Array<[boolean, string]>) => void;

/**
 * Plugin factory return type
 */
interface PluginFactory<TConfig = unknown> {
  /** Plugin configuration */
  config: TConfig;
  /** Validation utility function */
  validate: ValidateFunction;
  /** Creates and initializes the plugin */
  create(this: PluginContext, hooks: PluginHooks): BoundPluginHooks;
}

/**
 * Creates a plugin factory with the given configuration
 * @param config - Plugin configuration object
 * @returns Plugin factory with lifecycle management
 */
declare function createPlugin<TConfig = unknown>(
  config: TConfig
): PluginFactory<TConfig>;

export default createPlugin;