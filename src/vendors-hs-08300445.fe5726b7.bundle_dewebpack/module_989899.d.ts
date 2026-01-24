/**
 * Checks if a value is a React Fragment element.
 * 
 * A React Fragment is a special element type that allows grouping children
 * without adding extra nodes to the DOM. This function verifies if the given
 * value matches the Fragment signature by checking:
 * - It's an object
 * - It has a $$typeof property matching React element symbols
 * - Its type property matches the Fragment symbol
 * 
 * @param value - The value to check
 * @returns True if the value is a React Fragment, false otherwise
 * 
 * @example
 *