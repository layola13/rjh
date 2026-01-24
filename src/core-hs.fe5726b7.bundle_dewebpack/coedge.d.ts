/**
 * CoEdge module - Represents a coedge in a boundary representation (B-Rep) topology.
 * A coedge is a directed usage of an edge within a loop, providing orientation information.
 */

import { Entity, Entity_IO } from './Entity';
import { Edge } from './Edge';
import { Coordinate } from './Coordinate';

/**
 * Serialization/deserialization handler for CoEdge entities.
 */
export declare class CoEdge_IO extends Entity_IO {
  /**
   * Loads a CoEdge instance from serialized data.
   * @param entity - The target CoEdge entity to populate
   * @param data - Serialized data containing edge, prev, next, partner references and reversed flag
   * @param context - Deserialization context
   * @param options - Additional loading options
   */
  load(
    entity: CoEdge,
    data: CoEdgeDumpData,
    context: DeserializationContext,
    options: LoadOptions
  ): void;

  /**
   * Returns the singleton instance of CoEdge_IO.
   */
  static instance(): CoEdge_IO;
}

/**
 * Serialized representation of a CoEdge.
 */
interface CoEdgeDumpData {
  /** Reference ID to the underlying Edge */
  edge: string;
  /** Reference ID to the previous CoEdge in the loop */
  prev: string;
  /** Reference ID to the next CoEdge in the loop */
  next: string;
  /** Optional reference ID to the partner CoEdge (opposite orientation) */
  partner?: string;
  /** Whether this coedge uses the edge in reversed direction */
  reversed?: boolean;
}

/**
 * Arc geometry information for curved edges.
 */
interface ArcInfo {
  /** Center point of the arc */
  center: THREE.Vector3;
  /** Radius of the arc */
  radius: number;
  /** Whether the arc is oriented clockwise */
  clockwise: boolean;
}

/**
 * CoEdge - A directed edge usage within a topological loop.
 * 
 * In boundary representation (B-Rep) modeling, a CoEdge represents how an Edge
 * is used within a Loop. Each Edge can have up to two CoEdges (partners) representing
 * opposite traversal directions. The CoEdge maintains connectivity information (prev/next)
 * to form closed loops.
 */
export declare class CoEdge extends Entity {
  /**
   * The underlying geometric edge.
   * @internal Use getter/setter for proper relationship management
   */
  private __edge?: Edge;

  /**
   * The previous CoEdge in the loop traversal.
   * @internal Use getter/setter for proper relationship management
   */
  private __prev?: CoEdge;

  /**
   * The next CoEdge in the loop traversal.
   * @internal Use getter/setter for proper relationship management
   */
  private __next?: CoEdge;

  /**
   * The partner CoEdge representing opposite orientation of the same edge.
   * @internal Use getter/setter for proper relationship management
   */
  private __partner?: CoEdge;

  /**
   * Whether this coedge uses the edge in reversed direction.
   * @internal
   */
  private __reversed: boolean;

  /**
   * Creates a new CoEdge instance.
   * @param tag - Optional identifier tag for debugging
   */
  constructor(tag?: string);

  /**
   * Creates a CoEdge by finding or creating an edge between two coordinates.
   * @param fromCoord - Starting coordinate
   * @param toCoord - Ending coordinate
   * @returns New CoEdge instance
   */
  static create(fromCoord: Coordinate, toCoord: Coordinate): CoEdge;

  /**
   * Creates a CoEdge from an existing Edge.
   * @param edge - The edge to wrap
   * @returns New CoEdge instance
   */
  static createFromEdge(edge: Edge): CoEdge;

  /**
   * Gets the parent Loop entity containing this CoEdge.
   */
  get parent(): Entity | null;

  /**
   * Gets child entities (typically the underlying Edge).
   */
  get children(): ReadonlyArray<Entity>;

  /**
   * Gets the starting coordinate, respecting the reversed flag.
   */
  get from(): Coordinate | null;

  /**
   * Sets the starting coordinate, respecting the reversed flag.
   */
  set from(value: Coordinate | null);

  /**
   * Gets the ending coordinate, respecting the reversed flag.
   */
  get to(): Coordinate | null;

  /**
   * Sets the ending coordinate, respecting the reversed flag.
   */
  set to(value: Coordinate | null);

  /**
   * Gets the midpoint of the edge.
   */
  get middle(): Coordinate | null;

  /**
   * Gets the rotation angle in radians (counter-clockwise from horizontal).
   */
  get rotation(): number;

  /**
   * Gets the direction vector from start to end point.
   */
  get direction(): Vec2;

  /**
   * Gets arc information if this is a curved edge.
   * @returns Arc geometry or undefined if not an arc
   */
  get arcInfo(): ArcInfo | undefined;

