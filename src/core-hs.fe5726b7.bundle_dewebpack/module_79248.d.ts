/**
 * Creates a new typed array instance with the specified length.
 * 
 * @param arrayType - The name or constructor identifier for the typed array type
 *                    (e.g., 'Uint8Array', 'Float32Array', 'Int32Array', etc.)
 * @param length - The desired length of the typed array. If 0, creates an empty array.
 * @returns A new typed array instance of the specified type and length
 * 
 * @example
 * ```typescript
 * const uint8Array = createTypedArray('Uint8Array', 10);
 * console.log(uint8Array.length);        // 10
 * console.log(uint8Array instanceof Uint8Array); // true
 * 
 * const float32Array = createTypedArray('Float32Array', 5);
 * console.log(float32Array.length);      // 5
 * console.log(float32Array instanceof Float32Array); // true
 * 
 * const emptyArray = createTypedArray('Int32Array', 0);
 * console.log(emptyArray.length);        // 0
 * ```
 */
declare function createTypedArray(arrayType: string, length: number): TypedArray;

type TypedArray = 
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array;

export default createTypedArray;