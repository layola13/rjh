/**
 * A polyfill constant for the well-known Symbol.iterator.
 * 
 * @remarks
 * This provides cross-environment compatibility for the iterator symbol.
 * In environments where Symbol is supported, it uses the native Symbol.iterator.
 * Otherwise, it falls back to the string literal "@@iterator".
 * 
 * @example
 *