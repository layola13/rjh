/**
 * Loop module - Topology data structure for closed edge sequences
 * Represents a circular linked list of co-edges forming a boundary
 */

import { Entity, Entity_IO } from './Entity';
import { CoEdge } from './CoEdge';
import { Face } from './Face';
import { Vertex } from './Vertex';
import { Curve3d, Line3d, Arc3d } from './Curve';
import { Plane } from './Plane';

/**
 * Serialization handler for Loop entities
 */
export declare class Loop_IO extends Entity_IO {
  /**
   * Serializes a Loop instance to a transferable format
   * @param entity - The Loop entity to serialize
   * @param callback - Optional callback to modify serialized data
   * @param includeChildren - Whether to include child entities
   * @param options - Additional serialization options
   * @returns Serialized dump array
   */
  dump(
    entity: Loop,
    callback?: (dump: any[], source: Loop) => void,
    includeChildren?: boolean,
    options?: Record<string, any>
  ): any[];

  /**
   * Deserializes dump data to restore a Loop instance
   * @param entity - The Loop entity to populate
   * @param dumpData - The serialized data
   * @param context - Load context containing entity references
   */
  load(entity: Loop, dumpData: any, context: any): void;

  /**
   * Handles migration of legacy data formats
   * @param entity - The Loop entity being migrated
   * @param dumpData - The legacy data
   * @param context - Migration context
   */
  migrateLoad(entity: Loop, dumpData: any, context: any): void;

  /**
   * Gets the singleton instance of Loop_IO
   */
  static instance(): Loop_IO;
}

/**
 * 3D point structure
 */
interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Arc geometry metadata
 */
interface ArcInfo {
  center: Point3D;
  radius: number;
  clockwise: boolean;
}

/**
 * Mass properties calculation result
 */
interface MassProperties {
  area: number;
  centroid: Point3D;
  // Additional mass properties as needed
}

/**
 * Loop - Represents a closed sequence of connected edges
 * 
 * A Loop maintains a circular doubly-linked list of CoEdges that form
 * a boundary. Used in B-Rep topology to define face boundaries (outer loop)
 * and holes (inner loops).
 */
export declare class Loop extends Entity {
  /**
   * Root co-edge of the circular linked list
   * All other co-edges are accessible via next/prev pointers
   */
  root?: CoEdge;

  /**
   * Creates a new Loop instance
   * @param id - Optional unique identifier
   * @param data - Optional initialization data
   */
  constructor(id?: string, data?: any);

  /**
   * Gets the parent entity (typically a Face)
   */
  get parent(): Entity | undefined;

  /**
   * Gets all child entities (co-edges)
   */
  get children(): Entity[];

  /**
   * Gets the last co-edge in the loop (root.prev)
   */
  get lastEdge(): CoEdge | undefined;

  /**
   * Gets the last vertex in the loop
   */
  get lastVertex(): Vertex | undefined;

  /**
   * Factory method: Creates a Loop from an array of vertices
   * Connects vertices with straight line segments
   * @param vertices - Array of vertices defining the loop
   * @param curves - Optional array of curves between vertices (defaults to lines)
   * @returns Newly created Loop
   */
  static createFromPoints(vertices: Vertex[], curves?: Curve3d[]): Loop;

  /**
   * Factory method: Creates a Loop from an array of 3D curves
   * @param curves - Array of curves to form the loop
   * @returns Newly created Loop
   */
  static createFromCurves(curves: Curve3d[]): Loop;

  /**
   * Initializes loop data with vertices and curves
   * @param vertices - Array of vertices
   * @param curves - Optional array of curves (defaults to lines between vertices)
   */
  initData(vertices: Vertex[], curves?: Curve3d[]): void;

  /**
   * Appends a co-edge to the loop
   * @param coedge - The co-edge to append
   * @param afterCoEdge - Optional co-edge to insert after (defaults to lastEdge)
   * @returns The appended co-edge
   */
  appendCoEdge(coedge: CoEdge, afterCoEdge?: CoEdge): CoEdge;

