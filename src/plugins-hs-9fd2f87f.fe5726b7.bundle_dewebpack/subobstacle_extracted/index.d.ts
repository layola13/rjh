/**
 * Module Bundle Type Definitions
 * 
 * This file contains type definitions for the bundled modules.
 * Each module is accessible through its exported identifier.
 */

/**
 * Module N - Core module functionality
 */
export declare const n: unknown;

/**
 * Module S - Secondary module functionality
 */
export declare const s: unknown;

/**
 * Module F - Function utilities module
 */
export declare const f: unknown;

/**
 * Module Value - Value management module
 */
export declare const value: unknown;

/**
 * Module E - Extended functionality module
 */
export declare const e: unknown;

/**
 * Bundle metadata interface
 */
export interface BundleMetadata {
  /**
   * Module identifier mapping
   */
  readonly modules: {
    readonly n: string;
    readonly s: string;
    readonly f: string;
    readonly value: string;
    readonly e: string;
  };
  
  /**
   * Bundle version
   */
  readonly version?: string;
}

/**
 * Module loader interface
 */
export interface ModuleLoader {
  /**
   * Load a module by its identifier
   * @param moduleId - The module identifier to load
   * @returns The loaded module
   */
  load(moduleId: string): unknown;
  
  /**
   * Check if a module is loaded
   * @param moduleId - The module identifier to check
   * @returns True if the module is loaded
   */
  isLoaded(moduleId: string): boolean;
}