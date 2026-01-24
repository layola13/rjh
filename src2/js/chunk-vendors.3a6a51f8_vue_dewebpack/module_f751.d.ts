/**
 * Object.assign polyfill module
 * 
 * This module extends the Object constructor with the assign method,
 * providing compatibility for environments that lack native support.
 * 
 * @module ObjectAssignPolyfill
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */

/**
 * Export function interface for the module
 * Represents the module factory function signature used in module bundlers
 * 
 * @param moduleExports - The exports object of the current module
 * @param moduleDefinition - Module metadata and dependencies
 * @param requireFunction - Function to load dependencies by module ID
 */
export type ModuleFactory = (
  moduleExports: Record<string, unknown>,
  moduleDefinition: ModuleMetadata,
  requireFunction: RequireFunction
) => void;

/**
 * Module metadata interface
 * Contains information about the module's dependencies and configuration
 */
interface ModuleMetadata {
  /** Unique identifier for this module */
  id: string;
  /** Whether this module has been loaded */
  loaded: boolean;
  /** List of module IDs this module depends on */
  dependencies?: string[];
}

/**
 * Require function type
 * Used to dynamically load other modules by their ID
 * 
 * @param moduleId - The unique identifier of the module to load
 * @returns The exported value from the required module
 */
type RequireFunction = (moduleId: string) => unknown;

/**
 * Export handler interface
 * Provides methods to define module exports with different strategies
 */
interface ExportHandler {
  /** Static export flag - exports are defined at module load time */
  readonly S: number;
  /** Forced export flag - export regardless of environment checks */
  readonly F: number;
  
  /**
   * Register an export with specified flags
   * 
   * @param flags - Bitwise combination of export strategy flags (S, F, etc.)
   * @param targetName - The global object name to attach exports to (e.g., "Object")
   * @param exports - Object containing the properties to export
   */
  (flags: number, targetName: string, exports: Record<string, unknown>): void;
}

/**
 * Object.assign implementation function type
 * Copies enumerable own properties from source objects to a target object
 * 
 * @template T - The type of the target object
 * @template U - The types of the source objects
 * @param target - The target object to copy properties to
 * @param sources - One or more source objects to copy properties from
 * @returns The modified target object with properties from all sources
 */
type ObjectAssignFunction = <T extends object, U extends object[]>(
  target: T,
  ...sources: U
) => T & U[number];

declare global {
  interface ObjectConstructor {
    /**
     * Copy the values of all enumerable own properties from one or more source objects to a target object
     * 
     * @param target - The target object — what to apply the sources' properties to
     * @param sources - The source object(s) — objects containing the properties you want to apply
     * @returns The target object with properties from the source objects
     */
    assign<T extends object, U extends object[]>(
      target: T,
      ...sources: U
    ): T & U[number];
  }
}

export {};