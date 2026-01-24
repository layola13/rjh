/**
 * OBJ format serialization module
 * Provides functionality for exporting 3D scenes/meshes to Wavefront OBJ format
 */

/**
 * OBJ serializer class for exporting 3D geometry data
 * Handles conversion of meshes, materials, and scene data to OBJ file format
 */
export class OBJExport {
  /**
   * Serializes a scene or mesh to OBJ format
   * @param meshes - The mesh or array of meshes to export
   * @param materials - Optional materials to include in the export
   * @param options - Export configuration options
   * @returns The serialized OBJ file content as string
   */
  static SerializeAsync(
    meshes: unknown,
    materials?: unknown,
    options?: OBJExportOptions
  ): Promise<string>;

  /**
   * Serializes mesh data to OBJ format synchronously
   * @param meshes - The mesh or array of meshes to export
   * @param materials - Optional materials to include in the export
   * @param options - Export configuration options
   * @returns The serialized OBJ file content as string
   */
  static Serialize(
    meshes: unknown,
    materials?: unknown,
    options?: OBJExportOptions
  ): string;
}

/**
 * Configuration options for OBJ export
 */
export interface OBJExportOptions {
  /** Include vertex normals in the export */
  exportNormals?: boolean;
  
  /** Include texture coordinates (UVs) in the export */
  exportUVs?: boolean;
  
  /** Include vertex colors in the export */
  exportColors?: boolean;
  
  /** Export materials to a separate .mtl file */
  exportMaterials?: boolean;
  
  /** Custom file name for the export */
  fileName?: string;
}