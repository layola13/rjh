/**
 * Sets a ref to a given value.
 * Supports both callback refs and ref objects.
 * 
 * @template T - The type of the element or value being referenced
 * @param ref - The ref to set (can be a callback function or a ref object)
 * @param value - The value to assign to the ref
 */
declare function setRef<T>(
  ref: ((instance: T | null) => void) | { current: T | null } | null | undefined,
  value: T | null
): void;

export default setRef;