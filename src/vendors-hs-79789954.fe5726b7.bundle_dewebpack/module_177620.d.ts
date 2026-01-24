/**
 * Constructive Solid Geometry (CSG) implementation
 * Provides boolean operations (union, subtract, intersect) on 3D meshes
 */

import type * as THREE from 'three';

/**
 * Represents a 3D vector or point with x, y, z coordinates
 */
interface Vector3Like {
  x: number;
  y: number;
  z: number;
}

/**
 * Represents a 2D vector or UV coordinate
 */
interface Vector2Like {
  x: number;
  y: number;
}

/**
 * Vertex data structure containing position, normal, and UV coordinates
 */
interface CSGVertex {
  pos: Vector3Like;
  normal: Vector3Like;
  uv: Vector3Like;
  clone(): CSGVertex;
}

/**
 * Polygon composed of multiple vertices
 */
interface CSGPolygon {
  vertices: CSGVertex[];
  plane: {
    normal: Vector3Like;
  };
  material?: THREE.Material;
  clone(): CSGPolygon;
  flip(): void;
}

/**
 * Binary Space Partitioning tree node for spatial subdivision
 */
interface BSPNode {
  allPolygons(): CSGPolygon[];
  clipTo(node: BSPNode): void;
  invert(): void;
  build(polygons: CSGPolygon[]): void;
}

/**
 * Mesh data structure containing vertex attributes and face indices
 */
interface MeshData {
  /** Flattened vertex positions [x1, y1, z1, x2, y2, z2, ...] */
  vertices: number[];
  /** Flattened vertex normals [nx1, ny1, nz1, nx2, ny2, nz2, ...] */
  normals: number[];
  /** Flattened UV coordinates [u1, v1, u2, v2, ...] */
  uvs: number[];
  /** Triangle face indices [i1, i2, i3, i4, i5, i6, ...] */
  faces: number[];
  /** Optional material associated with this mesh data */
  material?: THREE.Material;
}

/**
 * Result of mesh decomposition by surface orientation
 */
interface MeshDataByOrientation {
  /** Top-facing surfaces */
  top: MeshData[];
  /** Bottom-facing surfaces */
  bottom: MeshData[];
  /** Side surfaces */
  sides: MeshData[][];
}

/**
 * T3D (Three.js alternative) mesh node interface
 */
interface T3DMeshNode {
  getWorldTransform(): { getMatrix(): unknown };
  getComponent(componentType: unknown): {
    getMesh(): unknown;
    getMaterial(): unknown;
  };
}

/**
 * Constructive Solid Geometry (CSG) class
 * 
 * Enables boolean operations on 3D geometry:
 * - Union: Combine two meshes
 * - Subtract: Remove one mesh from another
 * - Intersect: Keep only overlapping regions
 * 
 * @example
 *