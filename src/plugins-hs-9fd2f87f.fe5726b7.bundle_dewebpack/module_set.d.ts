/**
 * Module: module_set
 * Original ID: set
 * 
 * Sets the remaining count for the left side
 */

/**
 * Sets the left count property
 * @param count - The count value to set
 */
declare function setLeftCount(count: number): void;

/**
 * Alternative: If this is a class method
 */
declare class ModuleSet {
  /**
   * The remaining count for the left side
   */
  private _leftCount: number;

  /**
   * Sets the left count
   * @param count - The count value to set
   */
  setLeftCount(count: number): void;
}

export { ModuleSet, setLeftCount };