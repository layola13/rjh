/**
 * Module: module_start
 * Original ID: start
 * 
 * Gets the start value/position.
 * This method returns the internal _start property.
 * 
 * @returns The start value
 */
declare function getStart<T = unknown>(): T;

/**
 * Alternative: If this is a class method
 */
declare class ModuleStart {
  /**
   * Internal start property
   * @private
   */
  private _start: unknown;

  /**
   * Gets the start value/position.
   * 
   * @returns The current start value
   */
  start(): unknown;
}

export { getStart, ModuleStart };