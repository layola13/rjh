/**
 * Creates or defines a property on an object.
 * 
 * If the property already exists, uses Object.defineProperty to define it with a descriptor.
 * Otherwise, performs a simple assignment.
 * 
 * @param target - The target object on which to define the property
 * @param propertyKey - The name of the property to define
 * @param value - The value to assign to the property
 * 
 * @example
 *