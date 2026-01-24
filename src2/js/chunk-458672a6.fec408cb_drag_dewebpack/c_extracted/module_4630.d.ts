/**
 * Creates a property descriptor object for use with Object.defineProperty.
 * 
 * @param flags - Bitwise flags controlling property characteristics:
 *   - Bit 0 (1): When set, property is non-enumerable
 *   - Bit 1 (2): When set, property is non-configurable
 *   - Bit 2 (4): When set, property is non-writable
 * @param value - The value associated with the property
 * @returns A PropertyDescriptor object with enumerable, configurable, writable, and value fields
 * 
 * @example
 *