/**
 * CoEdge module - represents a half-edge in a boundary representation topology.
 * A CoEdge is a directed reference to an Edge, allowing the same geometric edge
 * to be traversed in opposite directions by different loops.
 */

import { Entity, Entity_IO } from './Entity';
import { Edge } from './Edge';
import { Loop } from './Loop';
import { Vertex } from './Vertex';
import { Line3d } from './Line3d';
import { Coordinate } from './Coordinate';

/**
 * Serialization data structure for CoEdge persistence
 */
export interface CoEdgeDumpData {
  /** Reference to the underlying geometric edge */
  edge?: string;
  /** Previous CoEdge in the loop traversal */
  prev?: string;
  /** Next CoEdge in the loop traversal */
  next?: string;
  /** Partner CoEdge (same edge, opposite direction) */
  partner?: string;
  /** Whether this CoEdge traverses the edge in reverse */
  reversed?: boolean;
}

/**
 * Input/Output handler for CoEdge serialization and deserialization
 */
export declare class CoEdge_IO extends Entity_IO {
  /**
   * Serialize a CoEdge instance to a dump format
   * @param entity - The CoEdge to serialize
   * @param callback - Optional callback for custom serialization
   * @param includeChildren - Whether to include child entities
   * @param options - Additional serialization options
   * @returns Serialized data array
   */
  dump(
    entity: CoEdge,
    callback?: (data: unknown[], entity: CoEdge) => void,
    includeChildren?: boolean,
    options?: Record<string, unknown>
  ): unknown[];

  /**
   * Deserialize a CoEdge instance from dump data
   * @param entity - The CoEdge instance to populate
   * @param data - Serialized CoEdge data
   * @param context - Deserialization context containing entity registry
   */
  load(entity: CoEdge, data: CoEdgeDumpData, context: unknown): void;

  /**
   * Get singleton instance of CoEdge_IO
   */
  static instance(): CoEdge_IO;
}

/**
 * Arc geometry information for curved edges
 */
export interface ArcInfo {
  /** Center point of the arc */
  center: THREE.Vector3;
  /** Radius of the arc */
  radius: number;
  /** Whether the arc is traversed clockwise */
  clockwise: boolean;
}

/**
 * CoEdge - A directed half-edge in a boundary representation.
 * 
 * CoEdges form closed loops around faces by linking prev/next references.
 * Two CoEdges can share the same underlying Edge geometry but traverse it
 * in opposite directions (controlled by the 'reversed' flag).
 */
export declare class CoEdge extends Entity {
  /**
   * The underlying geometric edge
   * @internal
   */
  private __edge?: Edge;

  /**
   * Previous CoEdge in the loop
   * @internal
   */
  private __prev?: CoEdge;

  /**
   * Next CoEdge in the loop
   * @internal
   */
  private __next?: CoEdge;

  /**
   * Partner CoEdge sharing the same edge (opposite direction)
   * @internal
   */
  private __partner?: CoEdge;

  /**
   * Whether this CoEdge traverses its edge in reverse
   * @internal
   */
  private __reversed: boolean;

  /**
   * Create a new CoEdge instance
   * @param id - Optional entity identifier
   * @param metadata - Optional entity metadata
   */
  constructor(id?: string, metadata?: unknown);

  /**
   * Create a CoEdge connecting two vertices
   * @param fromVertex - Starting vertex
   * @param toVertex - Ending vertex
   * @param curve - Optional curve geometry (defaults to Line3d)
   * @returns New CoEdge instance
   */
  static create(fromVertex: Vertex, toVertex: Vertex, curve?: Line3d): CoEdge;

  /**
   * Create a CoEdge from an existing Edge
   * @param edge - The edge to wrap
   * @returns New CoEdge instance
   */
  static createFromEdge(edge: Edge): CoEdge;

  /**
   * Get the parent loop containing this CoEdge
   */
  get parent(): Loop | null;

  /**
   * Get child entities (typically the underlying edge)
   */
  get children(): Record<string, Entity>;

