/**
 * Legacy OBJ serializer module for Babylon.js
 * Re-exports OBJ serialization functionality and registers it globally
 */

import { OBJExport } from '../OBJ/index.js';

/**
 * OBJ file format exporter
 * Serializes Babylon.js scene objects to Wavefront OBJ format
 */
export { OBJExport };

/**
 * Global namespace registration for legacy compatibility
 * Automatically registers all OBJ serializer exports to window.BABYLON when available
 */
declare global {
  interface Window {
    BABYLON: {
      OBJExport: typeof OBJExport;
    } & Record<string, unknown>;
  }

  namespace NodeJS {
    interface Global {
      BABYLON: {
        OBJExport: typeof OBJExport;
      } & Record<string, unknown>;
    }
  }
}

// Side-effect: Register exports to global BABYLON namespace if running in browser/Node.js environment