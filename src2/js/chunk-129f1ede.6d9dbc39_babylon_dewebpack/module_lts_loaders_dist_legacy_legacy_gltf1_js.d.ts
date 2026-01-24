/**
 * Legacy glTF 1.0 loader module
 * Provides backward compatibility for Babylon.js glTF 1.0 format support
 */

/**
 * Babylon.js namespace for glTF-related functionality
 */
declare namespace BABYLON {
  /**
   * glTF 1.0 loader namespace
   * Contains all classes and utilities for loading glTF 1.0 assets
   */
  namespace GLTF1 {
    // Re-exported from glTF/1.0/index module
    // This namespace is dynamically populated with glTF 1.0 loader implementations
  }
}

/**
 * Named export for glTF 1.0 module
 * Contains the complete glTF 1.0 loader implementation
 */
export declare const GLTF1: typeof BABYLON.GLTF1;

/**
 * Default export of the glTF 1.0 module
 */
export default GLTF1;