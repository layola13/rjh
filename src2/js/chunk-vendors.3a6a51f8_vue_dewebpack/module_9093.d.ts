/**
 * Object property names utility module
 * Provides a polyfill for Object.getOwnPropertyNames with additional property filtering
 */

/**
 * Function type that retrieves enumerable and non-enumerable property names from an object
 * @param target - The object whose own property names are to be retrieved
 * @param excludedProperties - Array of property names to exclude from the result
 * @returns Array of property name strings found on the object
 */
type GetOwnPropertyNamesFn = (
  target: object,
  excludedProperties: ReadonlyArray<string>
) => string[];

/**
 * Module exports interface
 * Exposes a property enumeration function compatible with Object.getOwnPropertyNames
 */
interface PropertyNamesModule {
  /**
   * Function property that retrieves own property names of an object
   * Falls back to native Object.getOwnPropertyNames if available,
   * otherwise uses custom implementation with property filtering
   */
  readonly f: (target: object) => string[];
}

/**
 * Default excluded properties for object property enumeration
 * Commonly filtered properties: 'length' and 'prototype'
 */
declare const DEFAULT_EXCLUDED_PROPERTIES: readonly ['length', 'prototype'];

/**
 * Module export
 * Provides Object.getOwnPropertyNames functionality with configurable exclusions
 */
declare const module: PropertyNamesModule;

export = module;
export { GetOwnPropertyNamesFn, PropertyNamesModule, DEFAULT_EXCLUDED_PROPERTIES };