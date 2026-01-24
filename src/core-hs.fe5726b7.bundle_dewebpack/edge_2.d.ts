/**
 * Edge module - Represents geometric edges in the boundary representation system
 * Manages connections between vertices with optional curve geometry
 */

import { Entity, Entity_IO } from './Entity';
import { Curve } from './Curve';
import { ArcCurve } from './ArcCurve';
import { Vec2 } from './Vec2';
import { Vertex } from './Vertex';
import { CoEdge } from './CoEdge';
import { Logger } from './Logger';

/**
 * Serialization/deserialization handler for Edge entities
 */
export declare class Edge_IO extends Entity_IO {
  /**
   * Deserializes edge data from dump format
   * @param entity - Target edge entity to populate
   * @param dump - Serialized edge data containing ln/from/to, curve, flags
   * @param context - Deserialization context for reference resolution
   * @param options - Additional loading options
   */
  load(
    entity: Edge,
    dump: EdgeDumpData,
    context: DeserializationContext,
    options: LoadOptions
  ): void;
}

/**
 * Dump format for edge serialization
 */
interface EdgeDumpData {
  /** Link nodes (from/to vertex IDs) - compact format */
  ln?: [string, string];
  /** From vertex ID - legacy format */
  from?: string;
  /** To vertex ID - legacy format */
  to?: string;
  /** Curve geometry data */
  curve: CurveDumpData;
  /** Flag indicating if edge is split from subdivision */
  isSplitEdge?: boolean;
  /** Flag indicating if edge is internal to a face */
  isInnerEdge?: boolean;
  /** Associated coedge ID */
  coedge?: string;
  /** Associated coedge ID - legacy format */
  ce?: string;
}

/**
 * Arc geometry information
 */
interface ArcInfo {
  /** Center point of the arc */
  center: Vec2;
  /** Radius of the arc */
  radius: number;
  /** Direction of arc traversal (true = clockwise) */
  clockwise: boolean;
}

/**
 * Edge geometry representation as endpoint coordinates
 */
type EdgeGeometry = [Vec2, Vec2];

/**
 * Edge - Fundamental topological element connecting two vertices
 * 
 * Represents a bounded curve segment in the boundary representation (B-rep) structure.
 * Each edge connects exactly two vertices and may have associated curve geometry.
 * Edges participate in the topological hierarchy through parent CoEdge relationships.
 * 
 * @remarks
 * - An edge always has exactly one or two parent CoEdges
 * - When two CoEdges share an edge, they represent opposite orientations
 * - Supports both linear and arc curve geometries
 * - Marked as split edge when created from subdivision operations
 * - Marked as inner edge when inside a face boundary
 */
export declare class Edge extends Entity {
  /**
   * Starting vertex of the edge
   * @internal Decorated with @EntityField for automatic serialization
   */
  private __from: Vertex;

  /**
   * Ending vertex of the edge
   * @internal Decorated with @EntityField for automatic serialization
   */
  private __to: Vertex;

  /**
   * Curve geometry defining the edge shape between vertices
   * Can be LineCurve (straight) or ArcCurve (circular arc)
   * @internal Decorated with @EntityField for automatic serialization
   */
  private __curve: Curve;

  /**
   * Primary parent CoEdge reference for quick topological access
   * @internal Decorated with @EntityField for automatic serialization
   */
  private __coedge: CoEdge;

  /**
   * Flag indicating this edge was created by splitting another edge
   * Used for tracking subdivision operations
   */
  isSplitEdge: boolean;

  /**
   * Flag indicating this edge lies inside a face (not on boundary)
   * Used for internal triangulation or tessellation edges
   */
  isInnerEdge: boolean;

  /**
   * Creates a new Edge instance
   * @param tag - Optional identifier tag for debugging
   */
  constructor(tag?: string);

  /**
   * Factory method to create an edge between two vertices
   * Automatically establishes parent-child relationships
   * 
   * @param from - Starting vertex
   * @param to - Ending vertex
   * @returns New edge connecting the vertices
   */
  static create(from: Vertex, to: Vertex): Edge;

  /**
   * Gets starting vertex of the edge
   */
  get from(): Vertex;

  /**
   * Gets ending vertex of the edge
   */
  get to(): Vertex;

  /**
   * Gets the curve geometry
   */
  get curve(): Curve;

