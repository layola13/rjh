/**
 * Module: module_667013
 * Original ID: 667013
 * 
 * This module conditionally exports either module i (458940) if available,
 * or calls module r (46872) with context o (281939) and parameter a (542652).
 */

/**
 * Type representing the imported module at 46872
 * Likely a fallback function that can be called with context binding
 */
type FallbackFunction = (this: unknown, arg: unknown) => unknown;

/**
 * Type representing the imported module at 542652
 * Parameter passed to the fallback function
 */
type FallbackParameter = unknown;

/**
 * Type representing the imported module at 281939
 * Context object used for function binding
 */
type ContextObject = unknown;

/**
 * Type representing the primary export from module 458940
 * This is the preferred export if it exists
 */
type PrimaryExport = unknown;

/**
 * The module's exported value
 * Either the primary export or the result of calling the fallback function
 */
declare const moduleExport: PrimaryExport | ReturnType<FallbackFunction>;

export = moduleExport;