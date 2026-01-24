/**
 * Observer interface representing a subscription that can receive values
 * @template T - The type of values the observer can receive
 */
interface Observer<T> {
  /** Indicates whether the observer has been closed/unsubscribed */
  closed: boolean;
  
  /**
   * Receives the next value in the sequence
   * @param value - The value to emit
   */
  next(value: T): void;
  
  /**
   * Signals successful completion of the sequence
   */
  complete(): void;
}

/**
 * Creates an observable function that emits all values from an array to an observer
 * 
 * @template T - The type of elements in the array
 * @param elements - Array of elements to emit
 * @returns A function that accepts an observer and emits all elements sequentially
 * 
 * @example
 *