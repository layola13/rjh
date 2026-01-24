/**
 * A simple JavaScript utility for conditionally joining classNames together.
 * 
 * @module classnames
 * @see {@link http://jedwatson.github.io/classnames}
 * @license MIT
 * @copyright (c) 2018 Jed Watson
 */

/**
 * Primitive value types that can be used as class names
 */
type ClassValue = string | number | boolean | undefined | null;

/**
 * Object with string keys where truthy values indicate the class should be included
 */
type ClassDictionary = Record<string, unknown>;

/**
 * Array of class values that will be recursively processed
 */
type ClassArray = ClassArgument[];

/**
 * Any valid argument type that can be passed to classNames function
 */
type ClassArgument = ClassValue | ClassDictionary | ClassArray;

/**
 * Conditionally joins class names together into a single space-separated string.
 * 
 * @param args - Any number of class values, objects, or arrays
 * @returns A space-separated string of class names
 * 
 * @example
 *