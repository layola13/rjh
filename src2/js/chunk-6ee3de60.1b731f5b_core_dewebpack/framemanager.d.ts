import type { Point, Segment, Arc, Vector, Polygon as FlattenPolygon } from '@flatten-js/core';
import type { DrawParams } from './DrawParams';
import type { EdgeJointRobot } from './EdgeJointRobot';
import type { EdgeFinder, Direction } from './EdgeFinder';
import type { PolyId, Dock, HitResult } from './types';
import type { 
  ShapeType, 
  Bar, 
  Frame, 
  Sash, 
  KfcSash, 
  SlideSash, 
  Bead, 
  ThreedArcFrame 
} from './shapes';

/**
 * Edge joint way configuration for frame edges
 */
export type EdgeJointWay = number;

/**
 * Profile size configuration for frame edges
 */
export type ProfileSize = number;

/**
 * JSON serialization format for FrameManager
 */
export interface FrameManagerJSON {
  /** Edge joint way configuration for each edge */
  ejw: EdgeJointWay[];
  /** Edge width (profile size) for each edge */
  ew: ProfileSize[];
  /** Virtual edge configurations */
  vs: Array<{ idx: number; pos: number }>;
}

/**
 * Host shape that contains a FrameManager
 * Can be Frame, Sash, Bead, or other frame-like shapes
 */
export interface FrameHost {
  /** Unique identifier */
  id: string;
  /** Parent identifier */
  parentId: string;
  /** Shape type (Frame, Sash, Bead, etc.) */
  type: ShapeType;
  /** Outer polygon defining the frame shape */
  polygon: FlattenPolygon;
  /** Inner polygons after frame profile is applied */
  innerPoly: FlattenPolygon[];
  /** Child elements (bars, sashes, etc.) */
  children: FrameHost[];
  /** Top-level frame in the hierarchy */
  topFrame: Frame;
  /** Border drawing helper */
  borders: { translate(offset: Vector): void };
  /** Sash manager (only for Frame types) */
  sashManager?: {
    slides: unknown[];
  };
  
  /** Add a child element */
  add(child: Bar | Sash | Bead): void;
  /** Remove all child elements */
  clearChildren(): void;
  /** Update frame geometry */
  updateFrame(recursive: boolean): void;
  /** Update polygon geometry */
  updatePoly(): void;
  /** Render the frame */
  draw(stage: DrawingStage): void;
}

/**
 * Drawing stage/canvas interface
 */
export interface DrawingStage {
  /** Active drawing layer */
  activeLayer: {
    /** Redraw the layer */
    batchDraw(): void;
  };
}

/**
 * Profile size manager for different shape types
 */
export interface ProfileSizeManager {
  /** Get default profile size for a shape type */
  get(shapeType: ShapeType): ProfileSize;
  /** Profile size for upper sash edge */
  upSash: ProfileSize;
  /** Profile size for lower sash edge */
  downSash: ProfileSize;
  /** Profile size for interlock edges */
  interlock: ProfileSize;
  /** Internal mullion profile size */
  _frameMullion: ProfileSize;
}

/**
 * Edge polygon with docking information
 */
export interface EdgePolygon extends FlattenPolygon {
  /** Polygon identifier (edge index and position) */
  polyId: PolyId;
  /** End point docking configuration */
  epDock: {
    /** Set docking for start (true) or end (false) point */
    setDock(isStart: boolean, dock: Dock): void;
  };
}

/**
 * Result of frametify operation
 */
export interface FrametifyResult {
  /** Inner polygons after frame profile is applied */
  innerPolys: FlattenPolygon[];
  /** Bar polygons representing frame profiles */
  barPolys: EdgePolygon[];
}

/**
 * Manages frame geometry, including edge profiles, joints, and child bars.
 * Handles creation, manipulation, and serialization of frame structures.
 */
export declare class FrameManager {
  /** Host shape that owns this manager */
  readonly host: FrameHost;
  
  /** Edge joint way configuration for each edge */
  ejw: EdgeJointWay[];
  
  /** Inner polygons after frame profile is applied */
  innerPoly: FlattenPolygon[];
  
  /** Edge robot for interactive joint editing */
  edgeRobot?: EdgeJointRobot;
  
  /** Currently active bar index during interaction */
  activeBarIndex?: number;
  
  /** Private edge width storage */
  private _edgeWidth: ProfileSize[];
  
  /** Private virtual edge configurations */
  private _virtuals: PolyId[];
  
  /** Temporary polygon for rendering (if different from host.polygon) */
  private renderPoly?: FlattenPolygon;
  
  /**
   * Creates a new FrameManager
   * @param host - The host shape containing this frame manager
   * @param ejw - Initial edge joint way configuration (defaults to empty array)
   */
  constructor(host: FrameHost, ejw?: EdgeJointWay[]);
  
  /**
   * Edge width (profile size) for each edge.
   * Auto-fills missing values with default profile size.
   */
  get edgeWidth(): ProfileSize[];
  set edgeWidth(value: ProfileSize[]);
  
  /**
   * Sets all edge widths to the same value
   */
  set allProfileSize(size: ProfileSize);
  
  /**
   * Gets all Bar children belonging to this frame
   * (includes virtual bars)
   */
  get allBars(): Bar[];
  
  /**
   * Gets non-virtual Bar children
   */
  get bars(): Bar[];
  
  /**
   * Checks if any bars are currently selected/highlighted
   */
  get selected(): boolean;
  
  /**
   * Initializes profile sizes for each edge based on shape type and geometry.
   * Handles special cases for sash edges, mullions, and interlocks.
   */
  initProfileSize(): void;
  
