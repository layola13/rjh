/**
 * T3D Binary OBJ Loader Module
 * Provides functionality to load and parse OBJ 3D model files into T3D scene graph format
 */

import type { T3dOBJLoader2 } from './T3dOBJLoader2';
import type {
  BoundingBox,
  Vector3,
  Mesh,
  MeshComponent,
  Node,
  AttributeIndex,
  ComponentType,
  VertexFormat,
  IndexFormat,
  Element,
  PrimitiveType,
} from './t3d-types';

/**
 * Configuration options for loading OBJ resources
 */
export interface LoadOptions {
  /** HTTP response type for the request */
  responseType?: XMLHttpRequestResponseType;
  /** CORS mode for cross-origin requests */
  crossOrigin?: string;
  /** Whether to load asynchronously */
  isAsync?: boolean;
  /** Additional custom options */
  [key: string]: unknown;
}

/**
 * Mesh data structure parsed from OBJ file
 */
export interface MeshData {
  /** Mesh parameters including name */
  params: {
    /** Name identifier for the mesh */
    meshName: string;
  };
  /** Buffer data for mesh geometry */
  buffers: {
    /** Vertex position data (x, y, z per vertex) */
    vertices: Float32Array;
    /** Vertex normal data (x, y, z per vertex), optional */
    normals?: Float32Array;
    /** UV texture coordinate data (u, v per vertex), optional */
    uvs?: Float32Array;
  };
}

/**
 * Asset data received from worker thread
 */
export interface AssetData {
  /** Type of asset loaded */
  type: 'mesh' | string;
  /** Array of parsed mesh data objects */
  meshesData?: MeshData[];
}

/**
 * Callback invoked when loading succeeds
 * @param result - The loaded T3D scene node
 */
export type OnLoadCallback = (result: Node) => void;

/**
 * Callback invoked during loading progress
 * @param event - Progress event data
 */
export type OnProgressCallback = (event: ProgressEvent) => void;

/**
 * Callback invoked when loading fails
 * @param error - Error information
 */
export type OnErrorCallback = (error?: Error) => void;

/**
 * T3D Binary OBJ Loader Class
 * 
 * Extends the base T3dOBJLoader2 to provide optimized loading of binary OBJ format files.
 * Utilizes web workers for off-main-thread parsing and converts data to T3D mesh format.
 * 
 * @example
 *