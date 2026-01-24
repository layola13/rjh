/**
 * Clones a RegExp object, preserving its source pattern, flags, and lastIndex position.
 * 
 * This utility creates a new RegExp instance from an existing one, maintaining
 * the original pattern and execution state. Useful for creating independent
 * copies of regex objects in iterative or concurrent operations.
 * 
 * @param regexp - The source RegExp object to clone
 * @returns A new RegExp instance with the same pattern, flags, and lastIndex
 * 
 * @example
 *