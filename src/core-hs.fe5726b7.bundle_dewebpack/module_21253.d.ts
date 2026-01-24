/**
 * Creates a proxy property on an object that delegates to another object's property.
 * This utility allows you to expose a property from one object through another object,
 * with automatic getter/setter delegation.
 * 
 * @param target - The target object where the proxy property will be defined
 * @param source - The source object that contains the actual property
 * @param propertyKey - The name of the property to proxy
 * 
 * @example
 *