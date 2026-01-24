/**
 * Legacy GLTF2 loader module type definitions
 * Exports GLTF2 loader functionality and registers global BABYLON namespace extensions
 */

/**
 * Global BABYLON namespace augmentation for GLTF2 loader
 */
declare global {
  interface Window {
    BABYLON?: BabylonNamespace;
  }

  /**
   * Global BABYLON object available in browser environments
   */
  var BABYLON: BabylonNamespace | undefined;
}

/**
 * Root BABYLON namespace structure
 */
interface BabylonNamespace {
  GLTF2?: GLTF2Namespace;
  [key: string]: unknown;
}

/**
 * GLTF2 namespace containing loader and related types
 */
interface GLTF2Namespace {
  /**
   * GLTF2 Loader implementation
   */
  Loader?: GLTF2LoaderNamespace;
  
  /**
   * Additional GLTF2 exports (interfaces, enums, utilities)
   */
  [key: string]: unknown;
}

/**
 * GLTF2 Loader namespace
 */
interface GLTF2LoaderNamespace {
  /**
   * Loader extension implementations
   */
  Extensions?: Record<string, unknown>;
  
  /**
   * Loader interfaces and types
   */
  [key: string]: unknown;
}

/**
 * Module exports from GLTF 2.0 extensions
 */
export type { GLTF2Extensions } from '../../../lts/loaders/dist/glTF/2.0/Extensions/index.js';

/**
 * Module exports from GLTF 2.0 loader interfaces
 */
export type { GLTF2LoaderInterfaces } from '../../../lts/loaders/dist/glTF/2.0/glTFLoaderInterfaces.js';

/**
 * Main GLTF2 module exports
 */
export type { GLTF2 } from '../../../lts/loaders/dist/glTF/2.0/index.js';

/**
 * Re-export all GLTF2 functionality as default export
 */
export * as GLTF2 from '../../../lts/loaders/dist/glTF/2.0/index.js';