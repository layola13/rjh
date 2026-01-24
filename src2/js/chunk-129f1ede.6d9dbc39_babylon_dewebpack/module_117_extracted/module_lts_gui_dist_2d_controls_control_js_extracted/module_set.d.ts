/**
 * Module: module_set
 * Original ID: set
 * 
 * Sets the read-only state of the module.
 * This method controls whether the module can be modified or is locked for editing.
 * 
 * @param isReadOnly - Boolean flag indicating whether the module should be read-only
 *                     true: module is read-only and cannot be modified
 *                     false: module can be modified
 * @returns void
 * 
 * @example
 * // Make module read-only
 * setReadOnly(true);
 * 
 * @example
 * // Allow modifications
 * setReadOnly(false);
 */
declare function setReadOnly(isReadOnly: boolean): void;

/**
 * Interface representing a module with read-only state management
 */
interface ModuleSet {
  /**
   * Internal flag tracking the read-only state of the module
   * @private
   */
  _isReadOnly: boolean;
  
  /**
   * Sets whether this module should be in read-only mode
   * @param isReadOnly - True to make read-only, false to allow modifications
   */
  setReadOnly(isReadOnly: boolean): void;
}

export { setReadOnly, ModuleSet };