/**
 * Symbol used for custom inspect behavior in Node.js
 * 
 * This module exports a symbol that allows objects to define custom
 * inspection behavior when used with Node.js util.inspect() function.
 * 
 * @see https://nodejs.org/api/util.html#util_util_inspect_custom
 */

/**
 * The well-known symbol for custom object inspection in Node.js.
 * 
 * When defined as a method on an object, this symbol allows customization
 * of the string representation returned by util.inspect().
 * 
 * @remarks
 * - Returns Symbol.for("nodejs.util.inspect.custom") if Symbol and Symbol.for are available
 * - Returns undefined in environments that don't support Symbol
 * 
 * @example
 *