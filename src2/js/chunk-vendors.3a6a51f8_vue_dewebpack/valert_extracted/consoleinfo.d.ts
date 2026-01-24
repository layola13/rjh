/**
 * Console utility module for Vuetify framework
 * Provides logging, warning, and error functions with Vue component context support
 * @module console
 */

/**
 * Vue component options interface
 */
interface VueComponentOptions {
  name?: string;
  _componentTag?: string;
  __file?: string;
  [key: string]: any;
}

/**
 * Vue component instance interface
 */
interface VueComponent {
  _isVue: boolean;
  $parent?: VueComponent;
  $options?: VueComponentOptions;
  $root?: VueComponent;
  $_alreadyWarned?: string[];
  constructor: {
    options?: VueComponentOptions;
  };
  cid?: number;
  options?: VueComponentOptions;
}

/**
 * Logs an informational message to the console with optional Vue component context
 * @param message - The message to log
 * @param componentOptions - Optional Vue component options for context
 * @param component - Optional Vue component instance for context
 */
export function consoleInfo(
  message: string,
  componentOptions?: VueComponentOptions,
  component?: VueComponent
): void;

/**
 * Logs a warning message to the console with optional Vue component context
 * @param message - The warning message to log
 * @param componentOptions - Optional Vue component options for context
 * @param component - Optional Vue component instance for context
 */
export function consoleWarn(
  message: string,
  componentOptions?: VueComponentOptions,
  component?: VueComponent
): void;

/**
 * Logs an error message to the console with optional Vue component context
 * @param message - The error message to log
 * @param componentOptions - Optional Vue component options for context
 * @param component - Optional Vue component instance for context
 */
export function consoleError(
  message: string,
  componentOptions?: VueComponentOptions,
  component?: VueComponent
): void;

/**
 * Logs a deprecation warning for an API that will be removed in future versions
 * @param oldApi - The deprecated API name
 * @param newApi - The recommended replacement API name
 * @param componentOptions - Optional Vue component options for context
 * @param component - Optional Vue component instance for context
 */
export function deprecate(
  oldApi: string,
  newApi: string,
  componentOptions?: VueComponentOptions,
  component?: VueComponent
): void;

/**
 * Logs a breaking change error for an API that has been removed
 * @param oldApi - The removed API name
 * @param newApi - The recommended replacement API name
 * @param componentOptions - Optional Vue component options for context
 * @param component - Optional Vue component instance for context
 */
export function breaking(
  oldApi: string,
  newApi: string,
  componentOptions?: VueComponentOptions,
  component?: VueComponent
): void;

/**
 * Logs a warning for an API that has been removed and can be safely omitted
 * @param removedApi - The removed API name
 * @param componentOptions - Optional Vue component options for context
 * @param component - Optional Vue component instance for context
 */
export function removed(
  removedApi: string,
  componentOptions?: VueComponentOptions,
  component?: VueComponent
): void;