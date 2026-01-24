/**
 * T3D GLTF Loader Module
 * Provides functionality to load GLTF models and convert them to T3D scene format
 */

import type { BoundingBox, Vector3, Mesh, MeshComponent, Node, AttributeIndex, ComponentType, VertexFormat, IndexFormat, Element, PrimitiveType, RasterizerCullMode, MeshBasicMaterial } from 'T3Dx';

/**
 * Buffer data containing mesh geometry information
 */
interface MeshBuffers {
  /** Index buffer data for triangle faces */
  indexs: number[];
  /** Vertex position data (x, y, z) */
  vertices: number[];
  /** Vertex normal data (nx, ny, nz) */
  normals: number[];
  /** UV texture coordinate data (u, v) */
  uvs: number[];
}

/**
 * Material diffuse texture configuration
 */
interface MaterialDiffuse {
  /** HTMLImageElement or texture image data */
  image: HTMLImageElement | null;
}

/**
 * Material properties for mesh rendering
 */
interface MeshMaterial {
  /** Diffuse texture configuration */
  diffuse: MaterialDiffuse;
  /** Base color in hexadecimal format (e.g., 0xFFFFFF) */
  color: number;
  /** Whether the material supports transparency */
  transparent: boolean;
  /** Opacity value (0.0 = fully transparent, 1.0 = fully opaque) */
  opacity: number;
}

/**
 * Additional parameters for mesh creation
 */
interface MeshParams {
  /** Name identifier for the mesh */
  meshName: string;
}

/**
 * Complete mesh data structure
 */
interface MeshData {
  /** Geometry buffer data */
  buffers: MeshBuffers;
  /** Material configuration */
  material: MeshMaterial;
  /** Additional mesh parameters */
  params: MeshParams;
}

/**
 * Callback function invoked when GLTF load completes successfully
 */
type LoadSuccessCallback = (node: Node) => void;

/**
 * Callback function invoked when GLTF load fails
 */
type LoadErrorCallback = (error: Error) => void;

/**
 * Callback function invoked during GLTF loading progress
 */
type LoadProgressCallback = (event: ProgressEvent) => void;

/**
 * THREE.js GLTF scene object
 */
interface GLTFScene {
  scene: {
    /** Traverse all scene nodes */
    traverse(callback: (object: any) => void): void;
  };
}

/**
 * THREE.js mesh object interface
 */
interface ThreeJSMesh {
  /** Identifies object as a mesh */
  isMesh: boolean;
  /** Mesh name */
  name: string;
  /** Mesh geometry data */
  geometry: {
    getIndex(): { array: ArrayLike<number> };
    getAttribute(name: string): { array: ArrayLike<number> };
  };
  /** Mesh material */
  material: {
    map?: { image: HTMLImageElement };
    color: { getHex(): number };
    transparent: boolean;
    opacity: number;
  };
}

/**
 * T3D GLTF Loader
 * Extends THREE.GLTFLoader to load GLTF files and convert them to T3D scene format
 */
declare class T3dGLTFLoader extends THREE.GLTFLoader {
  /**
   * Load a GLTF model from URL
   * @param url - Path to the GLTF file
   * @param onSuccess - Callback invoked on successful load
   * @param onProgress - Callback invoked during loading progress
   * @param onError - Callback invoked on load error
   * @param manager - Optional THREE.js loading manager
   * @param crossOrigin - CORS setting for texture loading
   */
  load(
    url: string,
    onSuccess: LoadSuccessCallback,
    onProgress?: LoadProgressCallback,
    onError?: LoadErrorCallback,
    manager?: THREE.LoadingManager,
    crossOrigin?: string
  ): void;

  /**
   * Build a T3D node from mesh data
   * Converts geometry buffers and material properties into T3D format
   * 
   * @param meshData - Complete mesh data including buffers, material, and parameters
   * @returns T3D Node containing the constructed mesh component
   * 
   * @remarks
   * - Automatically selects INDEX16 or INDEX32 format based on vertex count
   * - Computes bounding box from vertex positions
   * - Supports multi-stride vertex format with position, normal, and UV attributes
   * - Creates diffuse texture from material image if available
   */
  buildNode(meshData: MeshData): Node;
}

/**
 * Module exports
 */
export { T3dGLTFLoader };
export type {
  MeshBuffers,
  MaterialDiffuse,
  MeshMaterial,
  MeshParams,
  MeshData,
  LoadSuccessCallback,
  LoadErrorCallback,
  LoadProgressCallback,
  GLTFScene,
  ThreeJSMesh
};