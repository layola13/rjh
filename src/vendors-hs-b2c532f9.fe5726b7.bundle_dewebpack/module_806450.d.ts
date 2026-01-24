/**
 * Polygon tools module providing polygon manipulation and tessellation utilities.
 * @module PolygonTools
 */

import * as tesselatorModule from './tesselator';
import * as polygonModule from './polygon';

/**
 * Polygon manipulation utilities
 */
export const polygon = polygonModule;

/**
 * Polygon tessellation utilities
 */
export const tesselator = tesselatorModule;

/**
 * Global window extension for polygon tools
 */
declare global {
  interface Window {
    /**
     * Global PolygonTools instance exposed to browser environment
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
    /** Revision string injected at build time */
    polygon_tools_rev?: string;
  }
}

// Browser environment initialization
if (typeof window !== 'undefined') {
  window.PolygonTools = {
    polygon: polygonModule,
    tesselator: tesselatorModule,
    version: window.polygon_tools_version ?? '',
    build: window.polygon_tools_rev ?? ''
  };
}