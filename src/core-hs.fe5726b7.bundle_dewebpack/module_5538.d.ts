/**
 * Validates that a value is not a regular expression.
 * 
 * @throws {TypeError} If the value is a regular expression
 * @param value - The value to validate
 * @returns The original value if it's not a regular expression
 * 
 * @example
 * ```typescript
 * const str = "hello world";
 * const num = 42;
 * const regex = /test/;
 * 
 * validateNotRegExp(str);   // OK, returns "hello world"
 * validateNotRegExp(num);   // OK, returns 42
 * validateNotRegExp(regex); // Throws TypeError: Regular expression not allowed
 * ```
 */
declare function validateNotRegExp<T>(value: T): T;

export default validateNotRegExp;
