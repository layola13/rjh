/**
 * Safely retrieves and invokes a property descriptor method (get/set/value) from an object.
 * 
 * @description
 * This utility attempts to access a property descriptor of an object and invoke
 * a specified method on it. Commonly used to safely call getters, setters, or
 * retrieve values from property descriptors while handling errors gracefully.
 * 
 * @template T - The type of the object
 * @template K - The key type of the property
 * @template D - The descriptor method key ('get' | 'set' | 'value' | 'writable' | 'enumerable' | 'configurable')
 * 
 * @param target - The target object to inspect
 * @param propertyKey - The property key to retrieve the descriptor for
 * @param descriptorMethod - The descriptor method/property to access and invoke ('get', 'set', 'value', etc.)
 * 
 * @returns The result of invoking the descriptor method, or undefined if an error occurs
 * 
 * @example
 *