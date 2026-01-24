/**
 * Webpack Bundle Index - Type Definitions
 * 
 * This file contains type definitions for the bundled modules.
 * The bundle includes two main modules: 'get' and 'value'.
 */

/**
 * Module: get
 * 
 * Provides functionality for retrieving values from objects or collections.
 */
declare module 'module_get' {
  /**
   * Retrieves a value from an object at the specified path.
   * 
   * @template T - The type of the object to retrieve from
   * @template K - The type of the path key(s)
   * @param obj - The source object to retrieve the value from
   * @param path - The path to the desired value (can be a string, array, or key)
   * @param defaultValue - Optional default value to return if the path doesn't exist
   * @returns The value at the specified path, or defaultValue if not found
   * 
   * @example
   *