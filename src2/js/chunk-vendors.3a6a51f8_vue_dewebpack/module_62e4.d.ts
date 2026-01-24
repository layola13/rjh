/**
 * Webpack module polyfill for ensuring module compatibility across different environments.
 * This polyfill adds standard module properties and methods that may be missing in certain contexts.
 * 
 * @module WebpackModulePolyfill
 */

/**
 * Represents a module object with Webpack-specific properties and methods.
 */
interface WebpackModule {
  /**
   * Unique identifier for the module.
   */
  i: string;

  /**
   * Indicates whether the module has been loaded.
   */
  l: boolean;

  /**
   * Array of file paths associated with the module.
   */
  paths: string[];

  /**
   * Array of child modules that this module depends on.
   */
  children: WebpackModule[];

  /**
   * Deprecated method for logging deprecation warnings.
   * @deprecated This method is a no-op in the polyfill.
   */
  deprecate: () => void;

  /**
   * Getter property that returns the loaded state of the module.
   * @readonly
   */
  readonly loaded: boolean;

  /**
   * Getter property that returns the module's unique identifier.
   * @readonly
   */
  readonly id: string;

  /**
   * Flag indicating whether the Webpack polyfill has been applied to this module.
   */
  webpackPolyfill?: number;
}

/**
 * Applies Webpack polyfill to a module object, ensuring it has all required properties.
 * 
 * @param module - The module object to polyfill
 * @returns The polyfilled module object with all standard Webpack properties
 * 
 * @remarks
 * This function:
 * - Adds a no-op `deprecate` method
 * - Initializes an empty `paths` array
 * - Initializes an empty `children` array if not present
 * - Defines a `loaded` getter that returns the internal `l` property
 * - Defines an `id` getter that returns the internal `i` property
 * - Sets a `webpackPolyfill` flag to prevent duplicate application
 */
export default function applyWebpackModulePolyfill(module: WebpackModule): WebpackModule;