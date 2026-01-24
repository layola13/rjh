/**
 * Deep equality comparison function with circular reference detection and optional depth limit.
 * 
 * @param value1 - The first value to compare
 * @param value2 - The second value to compare
 * @param limitDepth - Whether to limit comparison depth to 1 level (default: false)
 * @returns True if values are deeply equal, false otherwise
 * 
 * @remarks
 * - Handles primitive types, arrays, and plain objects
 * - Detects and warns about circular references
 * - Can optionally limit comparison depth for performance
 * 
 * @example
 *