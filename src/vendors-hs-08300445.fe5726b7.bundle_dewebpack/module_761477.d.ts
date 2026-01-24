/**
 * Creates a proxy object that wraps all function properties of the source object,
 * applying a transform function to their return values.
 * 
 * @template T - The type of the source object
 * @template R - The return type of the transform function
 * 
 * @param source - The source object containing functions to be wrapped
 * @param transform - A transform function that processes the return value of each wrapped function
 * @returns A new object with the same function properties, but with transformed return values
 * 
 * @example
 *