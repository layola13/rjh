/**
 * Safely converts a value to its string representation.
 * If the conversion fails, returns the fallback string "Object".
 * 
 * @param value - The value to convert to a string
 * @returns The string representation of the value, or "Object" if conversion fails
 * 
 * @example
 * ```typescript
 * console.log(safeToString(123));           // "123"
 * console.log(safeToString("hello"));       // "hello"
 * console.log(safeToString(null));          // "Object" (fallback)
 * console.log(safeToString(undefined));     // "Object" (fallback)
 * console.log(safeToString({ a: 1 }));      // "[object Object]" or "Object"
 * ```
 */
declare function safeToString(value: any): string;

export default safeToString;