  /**
   * Get the starting vertex of this directed edge
   */
  get from(): Vertex | null;
  set from(vertex: Vertex);

  /**
   * Get the ending vertex of this directed edge
   */
  get to(): Vertex | null;
  set to(vertex: Vertex);

  /**
   * Get the midpoint of the edge
   */
  get middle(): Coordinate | null;

  /**
   * Get the rotation angle of the edge in radians
   */
  get rotation(): number;

  /**
   * Get the direction vector from start to end
   */
  get direction(): HSCore.Util.Math.Vec2;

  /**
   * Get arc geometry information if this is a curved edge
   * @returns Arc info or undefined for straight edges
   */
  get arcInfo(): ArcInfo | undefined;

  /**
   * Get the geometric representation [start, end]
   */
  get geometry(): [THREE.Vector3, THREE.Vector3];

  /**
   * The underlying geometric edge
   */
  get edge(): Edge | undefined;
  set edge(value: Edge | undefined);

  /**
   * Previous CoEdge in the loop traversal
   */
  get prev(): CoEdge | undefined;
  set prev(value: CoEdge | undefined);

  /**
   * Next CoEdge in the loop traversal
   */
  get next(): CoEdge | undefined;
  set next(value: CoEdge | undefined);

  /**
   * Partner CoEdge (same edge, opposite direction)
   */
  get partner(): CoEdge | undefined;
  set partner(value: CoEdge | undefined);

  /**
   * Whether this CoEdge traverses its edge in reverse
   */
  get reversed(): boolean;
  set reversed(value: boolean);

  // Getter/Setter method variants

  getPrev(): CoEdge | undefined;
  setPrev(coEdge: CoEdge | undefined): void;

  getNext(): CoEdge | undefined;
  setNext(coEdge: CoEdge | undefined): void;

  getPartner(): CoEdge | undefined;
  setPartner(coEdge: CoEdge | undefined): void;

  getReversed(): boolean;
  setReversed(reversed: boolean): void;

  getFrom(): Vertex | null;
  setFrom(vertex: Vertex): void;

  getTo(): Vertex | null;
  setTo(vertex: Vertex): void;

  /**
   * Set the underlying edge and establish bidirectional references
   * @internal
   */
  private _setEdge(edge: Edge | undefined): void;

  /**
   * Set the previous CoEdge in the loop
   * @internal
   */
  private _setPrev(coEdge: CoEdge | undefined): void;

  /**
   * Set the next CoEdge in the loop
   * @internal
   */
  private _setNext(coEdge: CoEdge | undefined): void;

  /**
   * Set the partner CoEdge
   * @internal
   */
  private _setPartner(coEdge: CoEdge | undefined): void;

  /**
   * Assign this CoEdge to a loop
   * @param loop - The loop to join
   */
  setLoop(loop: Loop): void;

  /**
   * Get the I/O handler for serialization
   */
  getIO(): CoEdge_IO;

  /**
   * Verify the topological integrity of this CoEdge
   * @returns True if valid
   */
  verify(): boolean;

  /**
   * Validate the CoEdge structure
   * @param autoRepair - Whether to attempt automatic repair
   * @returns True if valid or successfully repaired
   */
  validate(autoRepair?: boolean): boolean;

  /**
   * Lifecycle callback when added to a parent entity
   * @param parent - The new parent entity
   */
  onAddedToParent(parent: Entity): void;

  /**
   * Lifecycle callback when being removed from a parent
   * @param parent - The parent being removed from
   * @param options - Removal options
   */
  onRemovingFromParent(parent: Entity, options?: { recycleEntity?: (entity: Entity) => void }): void;

  /**
   * Lifecycle callback after removal from a parent
   * @param parent - The former parent entity
   * @param options - Removal options
   */
  onRemovedFromParent(parent: Entity, options?: { recycleEntity?: (entity: Entity) => void }): void;

  /**
   * Handle dirty state propagation from child entities
   * @param child - The child that became dirty
   * @param reason - Reason for the dirty state
   */
  onChildDirty(child: Entity, reason: unknown): void;
}