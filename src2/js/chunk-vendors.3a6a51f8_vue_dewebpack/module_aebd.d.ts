/**
 * Creates a property descriptor object based on bitwise flags.
 * 
 * This utility function converts compact bitwise flags into a standard
 * ECMAScript PropertyDescriptor object used by Object.defineProperty.
 * 
 * @param flags - Bitwise flags controlling property attributes:
 *   - Bit 0 (0x1): When set, property is non-enumerable
 *   - Bit 1 (0x2): When set, property is non-configurable
 *   - Bit 2 (0x4): When set, property is non-writable
 * @param value - The value associated with the property
 * @returns A PropertyDescriptor object with enumerable, configurable, writable, and value fields
 * 
 * @example
 * // Create a writable, enumerable, configurable property
 * createPropertyDescriptor(0, 'myValue');
 * // Returns: { enumerable: true, configurable: true, writable: true, value: 'myValue' }
 * 
 * @example
 * // Create a read-only property (writable bit set)
 * createPropertyDescriptor(4, 'constant');
 * // Returns: { enumerable: true, configurable: true, writable: false, value: 'constant' }
 */
export function createPropertyDescriptor<T = unknown>(
  flags: number,
  value: T
): PropertyDescriptor {
  return {
    enumerable: !(flags & 1),
    configurable: !(flags & 2),
    writable: !(flags & 4),
    value
  };
}