/**
 * Defines a property on an object with configurable attributes.
 * If the property already exists, uses Object.defineProperty for proper configuration.
 * Otherwise, performs a simple assignment.
 * 
 * @param target - The object on which to define the property
 * @param propertyKey - The name of the property to define or modify
 * @param value - The value associated with the property
 * @returns The modified target object
 * 
 * @example
 *