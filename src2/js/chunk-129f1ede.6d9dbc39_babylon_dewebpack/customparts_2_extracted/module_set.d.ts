/**
 * Set module for managing fur time properties
 * @module module_set
 */

/**
 * Interface for objects with fur time management capabilities
 */
export interface FurTimeManager {
  /**
   * Internal storage for fur time value
   * @private
   */
  _furTime: number;

  /**
   * Sets the fur time value
   * @param time - The time value to set for fur rendering
   */
  setFurTime(time: number): void;
}

/**
 * Class that manages fur time settings
 */
export declare class ModuleSet implements FurTimeManager {
  _furTime: number;
  
  /**
   * Constructor to initialize fur time
   * @param time - Initial fur time value
   */
  constructor(time: number);
}