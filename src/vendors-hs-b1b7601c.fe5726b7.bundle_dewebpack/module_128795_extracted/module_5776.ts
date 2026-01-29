const MAX_SAFE_INTEGER = 9007199254740991;
const INTEGER_PATTERN = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if the given value is a valid array-like index.
 * 
 * @param value - The value to check
 * @param maxLength - The maximum length to validate against (defaults to MAX_SAFE_INTEGER)
 * @returns True if the value is a valid index, false otherwise
 */
export function isIndex(value: unknown, maxLength: number = MAX_SAFE_INTEGER): boolean {
    const valueType = typeof value;
    
    return !!(maxLength) && 
           (valueType === "number" || (valueType !== "symbol" && INTEGER_PATTERN.test(String(value)))) && 
           (value as number) > -1 && 
           (value as number) % 1 === 0 && 
           (value as number) < maxLength;
}