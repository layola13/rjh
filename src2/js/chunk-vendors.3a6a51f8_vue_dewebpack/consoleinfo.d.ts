/**
 * Console utility module for Vuetify framework
 * Provides logging functions with Vue component context support
 * @module console
 */

/**
 * Vue component instance interface for console utilities
 */
export interface VueComponent {
  /** Indicates this is a Vue instance */
  _isVue: boolean;
  /** Parent component reference */
  $parent?: VueComponent;
  /** Component options */
  $options?: ComponentOptions;
  /** Root component reference */
  $root?: VueComponent;
  /** Internal warning tracker */
  $_alreadyWarned?: string[];
  /** Component constructor */
  constructor?: ComponentConstructor;
}

/**
 * Component constructor interface
 */
export interface ComponentConstructor {
  /** Component ID for internal tracking */
  cid?: number;
  /** Component options */
  options?: ComponentOptions;
}

/**
 * Vue component options
 */
export interface ComponentOptions {
  /** Component name */
  name?: string;
  /** Component tag name */
  _componentTag?: string;
  /** Source file path */
  __file?: string;
}

/**
 * Displays an informational message in the console
 * @param message - The message to display
 * @param component - Optional Vue component instance or component options
 * @param vm - Optional parent Vue component instance
 */
export function consoleInfo(
  message: string,
  component?: ComponentOptions | VueComponent,
  vm?: VueComponent
): void;

/**
 * Displays a warning message in the console
 * Prevents duplicate warnings from the same component
 * @param message - The warning message to display
 * @param component - Optional Vue component instance or component options
 * @param vm - Optional parent Vue component instance
 */
export function consoleWarn(
  message: string,
  component?: ComponentOptions | VueComponent,
  vm?: VueComponent
): void;

/**
 * Displays an error message in the console
 * @param message - The error message to display
 * @param component - Optional Vue component instance or component options
 * @param vm - Optional parent Vue component instance
 */
export function consoleError(
  message: string,
  component?: ComponentOptions | VueComponent,
  vm?: VueComponent
): void;

/**
 * Logs a deprecation warning with upgrade instructions
 * @param original - The deprecated feature name
 * @param replacement - The recommended replacement feature name
 * @param component - Optional Vue component instance or component options
 * @param vm - Optional parent Vue component instance
 */
export function deprecate(
  original: string,
  replacement: string,
  component?: ComponentOptions | VueComponent,
  vm?: VueComponent
): void;

/**
 * Logs a breaking change error with upgrade guide link
 * Used for features that have been removed in major version updates
 * @param original - The removed feature name
 * @param replacement - The recommended replacement feature name
 * @param component - Optional Vue component instance or component options
 * @param vm - Optional parent Vue component instance
 */
export function breaking(
  original: string,
  replacement: string,
  component?: ComponentOptions | VueComponent,
  vm?: VueComponent
): void;

/**
 * Logs a removal warning for features that can be safely omitted
 * @param feature - The removed feature name
 * @param component - Optional Vue component instance or component options
 * @param vm - Optional parent Vue component instance
 */
export function removed(
  feature: string,
  component?: ComponentOptions | VueComponent,
  vm?: VueComponent
): void;