  /**
   * Gets the primary parent CoEdge
   */
  get coedge(): CoEdge;

  /**
   * Gets all parent entities (typically CoEdges)
   */
  get parents(): Record<string, Entity>;

  /**
   * Gets all child entities (from and to vertices)
   */
  get children(): Record<string, Entity>;

  /**
   * Calculates the midpoint between from and to vertices
   * @returns Point at parameter t=0.5 along the edge
   */
  get middle(): Vec2;

  /**
   * Calculates the direction vector from start to end
   * @returns Vector pointing from 'from' to 'to'
   */
  get direction(): Vec2;

  /**
   * Gets the geometric center point
   * - For arc edges: returns arc center
   * - For linear edges: returns midpoint
   */
  get center(): Vec2;

  /**
   * Gets arc traversal direction
   * @returns True if arc is clockwise, false if counter-clockwise, undefined for linear edges
   */
  get clockwise(): boolean | undefined;

  /**
   * Gets arc radius
   * @returns Radius for arc edges, 0 for linear edges
   */
  get radius(): number;

  /**
   * Gets complete arc geometry information
   * @returns Arc parameters if edge is arc, undefined otherwise
   */
  get arcInfo(): ArcInfo | undefined;

  /**
   * Gets edge geometry as coordinate pair
   * @returns Tuple of [from, to] vertex positions
   */
  get geometry(): EdgeGeometry;

  /**
   * Checks if this edge has arc geometry
   * @returns True if curve is an ArcCurve
   */
  isArcEdge(): boolean;

  /**
   * Gets starting vertex (accessor method)
   * @returns The from vertex
   */
  getFrom(): Vertex;

  /**
   * Gets ending vertex (accessor method)
   * @returns The to vertex
   */
  getTo(): Vertex;

  /**
   * Gets curve geometry (accessor method)
   * @returns The curve
   */
  getCurve(): Curve;

  /**
   * Gets primary coedge (accessor method)
   * @returns The coedge
   */
  getCoedge(): CoEdge;

  /**
   * Internal setter for from vertex with relationship management
   * Removes old vertex from children, adds new vertex
   * @param vertex - New starting vertex
   * @internal
   */
  private _setFrom(vertex: Vertex): void;

  /**
   * Internal setter for to vertex with relationship management
   * Removes old vertex from children, adds new vertex
   * @param vertex - New ending vertex
   * @internal
   */
  private _setTo(vertex: Vertex): void;

  /**
   * Copies split and inner edge flags from another edge
   * @param source - Source edge to copy properties from
   */
  copyProperty(source: Edge): void;

  /**
   * Handles parent removal event
   * Updates coedge reference if removed parent was the primary coedge
   * 
   * @param parent - Parent entity being removed
   * @param context - Optional removal context
   */
  onRemovedFromParent(parent: Entity, context?: unknown): void;

  /**
   * Gets the I/O handler for serialization
   * @returns Singleton Edge_IO instance
   */
  getIO(): Edge_IO;

  /**
   * Handles field change notifications
   * Marks geometry dirty when from/to/curve/coedge changes
   * 
   * @param fieldName - Name of changed field
   * @param oldValue - Previous value
   * @param newValue - New value
   */
  onFieldChanged(fieldName: string, oldValue: unknown, newValue: unknown): void;

  /**
   * Verifies edge integrity (alias for validate)
   * @returns True if edge is valid
   */
  verify(): boolean;

  /**
   * Validates edge topology and relationships
   * 
   * Checks:
   * - From and to are valid Vertex instances
   * - Vertices pass their own validation
   * - Coedge is valid CoEdge instance
   * - Parent count is 1 or 2
   * - If 2 parents, they are properly partnered
   * 
   * @param autoFix - If true, attempts to fix coedge from parents
   * @returns True if all validation checks pass
   */
  validate(autoFix?: boolean): boolean;
}

/**
 * Deserialization context for entity loading
 */
interface DeserializationContext {
  // Context-specific properties for entity resolution
  [key: string]: unknown;
}

/**
 * Options for entity loading
 */
interface LoadOptions {
  // Load-specific configuration
  [key: string]: unknown;
}

/**
 * Curve dump data structure
 */
interface CurveDumpData {
  type: string;
  [key: string]: unknown;
}