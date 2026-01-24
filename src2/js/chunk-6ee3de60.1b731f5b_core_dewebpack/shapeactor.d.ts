import type { Point, Vector, Box, Segment } from './geometry';
import type { View } from './view';
import type { Frame, ThreedArcFrame, Wall, Note, SubFrame, ExtraPersonImage } from './shapes';
import type { Couple, CornerJoiner, Connector } from './couples';
import type { WinPolygon, ThreeDimensionalArcPoly, SpringlinePoly, CirclePoly } from './polygons';
import type { Dimension } from './dimension';
import type { ShapeType, SkewPartEnum, Direction, EqualSplitType } from './enums';

/**
 * Interface representing serialized shape data
 */
interface SerializedShapeData {
  /** Serialized shape manager data */
  sm: any[];
  /** Serialized wall data */
  wall: any[];
  /** Serialized couple (corner joiner/connector) data */
  cp: any[];
  /** Serialized note data */
  note: any[];
  /** Serialized sub-frame data */
  sbf?: any[];
  /** Serialized extra person image data */
  epi?: any[];
  /** Total width dimension data */
  twd?: any;
  /** Total height dimension data */
  thd?: any;
  /** Wall color */
  wlc?: string;
  /** Scale factor */
  scale?: number;
  /** Size settings */
  s?: {
    /** Corner joiner settings */
    cjs: any;
    /** Connector settings */
    cs: any;
  };
}

/**
 * Configuration for adding a simple frame
 */
interface SimpleFrameConfig {
  /** Frame type (e.g., 'springline') */
  type?: string;
  /** Frame width */
  width: number;
  /** Frame height */
  height: number;
  /** Arc height for springline type */
  arcHeight?: number;
  /** Left side width */
  widthL?: number;
  /** Right side width */
  widthR?: number;
  /** Left side skew angle */
  angleL?: number;
  /** Right side skew angle */
  angleR?: number;
  /** Left wall thickness */
  wallL?: number;
  /** Right wall thickness */
  wallR?: number;
  /** Upper wall thickness */
  wallU?: number;
  /** Lower wall thickness */
  wallD?: number;
}

/**
 * Configuration for adding a frame from edge data
 */
interface FrameEdgeConfig {
  /** Start point coordinates */
  start: { x: number; y: number };
  /** End point coordinates */
  end: { x: number; y: number };
  /** Middle point for arc (optional) */
  middle?: { x: number; y: number };
  /** Chord height for arc (optional) */
  chordHeight?: number;
}

/**
 * ShapeActor manages all shapes, frames, walls, and structural elements in the view.
 * It handles creation, modification, serialization, and lifecycle of all drawable elements.
 */
export declare class ShapeActor {
  /** Reference to the parent view */
  readonly view: View;

  /** Collection of sub-frames */
  subFrames: SubFrame[];

  /** Collection of main frames (windows/doors) */
  shapem: (Frame | ThreedArcFrame)[];

  /** Collection of couples (corner joiners and connectors) */
  couples: (CornerJoiner | Connector)[];

  /** Collection of walls */
  walls: Wall[];

  /** Collection of annotation notes */
  notes: Note[];

  /** Collection of extra person images for scale reference */
  extraPersonImages: ExtraPersonImage[];

  /** Total width dimension display */
  totalWidthDim?: Dimension;

  /** Total height dimension display */
  totalHeightDim?: Dimension;

  /**
   * Creates a new ShapeActor instance
   * @param view - The parent view that owns this shape actor
   */
  constructor(view: View);

  /**
   * Gets all forms (frames and couples) in the scene
   */
  get forms(): Array<Frame | ThreedArcFrame | CornerJoiner | Connector>;

  /**
   * Gets the bounding box of all windows/frames
   */
  get windowBox(): Box;

  /**
   * Gets the bounding box including dimensions
   */
  get windowWithDimBox(): Box;

  /**
   * Adds a sub-frame to the scene
   * @param segments - Array of segments defining the sub-frame
   */
  addSubFrame(segments: Segment[]): void;

  /**
   * Drags a frame element
   * @param polyId - Polygon identifier
   * @param delta - Movement delta vector
   * @param point - Optional reference point
   * @param skipOptimize - Whether to skip dimension optimization
   */
  drag(polyId: any, delta: Vector, point?: Point, skipOptimize?: boolean): void;

  /**
   * Drags inner elements of a frame
   * @param polyId - Polygon identifier
   * @param delta - Movement delta vector
   * @param point - Reference point
   * @param skipRefresh - Whether to skip view refresh
   */
  dragInner(polyId: any, delta: Vector, point: Point, skipRefresh?: boolean): void;

