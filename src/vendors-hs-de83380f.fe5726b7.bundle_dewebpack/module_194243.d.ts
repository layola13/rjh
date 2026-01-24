/**
 * Type guard utility that determines the type of a value at runtime.
 * 
 * This utility provides enhanced typeof behavior with proper Symbol detection.
 * When Symbol is available, it can distinguish Symbol primitives from other types.
 * 
 * @param value - The value to check the type of
 * @returns A string representing the type of the value
 * 
 * @example
 *