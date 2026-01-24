import type { Polygon, Segment, Arc, Point, Line, Vector } from 'geom-library';
import type { Shape, ShapeType, Frame, PushSash, PartialSubFrame, WinPolygon, DrawPolyType } from './shape-types';
import type { MullionManager } from './mullion-manager';
import type { BarDragger } from './bar-dragger';
import type { Artisan } from './artisan';
import type { DisplayUtils, ShapeColor, Utils, DockTaskStatus } from './utils';
import type { DrawParams } from './draw-params';
import type { EdgeFinder } from './edge-finder';

/**
 * Alignment type enumeration for bar dimension positioning
 */
export enum AlignTypeEnum {
  left = 'left',
  right = 'right',
  center = 'center'
}

/**
 * Polygon identifier with index reference
 */
export interface PolyId {
  /** Index of the polygon */
  idx: number;
  /** Compare equality with another PolyId */
  equalTo(other: PolyId): boolean;
}

/**
 * Endpoint docking information
 */
export interface EpDock {
  /** Start dock point */
  stDock: DockPoint;
  /** End dock point */
  etDock: DockPoint;
}

/**
 * Dock point with bar reference capability
 */
export interface DockPoint {
  /** Point coordinates */
  pt: Point;
  /** Get docked bar from frame */
  dockBar(frame: Frame): Bar | undefined;
}

/**
 * Edge with directional information
 */
export interface EdgeWithDirection {
  /** Edge direction */
  direction: Vector;
  /** Edge geometry */
  edge: Segment | Arc;
}

/**
 * Dimension information tuple: [point, dimension, index]
 */
export type DimInfo = [Point, Dimension, number] | undefined;

/**
 * Dimension object for bar alignment
 */
export interface Dimension {
  /** Alignment type of the dimension */
  alignType: AlignTypeEnum;
}

/**
 * Mullion line configuration
 */
export interface MullionLine {
  /** Whether the mullion is reinforced */
  reinforced: boolean;
  /** Start endpoint configuration */
  start: EndpointConfig;
  /** End endpoint configuration */
  end: EndpointConfig;
  /** Alignment type */
  alignType: AlignTypeEnum;
  /** Steel reinforcement flag */
  steel?: boolean;
}

/**
 * Endpoint configuration for mullion
 */
export interface EndpointConfig {
  /** Steel reinforcement at this endpoint */
  steel: boolean;
}

/**
 * Visual shape data attributes
 */
export interface ShapeData {
  /** Polygon geometry */
  poly: WinPolygon;
  /** Fill color */
  fcolor: string;
  /** Draggable flag */
  drag: boolean;
  /** Stroke color */
  stroke: string;
  /** Stroke width */
  strokeWidth: number;
}

/**
 * Visual shape element
 */
export interface VShape {
  /** Set shape attribute */
  setAttr(key: string, value: unknown): void;
  /** Get shape attribute */
  getAttr(key: string): unknown;
  /** Hide the shape */
  hide(): void;
  /** Move shape to layer */
  moveTo(layer: unknown): void;
  /** Get current layer */
  getLayer(): unknown;
  /** Shape attributes */
  attrs: Record<string, unknown>;
}

/**
 * Bar shape representing frame members, mullions, beads, etc.
 * Extends the base Shape class to provide specialized rendering and interaction
 * capabilities for window/door frame components.
 */
export declare class Bar extends Shape {
  /** Visual shape representations */
  protected vshapes: VShape[];
  
  /** Virtual bar flag (not physically rendered) */
  protected _virtual: boolean;
  
  /** Serial identifier */
  serial: string;
  
  /** Shape type (Frame, Mullion, Bead, etc.) */
  readonly where: ShapeType;
  
  /**
   * Creates a new Bar instance
   * @param polygon - Polygon geometry defining the bar shape
   * @param where - Type of bar (Frame, Mullion, Bead, etc.)
   * @param shapeType - Optional shape type override (defaults to ShapeType.Bar)
   */
  constructor(polygon: WinPolygon, where: ShapeType, shapeType?: ShapeType);
  
  /**
   * Gets the polygon identifier
   */
  get polyId(): PolyId;
  
  /**
   * Gets endpoint docking information
   */
  get epDock(): EpDock;
  
  /**
   * Checks if this is a reinforced mullion
   * @returns True if this is a reinforced frame mullion
   */
  get isReinforcedMul(): boolean;
  
  /**
   * Draws the bar shape on canvas
   * @param context - Drawing context
   */
  draw(context: unknown): void;
  
  /**
   * Updates the polygon geometry
   * @param polygon - New polygon geometry
   */
  updatePoly(polygon?: WinPolygon): void;
  
  /**
   * Highlights or unhighlights the bar
   * @param highlight - True to highlight, false to remove highlight
   */
  highlight(highlight: boolean): void;
  
  /**
   * Checks if the bar is currently highlighted
   */
  get highlighted(): boolean;
  
