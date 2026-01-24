/**
 * Symbol for iterator protocol.
 * Returns the built-in Symbol.iterator if available (ES2015+),
 * otherwise falls back to the string literal "@@iterator" for older environments.
 * 
 * This constant is commonly used to implement or check for iterable objects.
 * 
 * @example
 *