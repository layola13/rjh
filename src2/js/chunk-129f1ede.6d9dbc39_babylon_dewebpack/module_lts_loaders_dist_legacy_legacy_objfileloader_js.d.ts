/**
 * Legacy OBJ File Loader Module
 * 
 * This module provides backward compatibility for OBJ file loading functionality
 * by re-exporting components from the main OBJ loader package and registering
 * them in the global BABYLON namespace for legacy applications.
 * 
 * @packageDocumentation
 */

/**
 * MTL (Material Template Library) file loader.
 * Parses MTL files that define materials for OBJ models.
 * 
 * @public
 */
export declare class MTLFileLoader {
  /**
   * Parses MTL file content and returns material definitions.
   * @param materialContent - The raw MTL file content as a string
   * @returns Parsed material data
   */
  parseMTL(materialContent: string): unknown;
}

/**
 * OBJ file loader for loading Wavefront OBJ 3D model files.
 * Supports geometry, texture coordinates, normals, and material references.
 * 
 * @public
 */
export declare class OBJFileLoader {
  /**
   * Loads an OBJ file from the specified URL or data.
   * @param scene - The scene to load the model into
   * @param data - The OBJ file content or URL
   * @param rootUrl - The root URL for resolving relative paths
   * @returns Promise resolving to the loaded mesh data
   */
  load(scene: unknown, data: string, rootUrl: string): Promise<unknown>;
}

/**
 * Parser for solid geometry data within OBJ files.
 * Handles the parsing of vertex, face, and normal data for solid objects.
 * 
 * @public
 */
export declare class SolidParser {
  /**
   * Parses solid geometry data from OBJ format.
   * @param data - Raw geometry data string
   * @returns Parsed solid geometry structure
   */
  parse(data: string): unknown;
}

/**
 * Global BABYLON namespace augmentation for legacy compatibility.
 * Ensures exported classes are available on the global BABYLON object.
 * 
 * @internal
 */
declare global {
  interface Window {
    BABYLON?: {
      MTLFileLoader?: typeof MTLFileLoader;
      OBJFileLoader?: typeof OBJFileLoader;
      SolidParser?: typeof SolidParser;
      [key: string]: unknown;
    };
  }

  const BABYLON: {
    MTLFileLoader?: typeof MTLFileLoader;
    OBJFileLoader?: typeof OBJFileLoader;
    SolidParser?: typeof SolidParser;
    [key: string]: unknown;
  };
}