  /**
   * Tests if a point hits this bar
   * @param point - Point to test
   * @returns True if point is within bar bounds
   */
  hitTest(point: Point): boolean;
  
  /**
   * Recycles the bar and cleans up resources
   * @param deep - Deep cleanup flag
   */
  recycle(deep?: boolean): void;
  
  /**
   * Translates the bar by a vector
   * @param vector - Translation vector
   */
  translate(vector: Vector): void;
  
  /**
   * Snaps edge to another shape's edge if within tolerance
   * @param edge - Edge to snap
   * @param tolerance - Snap tolerance
   * @param other - Other shape to snap to
   * @returns Snapped edge or undefined
   */
  snapEdge(edge: Segment | Arc, tolerance: number, other: Shape): Segment | Arc | undefined;
  
  /**
   * Gets the edit tool associated with this bar
   */
  get editTool(): unknown;
  
  /**
   * Gets the virtual flag
   */
  get virtual(): boolean;
  
  /**
   * Sets the virtual flag
   */
  set virtual(value: boolean);
  
  /**
   * Gets the cut angle notation (e.g., "45-90", "v-45")
   * @returns Cut angle string representation
   */
  get cutAngle(): string;
  
  /**
   * Gets the start endpoint angle in degrees
   */
  get stAngle(): number;
  
  /**
   * Gets the end endpoint angle in degrees
   */
  get etAngle(): number;
  
  /**
   * Calculates angle between two edges at start/end points
   * @param edgeIndex - Index of the edge
   * @returns Calculated angle in degrees
   */
  protected _stetAngle(edgeIndex: number): number;
  
  /**
   * Calculates angle between two edges
   * @param edge1 - First edge
   * @param edge2 - Second edge
   * @returns Angle in degrees (0-90)
   */
  calcAngle(edge1: Segment | Arc, edge2: Segment | Arc): number;
  
  /**
   * Gets the dimension alignment type
   */
  get dimAlignment(): AlignTypeEnum;
  
  /**
   * Sets the dimension alignment type
   */
  set dimAlignment(value: AlignTypeEnum);
  
  /**
   * Gets relative dimension information for this bar
   * @returns Array of dimension info tuples
   */
  getRelativeDimInfo(): Array<DimInfo>;
  
  /**
   * Sets bar dimension alignment and propagates to aligned bars
   * @param context - Drawing context
   * @param manager - Mullion manager
   * @param updateDraw - Whether to redraw after update
   */
  setBarDimAlign(context: unknown, manager: MullionManager, updateDraw?: boolean): void;
  
  /**
   * Gets the bar width (perpendicular to mullion direction)
   */
  get width(): number;
  
  /**
   * Sets the bar width
   */
  set width(value: number);
  
  /**
   * Calculates the longest length of a polygon along its mullion shape
   * @param polygon - Polygon to measure
   * @returns Longest length value
   */
  static getLongestLength(polygon: WinPolygon): number;
  
  /**
   * Gets the center mullion shape from polygon
   * @param polygon - Polygon containing mullion
   * @returns Center mullion segment or arc
   */
  static getCenterMulshape(polygon: WinPolygon): Segment | Arc;
  
  /**
   * Calculates longest projection length between mullion and parallel edges
   * @param mulShape - Mullion shape (center line)
   * @param parallelEdges - Array of parallel edges
   * @returns Longest projection length
   */
  static getLongestProjectionLength(
    mulShape: Segment | Arc,
    parallelEdges: Array<Segment | Arc>
  ): number;
  
  /**
   * Gets indexes of edges parallel to mullion (side edges)
   */
  get sideEdgeIndexes(): number[];
  
  /**
   * Gets edges parallel to mullion (side edges)
   */
  get sideEdges(): Array<Segment | Arc>;
  
  /**
   * Gets side edges with their directional vectors
   */
  get sideEdgesWithDirection(): EdgeWithDirection[];
  
  /**
   * Gets indexes of endpoint edges (perpendicular to mullion)
   */
  get endpointEdgeIndexes(): number[];
  
  /**
   * Gets endpoint edges (perpendicular to mullion)
   */
  get endpointEdges(): Array<Segment | Arc>;
  
  /**
   * Gets mullion polygon with optional steel reinforcement
   * @param mullionLine - Mullion line configuration
   * @returns Modified polygon with reinforcement or steel
   */
  getMullionPoly(mullionLine: MullionLine): WinPolygon;
  
  /**
   * Gets the polygon to draw (may differ from base polygon for mullions)
   * @returns Polygon for rendering
   */
  getDrawPoly(): WinPolygon;
  
  /**
   * Generates edge segments for reinforced mullion endpoints
   * @param edge - Endpoint edge
   * @param dockWidth - Width of docked bar
   * @param offset - Offset distance
   * @returns Array of edge segments
   */
  protected getReinforcedMulPointEdges(
    edge: Segment,
    dockWidth: number,
    offset: number
  ): Segment[];
}