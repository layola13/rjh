/**
 * Edge module - Represents geometric edges connecting vertices in a topology model
 * Supports both linear and arc-based edge geometries
 */

import { Entity, Entity_IO } from './Entity';
import { Vec2 } from './Vec2';
import { EntityField } from './decorators';
import { Curve, Line3d, Arc3d, Vector3, Loader } from './Geometry';
import { Vertex } from './Vertex';
import { CoEdge } from './CoEdge';
import { Logger } from './Logger';

/**
 * Serialization format for Edge entity
 */
interface EdgeDumpData {
  /** Link: IDs of [from, to] vertices */
  ln?: [string, string];
  /** Legacy from vertex ID */
  from?: string;
  /** Legacy to vertex ID */
  to?: string;
  /** Associated coedge ID */
  ce?: string;
  /** Legacy coedge field */
  coedge?: string;
  /** Serialized curve geometry */
  curve: unknown;
  /** Flag indicating if this is a split edge */
  isSplitEdge?: boolean;
  /** Flag indicating if this is an inner edge */
  isInnerEdge?: boolean;
}

/**
 * Options for dump operation
 */
interface DumpOptions {
  /** Set of already dumped entity IDs to prevent duplication */
  dumpedEntities?: Set<string>;
}

/**
 * Context for loading serialized entities
 */
interface LoadContext {
  /** Version string for backward compatibility handling */
  version: string;
}

/**
 * Arc geometry information
 */
interface ArcInfo {
  /** Center point of the arc */
  center: Vec2;
  /** Radius of the arc */
  radius: number;
  /** Whether the arc follows clockwise direction */
  clockwise: boolean;
}

/**
 * I/O handler for Edge entity serialization/deserialization
 */
export class Edge_IO extends Entity_IO {
  /**
   * Serialize an Edge entity to a dump format
   * @param entity - The edge entity to serialize
   * @param callback - Optional callback invoked after serialization
   * @param recursive - Whether to recursively dump connected entities
   * @param options - Serialization options
   * @returns Array of serialized entity data
   */
  dump(
    entity: unknown,
    callback?: (data: unknown[], edge: Edge) => void,
    recursive: boolean = true,
    options: DumpOptions = {}
  ): unknown[];

  /**
   * Deserialize an Edge entity from dump format
   * @param entity - The edge entity instance to populate
   * @param data - Serialized edge data
   * @param context - Load context with version information
   */
  load(entity: unknown, data: EdgeDumpData, context: LoadContext): void;
}

/**
 * Edge entity - Represents a topological edge connecting two vertices
 * Can be either a straight line or an arc segment
 */
export class Edge extends Entity {
  /**
   * Starting vertex of the edge
   */
  @EntityField({
    partialSet(this: Edge, value: Vertex): void {
      this._setFrom(value);
    }
  })
  from: Vertex;

  /**
   * Ending vertex of the edge
   */
  @EntityField({
    partialSet(this: Edge, value: Vertex): void {
      this._setTo(value);
    }
  })
  to: Vertex;

  /**
   * Geometric curve representing the edge (Line3d or Arc3d)
   */
  @EntityField()
  curve: Curve;

  /**
   * Associated coedge - represents the edge's role in a loop
   */
  @EntityField()
  coedge?: CoEdge;

  /**
   * Flag indicating if this edge was created by splitting another edge
   */
  isSplitEdge: boolean;

  /**
   * Flag indicating if this is an inner edge (e.g., hole boundary)
   */
  isInnerEdge: boolean;

  /**
   * Internal reference to from vertex
   */
  private __from: Vertex;

  /**
   * Internal reference to to vertex
   */
  private __to: Vertex;

  /**
   * Internal curve storage
   */
  private __curve: Curve;

  /**
   * Internal coedge reference
   */
  private __coedge?: CoEdge;

  /**
   * Create a new Edge instance
   * @param id - Optional entity ID
   * @param type - Optional entity type
   */
  constructor(id?: string, type?: string);

