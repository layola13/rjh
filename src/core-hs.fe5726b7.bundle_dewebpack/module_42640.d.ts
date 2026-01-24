/**
 * Polygon tools module providing polygon manipulation and tessellation utilities.
 * @module PolygonTools
 */

import * as tesselatorModule from './tesselator';
import * as polygonModule from './polygon';

/**
 * Polygon manipulation utilities.
 * Provides functions for polygon operations such as area calculation,
 * point containment tests, and geometric transformations.
 */
export const polygon = polygonModule;

/**
 * Polygon tessellation utilities.
 * Provides functions for breaking down complex polygons into simpler
 * triangular meshes suitable for rendering.
 */
export const tesselator = tesselatorModule;

/**
 * Global window extension for browser environments.
 * Exposes PolygonTools as a global object when running in a browser.
 */
declare global {
  interface Window {
    /**
     * Global PolygonTools object available in browser environments.
     */
    PolygonTools?: {
      /** Polygon manipulation utilities */
      polygon: typeof polygonModule;
      /** Tessellation utilities */
      tesselator: typeof tesselatorModule;
      /** Library version string */
      version: string;
      /** Build revision identifier */
      build: string;
    };
    
    /** Version string injected at build time */
    polygon_tools_version?: string;
    
    /** Build revision injected at build time */
    polygon_tools_rev?: string;
  }
}

// Browser environment initialization
if (typeof window !== 'undefined') {
  window.PolygonTools = {
    polygon: polygonModule,
    tesselator: tesselatorModule,
    version: window.polygon_tools_version || '',
    build: window.polygon_tools_rev || ''
  };
}