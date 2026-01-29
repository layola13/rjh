const MAX_SAFE_INDEX = 9007199254740991;

/**
 * Validates that an index does not exceed the maximum safe integer value.
 * @param index - The index value to validate
 * @returns The validated index
 * @throws {TypeError} When index exceeds maximum allowed value
 */
export function validateIndex(index: number): number {
    if (index > MAX_SAFE_INDEX) {
        throw new TypeError("Maximum allowed index exceeded");
    }
    return index;
}