  /**
   * Factory method to create an edge between two vertices
   * @param fromVertex - Starting vertex
   * @param toVertex - Ending vertex
   * @param curve - Optional curve geometry (defaults to Line3d)
   * @returns Newly created Edge instance
   */
  static create(
    fromVertex: Vertex,
    toVertex: Vertex,
    curve?: Curve
  ): Edge;

  /**
   * Parent entities (typically CoEdge instances)
   */
  get parents(): Record<string, Entity>;

  /**
   * Child entities (the from and to vertices)
   */
  get children(): Record<string, Entity>;

  /**
   * Midpoint of the edge
   */
  get middle(): Vec2;

  /**
   * Direction vector from start to end
   */
  get direction(): Vec2;

  /**
   * Center point (arc center for arc edges, midpoint for line edges)
   */
  get center(): Vec2;

  /**
   * Whether the arc follows clockwise direction (always false for line edges)
   */
  get clockwise(): boolean;

  /**
   * Radius of the arc (0 for line edges)
   */
  get radius(): number;

  /**
   * Arc geometry information if this is an arc edge
   */
  get arcInfo(): ArcInfo | undefined;

  /**
   * Geometric representation as [from, to] coordinates
   */
  get geometry(): [Vec2, Vec2];

  /**
   * Check if this edge is an arc (as opposed to a straight line)
   */
  isArcEdge(): boolean;

  /**
   * Get the starting vertex
   */
  getFrom(): Vertex;

  /**
   * Set the starting vertex
   */
  setFrom(vertex: Vertex): void;

  /**
   * Get the ending vertex
   */
  getTo(): Vertex;

  /**
   * Set the ending vertex
   */
  setTo(vertex: Vertex): void;

  /**
   * Get the curve geometry
   */
  getCurve(): Curve;

  /**
   * Set the curve geometry
   */
  setCurve(curve: Curve): void;

  /**
   * Get the associated coedge
   */
  getCoedge(): CoEdge | undefined;

  /**
   * Set the associated coedge
   */
  setCoedge(coedge: CoEdge): void;

  /**
   * Internal method to update the from vertex
   * @param vertex - New from vertex
   */
  private _setFrom(vertex: Vertex): void;

  /**
   * Internal method to update the to vertex
   * @param vertex - New to vertex
   */
  private _setTo(vertex: Vertex): void;

  /**
   * Update curve geometry when vertices change
   * @param fromVertex - Starting vertex
   * @param toVertex - Ending vertex
   */
  private _updateCurve(fromVertex: Vertex, toVertex: Vertex): void;

  /**
   * Convert a line edge to an arc edge
   * @param center - Center point of the arc
   * @param counterClockwise - Whether the arc should be counter-clockwise
   */
  changeToArcEdge(center: Vec2, counterClockwise: boolean): void;

  /**
   * Copy properties from another edge
   * @param sourceEdge - Source edge to copy from
   */
  copyProperty(sourceEdge: Edge): void;

  /**
   * Called when this edge is removed from a parent entity
   * @param parent - The parent being removed from
   * @param context - Optional removal context
   */
  onRemovedFromParent(parent: Entity, context?: unknown): void;

  /**
   * Get the I/O handler for this entity
   */
  getIO(): Edge_IO;

  /**
   * Called when a field value changes
   * @param fieldName - Name of the changed field
   * @param oldValue - Previous value
   * @param newValue - New value
   */
  onFieldChanged(fieldName: string, oldValue: unknown, newValue: unknown): void;

  /**
   * Called when a child entity becomes dirty
   * @param child - The child entity that changed
   * @param reason - Reason for the change
   */
  onChildDirty(child: Entity, reason: string): void;

  /**
   * Verify the integrity of this edge
   */
  verify(): boolean;

  /**
   * Validate the edge structure
   * @param autoFix - Whether to attempt automatic fixes for issues
   * @returns True if valid, false otherwise
   */
  validate(autoFix?: boolean): boolean;
}