  /**
   * Removes a co-edge from the loop
   * @param coedge - The co-edge to remove
   * @param cleanup - Whether to clean up references
   * @param deep - Whether to perform deep cleanup
   */
  removeCoEdge(coedge: CoEdge, cleanup?: boolean, deep?: boolean): void;

  /**
   * Callback when a child entity becomes dirty
   * @param child - The child entity
   * @param changeType - Type of change that occurred
   */
  onChildDirty(child: Entity, changeType: string): void;

  /**
   * Iterates over all co-edges in the loop
   * @param callback - Function called for each co-edge (return true to break)
   * @param context - Context for callback execution
   * @returns True if iteration completed successfully
   */
  forEachCoEdge(
    callback: (coedge: CoEdge) => boolean | void,
    context?: any
  ): boolean;

  /**
   * Iterates over all vertices in the loop
   * @param callback - Function called for each vertex
   * @param context - Context for callback execution
   */
  forEachVertex(callback: (vertex: Vertex) => void, context?: any): void;

  /**
   * Iterates over vertices owned by this loop (not shared with partner co-edges)
   * @param callback - Function called for each owned vertex
   * @param context - Context for callback execution
   */
  forEachOwnedVertex(callback: (vertex: Vertex) => void, context?: any): void;

  /**
   * Collects all co-edges into an array
   * @returns Array of co-edges
   */
  getCoEdges(): CoEdge[];

  /**
   * Collects all edges referenced by this loop
   * @returns Array of edges
   */
  getLoopEdges(): any[]; // Replace 'any' with Edge type if available

  /**
   * Collects all 3D curves forming the loop
   * @returns Array of 3D curves
   */
  getLoopCurves(): Curve3d[];

  /**
   * Gets 2D parametric curves on the parent face's surface
   * Falls back to XY plane projection if no face parent exists
   * @returns Array of 2D curves
   */
  getLoopCurves2d(): any[]; // Replace with Curve2d type if available

  /**
   * Collects all vertices in the loop
   * @returns Array of vertices
   */
  getLoopVertices(): Vertex[];

  /**
   * Finds the first co-edge matching a predicate
   * @param predicate - Function to test each co-edge
   * @param context - Context for predicate execution
   * @returns First matching co-edge or undefined
   */
  findCoEdge(
    predicate: (coedge: CoEdge) => boolean,
    context?: any
  ): CoEdge | undefined;

  /**
   * Finds the co-edge ending at a specific vertex
   * @param vertex - The target vertex
   * @returns Co-edge with 'to' pointing to the vertex
   */
  findCoEdgeToVertex(vertex: Vertex): CoEdge | undefined;

  /**
   * Converts loop to a simple polygon (array of points)
   * @param closePath - Whether to duplicate the first point at the end
   * @returns Array of 3D points or undefined if invalid
   */
  toPolygon(closePath?: boolean): Point3D[] | undefined;

  /**
   * Converts loop to a discrete polygon with arc tessellation
   * Arcs are subdivided into line segments
   * @returns Array of 3D vectors or undefined if invalid
   */
  toDiscretePolygon(): any[] | undefined; // Replace with Vector3 type if available

  /**
   * Reverses the loop orientation
   * Swaps next/prev pointers and toggles reversed flags
   */
  invert(): void;

  /**
   * Clears all co-edges and resets the loop
   */
  clear(): void;

  /**
   * Calculates mass properties (area, centroid, etc.)
   * @returns Mass properties object or undefined if invalid
   */
  getMassProps(): MassProperties | undefined;

  /**
   * Gets the IO handler for serialization
   * @returns Loop_IO instance
   */
  getIO(): Loop_IO;

  /**
   * Verifies the loop's topological integrity
   * @returns True if valid
   */
  verify(): boolean;

  /**
   * Validates loop structure and connectivity
   * @param strict - Whether to perform strict validation
   * @returns True if validation passes
   */
  validate(strict?: boolean): boolean;
}