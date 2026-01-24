/**
 * Core module export utility for polyfills and feature detection.
 * Provides a unified API for exporting functions/properties to different scopes.
 * 
 * Module: module_5ca1
 * Original ID: 5ca1
 * Dependencies: 7726 (global), 8378 (core), 32e9 (hide), 2aba (redefine), 9b43 (ctx)
 */

/**
 * Export target scope flags
 */
export enum ExportFlags {
  /** Force export (override existing) */
  F = 1,
  /** Export to global scope */
  G = 2,
  /** Export to static scope */
  S = 4,
  /** Export to prototype */
  P = 8,
  /** Bind context */
  B = 16,
  /** Wrap function */
  W = 32,
  /** Unsafe export */
  U = 64,
  /** Real prototype */
  R = 128
}

/**
 * Global object reference (window in browsers, global in Node.js)
 */
export type GlobalObject = typeof globalThis;

/**
 * Core library object containing polyfills
 */
export interface CoreObject {
  [key: string]: any;
}

/**
 * Export descriptor defining the export behavior
 */
export interface ExportDescriptor {
  [key: string]: any;
}

/**
 * Main export function for adding features to global, static, or prototype scopes.
 * 
 * @param target - Bitwise combination of ExportFlags determining export behavior
 * @param name - Target object name (constructor name or namespace)
 * @param exports - Object containing properties/methods to export
 * 
 * @example
 * // Export to Array.prototype
 * $export($export.P, 'Array', { find: function() {...} });
 * 
 * @example
 * // Export to global scope
 * $export($export.G, 'Promise', PromiseConstructor);
 */
export interface ExportFunction {
  (target: number, name: string, exports: ExportDescriptor): void;
  
  /** Force export (override existing) */
  readonly F: 1;
  /** Export to global scope */
  readonly G: 2;
  /** Export to static scope */
  readonly S: 4;
  /** Export to prototype */
  readonly P: 8;
  /** Bind context */
  readonly B: 16;
  /** Wrap function */
  readonly W: 32;
  /** Unsafe export */
  readonly U: 64;
  /** Real prototype */
  readonly R: 128;
}

/**
 * Property hiding/definition function
 * @param target - Target object to define property on
 * @param key - Property key
 * @param value - Property value
 */
export type HideFunction = (target: object, key: string, value: any) => void;

/**
 * Property redefinition function
 * @param target - Target object
 * @param key - Property key
 * @param value - New value
 * @param flags - Export flags
 */
export type RedefineFunction = (target: object, key: string, value: any, flags: number) => void;

/**
 * Context binding function
 * @param fn - Function to bind
 * @param context - Context to bind to
 */
export type ContextFunction = <T extends Function>(fn: T, context: any) => T;

declare const $export: ExportFunction;

export default $export;