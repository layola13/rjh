/**
 * Symbol for custom inspection method
 * Imported from module "44a2"
 */
declare const SYMBOL_TO_STRING_TAG: symbol;

/**
 * Maximum number of array elements to display before truncating
 * @default 10
 */
declare const MAX_ARRAY_ELEMENTS: 10;

/**
 * Maximum depth for nested object inspection
 * @default 2
 */
declare const MAX_RECURSION_DEPTH: 2;

/**
 * Custom inspection function type
 */
type InspectFunction = () => string | unknown;

/**
 * Object with custom inspection capability
 */
interface Inspectable {
  [key: string | symbol]: unknown;
  inspect?: InspectFunction;
}

/**
 * Main export: Inspects and formats any value into a readable string representation.
 * Handles primitives, functions, objects, arrays, and circular references.
 * 
 * @param value - The value to inspect and format
 * @returns A formatted string representation of the value
 * 
 * @example
 *