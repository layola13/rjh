/**
 * Core module export utility for polyfill/library integration
 * Handles global, static, prototype, and forced exports with binding context
 * 
 * @module CoreExport
 * @original_id 5ca1
 * @dependencies 7726 (global), 8378 (core), 32e9 (hide), 2aba (redefine), 9b43 (ctx)
 */

/**
 * Global object (window in browser, global in Node.js)
 */
declare const global: any;

/**
 * Core library object for polyfills
 */
declare const core: any;

/**
 * Hides a property on an object by defining it as non-enumerable
 * @param target - Target object
 * @param key - Property key
 * @param value - Property value
 */
declare function hide(target: any, key: string, value: any): void;

/**
 * Redefines or adds a method to an object
 * @param target - Target object
 * @param key - Property key
 * @param value - Property value
 * @param flags - Export flags
 */
declare function redefine(target: any, key: string, value: any, flags: number): void;

/**
 * Binds context to a function
 * @param fn - Function to bind
 * @param context - Context object
 */
declare function ctx<T extends Function>(fn: T, context: any): T;

/**
 * Export configuration flags
 */
interface ExportFlags {
  /** Forced export (override existing) */
  F: 1;
  /** Global export */
  G: 2;
  /** Static export */
  S: 4;
  /** Prototype export */
  P: 8;
  /** Bind context */
  B: 16;
  /** Wrap in object */
  W: 32;
  /** Unsafe (allow override) */
  U: 64;
  /** Real prototype */
  R: 128;
}

/**
 * Core export function for adding polyfills and library methods
 * 
 * @param flags - Bitwise combination of export flags (F|G|S|P|B|W|U|R)
 * @param name - Target name (constructor/namespace name)
 * @param exports - Object containing methods/properties to export
 * 
 * @example
 * // Export to Array.prototype
 * $export($export.P, 'Array', { find: function() { ... } });
 * 
 * @example
 * // Export to global/static
 * $export($export.G + $export.F, 'Object', { assign: function() { ... } });
 */
declare function $export(
  flags: number,
  name: string,
  exports: Record<string, any>
): void;

declare namespace $export {
  /** Forced export flag - override existing properties */
  const F: 1;
  /** Global export flag - export to global object */
  const G: 2;
  /** Static export flag - export as static method */
  const S: 4;
  /** Prototype export flag - export to constructor prototype */
  const P: 8;
  /** Bind flag - bind function context to global */
  const B: 16;
  /** Wrap flag - wrap in object descriptor */
  const W: 32;
  /** Unsafe flag - allow unsafe redefinition */
  const U: 64;
  /** Real prototype flag - export to actual prototype */
  const R: 128;
}

export = $export;