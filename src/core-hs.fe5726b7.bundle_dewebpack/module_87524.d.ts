/**
 * Checks if a function throws an error when executed.
 * 
 * @param fn - The function to test for errors
 * @returns `true` if the function throws an error, `false` if it executes successfully
 * 
 * @example
 * ```typescript
 * const throwingFn = () => { throw new Error('test error'); };
 * const normalFn = () => { return 42; };
 * 
 * console.log(fails(throwingFn)); // true
 * console.log(fails(normalFn));   // false
 * ```
 */
declare function fails(fn: () => any): boolean;

export default fails;