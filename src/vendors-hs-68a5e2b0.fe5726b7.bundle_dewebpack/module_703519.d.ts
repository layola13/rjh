/**
 * HSCad Module
 * 
 * This module exports the HSCad functionality to the global scope.
 * The actual implementation is imported from module 849518.
 */

/**
 * HSCad - Computer-Aided Design functionality
 * 
 * This is a re-export of the HSCad module that gets attached to the global scope.
 * The exact type depends on the implementation in the source module.
 * 
 * @remarks
 * Without access to module 849518's implementation, the exact interface is unknown.
 * This should be refined once the source module's structure is available.
 */
declare const HSCad: unknown;

export default HSCad;

/**
 * Global augmentation to add HSCad to the global object
 */
declare global {
  /**
   * HSCad instance attached to the global scope
   */
  const HSCad: unknown;
}