  /**
   * Adds a new frame from a polygon
   * @param polygon - The polygon to create frame from
   * @returns The created frame instance
   */
  add(polygon: WinPolygon | ThreeDimensionalArcPoly): Frame | ThreedArcFrame;

  /**
   * Adds a frame from edge configuration
   * @param edges - Array of edge configurations
   */
  addFrame(edges: FrameEdgeConfig[]): void;

  /**
   * Adds a simple rectangular or springline frame
   * @param config - Frame configuration
   */
  addSimpleFrame(config: SimpleFrameConfig): void;

  /**
   * Adds a rectangular frame
   * @param width - Frame width
   * @param height - Frame height
   * @param offset - Optional position offset
   * @returns The created frame
   */
  addRectFrame(width: number, height: number, offset?: Vector): Frame;

  /**
   * Adds a wall to the scene
   * @param polygon - Wall polygon
   */
  addWall(polygon: WinPolygon): void;

  /**
   * Adds an annotation note
   * @param point - Note position
   * @param endPoint - Note endpoint
   */
  addNote(point: Point, endPoint: Point): void;

  /**
   * Adds an extra person image for scale reference
   * @param imageUrl - URL of the person image
   * @param position - Image position
   * @param width - Image width
   * @param height - Image height
   * @param rotation - Image rotation angle
   * @param opacity - Image opacity (0-1)
   * @param flipHorizontal - Whether to flip horizontally
   * @param flipVertical - Whether to flip vertically
   */
  addExtraPersonImage(
    imageUrl: string,
    position: Point,
    width: number,
    height: number,
    rotation: number,
    opacity: number,
    flipHorizontal: boolean,
    flipVertical: boolean
  ): void;

  /**
   * Adds a mullion (vertical/horizontal divider) at a point
   * @param point - Position to add mullion
   */
  addMullion(point: Point): void;

  /**
   * Adds a decoration bar at a point
   * @param point - Position to add decoration bar
   * @param barType - Type of decoration bar
   */
  addDecorationBar(point: Point, barType: any): void;

  /**
   * Adds a sash (openable window section) at a point
   * @param point - Position to add sash
   * @param shapeType - Type of sash to create
   */
  addSash(point: Point, shapeType?: ShapeType): void;

  /**
   * Optimizes handle dimension display to avoid overlaps
   */
  optimizeHandleDim(): void;

  /**
   * Optimizes dimensions from handles to ground
   */
  optimizeDimToGround(): void;

  /**
   * Optimizes dimensions between handles and sashes
   */
  optimizeDimToSash(): void;

  /**
   * Updates all dimensions from handles to ground
   */
  updateAllDimToGround(): void;

  /**
   * Refreshes all wall drawings
   */
  refreshWalls(): void;

  /**
   * Adds a KFC (Kentucky Fried Chicken) style sash
   * @param point - Position to add sash
   * @param shapeType - Type of sash
   */
  addKfcSash(point: Point, shapeType?: ShapeType): void;

  /**
   * Adds a double KFC sash
   * @param point - Position to add double sash
   */
  addDoubleKfcSash(point: Point): void;

  /**
   * Adds a shutter at a point
   * @param point - Position to add shutter
   */
  addShutter(point: Point): void;

  /**
   * Adds a double sash
   * @param point - Position to add double sash
   * @param shapeType - Type of double sash
   */
  addDoubleSash(point: Point, shapeType?: ShapeType): void;

  /**
   * Adds a sliding window/door
   * @param point - Position to add slide
   * @param slideConfig - Slide configuration
   */
  addSlide(point: Point, slideConfig: any): void;

  /**
   * Adds a folding window/door
   * @param point - Position to add fold
   * @param shapeType - Type of fold
   */
  addFold(point: Point, shapeType?: ShapeType): void;

  /**
   * Adds a shade push sash
   * @param point - Position to add shade push sash
   */
  addShadePushSash(point: Point): void;

  /**
   * Adds a double shade push sash
   * @param point - Position to add double shade push sash
   */
  addDoubleShadePushSash(point: Point): void;

  /**
   * Adds a corner joiner at a point
   * @param point - Position to add corner joiner
   * @param shapeType - Type of corner joiner
   * @returns The created corner joiner or undefined if creation failed
   */
  addCornerJoiner(point: Point, shapeType?: ShapeType): CornerJoiner | undefined;

  /**
   * Adds a connector at a point
   * @param point - Position to add connector
   * @returns The created connector or undefined if creation failed
   */
  addConnector(point: Point): Connector | undefined;

  /**
   * Equalizes mullion spacing for highlighted mullions
   */
  equalizeMullion(): void;

