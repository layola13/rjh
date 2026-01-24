/**
 * Core module for redefining/patching object methods with source tracking
 * 
 * This module provides utilities to:
 * - Override methods on objects while preserving their original implementation references
 * - Track source code of functions via a special property
 * - Safely redefine Function.prototype.toString to expose tracked sources
 */

/** Global object reference (window in browsers, global in Node.js) */
declare const global: any;

/** 
 * Checks if an object has a specific own property
 * @param obj - The object to check
 * @param prop - The property name to verify
 * @returns True if the object has the own property
 */
declare function hasOwnProperty(obj: object, prop: string | symbol): boolean;

/**
 * Defines a non-enumerable property on an object
 * @param target - The target object
 * @param key - The property key
 * @param value - The property value
 */
declare function defineProperty(target: object, key: string | symbol, value: any): void;

/**
 * Creates a unique hidden property key for storing source code references
 * @param name - The base name for the property
 * @returns A unique symbol or string key
 */
declare function createUid(name: string): string | symbol;

/** Native Function.prototype.toString implementation */
declare const nativeFunctionToString: () => string;

/** Hidden property key used to store original source code of functions */
declare const SOURCE_PROPERTY: string | symbol;

/** Template array for generating function source representations */
declare const sourceTemplate: string[];

/**
 * Inspector utility attached to the core module
 * Retrieves the tracked source code of a function
 * 
 * @param fn - The function to inspect
 * @returns The original source code or native toString result
 */
export function inspectSource(fn: Function): string;

/**
 * Redefines a method on an object with source tracking
 * 
 * @param target - The object whose method to redefine (e.g., Array, Object, global)
 * @param methodName - The name of the method to override
 * @param implementation - The new implementation function
 * @param safe - If true, only redefine if the method doesn't already exist or is being safely overridden
 * 
 * @remarks
 * - Automatically tracks whether the implementation is a function
 * - Preserves original source references in a hidden property
 * - Handles global object special case
 * - Provides safe mode to avoid overwriting existing customizations
 */
export function redefineMethod(
  target: any,
  methodName: string,
  implementation: any,
  safe?: boolean
): void;

/**
 * Patched Function.prototype.toString that returns tracked source code
 * 
 * @returns The tracked source code if available, otherwise falls back to native toString
 * 
 * @remarks
 * This override is applied to Function.prototype.toString to enable
 * retrieval of original/custom source representations for patched functions
 */
export interface PatchedFunctionToString {
  (): string;
}