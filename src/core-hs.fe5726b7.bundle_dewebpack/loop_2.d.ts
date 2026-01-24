/**
 * Loop module providing loop geometry structures for boundary representation
 * @module Loop
 */

import { Entity, Entity_IO } from './Entity';
import { CoEdge } from './CoEdge';
import { Vertex } from './Vertex';
import { Edge } from './Edge';

/**
 * Serialization handler for Loop entities
 */
export declare class Loop_IO extends Entity_IO {
  /**
   * Load loop data from serialized format
   * @param target - Target loop instance to populate
   * @param data - Serialized loop data containing root coedge reference
   * @param context - Deserialization context
   * @param options - Additional loading options
   */
  load(
    target: Loop,
    data: { root: string | number },
    context: unknown,
    options: unknown
  ): void;
}

/**
 * 3D point with x, y, z coordinates
 */
export interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Arc geometry information for curved edges
 */
export interface ArcInfo {
  /** Center point of the arc */
  center: Point3D;
  /** Radius of the arc */
  radius: number;
  /** Whether the arc curves clockwise */
  clockwise: boolean;
}

/**
 * Mass properties calculation result
 */
export interface MassProperties {
  area?: number;
  centroid?: Point3D;
  [key: string]: unknown;
}

/**
 * Loop represents a closed sequence of connected coedges forming a boundary
 * Used in boundary representation (B-Rep) modeling for face boundaries
 */
export declare class Loop extends Entity {
  /**
   * Root coedge - entry point into the circular linked list of coedges
   */
  root?: CoEdge;

  /**
   * Creates a new loop instance
   * @param id - Optional unique identifier for the loop
   */
  constructor(id?: string);

  /**
   * Get the parent entity containing this loop
   */
  get parent(): Entity | undefined;

  /**
   * Get all child entities (coedges) of this loop
   */
  get children(): Entity[];

  /**
   * Get the last coedge in the loop sequence
   */
  get lastEdge(): CoEdge | undefined;

  /**
   * Get the vertex at the end of the last coedge
   */
  get lastVertex(): Vertex | undefined;

  /**
   * Factory method to create a loop from an array of points
   * @param points - Array of 3D points defining the loop vertices
   * @returns New loop instance connecting the points
   */
  static createFromPoints(points: Point3D[]): Loop;

  /**
   * Initialize loop data by creating coedges between consecutive points
   * @param points - Array of 3D points to connect
   */
  initData(points: Point3D[]): void;

  /**
   * Append a coedge to the loop
   * @param coedge - Coedge to append
   * @param afterEdge - Optional coedge after which to insert (defaults to last edge)
   * @returns The appended coedge
   */
  appendCoEdge(coedge: CoEdge, afterEdge?: CoEdge): CoEdge;

  /**
   * Iterate over all coedges in the loop
   * @param callback - Function called for each coedge, return true to break
   * @param thisArg - Value to use as 'this' when executing callback
   * @returns false if loop is corrupt, true otherwise
   */
  forEachCoEdge(
    callback: (coedge: CoEdge) => boolean | void,
    thisArg?: unknown
  ): boolean;

  /**
   * Iterate over all vertices in the loop
   * @param callback - Function called for each vertex
   * @param thisArg - Value to use as 'this' when executing callback
   */
  forEachVertex(callback: (vertex: Vertex) => void, thisArg?: unknown): void;

  /**
   * Iterate over vertices owned exclusively by this loop
   * @param callback - Function called for each owned vertex
   * @param thisArg - Value to use as 'this' when executing callback
   */
  forEachOwnedVertex(
    callback: (vertex: Vertex) => void,
    thisArg?: unknown
  ): void;

  /**
   * Get all coedges in the loop as an array
   * @returns Array of coedges
   */
  getCoEdges(): CoEdge[];

  /**
   * Get all underlying edges in the loop
   * @returns Array of edges
   */
  getLoopEdges(): Edge[];

  /**
   * Get all vertices in the loop as an array
   * @returns Array of vertices
   */
  getLoopVertices(): Vertex[];

  /**
   * Find a coedge matching a predicate
   * @param predicate - Function testing each coedge
   * @param thisArg - Value to use as 'this' when executing predicate
   * @returns First matching coedge or undefined
   */
  findCoEdge(
    predicate: (coedge: CoEdge) => boolean,
    thisArg?: unknown
  ): CoEdge | undefined;

  /**
   * Find the coedge that ends at a specific vertex
   * @param vertex - Target vertex
   * @returns Coedge ending at the vertex or undefined
   */
  findCoEdgeToVertex(vertex: Vertex): CoEdge | undefined;

  /**
   * Convert loop to a polygon (array of points)
   * @param closePath - Whether to duplicate first point at end (default true)
   * @returns Array of 3D points or undefined if insufficient vertices
   */
  toPolygon(closePath?: boolean): Point3D[] | undefined;

  /**
   * Convert loop to a discrete polygon, tessellating curved edges
   * @returns Array of 3D points with arcs subdivided, or undefined if invalid
   */
  toDiscretePolygon(): Point3D[] | undefined;

  /**
   * Clear all coedges and reset the loop
   */
  clear(): void;

  /**
   * Calculate mass properties (area, centroid) of the loop
   * @returns Mass properties or undefined if loop is invalid
   */
  getMassProps(): MassProperties | undefined;

  /**
   * Get the I/O handler for serialization
   * @returns Loop_IO instance
   */
  getIO(): Loop_IO;

  /**
   * Verify loop integrity (alias for validate)
   * @returns true if loop is valid
   */
  verify(): boolean;

  /**
   * Validate loop structure and connectivity
   * @param verbose - Whether to log detailed error messages
   * @returns true if loop is valid and well-formed
   */
  validate(verbose?: boolean): boolean;
}