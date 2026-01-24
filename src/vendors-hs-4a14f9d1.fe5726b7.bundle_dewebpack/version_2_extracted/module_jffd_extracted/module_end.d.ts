/**
 * Gets the end value/position.
 * This method returns the internal _end property.
 * 
 * @returns The end value, type depends on the implementation context
 * @remarks This is typically used to retrieve the ending boundary or position
 */
declare function getEnd<T = unknown>(): T;

/**
 * Interface representing an object with an end property.
 * This is commonly used for range-based structures or iterators.
 */
interface HasEnd<T = unknown> {
  /**
   * Internal end property.
   * @internal
   */
  _end: T;
  
  /**
   * Gets the end value.
   * @returns The end value
   */
  end(): T;
}