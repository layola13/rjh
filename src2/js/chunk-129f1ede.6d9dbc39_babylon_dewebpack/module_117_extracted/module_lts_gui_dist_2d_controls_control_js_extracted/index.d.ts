/**
 * Module exports for get and set operations
 * 
 * This module provides utility functions for getting and setting values,
 * typically used for object property access or state management.
 */

/**
 * Retrieves a value from a nested object structure using a path
 * 
 * @template T - The type of the value to retrieve
 * @param obj - The source object to get the value from
 * @param path - The path to the property (e.g., 'user.profile.name' or ['user', 'profile', 'name'])
 * @param defaultValue - Optional default value to return if the path is not found
 * @returns The value at the specified path, or the default value if not found
 * 
 * @example
 *