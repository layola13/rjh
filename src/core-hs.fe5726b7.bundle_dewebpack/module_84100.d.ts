/**
 * Set-like record adapter module.
 * Provides a wrapper for objects that implement Set-like interfaces.
 * Original Module ID: 84100
 */

/**
 * Represents a Set-like object with standard Set operations.
 * @template T The type of elements in the set
 */
interface SetLike<T> {
  /** The number of elements in the set */
  size: number;
  /** Method to check if an element exists in the set */
  has: (value: T) => boolean;
  /** Method to get an iterator of keys in the set */
  keys: () => Iterator<T>;
}

/**
 * Internal Set record wrapper class.
 * Adapts Set-like objects to provide consistent iterator and inclusion checking.
 * @template T The type of elements in the set
 */
declare class SetRecord<T> {
  /** The underlying Set-like object */
  private readonly set: SetLike<T>;
  
  /** The validated size of the set (non-negative) */
  readonly size: number;
  
  /** Bound has method from the original set */
  private readonly has: (value: T) => boolean;
  
  /** Bound keys method from the original set */
  private readonly keys: () => Iterator<T>;

  /**
   * Constructs a new SetRecord wrapper.
   * @param set The Set-like object to wrap
   * @param size The validated size (must be non-negative)
   * @param has The bound has method
   * @param keys The bound keys method
   */
  constructor(
    set: SetLike<T>,
    size: number,
    has: (value: T) => boolean,
    keys: () => Iterator<T>
  );

  /**
   * Returns an iterator for the set elements.
   * @returns An iterator over the set values
   */
  getIterator(): Iterator<T>;

  /**
   * Checks if the set includes a specific value.
   * @param value The value to search for
   * @returns True if the value exists in the set, false otherwise
   */
  includes(value: T): boolean;
}

/**
 * Creates a validated Set record from a Set-like object.
 * 
 * Validates that the input has a valid numeric size and wraps it in a SetRecord
 * with bound methods for consistent behavior.
 * 
 * @template T The type of elements in the set
 * @param setLike An object implementing Set-like interface (size, has, keys)
 * @returns A SetRecord wrapper with validated size and bound methods
 * @throws {TypeError} If the size property is NaN or invalid
 * 
 * @example
 * const mySet = new Set([1, 2, 3]);
 * const record = getSetRecord(mySet);
 * console.log(record.size); // 3
 * console.log(record.includes(2)); // true
 */
export default function getSetRecord<T>(setLike: SetLike<T>): SetRecord<T>;