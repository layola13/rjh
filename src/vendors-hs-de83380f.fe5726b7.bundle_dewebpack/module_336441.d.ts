/**
 * Type checking utility that determines the type of a value.
 * Returns "symbol" for symbol types when Symbol is supported,
 * otherwise falls back to standard typeof behavior.
 * 
 * @param value - The value to check the type of
 * @returns The type of the value as a string
 * 
 * @example
 *