/**
 * Native FinalizationRegistry for automatic resource cleanup
 * 
 * This module provides a singleton FinalizationRegistry instance that automatically
 * deletes objects when they are garbage collected, if they haven't been deleted already.
 * 
 * @module NativeFinalizationRegistry
 */

/**
 * Interface for objects that can be registered with the FinalizationRegistry
 * Must implement both isDeleted() and delete() methods for cleanup
 */
interface DeletableObject {
  /**
   * Checks if the object has already been deleted
   * @returns true if the object is deleted, false otherwise
   */
  isDeleted(): boolean;

  /**
   * Deletes/cleans up the object's resources
   */
  delete(): void;
}

/**
 * Global FinalizationRegistry instance for automatic cleanup of deletable objects
 * 
 * When an object is garbage collected, the registry calls its delete() method
 * if it hasn't been deleted already. Returns undefined if FinalizationRegistry
 * is not supported in the current environment.
 * 
 * @example
 *