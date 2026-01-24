/**
 * Module: module_set
 * Original ID: set
 * 
 * Represents a set-like data structure with seed initialization capability.
 */

/**
 * Constructor function for creating a seeded set instance.
 * Initializes the instance with a seed value and marks it as having a seed.
 * 
 * @param seed - The seed value used to initialize the set
 */
declare function ModuleSet<T = unknown>(seed: T): void;

/**
 * Interface representing the internal state of a ModuleSet instance.
 */
declare interface ModuleSetInstance<T = unknown> {
  /**
   * Indicates whether this instance has been initialized with a seed value.
   */
  hasSeed: boolean;
  
  /**
   * The internal seed value used for initialization.
   * @private
   */
  _seed: T;
}

/**
 * Type alias for the ModuleSet constructor with instance type.
 */
declare type ModuleSetConstructor = {
  new <T = unknown>(seed: T): ModuleSetInstance<T>;
  <T = unknown>(seed: T): ModuleSetInstance<T>;
};

export { ModuleSet, ModuleSetInstance, ModuleSetConstructor };
export default ModuleSet;