  /**
   * Creates frame bars by applying edge profiles to the host polygon.
   * Generates inner polygons and bar geometry.
   */
  create(): void;
  
  /**
   * Determines if an edge junction is convex based on cross product
   * @param prevEdge - Previous edge (or segment if arc)
   * @param nextEdge - Next edge (or segment if arc)
   * @param polygon - The polygon containing the edges
   * @returns True if the junction is convex
   */
  isConvex(
    prevEdge: Segment | Arc,
    nextEdge: Segment | Arc,
    polygon: EdgePolygon
  ): boolean;
  
  /**
   * Calculates endpoint docking for a bar based on adjacent edge convexity
   * @param bar - The bar polygon to calculate docking for
   */
  calcEpDock(bar: EdgePolygon): void;
  
  /**
   * Recreates the frame with a new polygon
   * @param newPolygon - The new outer polygon
   * @param stage - Drawing stage for rendering (optional)
   */
  recreated(newPolygon: FlattenPolygon, stage?: DrawingStage): void;
  
  /**
   * Recreates all bars without changing the outer polygon
   */
  recreateBars(): void;
  
  /**
   * Gets the joint way configuration for a specific edge
   * @param edgeIndex - Index of the edge
   * @returns The edge joint way configuration
   */
  getJointWay(edgeIndex: number): EdgeJointWay;
  
  /**
   * Sets the joint way configuration for a specific edge
   * @param edgeIndex - Index of the edge
   * @param jointWay - New joint way configuration
   * @param stage - Drawing stage for rendering
   */
  setJointWay(edgeIndex: number, jointWay: EdgeJointWay, stage: DrawingStage): void;
  
  /**
   * Gets the edge width (profile size) for a specific edge
   * @param edgeIndex - Index of the edge
   * @returns The edge width
   */
  getEdgeWidth(edgeIndex: number): ProfileSize;
  
  /**
   * Sets the edge width (profile size) for a specific edge
   * @param edgeIndex - Index of the edge
   * @param width - New edge width
   * @param stage - Drawing stage for rendering
   * @param updateOnly - If true, only updates without full recreation (default: false)
   */
  setEdgeWidth(
    edgeIndex: number,
    width: ProfileSize,
    stage: DrawingStage,
    updateOnly?: boolean
  ): void;
  
  /**
   * Serializes the frame manager state to JSON
   * @returns Serialized frame manager data
   */
  toJSON(): FrameManagerJSON;
  
  /**
   * Restores frame manager state from JSON
   * @param data - Serialized frame manager data
   */
  deserialize(data: FrameManagerJSON): void;
  
  /**
   * Translates the entire frame by an offset vector
   * @param offset - Translation vector
   */
  translate(offset: Vector): void;
  
  /**
   * Finds an edge that can snap to the given point within tolerance
   * @param point - Point to snap to
   * @param tolerance - Snap tolerance distance
   * @param excludeBar - Bar to exclude from snapping (typically the dragged bar)
   * @returns The snappable edge, or undefined if none found
   */
  snapEdge(
    point: Point,
    tolerance: number,
    excludeBar?: Bar
  ): Segment | Arc | undefined;
  
  /**
   * Finds a vertex that can snap to the given point
   * @param point - Point to snap to
   * @returns The snappable vertex point, or undefined if none found
   */
  snapVertex(point: Point): Point | undefined;
  
  /**
   * Hit tests bars against a point and updates highlight state
   * @param point - Test point
   * @param stage - Drawing stage for rendering edge robot
   * @returns Hit test result (None, Bar, All, or Control)
   */
  hitBar(point: Point, stage: DrawingStage): HitResult;
  
  /**
   * Shows or hides the edge robot based on bar selection
   * @param stage - Drawing stage for rendering
   */
  showEdgeRobot(stage: DrawingStage): void;
  
  /**
   * Highlights or unhighlights all bars
   * @param highlighted - True to highlight, false to unhighlight
   */
  highlight(highlighted: boolean): void;
  
  /**
   * Hides all assist tools (edge robot, etc.)
   */
  hideAssist(): void;
  
  /**
   * Drags a frame edge to a new position
   * @param bar - The bar representing the edge to drag
   * @param targetPoint - Target position for the edge
   * @param offset - Additional offset vector (default: zero point)
   * @returns True if drag was successful
   */
  dragFrame(bar: Bar, targetPoint: Point, offset?: Point): boolean;
  
  /**
   * Drags a vertex to a new position
   * @param targetPoint - Target position for the vertex
   * @param vertexIndex - Index of the vertex to drag
   * @param edgeIndex - Index of the edge containing the vertex
   * @param stage - Drawing stage for rendering
   * @param offset - Additional offset vector (default: zero point)
   */
  dragVertex(
    targetPoint: Point,
    vertexIndex: number,
    edgeIndex: number,
    stage: DrawingStage,
    offset?: Point
  ): void;
  
  /**
   * Drags an arc edge to modify its curvature
   * @param targetPoint - Target position for arc modification
   * @param edgeIndex - Index of the arc edge
   * @param stage - Drawing stage for rendering
   */
  dragArc(targetPoint: Point, edgeIndex: number, stage: DrawingStage): void;
  
  /**
   * Sets default edge joint way configuration based on host shape type.
   * Applies different defaults for Frame, Sash, Bead, and slide configurations.
   */
  setDefaultEdgeJointWay(): void;
  
  /**
   * Marks an edge as virtual or non-virtual
   * @param polyId - Polygon identifier for the edge
   * @param isVirtual - True to mark as virtual, false to unmark
   */
  setVirtual(polyId: PolyId, isVirtual: boolean): void;
}