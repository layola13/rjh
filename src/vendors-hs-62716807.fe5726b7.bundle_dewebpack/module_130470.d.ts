/**
 * Defines a property on the global object with fallback to direct assignment.
 * 
 * This utility attempts to use Object.defineProperty to set a configurable and writable
 * property on a global/shared object. If the definition fails (e.g., in restricted environments),
 * it falls back to direct property assignment.
 * 
 * @param propertyKey - The name of the property to define on the global object
 * @param propertyValue - The value to assign to the property
 * @returns The value that was assigned
 * 
 * @example
 *