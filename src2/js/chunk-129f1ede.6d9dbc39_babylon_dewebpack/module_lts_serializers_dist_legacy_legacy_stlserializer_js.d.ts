/**
 * STL serializer module for Babylon.js
 * Provides functionality to export 3D meshes to STL format
 */

/**
 * Export 3D mesh data to STL (STereoLithography) file format
 * @param mesh - The mesh or meshes to export
 * @param download - Whether to trigger automatic download
 * @param fileName - Name of the exported file
 * @param binary - Whether to export as binary STL (true) or ASCII STL (false)
 * @param isLittleEndian - Byte order for binary export
 * @param doNotBakeTransform - Whether to skip baking mesh transformations
 * @param supportInstancedMeshes - Whether to include instanced mesh data
 * @param exportIndividualMeshes - Whether to export each mesh as separate file
 * @returns STL file content as string or Blob
 */
export function STLExport(
  mesh: unknown,
  download?: boolean,
  fileName?: string,
  binary?: boolean,
  isLittleEndian?: boolean,
  doNotBakeTransform?: boolean,
  supportInstancedMeshes?: boolean,
  exportIndividualMeshes?: boolean
): string | Blob | undefined;

declare global {
  interface Window {
    BABYLON?: Record<string, unknown>;
  }

  namespace NodeJS {
    interface Global {
      BABYLON?: Record<string, unknown>;
    }
  }
}