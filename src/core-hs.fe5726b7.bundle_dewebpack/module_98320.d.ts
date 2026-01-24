/**
 * Function name redefining utility module
 * Provides functionality to redefine function names and related metadata
 */

/**
 * Options for redefining a function
 */
export interface RedefineFunctionOptions {
  /** Indicates this is a getter property */
  getter?: boolean;
  /** Indicates this is a setter property */
  setter?: boolean;
  /** Specifies the arity (number of parameters) for the function */
  arity?: number;
  /** Indicates this is a constructor function */
  constructor?: boolean;
}

/**
 * Internal state management for functions
 */
interface InternalState {
  /** The source code representation of the function */
  source?: string;
}

/**
 * Redefines a function's name and metadata properties
 * 
 * @param target - The function to redefine
 * @param newName - The new name for the function
 * @param options - Additional options for the redefinition
 * @returns The modified function
 * 
 * @remarks
 * This function modifies:
 * - The `name` property of the function
 * - The `length` property if arity is specified
 * - The `prototype` property based on constructor option
 * - Internal source tracking for toString operations
 */
export function redefineFunction<T extends Function>(
  target: T,
  newName: string,
  options?: RedefineFunctionOptions
): T;

/**
 * Custom toString implementation for functions
 * Returns the original source code if available, otherwise falls back to native toString
 */
export function functionToString(this: Function): string;