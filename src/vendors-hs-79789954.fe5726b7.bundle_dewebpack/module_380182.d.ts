/**
 * CSG (Constructive Solid Geometry) operations module
 * Provides boolean operations on 3D mesh nodes using CSG algorithms
 */

import type { CSG } from './module_177620';

/**
 * Represents a 3D mesh node in the T3D engine
 */
export interface T3DMeshNode {
  /** Polygon data of the mesh */
  polygons?: unknown[];
  // Add other T3DMeshNode properties as needed
}

/**
 * Represents raw 3D mesh data
 */
export interface T3DMesh {
  /** Polygon data of the mesh */
  polygons?: unknown[];
  // Add other T3DMesh properties as needed
}

/**
 * Represents a point in 3D space
 */
export interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * CSG utility module for converting between T3D mesh formats and CSG representations
 */
export interface CSGConverter {
  /**
   * Converts a T3D mesh node to CSG representation
   */
  fromT3DMeshNode(meshNode: T3DMeshNode): CSG;
  
  /**
   * Converts a CSG representation back to T3D mesh node
   */
  toT3DMeshNode(csg: CSG): T3DMeshNode;
  
  /**
   * Converts raw T3D mesh data to CSG representation
   */
  fromT3DMesh(mesh: T3DMesh): CSG;
  
  /**
   * Converts a CSG representation back to raw T3D mesh data
   */
  toT3DMesh(csg: CSG): T3DMesh;
  
  /**
   * Creates a CSG representation from an array of polygon points
   */
  fromPolygonPoints(points: Point3D[]): CSG;
}

/**
 * CSG Operations API
 * Provides constructive solid geometry operations for 3D mesh manipulation
 */
export interface CSGOperations {
  /**
   * Performs CSG subtraction operation (A - B)
   * Removes the volume of the second mesh from the first mesh
   * 
   * @param meshA - The mesh to subtract from
   * @param meshB - The mesh to subtract
   * @returns Result mesh after subtraction
   */
  subtract(meshA: T3DMeshNode, meshB: T3DMeshNode): T3DMeshNode;

  /**
   * Performs CSG union operation (A ∪ B)
   * Combines two meshes into a single mesh
   * 
   * @param meshA - First mesh
   * @param meshB - Second mesh
   * @returns Result mesh after union
   */
  union(meshA: T3DMeshNode, meshB: T3DMeshNode): T3DMeshNode;

  /**
   * Performs CSG intersection operation (A ∩ B)
   * Returns only the overlapping volume between two meshes
   * 
   * @param meshA - First mesh
   * @param meshB - Second mesh
   * @returns Result mesh after intersection
   */
  intersect(meshA: T3DMeshNode, meshB: T3DMeshNode): T3DMeshNode;

  /**
   * Inverts a mesh (flips polygon normals)
   * Note: Original implementation appears incomplete
   * 
   * @param mesh - The mesh to invert
   * @returns Inverted mesh
   */
  inverse(mesh: T3DMeshNode): T3DMeshNode;

  /**
   * Subtracts multiple meshes from a base mesh sequentially
   * Performs: base - mesh1 - mesh2 - ... - meshN
   * 
   * @param baseMesh - The mesh to subtract from
   * @param meshesToSubtract - Array of meshes to subtract
   * @returns Result mesh after all subtractions
   */
  subtrctByMeshes(baseMesh: T3DMeshNode, meshesToSubtract: T3DMeshNode[]): T3DMeshNode;

  /**
   * Subtracts multiple CSG objects from a base mesh sequentially
   * More efficient than subtrctByMeshes as it avoids repeated conversions
   * 
   * @param baseMesh - The mesh to subtract from
   * @param csgsToSubtract - Array of CSG objects to subtract
   * @returns Result mesh after all subtractions
   */
  subtrctByCSGs(baseMesh: T3DMeshNode, csgsToSubtract: CSG[]): T3DMeshNode;

  /**
   * Subtracts a polygon defined by points from a mesh
   * 
   * @param baseMesh - The mesh to subtract from
   * @param polygonPoints - Array of 3D points defining the polygon
   * @returns Result mesh after subtraction
   */
  subtrctByPolygons(baseMesh: T3DMesh, polygonPoints: Point3D[]): T3DMesh;

  /**
   * Converts a T3D mesh node to CSG representation
   * Useful for performing multiple CSG operations efficiently
   * 
   * @param meshNode - The mesh node to convert
   * @returns CSG representation of the mesh
   */
  toCsg(meshNode: T3DMeshNode): CSG;
}

declare const csgOperations: CSGOperations;
export default csgOperations;