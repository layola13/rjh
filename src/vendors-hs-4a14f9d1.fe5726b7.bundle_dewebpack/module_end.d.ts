/**
 * Module: module_end
 * Original ID: end
 */

/**
 * Gets the end value of this instance.
 * @returns The end value stored in the private _end property
 */
export function end<T>(): T;

/**
 * Alternative: If this is a class method
 */
export interface ModuleEnd<T = unknown> {
  /**
   * Private property storing the end value
   * @private
   */
  _end: T;

  /**
   * Gets the end value of this instance.
   * @returns The end value stored in the private _end property
   */
  end(): T;
}

export default ModuleEnd;