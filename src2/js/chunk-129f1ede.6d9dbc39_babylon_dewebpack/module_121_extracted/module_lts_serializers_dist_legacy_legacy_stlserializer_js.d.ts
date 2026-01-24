/**
 * Legacy STL Serializer module
 * Re-exports STL serialization functionality from the main serializers package
 * and attaches it to the global BABYLON namespace for backward compatibility.
 */

import type { STLExport } from '../stl/index';

/**
 * Exports the STLExport function for converting Babylon.js meshes to STL format.
 * 
 * @remarks
 * This is a legacy module that maintains backward compatibility by exposing
 * the STL serializer through the global BABYLON namespace.
 */
export { STLExport };

/**
 * Global BABYLON namespace declaration for legacy compatibility.
 * Contains all Babylon.js exports including the STL serializer.
 */
declare global {
  interface Window {
    BABYLON: typeof import('../stl/index');
  }
  
  namespace NodeJS {
    interface Global {
      BABYLON: typeof import('../stl/index');
    }
  }
}