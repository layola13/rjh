/**
 * Stack trace cleanup utility
 * 
 * Removes stack trace lines from error stack strings.
 * Detects if the environment supports stack traces and conditionally
 * processes them by removing lines matching the stack frame pattern.
 */

/**
 * Extracts a method from an object in a bound fashion
 * @internal
 */
type UncurryThis = <T, Args extends unknown[], R>(
  fn: (this: T, ...args: Args) => R
) => (thisArg: T, ...args: Args) => R;

declare const uncurryThis: UncurryThis;

/**
 * Pattern matching a single stack trace line
 * Format: "\n    at [location]:[line]:[column]"
 */
const STACK_FRAME_PATTERN: RegExp = /\n\s*at [^:]*:[^\n]*/;

/**
 * Native String.prototype.replace bound for performance
 */
const stringReplace: (
  str: string,
  searchValue: string | RegExp,
  replaceValue: string
) => string = uncurryThis(String.prototype.replace);

/**
 * Checks if the current environment supports stack traces
 * by testing a known error stack format
 */
const supportsStackTraces: boolean = STACK_FRAME_PATTERN.test(
  String(Error("zxcasd").stack)
);

/**
 * Removes stack trace frames from an error stack string
 * 
 * @param stack - The error stack string to clean
 * @param framesToRemove - Number of stack frames to remove from the top
 * @returns The cleaned stack string with specified number of frames removed,
 *          or the original string if stack traces are not supported
 * 
 * @example
 *