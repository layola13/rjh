/**
 * Core module for function redefining and source inspection
 * Provides utilities to safely override functions while preserving metadata
 */

/**
 * Original source code of a function, used for inspection purposes
 */
declare const FUNCTION_SOURCE_KEY: unique symbol;

/**
 * Interface representing a function with attached source metadata
 */
interface FunctionWithSource extends Function {
  [FUNCTION_SOURCE_KEY]?: string;
  name?: string;
}

/**
 * Options for redefining a function on a target object
 */
interface RedefineFunctionOptions {
  /** The target object to modify */
  target: any;
  /** The property key to redefine */
  key: string | symbol;
  /** The new function implementation */
  implementation: Function;
  /** Whether to force override even if the property already exists */
  force?: boolean;
}

/**
 * Inspects and returns the source code representation of a function
 * @param fn - The function to inspect
 * @returns The source code string of the function
 */
export declare function inspectSource(fn: Function): string;

/**
 * Redefines a function on a target object while preserving metadata
 * This utility allows safe monkey-patching with source tracking
 * 
 * @param target - The object whose property will be redefined
 * @param key - The property name to redefine
 * @param implementation - The new function to assign
 * @param force - If true, creates property if it doesn't exist; if false, only replaces existing
 * 
 * @remarks
 * - Automatically sets the 'name' property on the implementation if missing
 * - Stores original source reference in implementation metadata
 * - Handles global object modifications specially
 * - Can delete and recreate properties for proper descriptor management
 */
export declare function redefineFunction(
  target: any,
  key: string,
  implementation: Function,
  force?: boolean
): void;

/**
 * Extended Function.prototype.toString that returns stored source or default behavior
 * @returns The source code string, either from metadata or native toString
 */
declare global {
  interface Function {
    toString(): string;
  }
}

/**
 * Internal module state
 */
interface ModuleState {
  /** Reference to the global object */
  readonly global: typeof globalThis;
  /** Utility to define hidden properties */
  readonly hide: (target: any, key: string | symbol, value: any) => void;
  /** Utility to check if object has own property */
  readonly has: (target: any, key: string | symbol) => boolean;
  /** Unique key for storing source metadata */
  readonly srcKey: symbol;
  /** Template string for function source representation */
  readonly sourceTemplate: string[];
}

export {};