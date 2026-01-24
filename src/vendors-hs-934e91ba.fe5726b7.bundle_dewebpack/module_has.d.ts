/**
 * Checks if a specified property exists in an object.
 * 
 * This utility function determines whether a given property name (key) exists
 * within the target object by using the `in` operator.
 * 
 * @module module_has
 * @originalId has
 * 
 * @template T - The type of the target object
 * @param {string | number | symbol} propertyKey - The property key to check for existence
 * @param {T} targetObject - The object to check for the property
 * @returns {boolean} Returns `true` if the property exists in the object, otherwise `false`
 * 
 * @example
 *