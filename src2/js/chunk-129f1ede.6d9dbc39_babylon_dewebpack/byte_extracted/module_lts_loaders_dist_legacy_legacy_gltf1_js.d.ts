/**
 * Legacy GLTF 1.0 loader module type definitions
 * Re-exports GLTF 1.0 loader functionality and attaches to global BABYLON namespace
 */

/**
 * GLTF 1.0 loader module containing all legacy GLTF 1.0 format parsers and loaders
 */
export declare const GLTF1: typeof import('./glTF/1.0/index');

/**
 * Global BABYLON namespace augmentation for legacy GLTF 1.0 support
 */
declare global {
  /**
   * Global BABYLON namespace
   */
  interface Window {
    BABYLON?: {
      /**
       * GLTF 1.0 loader utilities and classes
       */
      GLTF1?: typeof import('./glTF/1.0/index');
    };
  }

  /**
   * Global scope BABYLON object (Node.js/Worker environments)
   */
  var BABYLON: {
    /**
     * GLTF 1.0 loader utilities and classes
     */
    GLTF1?: typeof import('./glTF/1.0/index');
  } | undefined;
}

export {};