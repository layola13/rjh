/**
 * STL file format serializer for exporting 3D meshes
 * Supports both ASCII and binary STL formats
 */

import type { Mesh, InstancedMesh } from "core/Maths/math.vector";
import type { Vector3, VertexBuffer } from "core/Maths/math.vector";

/**
 * Options for STL export configuration
 */
export interface STLExportOptions {
  /**
   * Whether to download the file automatically
   * @defaultValue true
   */
  download?: boolean;

  /**
   * Name of the exported file (without extension)
   * @defaultValue "stlmesh"
   */
  fileName?: string;

  /**
   * Export in binary format (true) or ASCII format (false)
   * @defaultValue false
   */
  binary?: boolean;

  /**
   * Endianness for binary export (little-endian if true)
   * @defaultValue true
   */
  littleEndian?: boolean;

  /**
   * Skip baking transforms into vertices
   * @defaultValue false
   */
  skipTransformBaking?: boolean;

  /**
   * Force world matrix computation for instanced meshes
   * @defaultValue false
   */
  useWorldMatrix?: boolean;
}

/**
 * Triangle face data structure
 */
interface TriangleFace {
  /** Triangle vertices */
  v: [Vector3, Vector3, Vector3];
  /** Face normal vector */
  n: Vector3;
}

/**
 * Exports meshes to STL (Stereolithography) file format
 * 
 * @param meshes - Array of meshes to export
 * @param download - Whether to trigger automatic download
 * @param fileName - Output filename without extension
 * @param binary - Use binary STL format instead of ASCII
 * @param littleEndian - Use little-endian byte order for binary format
 * @param skipTransformBaking - Skip baking current transforms into vertices
 * @param useWorldMatrix - Apply world matrix transformations for instances
 * @returns Binary ArrayBuffer (if binary=true) or ASCII string (if binary=false)
 */
export function CreateSTL(
  meshes: Mesh[],
  download?: boolean,
  fileName?: string,
  binary?: boolean,
  littleEndian?: boolean,
  skipTransformBaking?: boolean,
  useWorldMatrix?: boolean
): ArrayBuffer | string;

/**
 * STL export utility namespace
 */
export namespace STLExport {
  /**
   * Creates an STL file from the provided meshes
   * 
   * @param meshes - Array of meshes to export
   * @param options - Export configuration options
   * @returns Binary ArrayBuffer or ASCII string depending on format
   * 
   * @example
   *