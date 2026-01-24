/**
 * Module: module_start
 * Original ID: start
 * 
 * Retrieves the start value/position from the instance.
 * @returns The internal _start property value
 */
declare function getStart<T = unknown>(): T;

/**
 * Alternative: If this is a class method
 */
declare class SomeClass<T = unknown> {
  /**
   * Internal start property
   * @private
   */
  private _start: T;

  /**
   * Gets the start value
   * @returns The start value stored in this instance
   */
  getStart(): T;
}

/**
 * Alternative: If this is an interface
 */
interface HasStart<T = unknown> {
  /** Internal start storage */
  _start: T;
  
  /** 
   * Retrieves the start value
   * @returns The start value
   */
  (): T;
}