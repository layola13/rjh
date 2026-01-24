/**
 * STL File Loader module for Babylon.js
 * Provides functionality for loading STL (STereoLithography) 3D model files
 */

/**
 * STL File Loader class
 * Handles the loading and parsing of STL format 3D models (both ASCII and binary formats)
 */
export declare class STLFileLoader {
  /**
   * Creates an instance of STLFileLoader
   */
  constructor();

  /**
   * The name identifier for this loader
   */
  name: string;

  /**
   * File extensions supported by this loader (typically '.stl')
   */
  extensions: string | ReadonlyArray<string>;

  /**
   * Imports meshes from STL file data
   * @param meshesNames - Array of mesh names to import, or null to import all
   * @param scene - The Babylon.js scene to import meshes into
   * @param data - The STL file data as string or ArrayBuffer
   * @param rootUrl - Root URL for resolving relative paths
   * @param meshes - Output array that will contain the imported meshes
   * @param particleSystems - Output array for particle systems (typically empty for STL)
   * @param skeletons - Output array for skeletons (typically empty for STL)
   * @param onError - Callback function invoked on loading errors
   * @returns True if import was successful, false otherwise
   */
  importMesh(
    meshesNames: string[] | null,
    scene: any,
    data: string | ArrayBuffer,
    rootUrl: string,
    meshes: any[],
    particleSystems: any[],
    skeletons: any[],
    onError?: (message: string, exception?: any) => void
  ): boolean;

  /**
   * Loads scene data from STL file
   * @param scene - The Babylon.js scene to load into
   * @param data - The STL file data as string or ArrayBuffer
   * @param rootUrl - Root URL for resolving relative paths
   * @param onError - Callback function invoked on loading errors
   * @returns True if load was successful, false otherwise
   */
  load(
    scene: any,
    data: string | ArrayBuffer,
    rootUrl: string,
    onError?: (message: string, exception?: any) => void
  ): boolean;

  /**
   * Loads asset container from STL file data
   * @param scene - The Babylon.js scene context
   * @param data - The STL file data as string or ArrayBuffer
   * @param rootUrl - Root URL for resolving relative paths
   * @param onError - Callback function invoked on loading errors
   * @returns Asset container with loaded meshes and assets
   */
  loadAssetContainer(
    scene: any,
    data: string | ArrayBuffer,
    rootUrl: string,
    onError?: (message: string, exception?: any) => void
  ): any;
}

/**
 * Global namespace declaration for Babylon.js
 * Extends the global BABYLON namespace with STL loader functionality
 */
declare global {
  namespace BABYLON {
    /**
     * STL File Loader available in global BABYLON namespace
     */
    export const STLFileLoader: typeof import('./index').STLFileLoader;
  }

  interface Window {
    /**
     * Global Babylon.js namespace attached to window object
     */
    BABYLON: typeof BABYLON;
  }
}