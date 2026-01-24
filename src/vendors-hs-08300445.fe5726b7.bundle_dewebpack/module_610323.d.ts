/**
 * Utility functions for prop validation, array operations, and type checking
 */

/**
 * Validates that a prop should not be set directly on a component
 * @param target - The object containing the prop
 * @param propName - The name of the prop to validate
 * @param componentName - The name of the component for error messaging
 * @returns An Error if the prop is set, undefined otherwise
 */
export function dontSetMe(
  target: Record<string, unknown>,
  propName: string,
  componentName: string
): Error | undefined {
  if (target[propName]) {
    return new Error(
      `Invalid prop ${propName} passed to ${componentName} - do not set this, set it on the child.`
    );
  }
  return undefined;
}

/**
 * Finds the first element in an array that satisfies the provided testing function
 * @template T - The type of elements in the array
 * @param array - The array to search
 * @param predicate - Function to test each element
 * @returns The first element that satisfies the predicate, or undefined if none found
 */
export function findInArray<T>(
  array: T[],
  predicate: (element: T, index: number, array: T[]) => boolean
): T | undefined {
  for (let index = 0, length = array.length; index < length; index++) {
    if (predicate(array[index], index, array)) {
      return array[index];
    }
  }
  return undefined;
}

/**
 * Parses a string or number to an integer in base 10
 * @param value - The value to parse
 * @returns The parsed integer value
 */
export function int(value: string | number): number {
  return parseInt(String(value), 10);
}

/**
 * Checks if a value is a function
 * @param value - The value to check
 * @returns True if the value is a function, false otherwise
 */
export function isFunction(value: unknown): value is Function {
  return (
    typeof value === "function" ||
    Object.prototype.toString.call(value) === "[object Function]"
  );
}

/**
 * Checks if a value is a valid number (not NaN)
 * @param value - The value to check
 * @returns True if the value is a valid number, false otherwise
 */
export function isNum(value: unknown): value is number {
  return typeof value === "number" && !isNaN(value);
}