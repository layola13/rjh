/**
 * Sets the current reference value.
 * 
 * This function is typically used in React-like ref systems to update
 * the current property of a mutable ref object.
 * 
 * @param value - The value to be assigned to the current reference
 * @template T - The type of value being referenced
 */
export declare function setCurrentRef<T>(value: T): void;

/**
 * A mutable reference object that holds a value.
 * Commonly used for accessing DOM elements or persisting values across renders.
 * 
 * @template T - The type of the referenced value
 */
export interface MutableRefObject<T> {
  /**
   * The current value held by the reference.
   * Can be read and written directly.
   */
  current: T;
}

/**
 * Global reference object instance.
 * This object's current property is updated by the setCurrentRef function.
 */
export declare const I: MutableRefObject<unknown>;