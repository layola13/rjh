/**
 * Clones a special object based on its type tag.
 * 
 * Handles cloning of various built-in JavaScript types including:
 * - ArrayBuffer
 * - Boolean/Date objects
 * - DataView
 * - Typed Arrays (Float32Array, Uint8Array, etc.)
 * - Map/Set
 * - Number/String objects
 * - RegExp
 * - Symbol objects
 * 
 * @param value - The value to clone
 * @param typeTag - The object type tag (e.g., "[object ArrayBuffer]")
 * @param isDeep - Whether to perform a deep clone
 * @returns A clone of the input value
 */
declare function cloneByTypeTag<T>(
  value: T,
  typeTag: string,
  isDeep: boolean
): T;

export = cloneByTypeTag;