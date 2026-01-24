/**
 * Utility module for accessing Node.js util.types API
 * Provides type-checking utilities from Node.js util module when available
 * 
 * @module UtilTypes
 */

/**
 * Node.js util.types interface
 * Provides runtime type checking for various JavaScript/Node.js types
 */
interface UtilTypes {
  /** Check if value is an ArrayBuffer */
  isArrayBuffer?(value: unknown): value is ArrayBuffer;
  /** Check if value is a typed array */
  isTypedArray?(value: unknown): value is NodeJS.TypedArray;
  /** Check if value is a Promise */
  isPromise?(value: unknown): value is Promise<unknown>;
  /** Check if value is a Map */
  isMap?(value: unknown): value is Map<unknown, unknown>;
  /** Check if value is a Set */
  isSet?(value: unknown): value is Set<unknown>;
  /** Check if value is a Date */
  isDate?(value: unknown): value is Date;
  /** Check if value is a RegExp */
  isRegExp?(value: unknown): value is RegExp;
  /** Check if value is native Error */
  isNativeError?(value: unknown): value is Error;
  [key: string]: ((value: unknown) => boolean) | undefined;
}

/**
 * Module-like object interface for CommonJS modules
 */
interface ModuleLike {
  /** Module exports */
  exports: unknown;
  /** Module require function */
  require?: NodeRequire;
  /** Indicates this is not a DOM node */
  nodeType?: never;
}

/**
 * Process binding interface for Node.js internal bindings
 */
interface ProcessBinding {
  /** Access Node.js internal bindings */
  (moduleName: string): unknown;
}

/**
 * Node.js process interface subset
 */
interface NodeProcess {
  /** Access to internal bindings (Node.js internal API) */
  binding?: ProcessBinding;
}

/**
 * Attempts to retrieve Node.js util.types API
 * Tries multiple fallback strategies:
 * 1. Module's require('util').types (standard approach)
 * 2. process.binding('util') (internal Node.js API fallback)
 * 
 * @returns {UtilTypes | undefined} The util.types object if available, undefined otherwise
 */
declare function getUtilTypes(): UtilTypes | undefined;

/**
 * Exported util.types object or undefined if not available in current environment
 * Only available in Node.js environments, undefined in browser contexts
 */
declare const utilTypes: UtilTypes | undefined;

export default utilTypes;
export { UtilTypes, getUtilTypes };