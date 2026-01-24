/**
 * Legacy OBJ File Loader module for Babylon.js
 * Provides backward compatibility by exposing OBJ-related loaders to the global BABYLON namespace
 */

import type { MTLFileLoader, OBJFileLoader, SolidParser } from './OBJ/index.js';

/**
 * MTL (Material Template Library) file loader for OBJ models
 * Handles parsing and loading of material definitions used by OBJ files
 */
export type { MTLFileLoader };

/**
 * OBJ file loader for loading Wavefront OBJ 3D model files
 * Supports geometry, normals, texture coordinates, and material references
 */
export type { OBJFileLoader };

/**
 * Parser for solid geometry data within OBJ files
 * Handles conversion of OBJ solid definitions to Babylon.js mesh data
 */
export type { SolidParser };

declare global {
  /**
   * Global Babylon.js namespace
   */
  interface Window {
    BABYLON?: Record<string, unknown>;
  }

  /**
   * Node.js global object
   */
  // eslint-disable-next-line no-var
  var global: typeof globalThis | undefined;
}

/**
 * Represents the imported OBJ module containing all loader implementations
 */
interface OBJModule {
  MTLFileLoader: typeof MTLFileLoader;
  OBJFileLoader: typeof OBJFileLoader;
  SolidParser: typeof SolidParser;
  [key: string]: unknown;
}

/**
 * Global runtime environment (browser window or Node.js global)
 */
type GlobalRuntime = (Window & typeof globalThis) | typeof globalThis | undefined;

/**
 * Gets the global runtime environment
 * Prioritizes global object in Node.js, falls back to window in browsers
 */
const getGlobalRuntime = (): GlobalRuntime => {
  if (typeof global !== 'undefined') {
    return global as typeof globalThis;
  }
  if (typeof window !== 'undefined') {
    return window;
  }
  return undefined;
};

/**
 * Registers OBJ loaders to the global BABYLON namespace for legacy compatibility
 * Only registers properties that don't already exist to avoid overwriting
 * 
 * @param objModule - The imported OBJ module containing loader classes
 */
const registerLegacyLoaders = (objModule: OBJModule): void => {
  const globalRuntime = getGlobalRuntime();
  
  if (globalRuntime === undefined) {
    return;
  }

  // Ensure BABYLON namespace exists
  if (!globalRuntime.BABYLON) {
    globalRuntime.BABYLON = {} as Record<string, unknown>;
  }

  const babylonNamespace = globalRuntime.BABYLON as Record<string, unknown>;

  // Register all exports to global BABYLON namespace
  for (const exportKey in objModule) {
    if (!babylonNamespace[exportKey]) {
      babylonNamespace[exportKey] = objModule[exportKey];
    }
  }
};