import type { Point, Vector, Arc, Segment, Polygon } from '@flatten-js/core';

/**
 * Control point configuration for polygon edges
 */
interface ControlPointConfig {
  /** Whether this control point is on an arc */
  arc: boolean;
  /** Whether this control point is an endpoint */
  endpoint: boolean;
}

/**
 * Dimension information for an edge
 */
interface DimensionInfo {
  /** Edge index */
  idx: number;
  /** Whether dimension should be displayed */
  dimShow: boolean;
}

/**
 * Serialized representation of MosquePoly
 */
interface MosquePolyJSON {
  /** Polygon type identifier */
  type: string;
  /** Center position of the mosque polygon */
  position: { x: number; y: number };
  /** Tangent point for the dome arc construction */
  tangentPoint: { x: number; y: number };
  /** Total width of the mosque base */
  width: number;
  /** Radius of the small decorative arcs */
  smArcRadius: number;
  /** Fixed height of the minaret section */
  fixedHeight: number;
  /** Additional polygon properties */
  [key: string]: unknown;
}

/**
 * Represents a mosque-shaped polygon with a dome and minaret structure.
 * 
 * The mosque polygon consists of:
 * - A central dome created using arc segments
 * - Symmetrical side arcs
 * - A rectangular minaret base
 * 
 * @extends WinPolygon
 */
export declare class MosquePoly extends WinPolygon {
  /** Center position of the mosque polygon */
  position: Point;
  
  /** Tangent point used for dome arc construction */
  tangentPoint: Point;
  
  /** Total width of the mosque base */
  width: number;
  
  /** Radius of the small decorative arcs on the sides */
  smArcRadius: number;
  
  /** Fixed height of the minaret section */
  fixedHeight: number;
  
  /** Internal polygon structure */
  polygon: Polygon;
  
  /** Collection of edges forming the polygon */
  edges: Array<Arc | Segment>;
  
  /** Map of control point configurations for each edge */
  ctlRobs: Map<number, ControlPointConfig>;

  /**
   * Creates a new MosquePoly instance
   * 
   * @param position - Center position of the mosque
   * @param tangentPoint - Tangent point for dome construction
   * @param width - Total width of the mosque base (default: 4000)
   * @param smArcRadius - Radius of side decorative arcs (default: 500)
   * @param fixedHeight - Height of the minaret section (default: 200)
   * @param edges - Optional pre-computed edges array
   */
  constructor(
    position: Point,
    tangentPoint: Point,
    width?: number,
    smArcRadius?: number,
    fixedHeight?: number,
    edges?: Array<Arc | Segment>
  );

  /**
   * Flag indicating whether this polygon supports dimension control
   * @readonly
   */
  get controlDimFlag(): boolean;

  /**
   * Factory method to create mosque polygon edges
   * 
   * Generates the geometric edges that form the mosque shape including:
   * - Main dome arc
   * - Side decorative arcs
   * - Minaret base segments
   * 
   * @param position - Center position of the mosque
   * @param tangentPoint - Tangent point for dome arc
   * @param width - Total width of the base (default: 4000)
   * @param smArcRadius - Radius of side arcs (default: 500)
   * @param fixedHeight - Height of minaret (default: 200)
   * @returns Array of edges (arcs and segments) forming the polygon
   * @throws Error if tangentPoint.x >= position.x
   */
  static create(
    position: Point,
    tangentPoint: Point,
    width?: number,
    smArcRadius?: number,
    fixedHeight?: number
  ): Array<Arc | Segment>;

  /**
   * Scales the mosque polygon by a given factor
   * 
   * Scales all dimensional properties and updates the geometry
   * 
   * @param factor - Scale factor to apply
   * @returns This instance for method chaining
   */
  scale(factor: number): this;

  /**
   * Serializes the mosque polygon to a JSON object
   * 
   * @returns JSON representation containing all geometric properties
   */
  toJSON(): MosquePolyJSON;

  /**
   * Translates the mosque polygon by a vector
   * 
   * @param vector - Translation vector
   * @returns This instance for method chaining
   */
  translate(vector: Vector): this;

  /**
   * Handles edge dragging interaction
   * 
   * Modifies the polygon based on which edge is dragged:
   * - Edge 4: Adjusts width (horizontal drag)
   * - Edge 5: Adjusts fixed height (vertical drag)
   * - Edge 6: Adjusts width (horizontal drag, mirrored)
   * 
   * @param edgeIndex - Index of the edge being dragged
   * @param dragVector - Vector representing the drag movement
   * @param referencePoint - Optional reference point for the drag operation
   * @returns New MosquePoly instance with updated dimensions
   */
  dragEdge(
    edgeIndex: number,
    dragVector: Vector,
    referencePoint?: Point
  ): MosquePoly;

  /**
   * Handles vertex dragging interaction
   * 
   * Modifies the polygon based on which vertex is dragged:
   * - Vertex 1 or 3: Adjusts tangent point position
   * - Vertex 2: Adjusts small arc radius
   * 
   * @param vertexIndex - Index of the vertex being dragged
   * @param dragVector - Vector representing the drag movement
   * @param edge - Associated edge information
   * @param referencePoint - Optional reference point for the drag operation
   * @returns New MosquePoly instance with updated geometry
   */
  dragVertex(
    vertexIndex: number,
    dragVector: Vector,
    edge: unknown,
    referencePoint?: Point
  ): MosquePoly;

  /**
   * Handles arc dragging interaction
   * 
   * Currently returns the polygon unchanged
   * 
   * @param arcIndex - Index of the arc being dragged
   * @param dragVector - Vector representing the drag movement
   * @returns This instance unchanged
   */
  dragArc(arcIndex: number, dragVector: Vector): this;

  /**
   * Edits polygon dimensions by applying a scale factor to specific dimensions
   * 
   * @param dimIndex - Index of the dimension to edit (5 = height, 6 = width)
   * @param scaleFactor - Factor to multiply the dimension by
   * @param _unused - Unused parameter
   * @returns New MosquePoly instance with updated dimensions
   */
  editDim(dimIndex: number, scaleFactor: number, _unused?: unknown): MosquePoly;

  /**
   * Initializes dimension visibility information for all edges
   * 
   * Sets which edges should display dimension annotations:
   * - Edges 4 and 5: Visible dimensions
   * - All other edges: Hidden dimensions
   * 
   * @returns Array of dimension information objects
   */
  initDimInfo(): DimensionInfo[];

  /**
   * Creates a deep clone of this mosque polygon
   * 
   * @returns New MosquePoly instance with cloned properties
   * @private
   */
  _clone(): MosquePoly;

  /**
   * Initializes control point configurations for all edges
   * 
   * Sets which vertices can be interacted with:
   * - Vertices 1, 2, 3, 5: Endpoint control enabled
   * - Other vertices: Endpoint control disabled
   * - All arcs: Arc control disabled
   * 
   * @private
   */
  initPoly(): void;

  /**
   * Mirrors a point across a vertical line passing through a reference point
   * 
   * @param point - Point to mirror
   * @param centerPoint - Reference point defining the mirror axis
   * @returns Mirrored point
   * @private
   */
  private static mirrorPoint(point: Point, centerPoint: Point): Point;
}