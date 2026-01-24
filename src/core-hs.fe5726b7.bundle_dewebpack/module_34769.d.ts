/**
 * Creates a property descriptor object from a bitmap of flags.
 * 
 * This utility converts bitwise flags into a standard ECMAScript property descriptor.
 * The flags use a bitmap where:
 * - Bit 0 (value 1): NOT enumerable
 * - Bit 1 (value 2): NOT configurable
 * - Bit 2 (value 4): NOT writable
 * 
 * @param flags - Bitmap of property descriptor flags (inverted logic)
 * @param value - The value associated with the property
 * @returns A property descriptor object compatible with Object.defineProperty
 * 
 * @example
 *