/**
 * Configuration options for module code generation
 */
interface ModuleGenerationOptions {
  /** The variable name to export the module as (e.g., 'MyLibrary') */
  exportVar: string;
}

/**
 * Generates the header section of the UMD wrapper
 * @returns The opening comment or metadata for the module
 */
declare function t(): string;

/**
 * Generates the main module expression or factory function
 * @returns The module factory code as a string
 */
declare function e(): string;

/**
 * Indents code by 2 spaces
 * @param code - The code string to be indented
 * @returns The indented code with 2 spaces prepended to each line
 */
declare function indent2(code: string): string;

/**
 * Global variable A containing the module implementation code
 */
declare const A: string;

/**
 * Configuration options for the current module generation
 */
declare const options: ModuleGenerationOptions;

/**
 * Module: module_globals
 * Original ID: globals
 * 
 * Generates a Universal Module Definition (UMD) wrapper for browser environments.
 * The generated code wraps the module in an IIFE (Immediately Invoked Function Expression)
 * and attaches it to the global scope using the specified export variable name.
 * 
 * @returns A string containing the complete UMD wrapper code with:
 *          - Module header/metadata
 *          - IIFE wrapper using 'this' as root context
 *          - Strict mode declaration
 *          - Module implementation (from variable A)
 *          - Export assignment to root[exportVar]
 * 
 * @example
 *