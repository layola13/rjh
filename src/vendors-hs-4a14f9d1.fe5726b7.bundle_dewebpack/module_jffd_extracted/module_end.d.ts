/**
 * Module: module_end
 * Original ID: end
 */

/**
 * Represents a class that manages an end state or value.
 */
declare class ModuleEnd {
  /**
   * Internal end value or state
   * @private
   */
  private _end: unknown;

  /**
   * Gets the end value
   * @returns The current end value
   */
  end(): unknown;
}

export default ModuleEnd;