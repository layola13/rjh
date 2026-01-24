/**
 * Binary OBJ loader for T3D engine
 * Loads optimized binary OBJ format with optional normals and UV coordinates
 */

import { Node, MeshComponent, Mesh, PrimitiveType, BoundingBox, VertexFormat, IndexFormat, Element, AttributeIndex, ComponentType, Vector3 } from './T3dTypes';
import { T3dOBJLoader } from './T3dOBJLoader';

/**
 * Binary OBJ file format structure
 */
interface BinaryOBJHeader {
  /** Number of mesh objects in the file */
  objectCount: number;
}

/**
 * Individual mesh object metadata
 */
interface MeshObjectMetadata {
  /** Length of the mesh name string */
  nameLength: number;
  /** Name of the mesh object */
  name: string;
  /** Number of vertices in the mesh */
  vertexCount: number;
  /** Whether normals are included (1 = yes, 0 = no) */
  hasNormals: boolean;
  /** Whether UV coordinates are included (1 = yes, 0 = no) */
  hasUVs: boolean;
}

/**
 * Callback invoked when loading completes successfully
 */
type LoadSuccessCallback = (rootNode: Node) => void;

/**
 * Callback invoked during loading progress
 */
type LoadProgressCallback = (event: ProgressEvent) => void;

/**
 * Callback invoked when loading fails
 */
type LoadErrorCallback = (error: Error) => void;

/**
 * T3D Binary OBJ Loader
 * 
 * Loads binary-encoded OBJ files with the following format:
 * - Header: object count (uint32)
 * - For each object:
 *   - Name length (uint32)
 *   - Name string (UTF-8, padded to 4-byte boundary)
 *   - Vertex count (uint32)
 *   - Has normals flag (uint16)
 *   - Has UVs flag (uint16)
 *   - Position data (float32[vertexCount * 3])
 *   - Normal data (float32[vertexCount * 3], if hasNormals)
 *   - UV data (float32[vertexCount * 2], if hasUVs)
 */
export declare class T3dBinaryOBJLoader extends T3dOBJLoader {
  /**
   * Response type for XHR requests
   */
  responseType: XMLHttpRequestResponseType;

  /**
   * Creates a new T3dBinaryOBJLoader instance
   */
  constructor();

  /**
   * Load a binary OBJ file from the specified URL
   * 
   * @param url - URL or path to the binary OBJ file
   * @param onLoad - Callback invoked with the loaded scene root node
   * @param onProgress - Optional callback for tracking load progress
   * @param onError - Optional callback invoked if loading fails
   */
  load(
    url: string,
    onLoad: LoadSuccessCallback,
    onProgress?: LoadProgressCallback,
    onError?: LoadErrorCallback
  ): void;

  /**
   * Parse binary OBJ data from an ArrayBuffer
   * 
   * @param buffer - ArrayBuffer containing binary OBJ data
   * @returns Root node containing all parsed mesh objects
   * @throws Error if the buffer format is invalid
   */
  parse(buffer: ArrayBuffer): Node;

  /**
   * Internal method to perform the actual loading
   * Inherited from base T3dOBJLoader class
   * 
   * @param url - Resource URL
   * @param onLoad - Success callback
   * @param onProgress - Progress callback
   * @param onError - Error callback
   * @protected
   */
  protected _doLoad(
    url: string,
    onLoad: (data: ArrayBuffer) => void,
    onProgress?: LoadProgressCallback,
    onError?: LoadErrorCallback
  ): void;

  /**
   * Get the default material for mesh faces
   * Inherited from base T3dOBJLoader class
   * 
   * @returns Default face material instance
   * @protected
   */
  protected _getDefaultFaceMaterial(): unknown;
}

/**
 * Utility class for Three.js to T3D conversions
 */
declare class Three2T3d {
  /**
   * Compute vertex normals from position and index data
   * 
   * @param positions - Flat array of vertex positions [x0,y0,z0, x1,y1,z1, ...]
   * @param indices - Index array defining triangles
   * @returns Flat array of computed normals [nx0,ny0,nz0, nx1,ny1,nz1, ...]
   */
  static computeVertexNormals(
    positions: Float32Array,
    indices: Uint16Array | Uint32Array
  ): Float32Array;
}

/**
 * Three.js Math utilities
 */
declare namespace THREE {
  namespace Math {
    /**
     * Generate a UUID v4 string
     * @returns UUID string in format "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
     */
    function generateUUID(): string;
  }
}