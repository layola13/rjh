const symbolToStringTag = Symbol.toStringTag;

const objectProto = Object.prototype;
const hasOwnProperty = objectProto.hasOwnProperty;
const nativeObjectToString = objectProto.toString;

/**
 * Gets the `toStringTag` of `value`.
 * 
 * @param value - The value to query
 * @returns The resolved toStringTag
 */
export function getRawTag(value: unknown): string {
  const hasTag = hasOwnProperty.call(value, symbolToStringTag);
  const tag = (value as Record<symbol, unknown>)[symbolToStringTag];
  
  let unmasked = false;
  try {
    (value as Record<symbol, undefined>)[symbolToStringTag] = undefined;
    unmasked = true;
  } catch (error) {
    // Some environments prevent modifying built-in symbol properties
  }
  
  const result = nativeObjectToString.call(value);
  
  if (unmasked) {
    if (hasTag) {
      (value as Record<symbol, unknown>)[symbolToStringTag] = tag;
    } else {
      delete (value as Record<symbol, unknown>)[symbolToStringTag];
    }
  }
  
  return result;
}