/**
 * Webpack Bundle Index
 * 
 * This module serves as the main entry point for the bundle,
 * re-exporting functionality from individual modules.
 */

/**
 * Module reference types and utilities
 * Contains reference handling and module resolution functionality
 */
export * from './module_ref';

/**
 * Module value types and utilities
 * Contains value processing and manipulation functionality
 */
export * from './module_value';

/**
 * Reference type for module identifiers
 */
export type ModuleRef = string | number | symbol;

/**
 * Generic module value container
 * @template T - The type of value contained in the module
 */
export interface ModuleValue<T = unknown> {
  /** The actual value stored in the module */
  readonly value: T;
  /** Optional metadata associated with the value */
  readonly metadata?: Record<string, unknown>;
}

/**
 * Module registry for managing module references and values
 */
export interface ModuleRegistry {
  /**
   * Retrieve a module value by its reference
   * @param ref - The module reference identifier
   * @returns The module value if found, undefined otherwise
   */
  get<T = unknown>(ref: ModuleRef): ModuleValue<T> | undefined;
  
  /**
   * Register a new module value
   * @param ref - The module reference identifier
   * @param value - The value to register
   */
  set<T>(ref: ModuleRef, value: ModuleValue<T>): void;
  
  /**
   * Check if a module reference exists
   * @param ref - The module reference identifier
   * @returns True if the module exists, false otherwise
   */
  has(ref: ModuleRef): boolean;
}