/**
 * Gets the start value
 * @returns The start value
 */
declare function getStart(): unknown;

/**
 * Alternative: If this is a class method
 */
declare class ModuleStart {
  /**
   * Private start property
   */
  private _start;

  /**
   * Gets the start value
   * @returns The start value
   */
  start(): unknown;
}