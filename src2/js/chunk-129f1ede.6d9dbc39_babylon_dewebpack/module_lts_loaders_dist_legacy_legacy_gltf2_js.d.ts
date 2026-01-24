/**
 * Legacy glTF 2.0 loader module declaration
 * Provides TypeScript definitions for Babylon.js glTF 2.0 loader and extensions
 */

declare module '@babylonjs/loaders/legacy/legacy-glTF2' {
  /**
   * Global GLTF2 namespace containing loader components
   */
  export const GLTF2: typeof import('@babylonjs/loaders/glTF/2.0/index');
}

/**
 * Global Babylon.js namespace augmentation for glTF 2.0 loader
 */
declare global {
  namespace BABYLON {
    /**
     * glTF 2.0 loader namespace
     */
    namespace GLTF2 {
      /**
       * Core glTF 2.0 loader functionality
       */
      namespace Loader {
        /**
         * glTF 2.0 loader extensions
         * Contains all registered loader extensions for handling glTF extensions
         */
        namespace Extensions {
          // Extensions are dynamically imported from:
          // @babylonjs/loaders/glTF/2.0/Extensions/index
        }
        
        // Loader interfaces are dynamically imported from:
        // @babylonjs/loaders/glTF/2.0/glTFLoaderInterfaces
      }
      
      // Additional GLTF2 members are dynamically imported from:
      // @babylonjs/loaders/glTF/2.0/index
    }
  }
}

/**
 * Re-export glTF 2.0 extensions
 */
export * from '@babylonjs/loaders/glTF/2.0/Extensions/index';

/**
 * Re-export glTF 2.0 loader interfaces
 */
export * from '@babylonjs/loaders/glTF/2.0/glTFLoaderInterfaces';

/**
 * Re-export glTF 2.0 core functionality
 */
export * from '@babylonjs/loaders/glTF/2.0/index';