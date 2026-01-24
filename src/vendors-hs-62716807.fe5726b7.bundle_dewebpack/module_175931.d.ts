/**
 * Creates a property descriptor object based on bitwise flags.
 * 
 * This function converts compact bitwise attribute flags into a standard
 * ECMAScript property descriptor object used by Object.defineProperty.
 * 
 * @param attributes - Bitwise flags controlling property attributes:
 *   - Bit 0 (value 1): When set, property is NOT enumerable
 *   - Bit 1 (value 2): When set, property is NOT configurable
 *   - Bit 2 (value 4): When set, property is NOT writable
 * @param value - The value associated with the property
 * @returns A property descriptor object with enumerable, configurable, writable, and value fields
 * 
 * @example
 * // Create a non-enumerable, configurable, writable property
 * createPropertyDescriptor(1, 'myValue');
 * // Returns: { enumerable: false, configurable: true, writable: true, value: 'myValue' }
 * 
 * @example
 * // Create a fully immutable property (non-writable, non-configurable)
 * createPropertyDescriptor(6, 42);
 * // Returns: { enumerable: true, configurable: false, writable: false, value: 42 }
 */
export function createPropertyDescriptor<T = unknown>(
  attributes: number,
  value: T
): PropertyDescriptor {
  return {
    enumerable: !(attributes & 1),
    configurable: !(attributes & 2),
    writable: !(attributes & 4),
    value
  };
}