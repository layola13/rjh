/**
 * Object.assign polyfill module
 * 
 * This module exports the Object.assign implementation as a static method
 * on the Object constructor, with a fallback flag set.
 * 
 * @module ObjectAssignPolyfill
 */

import { exportStatic } from './export-utils';
import { objectAssign } from './object-assign-implementation';

/**
 * Registers Object.assign polyfill on the global Object constructor
 * 
 * Exports Object.assign as a static method with S (static) and F (fallback) flags,
 * ensuring the method is available in environments that don't natively support it.
 */
declare function registerObjectAssignPolyfill(): void;

export { registerObjectAssignPolyfill };

/**
 * Export utility interface for polyfill registration
 */
export interface ExportOptions {
  /** Static method flag - indicates the method should be added to the constructor */
  S: number;
  /** Fallback flag - indicates this is a polyfill/fallback implementation */
  F: number;
}

/**
 * Export utility function type
 * @param flags - Combination of export flags (S for static, F for fallback)
 * @param target - Target object name (e.g., "Object", "Array")
 * @param methods - Methods to be added to the target
 */
export type ExportFunction = (
  flags: number,
  target: string,
  methods: Record<string, unknown>
) => void;