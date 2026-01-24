/**
 * Three.js to T3D converter module
 * Provides utilities for converting between Three.js and T3D (proprietary 3D engine) data structures
 */

import * as THREE from 'three';
import {
  Matrix,
  Matrix3,
  Vector3,
  Quaternion,
  BoundingBox,
  Line3,
  Mesh,
  MeshComponent,
  Node,
  VertexFormat,
  Element,
  AttributeIndex,
  ComponentType,
  IndexFormat,
  PrimitiveType,
  SamplerAddressMode,
  App
} from 't3d-engine';
import { UndrawableMeshComponent } from './UndrawableMeshComponent';

/**
 * Mapping between Three.js texture wrapping modes and T3D sampler address modes
 */
export interface WrapModeMapping {
  [key: number]: SamplerAddressMode;
}

/**
 * Mesh data structure containing vertex and index buffer data
 */
export interface MeshData {
  mVertexData: Uint8Array;
  mIndexData: Uint8Array;
}

/**
 * Options for matrix conversion
 */
export interface MatrixConversionOptions {
  /** Whether to transpose the matrix during conversion */
  transpose?: boolean;
}

/**
 * Options for mesh conversion
 */
export interface MeshConversionOptions {
  /** Transformation matrix to apply */
  transformMatrix?: THREE.Matrix4 | null;
  /** Normal matrix to apply */
  normalMatrix?: THREE.Matrix3 | null;
  /** Whether to use world coordinates */
  useWorldCoordinates?: boolean;
  /** Optional mesh identifier for batching */
  meshId?: string;
}

/**
 * Options for node creation
 */
export interface NodeCreationOptions {
  /** Material to apply to the mesh */
  material?: any;
  /** Whether to create an undrawable mesh component */
  undrawable?: boolean;
  /** Custom node name */
  name?: string;
}

/**
 * Main converter class for Three.js to T3D conversions
 */
export declare class Three2T3d {
  /**
   * Converts Three.js Matrix3 to T3D Matrix3
   * @param matrix - Three.js Matrix3 instance
   * @param transpose - Whether to transpose the matrix (default: false)
   * @returns T3D Matrix3 instance
   */
  static convertToMatrix3(matrix: THREE.Matrix3, transpose?: boolean): Matrix3;

  /**
   * Converts T3D Matrix3 to Three.js Matrix3
   * @param matrix - T3D Matrix3 instance
   * @param transpose - Whether to transpose the matrix (default: false)
   * @returns Three.js Matrix3 instance
   */
  static convertToThreeMatrix3(matrix: Matrix3, transpose?: boolean): THREE.Matrix3;

  /**
   * Converts Three.js Matrix4 to T3D Matrix
   * @param matrix - Three.js Matrix4 instance
   * @param transpose - Whether to transpose the matrix (default: false)
   * @returns T3D Matrix instance
   */
  static convertToMatrix(matrix: THREE.Matrix4, transpose?: boolean): Matrix;

  /**
   * Converts T3D Matrix to Three.js Matrix4
   * @param matrix - T3D Matrix instance
   * @param transpose - Whether to transpose the matrix (default: false)
   * @returns Three.js Matrix4 instance
   */
  static convertToThreeMatrix(matrix: Matrix, transpose?: boolean): THREE.Matrix4;

  /**
   * Converts Three.js line Geometry to T3D streaming mesh
   * @param geometry - Three.js Geometry instance
   * @returns T3D Mesh instance or null if conversion fails
   */
  static convertLineGeometryToStreamingMesh(geometry: THREE.Geometry | null): Mesh | null;

  /**
   * Converts Three.js line BufferGeometry to T3D streaming mesh
   * @param geometry - Three.js BufferGeometry instance
   * @returns T3D Mesh instance or null if conversion fails
   */
  static convertLineBufferGeometryToStreamingMesh(geometry: THREE.BufferGeometry | null): Mesh | null;

  /**
   * Converts position and color arrays to T3D streaming line mesh
   * @param name - Mesh name
   * @param positions - Flat array of vertex positions [x1, y1, z1, x2, y2, z2, ...]
   * @param colors - Flat array of vertex colors (RGB or RGBA)
   * @param meshId - Optional mesh identifier for batching
   * @returns T3D Mesh instance or null if conversion fails
   */
  static convertPositionsToStreamingLineMesh(
    name: string,
    positions: Float32Array | number[],
    colors?: Float32Array | number[],
    meshId?: string
  ): Mesh | null;

  /**
   * Converts Three.js BufferGeometry to T3D Mesh
   * @param geometry - Three.js BufferGeometry instance
   * @param transformMatrix - Optional transformation matrix to apply
   * @param normalMatrix - Optional normal matrix to apply
   * @param meshId - Optional mesh identifier for batching
   * @returns T3D Mesh instance or null if conversion fails
   */
  static convertBufferGeometryToMesh(
    geometry: THREE.BufferGeometry | null,
    transformMatrix?: THREE.Matrix4 | null,
    normalMatrix?: THREE.Matrix3 | null,
    meshId?: string
  ): Mesh | null;

  /**
   * Converts Three.js Geometry to T3D streaming mesh
   * @param geometry - Three.js Geometry instance
   * @param transformMatrix - Optional transformation matrix to apply
   * @param normalMatrix - Optional normal matrix to apply
   * @param meshId - Optional mesh identifier for batching
   * @returns T3D Mesh instance or null if conversion fails
   */
  static convertGeometryToStreamingMesh(
    geometry: THREE.Geometry | null,
    transformMatrix?: THREE.Matrix4 | null,
    normalMatrix?: THREE.Matrix3 | null,
    meshId?: string
  ): Mesh | null;

