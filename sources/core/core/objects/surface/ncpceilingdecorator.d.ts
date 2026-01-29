/**
 * NCPCeilingDecorator module for processing ceiling geometries
 * Provides utilities to identify and extract bottom faces from 3D entities
 * 
 * @module NCPCeilingDecorator
 * @original-id 11122
 */

import { Vector3 } from './Vector3';

/**
 * Represents a geometric face with surface properties
 */
interface Face {
  /** Unique identifier for the face */
  tag: string;
  
  /**
   * Gets the surface associated with this face
   * @returns The surface object containing geometric properties
   */
  getSurface(): Surface;
}

/**
 * Represents a surface with geometric properties
 */
interface Surface {
  /**
   * Checks if the surface is planar
   * @returns true if the surface is a plane, false otherwise
   */
  isPlane(): boolean;
  
  /**
   * Gets the normal vector of the surface
   * @returns The normal vector perpendicular to the surface
   */
  getNorm(): Vector3;
}

/**
 * Represents a boundary representation (B-rep) solid
 */
interface Brep {
  /**
   * Gets all faces of this B-rep solid
   * @returns Array of faces comprising the solid
   */
  getFaces(): Face[];
}

/**
 * Represents a 3D entity with boundary representation geometry
 */
interface Entity {
  /** Collection of B-rep solids that compose this entity */
  breps: Brep[];
}

/**
 * Decorator class for processing ceiling entities in NCP (likely "Non-Coplanar Partition") systems
 * Identifies and extracts downward-facing (bottom) faces from 3D geometric entities
 * 
 * @example
 *