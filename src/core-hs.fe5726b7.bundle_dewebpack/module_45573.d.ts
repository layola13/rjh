/**
 * Checks if an object is extensible (new properties can be added to it).
 * 
 * This function provides a cross-environment implementation that handles:
 * - Legacy environments where Object.isExtensible might throw on primitives
 * - Special cases like ArrayBuffer in certain JavaScript engines
 * - Fallback behavior for environments with known bugs
 * 
 * @param target - The value to check for extensibility
 * @returns `true` if the object is extensible, `false` otherwise
 * 
 * @example
 *