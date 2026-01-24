/**
 * XD Module Type Definitions
 * 
 * This module re-exports the XD namespace/object from module 455844.
 * XD is attached to the global object and provides core functionality.
 * 
 * @module module_195962
 * @originalId 195962
 */

/**
 * The XD namespace or object exported by this module.
 * 
 * Without access to the source module (455844), the exact structure is unknown.
 * This should be replaced with the actual type definition once the source is available.
 * 
 * @remarks
 * This module performs two operations:
 * 1. Attaches XD to the global object (n.g.XD)
 * 2. Exports XD as the module's default export
 */
declare const XD: unknown;

export = XD;

/**
 * Global augmentation - XD is also available on the global object
 */
declare global {
  /**
   * Global XD namespace/object
   */
  const XD: typeof import('./module_195962');
}