  /**
   * Removes all highlighted/selected shapes
   */
  remove(): void;

  /**
   * Clears all shapes from the scene
   * @param refresh - Whether to refresh the view after clearing
   */
  clear(refresh?: boolean): void;

  /**
   * Hides all assistant/guide elements
   * @param hideDragRobot - Whether to hide the drag robot
   */
  hideAssist(hideDragRobot?: boolean): void;

  /**
   * Serializes the current state to JSON string
   * @param createCheckpoint - Whether to create a memento checkpoint
   * @returns JSON string representation of the scene
   */
  serialize(createCheckpoint?: boolean): string;

  /**
   * Pre-processes serialized data for compatibility
   * @param jsonData - Raw JSON string
   * @returns Parsed and normalized shape data
   */
  preHandle(jsonData: string): SerializedShapeData;

  /**
   * Deserializes and loads scene from JSON string
   * @param jsonData - JSON string to deserialize
   */
  deserialize(jsonData: string): void;

  /**
   * Deserializes extra dimensions
   */
  deExtraDim(): void;

  /**
   * Deserializes total size dimensions
   * @param totalWidthData - Total width dimension data
   * @param totalHeightData - Total height dimension data
   */
  deTotalSizeDims(totalWidthData: any, totalHeightData: any): void;

  /**
   * Deserializes size settings
   * @param data - Serialized shape data
   */
  deSize(data: SerializedShapeData): void;

  /**
   * Deserializes wall color
   * @param wallColor - Wall color value
   */
  deWallColor(wallColor: string | undefined): void;

  /**
   * Appends shapes from serialized data without clearing existing
   * @param jsonData - JSON string to append
   */
  append(jsonData: string): void;

  /**
   * Deserializes frames
   * @param frameData - Array of frame data
   */
  deFrame(frameData: any[]): void;

  /**
   * Appends a single frame from data
   * @param frameData - Frame data to append
   * @param shouldSnap - Whether to snap frame to nearby frames
   */
  appendFrame(frameData: any, shouldSnap?: boolean): void;

  /**
   * Deserializes walls
   * @param wallData - Array of wall data
   */
  deWall(wallData: any[]): void;

  /**
   * Appends a single wall from data
   * @param wallData - Wall data to append
   */
  appendWall(wallData: any): void;

  /**
   * Deserializes notes
   * @param noteData - Array of note data
   */
  deNote(noteData: any[]): void;

  /**
   * Deserializes sub-frames
   * @param subFrameData - Array of sub-frame data
   */
  deSubFrame(subFrameData: any[] | undefined): void;

  /**
   * Appends a single note from data
   * @param noteData - Note data to append
   */
  appendNote(noteData: any): void;

  /**
   * Deserializes couples (corner joiners and connectors)
   * @param coupleData - Array of couple data
   */
  deCouple(coupleData: any[]): void;

  /**
   * Appends a single couple from data
   * @param coupleData - Couple data to append
   */
  appendCouple(coupleData: any): void;

  /**
   * Deserializes extra person images
   * @param imageData - Array of extra person image data
   */
  deExtraPersonImage(imageData: any[] | undefined): void;

  /**
   * Appends a single extra person image from data
   * @param imageData - Extra person image data to append
   */
  appendExtraPersonImage(imageData: any): void;

  /**
   * Checks if a total dimension would duplicate an existing dimension
   * @param dimension - Dimension to check
   * @returns True if dimension duplicates an existing one
   */
  checkTotalDimDuplicate(dimension: Dimension): boolean;

  /**
   * Refreshes the total height dimension
   */
  refreshTotalHeight(): void;

  /**
   * Shows the total height dimension
   */
  showTotalHeight(): void;

  /**
   * Updates the total height dimension position and value
   */
  updateTotalHeight(): void;

  /**
   * Hides the total height dimension
   */
  hideTotalHeight(): void;

  /**
   * Refreshes the total width dimension
   */
  refreshTotalWidth(): void;

  /**
   * Shows the total width dimension
   */
  showTotalWidth(): void;

  /**
   * Updates the total width dimension position and value
   */
  updateTotalWidth(): void;

  /**
   * Hides the total width dimension
   */
  hideTotalWidth(): void;

  /**
   * Generates a new unique ID for a shape
   * @returns New unique ID
   */
  generateUID(): number;

  /**
   * Resets all UIDs to sequential values
   */
  resetAllUID(): void;

  /**
   * Hooks up event listeners
   */
  hookEvent(): void;

  /**
   * Emits a structure changed event
   * @param view - The view to emit event on
   */
  static emitStructureChanged(view: View): void;
}