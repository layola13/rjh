/**
 * Webpack Bundle Index
 * 
 * This module serves as the main entry point for object property manipulation utilities.
 * It provides safe getter and setter functions for working with nested object properties.
 */

/**
 * Safely retrieves a nested property value from an object using a property path.
 * 
 * @template T - The type of the object being accessed
 * @template K - The type of the property key or path
 * @param target - The target object to retrieve the property from
 * @param path - The property path (can be string, array of keys, or symbol)
 * @param defaultValue - Optional default value to return if the property is not found
 * @returns The value at the specified path, or the default value if not found
 * 
 * @example
 *