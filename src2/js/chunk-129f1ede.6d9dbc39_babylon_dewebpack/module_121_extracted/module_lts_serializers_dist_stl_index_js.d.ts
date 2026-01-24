/**
 * STL serializer module for Babylon.js
 * Provides functionality to export 3D meshes to STL (STereoLithography) format
 * @module serializers/stl
 */

/**
 * Exports 3D mesh data to STL file format
 * STL is a file format native to stereolithography CAD software
 * 
 * @param mesh - The mesh to export
 * @param download - Whether to trigger automatic download
 * @param fileName - Name for the exported file
 * @param binary - Whether to export as binary STL (true) or ASCII STL (false)
 * @param localSystem - Whether to use local coordinate system
 * @param exportIndividualMeshes - Whether to export each mesh separately
 * @returns The STL file content as string or Uint8Array
 */
export declare function STLExport(
  mesh: unknown,
  download?: boolean,
  fileName?: string,
  binary?: boolean,
  localSystem?: boolean,
  exportIndividualMeshes?: boolean
): string | Uint8Array;

/**
 * STL Export namespace containing serialization utilities
 */
export declare namespace STLExport {
  /**
   * Exports mesh to STL format
   */
  export function CreateSTL(
    meshes: unknown[],
    download?: boolean,
    fileName?: string,
    binary?: boolean,
    localSystem?: boolean,
    exportIndividualMeshes?: boolean
  ): string | Uint8Array;
}