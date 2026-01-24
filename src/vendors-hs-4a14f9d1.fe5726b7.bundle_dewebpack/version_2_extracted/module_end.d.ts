/**
 * Module: module_end
 * Original ID: end
 * 
 * Gets the end value/position of the current instance.
 * This is typically used to retrieve the ending boundary or limit.
 * 
 * @returns The end value stored in the instance
 */
declare function end<T = unknown>(): T;

/**
 * Alternative class-based declaration if this is a method within a class
 */
declare class EndModule<T = unknown> {
  /**
   * Internal end value storage
   * @private
   */
  private _end: T;

  /**
   * Retrieves the end value of this instance.
   * 
   * @returns The end value
   */
  end(): T;
}

export { end, EndModule };