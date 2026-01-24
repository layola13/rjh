/**
 * Runtime helper that throws a TypeError when attempting to assign to a read-only property.
 * This is typically used by TypeScript/Babel to enforce immutability at runtime.
 * 
 * @param propertyName - The name of the read-only property that was attempted to be modified
 * @throws {TypeError} Always throws with message indicating the property is read-only
 * 
 * @example
 *