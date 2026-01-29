const MAX_SAFE_INTEGER = 9007199254740991;
const INDEX_PATTERN = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if value is a valid array-like index.
 * 
 * @param value - The value to check
 * @param maxLength - The upper bounds of a valid index (default: MAX_SAFE_INTEGER)
 * @returns Returns true if value is a valid index, else false
 */
export function isIndex(value: unknown, maxLength: number = MAX_SAFE_INTEGER): boolean {
    const valueType = typeof value;
    
    return (
        maxLength > 0 &&
        (valueType === "number" || (valueType !== "symbol" && INDEX_PATTERN.test(String(value)))) &&
        Number(value) > -1 &&
        Number(value) % 1 === 0 &&
        Number(value) < maxLength
    );
}