  /**
   * Converts Three.js BufferGeometry to T3D streaming mesh with multi-stride vertex format
   * @param geometry - Three.js BufferGeometry instance
   * @param transformMatrix - Optional transformation matrix to apply
   * @param normalMatrix - Optional normal matrix to apply
   * @param meshId - Optional mesh identifier for batching
   * @returns T3D Mesh instance or null if conversion fails
   */
  static convertBufferGeometryToStreamingMesh(
    geometry: THREE.BufferGeometry | null,
    transformMatrix?: THREE.Matrix4 | null,
    normalMatrix?: THREE.Matrix3 | null,
    meshId?: string
  ): Mesh | null;

  /**
   * Converts Three.js Geometry to T3D Mesh
   * @param geometry - Three.js Geometry instance
   * @param transformMatrix - Optional transformation matrix to apply
   * @param normalMatrix - Optional normal matrix to apply
   * @param meshId - Optional mesh identifier for batching
   * @returns T3D Mesh instance or null if conversion fails
   */
  static convertGeometryToMesh(
    geometry: THREE.Geometry | null,
    transformMatrix?: THREE.Matrix4 | null,
    normalMatrix?: THREE.Matrix3 | null,
    meshId?: string
  ): Mesh | null;

  /**
   * Converts Three.js Mesh to T3D Node with MeshComponent
   * @param mesh - Three.js Mesh instance
   * @param material - Material to apply to the mesh
   * @param useWorldCoordinates - Whether to use world coordinates (default: false)
   * @param undrawable - Whether to create undrawable mesh component (default: false)
   * @returns T3D Node instance
   */
  static convertThreeMeshToNode(
    mesh: THREE.Mesh,
    material?: any,
    useWorldCoordinates?: boolean,
    undrawable?: boolean
  ): Node;

  /**
   * Converts Three.js Mesh to T3D Node with streaming mesh
   * @param mesh - Three.js Mesh instance
   * @param material - Material to apply to the mesh
   * @param useWorldCoordinates - Whether to use world coordinates (default: false)
   * @param undrawable - Whether to create undrawable mesh component (default: false)
   * @returns T3D Node instance
   */
  static convertThreeMeshToStreamingMeshNode(
    mesh: THREE.Mesh,
    material?: any,
    useWorldCoordinates?: boolean,
    undrawable?: boolean
  ): Node;

  /**
   * Converts Three.js Mesh to T3D Mesh
   * @param mesh - Three.js Mesh instance
   * @param useWorldCoordinates - Whether to use world coordinates
   * @returns T3D Mesh instance
   */
  static convertThreeMeshToT3dMesh(mesh: THREE.Mesh, useWorldCoordinates: boolean): Mesh;

  /**
   * Converts Three.js Mesh to T3D streaming mesh
   * @param mesh - Three.js Mesh instance
   * @param useWorldCoordinates - Whether to use world coordinates
   * @param meshId - Optional mesh identifier for batching
   * @returns T3D Mesh instance
   */
  static convertThreeMeshToT3dStreamingMesh(
    mesh: THREE.Mesh,
    useWorldCoordinates: boolean,
    meshId?: string
  ): Mesh;

  /**
   * Creates a T3D Node with MeshComponent from a T3D Mesh
   * @param mesh - T3D Mesh instance
   * @param material - Material to apply
   * @param undrawable - Whether to create undrawable component (default: false)
   * @param nodeName - Optional custom node name
   * @returns T3D Node instance
   */
  static createMeshNode(
    mesh: Mesh,
    material?: any,
    undrawable?: boolean,
    nodeName?: string
  ): Node;

  /**
   * Computes vertex normals for given positions and indices
   * @param positions - Flat array of vertex positions [x1, y1, z1, x2, y2, z2, ...]
   * @param indices - Index buffer (optional, will generate sequential indices if not provided)
   * @returns Float32Array of computed normals
   */
  static computeVertexNormals(
    positions: Float32Array,
    indices?: Uint16Array | Uint32Array | null
  ): Float32Array;

  /**
   * Creates a grid mesh for visualization
   * @param size - Total size of the grid (default: 100)
   * @param divisions - Number of divisions (default: 100)
   * @returns T3D streaming line Mesh instance
   */
  static createGridMesh(size?: number, divisions?: number): Mesh;

  /**
   * Converts Three.js texture wrap mode to T3D SamplerAddressMode
   * @param wrapMode - Three.js wrap mode constant
   * @returns Corresponding T3D SamplerAddressMode
   */
  static convertWrapToT3D(wrapMode: THREE.Wrapping): SamplerAddressMode;

  /**
   * Converts Three.js Line3 to T3D Line3
   * @param line - Three.js Line3 instance
   * @returns T3D Line3 instance
   */
  static convertThreeLine3ToT3D(line: THREE.Line3): Line3;

  /**
   * Converts T3D Line3 to Three.js Line3
   * @param line - T3D Line3 instance
   * @returns Three.js Line3 instance
   */
  static convertT3DLine3ToThree(line: Line3): THREE.Line3;

  /**
   * Converts Three.js Euler angles to T3D Quaternion
   * @param euler - Three.js Euler instance
   * @returns T3D Quaternion instance
   */
  static convertThreeEulerToQuaternion(euler: THREE.Euler): Quaternion;

  /**
   * Converts Three.js Box3 to T3D BoundingBox
   * @param box - Three.js Box3 instance
   * @returns T3D BoundingBox instance
   */
  static convertThreeBox3ToBoundingBox(box: THREE.Box3): BoundingBox;

  /**
   * Hides UI elements to show only 3D view
   * Hides header, plugin container, 2D editor, property bars, etc.
   */
  static show3DViewOnly(): void;

  /**
   * Restores all UI elements to their normal display state
   * Reverses the effect of show3DViewOnly()
   */
  static restore3DView(): void;
}