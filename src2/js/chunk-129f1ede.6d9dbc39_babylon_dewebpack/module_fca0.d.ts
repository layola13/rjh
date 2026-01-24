/**
 * Number.isFinite polyfill
 * 
 * Determines whether the passed value is a finite number.
 * This is a more robust version than the global isFinite function,
 * as it doesn't coerce the argument to a number first.
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite
 */

declare global {
  interface NumberConstructor {
    /**
     * Determines whether the passed value is a finite number.
     * 
     * Unlike the global `isFinite()` function, this method doesn't 
     * convert the parameter to a number. This means only values of 
     * the type number that are also finite return true.
     * 
     * @param value - The value to be tested for finiteness
     * @returns `true` if the given value is a finite number; otherwise, `false`
     * 
     * @example
     *