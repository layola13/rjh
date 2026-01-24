/**
 * External module referenced by webpack build.
 * Module ID: 30325
 * 
 * This module was marked as external during the webpack bundling process,
 * meaning its actual implementation exists outside the bundle.
 * 
 * To create accurate type definitions, you need to:
 * 1. Identify what library/module this external reference points to
 * 2. Check the webpack configuration for externals mapping
 * 3. Examine the runtime context where __WEBPACK_EXTERNAL_MODULE__30325__ is defined
 */
declare module 'module_30325' {
  /**
   * The exported value from the external module.
   * Type is unknown without additional context about the external dependency.
   */
  const externalModule: unknown;
  export default externalModule;
}

/**
 * Alternative: If this is a named external (e.g., React, Lodash, etc.)
 * Replace 'unknown' with the actual type once identified.
 * 
 * Example patterns:
 * - If it's React: export = React;
 * - If it's a specific library: export * from 'library-name';
 */