import type { Point, Vector, Arc, Segment, Polygon } from '@flatten-js/core';
import type { WinPolygon, PolyType } from './WinPolygon';

/**
 * Dimension information for polygon edges
 */
export interface DimInfo {
  /** Edge index */
  idx: number;
  /** Whether to show dimension */
  dimShow: boolean;
}

/**
 * Control point configuration for editing
 */
export interface ControlConfig {
  /** Whether this control point is on an arc */
  arc: boolean;
  /** Whether this control point is an endpoint */
  endpoint: boolean;
}

/**
 * JSON representation of WavePoly
 */
export interface WavePolyJSON {
  /** Polygon type identifier */
  type: PolyType;
  /** Center position of the wave polygon */
  position: { x: number; y: number };
  /** Tangent control point for wave curvature */
  tangentPoint: { x: number; y: number };
  /** Total width of the wave polygon */
  width: number;
  /** Total height of the wave polygon */
  height: number;
  /** Additional polygon properties */
  [key: string]: unknown;
}

/**
 * WavePoly - A specialized polygon shape with wave-like curved edges
 * 
 * Extends WinPolygon to create decorative wave patterns with controllable
 * dimensions and curvature. Commonly used for architectural or decorative elements.
 */
export declare class WavePoly extends WinPolygon {
  /**
   * Center position of the wave polygon
   */
  position: Point;

  /**
   * Tangent control point that defines the curvature of the wave
   */
  tangentPoint: Point;

  /**
   * Total width of the wave polygon
   * @default 4000
   */
  width: number;

  /**
   * Total height of the wave polygon
   * @default 2000
   */
  height: number;

  /**
   * Map of control point configurations for interactive editing
   */
  ctlRobs: Map<number, ControlConfig>;

  /**
   * Creates a new WavePoly instance
   * 
   * @param position - Center position of the wave polygon
   * @param tangentPoint - Point defining the wave curvature
   * @param width - Total width of the polygon (default: 4000)
   * @param height - Total height of the polygon (default: 2000)
   * @param edges - Optional pre-computed edges (internal use)
   */
  constructor(
    position: Point,
    tangentPoint: Point,
    width?: number,
    height?: number,
    edges?: Array<Arc | Segment>
  );

  /**
   * Flag indicating whether dimension controls are enabled
   * @readonly
   */
  get controlDimFlag(): boolean;

  /**
   * Factory method to create wave polygon edges from geometric parameters
   * 
   * Generates a symmetrical wave pattern using arcs and line segments:
   * - Creates mirrored arc curves for wave crests
   * - Connects with tangent-aligned segments
   * - Centers the result vertically
   * 
   * @param position - Center point of the wave
   * @param tangentPoint - Point controlling wave curvature
   * @param width - Total width (default: 4000)
   * @param height - Total height (default: 2000)
   * @returns Array of edges forming the wave polygon
   */
  static create(
    position: Point,
    tangentPoint: Point,
    width?: number,
    height?: number
  ): Array<Arc | Segment>;

  /**
   * Reflects a point across a vertical axis through a reference point
   * 
   * @param point - Point to mirror
   * @param axisPoint - Point defining the mirror axis
   * @returns Mirrored point
   */
  static mirrorPoint(point: Point, axisPoint: Point): Point;

  /**
   * Scales the wave polygon uniformly
   * 
   * Updates width, height, and tangent point position relative to center
   * 
   * @param factor - Scale factor (1.0 = no change, 2.0 = double size)
   * @returns This instance for chaining
   */
  scale(factor: number): this;

  /**
   * Serializes the wave polygon to JSON
   * 
   * @returns JSON object with type, position, dimensions, and shape data
   */
  toJSON(): WavePolyJSON;

  /**
   * Translates the wave polygon by a vector
   * 
   * Moves position, tangent point, and all polygon edges
   * 
   * @param offset - Translation vector
   * @returns This instance for chaining
   */
  translate(offset: Vector): this;

  /**
   * Handles interactive edge dragging for shape editing
   * 
   * Supported edges:
   * - Edge 3/5: Adjusts width symmetrically
   * - Edge 4: Adjusts height
   * 
   * @param edgeIndex - Index of the edge being dragged (0-5)
   * @param dragVector - Drag displacement vector
   * @param snapPoint - Optional snap reference point
   * @returns New WavePoly instance with updated dimensions
   */
  dragEdge(edgeIndex: number, dragVector: Vector, snapPoint?: Point): WavePoly;

  /**
   * Handles interactive vertex dragging for shape editing
   * 
   * Vertices 1 and 2 adjust the tangent point position
   * 
   * @param vertexIndex - Index of the vertex being dragged
   * @param dragVector - Drag displacement vector
   * @param snapVector - Snap-adjusted displacement
   * @param snapPoint - Optional snap reference point
   * @returns New WavePoly instance with updated tangent point
   */
  dragVertex(
    vertexIndex: number,
    dragVector: Vector,
    snapVector: Vector,
    snapPoint?: Point
  ): WavePoly;

  /**
   * Handles interactive arc dragging for curvature adjustment
   * 
   * Arc 1 adjusts the height while maintaining position
   * 
   * @param arcIndex - Index of the arc being dragged
   * @param dragVector - Drag displacement vector
   * @returns New WavePoly instance with updated height
   */
  dragArc(arcIndex: number, dragVector: Vector): WavePoly;

  /**
   * Handles dimension editing via direct numeric input
   * 
   * @param dimIndex - Dimension index (4 = height, 5 = width)
   * @param scaleFactor - Scale multiplier for the dimension
   * @param offset - Absolute offset vector
   * @returns New WavePoly instance with updated dimensions
   */
  editDim(dimIndex: number, scaleFactor: number, offset: Vector): WavePoly;

  /**
   * Initializes dimension display configuration for all edges
   * 
   * Sets which edges should display dimension annotations:
   * - Edges 1, 3, 4 show dimensions
   * - Edges 0, 2, 5 hide dimensions
   * 
   * @returns Array of dimension info for each edge
   */
  initDimInfo(): DimInfo[];

  /**
   * Creates a deep clone of this wave polygon
   * 
   * @returns New WavePoly instance with cloned properties
   * @internal
   */
  protected _clone(): WavePoly;

  /**
   * Initializes control point configurations for interactive editing
   * 
   * Sets up 6 control points with arc/endpoint flags determining
   * which types of edits are allowed at each point
   * 
   * @internal
   */
  protected initPoly(): void;
}