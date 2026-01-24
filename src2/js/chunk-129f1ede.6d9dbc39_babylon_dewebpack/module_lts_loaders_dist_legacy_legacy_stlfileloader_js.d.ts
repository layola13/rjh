/**
 * STL file loader module for Babylon.js
 * Provides functionality to load and parse STL (STereoLithography) 3D model files
 */

/**
 * STL File Loader
 * Handles loading of STL format files (both ASCII and binary) into Babylon.js scenes
 */
export class STLFileLoader {
  /**
   * Name identifier for the loader
   */
  readonly name: string;

  /**
   * Supported file extensions
   */
  readonly extensions: string;

  /**
   * Imports meshes from STL file data
   * @param meshesNames - Names of meshes to import, or null to import all
   * @param scene - The Babylon.js scene to import into
   * @param data - The STL file data as string or ArrayBuffer
   * @param rootUrl - Root URL for relative paths
   * @param meshes - Output array of imported meshes
   * @param particleSystems - Output array of particle systems (typically empty for STL)
   * @param skeletons - Output array of skeletons (typically empty for STL)
   * @param onError - Callback invoked on import errors
   * @returns True if import was successful
   */
  importMesh(
    meshesNames: string | string[] | null,
    scene: unknown,
    data: string | ArrayBuffer,
    rootUrl: string,
    meshes: unknown[],
    particleSystems: unknown[],
    skeletons: unknown[],
    onError?: (message: string, exception?: Error) => void
  ): boolean;

  /**
   * Loads scene data from STL file
   * @param scene - The Babylon.js scene
   * @param data - The STL file data
   * @param rootUrl - Root URL for relative paths
   * @param onError - Callback invoked on load errors
   * @returns True if load was successful
   */
  load(
    scene: unknown,
    data: string | ArrayBuffer,
    rootUrl: string,
    onError?: (message: string, exception?: Error) => void
  ): boolean;

  /**
   * Loads all meshes from STL file asynchronously
   * @param scene - The Babylon.js scene
   * @param data - The STL file data
   * @param rootUrl - Root URL for relative paths
   * @returns Promise resolving to array of loaded meshes
   */
  loadAsync(
    scene: unknown,
    data: string | ArrayBuffer,
    rootUrl: string
  ): Promise<unknown[]>;
}