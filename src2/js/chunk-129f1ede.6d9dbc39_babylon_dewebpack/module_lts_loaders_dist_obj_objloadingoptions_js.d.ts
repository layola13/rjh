/**
 * OBJ Loading Options Module
 * 
 * This module provides type definitions for OBJ file loading configuration options.
 * OBJ is a 3D model file format commonly used in computer graphics applications.
 */

/**
 * Configuration options for loading OBJ files
 * @interface OBJLoadingOptions
 */
export interface OBJLoadingOptions {
  /**
   * Whether to compute normals if they are not present in the OBJ file
   * @default true
   */
  computeNormals?: boolean;

  /**
   * Whether to optimize the mesh by removing duplicate vertices
   * @default true
   */
  optimizeWithUV?: boolean;

  /**
   * Whether to import vertex colors from the OBJ file
   * @default false
   */
  importVertexColors?: boolean;

  /**
   * Whether to flip the UV coordinates on the Y axis
   * @default false
   */
  invertY?: boolean;

  /**
   * Whether to flip the texture coordinates
   * @default false
   */
  invertTextureY?: boolean;

  /**
   * Whether to skip loading materials defined in MTL files
   * @default false
   */
  skipMaterials?: boolean;

  /**
   * Root URL for loading associated resources (textures, MTL files)
   */
  materialLoadingOptions?: MaterialLoadingOptions;
}

/**
 * Configuration options for loading materials associated with OBJ files
 * @interface MaterialLoadingOptions
 */
export interface MaterialLoadingOptions {
  /**
   * Whether to enable PBR (Physically Based Rendering) materials
   * @default false
   */
  enablePBR?: boolean;

  /**
   * Root path for resolving material texture paths
   */
  rootUrl?: string;
}

/**
 * Default OBJ loading options
 */
export const DEFAULT_OBJ_LOADING_OPTIONS: Readonly<OBJLoadingOptions> = {
  computeNormals: true,
  optimizeWithUV: true,
  importVertexColors: false,
  invertY: false,
  invertTextureY: false,
  skipMaterials: false,
};

/**
 * Type guard to check if an object is a valid OBJLoadingOptions
 * @param options - Object to validate
 * @returns True if the object conforms to OBJLoadingOptions interface
 */
export function isOBJLoadingOptions(options: unknown): options is OBJLoadingOptions {
  if (typeof options !== 'object' || options === null) {
    return false;
  }

  const opts = options as Record<string, unknown>;
  
  return (
    (opts.computeNormals === undefined || typeof opts.computeNormals === 'boolean') &&
    (opts.optimizeWithUV === undefined || typeof opts.optimizeWithUV === 'boolean') &&
    (opts.importVertexColors === undefined || typeof opts.importVertexColors === 'boolean') &&
    (opts.invertY === undefined || typeof opts.invertY === 'boolean') &&
    (opts.invertTextureY === undefined || typeof opts.invertTextureY === 'boolean') &&
    (opts.skipMaterials === undefined || typeof opts.skipMaterials === 'boolean')
  );
}