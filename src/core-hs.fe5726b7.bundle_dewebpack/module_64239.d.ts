/**
 * Creates or defines a property on an object.
 * If the property exists, it uses Object.defineProperty to set it as a data descriptor.
 * Otherwise, it directly assigns the value to the property.
 * 
 * @param target - The target object on which to create or define the property
 * @param key - The property key (will be converted to a property key type)
 * @param value - The value to assign to the property
 * 
 * @example
 *