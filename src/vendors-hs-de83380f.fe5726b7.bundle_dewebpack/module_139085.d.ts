/**
 * Error handler for invalid destructuring operations.
 * 
 * This function is thrown when attempting to destructure a non-iterable instance.
 * Non-array objects must implement the [Symbol.iterator]() method to be iterable.
 * 
 * @throws {TypeError} Always throws a TypeError with a descriptive message
 * @returns {never} This function never returns as it always throws
 * 
 * @example
 *