  /**
   * Gets the geometric representation as [from, to] coordinates.
   */
  get geometry(): [THREE.Vector3, THREE.Vector3];

  /**
   * Gets the underlying Edge entity.
   */
  get edge(): Edge | undefined;

  /**
   * Sets the underlying Edge entity and establishes bidirectional relationship.
   */
  set edge(value: Edge | undefined);

  /**
   * Gets the previous CoEdge in the loop.
   */
  get prev(): CoEdge | undefined;

  /**
   * Sets the previous CoEdge in the loop.
   */
  set prev(value: CoEdge | undefined);

  /**
   * Gets the next CoEdge in the loop.
   */
  get next(): CoEdge | undefined;

  /**
   * Sets the next CoEdge in the loop.
   */
  set next(value: CoEdge | undefined);

  /**
   * Gets the partner CoEdge (opposite orientation).
   */
  get partner(): CoEdge | undefined;

  /**
   * Sets the partner CoEdge (opposite orientation).
   */
  set partner(value: CoEdge | undefined);

  /**
   * Gets whether this coedge uses reversed edge direction.
   */
  get reversed(): boolean;

  /**
   * Sets whether this coedge uses reversed edge direction.
   */
  set reversed(value: boolean);

  /**
   * Gets the previous CoEdge in the loop.
   * @deprecated Use prev getter instead
   */
  getPrev(): CoEdge | undefined;

  /**
   * Gets the next CoEdge in the loop.
   * @deprecated Use next getter instead
   */
  getNext(): CoEdge | undefined;

  /**
   * Gets the partner CoEdge.
   * @deprecated Use partner getter instead
   */
  getPartner(): CoEdge | undefined;

  /**
   * Gets the reversed flag.
   * @deprecated Use reversed getter instead
   */
  getReversed(): boolean;

  /**
   * Gets the starting coordinate.
   * @deprecated Use from getter instead
   */
  getFrom(): Coordinate | null;

  /**
   * Gets the ending coordinate.
   * @deprecated Use to getter instead
   */
  getTo(): Coordinate | null;

  /**
   * Internal setter for edge with relationship management.
   * @internal
   */
  _setEdge(edge: Edge | undefined): void;

  /**
   * Internal setter for prev with relationship management.
   * @internal
   */
  _setPrev(prev: CoEdge | undefined): void;

  /**
   * Internal setter for next with relationship management.
   * @internal
   */
  _setNext(next: CoEdge | undefined): void;

  /**
   * Internal setter for partner with relationship management.
   * @internal
   */
  _setPartner(partner: CoEdge | undefined): void;

  /**
   * Assigns this CoEdge to a Loop.
   * @param loop - The target Loop entity
   */
  setLoop(loop: Entity): void;

  /**
   * Gets the IO handler for serialization.
   */
  getIO(): CoEdge_IO;

  /**
   * Verifies the topological integrity of this CoEdge.
   * @returns True if valid
   * @deprecated Use validate instead
   */
  verify(): boolean;

  /**
   * Validates the topological integrity of this CoEdge.
   * @param autoFix - Whether to attempt automatic correction of issues
   * @returns True if valid or successfully fixed
   */
  validate(autoFix?: boolean): boolean;

  /**
   * Lifecycle hook called when added to a parent entity.
   * @param parent - The parent entity
   * @internal
   */
  onAddedToParent(parent: Entity): void;

  /**
   * Lifecycle hook called before removal from a parent entity.
   * @param parent - The parent entity
   * @param options - Removal options
   * @internal
   */
  onRemovingFromParent(parent: Entity, options?: RemovalOptions): void;

  /**
   * Lifecycle hook called after removal from a parent entity.
   * @param parent - The parent entity
   * @param options - Removal options
   * @internal
   */
  onRemovedFromParent(parent: Entity, options?: RemovalOptions): void;

  /**
   * Lifecycle hook called when a child entity becomes dirty.
   * @param child - The child entity
   * @param reason - Reason for dirtiness
   * @internal
   */
  onChildDirty(child: Entity, reason: DirtyReason): void;
}

/**
 * Options for entity removal operations.
 */
interface RemovalOptions {
  /** Whether to recycle the entity for reuse */
  recycleEntity?: (entity: Entity) => void;
}

/**
 * Context object for deserialization operations.
 */
interface DeserializationContext {
  [key: string]: unknown;
}

/**
 * Options for entity loading operations.
 */
interface LoadOptions {
  [key: string]: unknown;
}

/**
 * Reason codes for entity dirty state changes.
 */
type DirtyReason = string;

/**
 * 2D vector utility type.
 */
interface Vec2 {
  x: number;
  y: number;
  subtract(other: Coordinate): Vec2;
}