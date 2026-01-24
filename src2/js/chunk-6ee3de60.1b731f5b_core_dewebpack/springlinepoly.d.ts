import type { Point, Vector, Arc } from './geometry';
import type { WinEdge, WinPolygon, PolygonCreator, DescriptivePolygonPoints } from './polygon';

/**
 * Control point configuration for polygon vertices
 */
interface ControlPointConfig {
  /** Whether this control point is on an arc */
  arc: boolean;
  /** Whether this control point is an endpoint */
  endpoint: boolean;
}

/**
 * Dimension information for polygon edges
 */
interface DimensionInfo {
  /** Edge index */
  idx: number;
  /** Whether dimension should be displayed */
  dimShow: boolean;
}

/**
 * JSON serialization format for SpringlinePoly
 */
interface SpringlinePolyJSON {
  /** Polygon type identifier */
  type: string;
  /** Center point data */
  cpt: any;
  /** Width of the springline polygon */
  width: number;
  /** Height of the springline polygon */
  height: number;
  /** Arc height for curved edge */
  arcHeight: number;
  [key: string]: any;
}

/**
 * SpringlinePoly - A specialized polygon shape with three straight edges and one curved (arc) edge.
 * Commonly used for representing springline architectural elements.
 * 
 * @extends WinPolygon
 */
export declare class SpringlinePoly extends WinPolygon {
  /** Center point of the polygon */
  cpt: Point;
  
  /** Width dimension (horizontal span) */
  width: number;
  
  /** Height dimension (vertical span) */
  height: number;
  
  /** Height of the arc on the curved edge */
  arcHeight: number;

  /**
   * Creates a new SpringlinePoly instance
   * 
   * @param cpt - Center point of the polygon
   * @param width - Width of the polygon
   * @param height - Height of the polygon
   * @param arcHeight - Height of the curved arc edge
   * @param edges - Array of WinEdge objects defining the polygon boundary (auto-generated if empty)
   */
  constructor(cpt: Point, width: number, height: number, arcHeight: number, edges?: WinEdge[]);

  /**
   * Flag indicating whether dimension control is enabled
   * @readonly
   */
  get controlDimFlag(): boolean;

  /**
   * Initializes control point configurations for the polygon vertices
   * Sets up 4 control points with specific arc/endpoint properties
   */
  initPoly(): void;

  /**
   * Factory method to create edge array for a springline polygon
   * 
   * @param cpt - Center point
   * @param width - Width dimension
   * @param height - Height dimension
   * @param arcHeight - Arc height for the curved edge
   * @returns Array of WinEdge objects representing the polygon boundary
   */
  static create(cpt: Point, width: number, height: number, arcHeight: number): WinEdge[];

  /**
   * Creates a deep copy of this polygon
   * @returns New SpringlinePoly instance with cloned properties
   */
  _clone(): SpringlinePoly;

  /**
   * Scales the polygon by a given factor
   * 
   * @param scaleFactor - Scaling multiplier
   * @returns This polygon (for chaining)
   */
  scale(scaleFactor: number): this;

  /**
   * Serializes the polygon to JSON format
   * @returns JSON object representation
   */
  toJSON(): SpringlinePolyJSON;

  /**
   * Translates (moves) the polygon by a vector
   * 
   * @param offset - Translation vector
   * @returns This polygon (for chaining)
   */
  translate(offset: Vector): this;

  /**
   * Rotates the polygon around a point
   * 
   * @param angle - Rotation angle (in radians)
   * @param center - Center point of rotation
   * @returns This polygon (for chaining)
   */
  rotate(angle: number, center: Point): this;

  /**
   * Handles edge dragging interaction
   * 
   * @param edgeIndex - Index of the edge being dragged (0-3)
   * @param dragVector - Vector representing the drag movement
   * @param referencePoint - Optional reference point for the drag operation
   * @returns New SpringlinePoly instance with updated geometry, or this polygon if operation fails
   */
  dragEdge(edgeIndex: number, dragVector: Vector, referencePoint?: Point): SpringlinePoly;

  /**
   * Handles vertex dragging interaction (currently returns unchanged polygon)
   * 
   * @returns This polygon (no modification)
   */
  dragVertex(): this;

  /**
   * Handles arc dragging interaction for the curved edge
   * 
   * @param arcIndex - Index of the arc being dragged
   * @param dragTarget - Target position or adjustment vector
   * @returns New SpringlinePoly instance with updated arc geometry
   */
  dragArc(arcIndex: number, dragTarget: any): SpringlinePoly;

  /**
   * Edits polygon dimensions by moving a vertex
   * 
   * @param vertexIndex - Index of the vertex to edit
   * @param param - Additional parameter (unused in current implementation)
   * @param offset - Offset vector for the vertex movement
   * @returns New SpringlinePoly instance with updated dimensions
   */
  editDim(vertexIndex: number, param: any, offset: Vector): SpringlinePoly;

  /**
   * Initializes dimension display information for all edges
   * 
   * @returns Map of edge indices to dimension information
   */
  initDimInfo(): Record<number, DimensionInfo>;
}