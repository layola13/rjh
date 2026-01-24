/**
 * Module: module_top
 * Original ID: top
 */

/**
 * Represents the top module functionality
 */
declare class ModuleTop {
  /**
   * Internal state property
   */
  private sp: unknown;

  /**
   * Returns the processed value of the internal state
   * @returns The result of processing the sp property
   */
  top(): unknown;
}

/**
 * Processing function for state values
 * @param value - The value to be processed
 * @returns The processed result
 */
declare function s(value: unknown): unknown;

export { ModuleTop, s };