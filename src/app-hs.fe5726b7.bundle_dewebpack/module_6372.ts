const INDEX_PATTERN = /^(?:0|[1-9]\d*)$/;
const MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if the given value is a valid array-like index within the specified length.
 * 
 * @param value - The value to check
 * @param length - The maximum length (exclusive upper bound)
 * @returns True if the value is a valid index, false otherwise
 */
export function isIndex(value: unknown, length: number = MAX_SAFE_INTEGER): boolean {
    const valueType = typeof value;
    
    return !!(length) && 
           (valueType === "number" || (valueType !== "symbol" && INDEX_PATTERN.test(value as string))) && 
           (value as number) > -1 && 
           (value as number) % 1 === 0 && 
           (value as number) < length;
}

export default isIndex;