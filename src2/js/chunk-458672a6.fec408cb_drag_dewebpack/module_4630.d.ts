/**
 * Creates a property descriptor object based on bitwise flags.
 * 
 * This utility function converts a bitwise flag representation into a standard
 * ECMAScript property descriptor object used by Object.defineProperty and related APIs.
 * 
 * @param flags - Bitwise flags controlling descriptor attributes:
 *                - Bit 0 (value 1): When set, property is NOT enumerable
 *                - Bit 1 (value 2): When set, property is NOT configurable
 *                - Bit 2 (value 4): When set, property is NOT writable
 * @param value - The value associated with the property
 * @returns A property descriptor object compatible with Object.defineProperty
 * 
 * @example
 * // Create a writable, enumerable, configurable property
 * createPropertyDescriptor(0, 'myValue');
 * // Returns: { enumerable: true, configurable: true, writable: true, value: 'myValue' }
 * 
 * @example
 * // Create a read-only property (bit 2 set)
 * createPropertyDescriptor(4, 'constant');
 * // Returns: { enumerable: true, configurable: true, writable: false, value: 'constant' }
 */
export function createPropertyDescriptor<T = unknown>(
  flags: number,
  value: T
): PropertyDescriptor {
  const FLAG_NON_ENUMERABLE = 1;
  const FLAG_NON_CONFIGURABLE = 2;
  const FLAG_NON_WRITABLE = 4;

  return {
    enumerable: !(flags & FLAG_NON_ENUMERABLE),
    configurable: !(flags & FLAG_NON_CONFIGURABLE),
    writable: !(flags & FLAG_NON_WRITABLE),
    value
  };
}

export default createPropertyDescriptor;