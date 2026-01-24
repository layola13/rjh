import { Box, Point, Vector, Segment } from './geometry';
import { WinPolygon } from './polygon';
import { Shape, ShapeType } from './shape';
import { Frame, ThreedArcFrame, PushSash, DoubleSash, Slide, Fold, CornerJoiner, Connector, SkewPartEnum, Text, TextAlign } from './frame-types';
import { ToolType } from './tool';
import { ArcUtils } from './arc-utils';
import { PolygonCreator } from './polygon-creator';
import { ShapeColor, Utils } from './utils';
import { DrawParams } from './draw-params';
import { FrameUtil } from './frame-util';
import { SlideOptions } from './slide-options';
import { OpenDirection, OpenToward } from './hardware';

/**
 * Configuration for shape rendering
 */
interface ShapeConfig {
  /** Fill color */
  fcolor?: string;
  /** Stroke color */
  stroke?: string;
  /** Stroke width */
  strokeWidth?: number;
  /** Whether the line is dashed */
  dashed?: boolean;
}

/**
 * Shape tuple containing polygon and its configuration
 */
type ShapeTuple = [WinPolygon, ShapeConfig];

/**
 * Serialized TopView data structure
 */
interface TopViewJSON {
  /** Offset vector */
  offset: { x: number; y: number };
  /** Whether the top view is hidden */
  hidden: boolean;
}

/**
 * TopView class - Renders and manages top-down view of frame structures
 * 
 * Provides 2D overhead visualization of frames, sashes, and their opening mechanisms.
 * Handles diagram generation, optimization, and interactive display.
 */
export declare class TopView extends Shape {
  /** Host frame that owns this top view */
  readonly host: Frame;
  
  /** Current drawing color */
  color: string;
  
  /** Visual shape elements (Konva shapes) */
  vshapes: unknown[];
  
  /** Shape data tuples (polygon + config) */
  shapes: ShapeTuple[];
  
  /** Visual text shape elements */
  vshapesOfText: unknown[];
  
  /** Text shape data */
  shapesOfText: Text[];
  
  /** Default offset for positioning */
  defaultOffset: Vector;
  
  /** User-defined offset */
  offset: Vector;
  
  /** Whether the top view is hidden */
  hidden: boolean;
  
  /** Whether toward indicators (inner/outer) are shown */
  towardShown: boolean;
  
  /** Parent group shape for rendering */
  gshape?: unknown;

  /**
   * Creates a new TopView instance
   * @param host - The frame this top view represents
   */
  constructor(host: Frame);

  /**
   * Optimizes layout for multiple frames
   * Handles default offset calculation and toward note optimization
   * @param frames - Array of frames to optimize
   */
  static optimize(frames: Frame[]): void;

  /**
   * Calculates optimal default offset to avoid overlaps
   * @param frames - Frames to calculate offset for
   */
  static optimizeDefaultOffset(frames: Frame[]): void;

  /**
   * Determines which frame shows the toward (inner/outer) indicators
   * @param frames - Frames to optimize
   */
  static optimizeTowardNote(frames: Frame[]): void;

  /**
   * Bounding box of all shapes including transformations
   */
  readonly box: Box;

  /**
   * Reference to the host frame
   */
  readonly frame: Frame;

  /**
   * Bounding box of the host frame
   */
  readonly bound: Box;

  /**
   * Total bounding box including connected walls and dimensions
   */
  readonly totalBound: Box;

  /**
   * Profile shape used for sash visualization
   */
  readonly sashProfileShape: WinPolygon;

  /**
   * Generates all shape data for the top view
   * @returns This instance for chaining
   */
  makeShapes(): this | undefined;

  /**
   * Updates polygon and regenerates shapes
   * @param polygon - Optional new polygon to use
   */
  updatePoly(polygon?: WinPolygon): void;

  /**
   * Refreshes corner joiner presentations
   */
  refreshCornerPresent(): void;

  /**
   * Recycles and cleans up visual resources
   * @param deep - Whether to perform deep cleanup
   */
  recycle(deep?: boolean): void;

  /**
   * Translates all shapes by a vector
   * @param offset - Translation vector
   */
  translate(offset: Vector): void;

  /**
   * Renders the top view to the canvas
   * @param view - View context to render into
   */
  draw(view: unknown): void;

  /**
   * Serializes top view data to JSON
   * @returns Serialized data
   */
  toJSON(): TopViewJSON;

  /**
   * Restores top view state from JSON
   * @param data - Serialized data or undefined for defaults
   */
  deserialize(data?: TopViewJSON): void;

  /**
   * Creates the main frame diagram (outer boundary)
   */
  protected createFrameDiagram(): void;

  /**
   * Creates diagrams for all sashes (openable panels)
   */
  protected createSashesDiagram(): void;

  /**
   * Adds inner/outer direction indicators
   */
  protected markInnerOuter(): void;

  /**
   * Adds arrow indicating faced position for corner joiners
   */
  protected markFacedPosition(): void;

  /**
   * Generates shape for a push sash (standard opening)
   * @param sash - Push sash to render
   */
  protected pushSashShape(sash: PushSash): void;

  /**
   * Generates trapezoid shape for up/down opening push sash
   * @param sash - Push sash with vertical opening
   */
  protected pushSashShapeTrapezoid(sash: PushSash): void;

  /**
   * Generates shape for double sash configuration
   * @param doubleSash - Double sash to render
   */
  protected doubleSashShape(doubleSash: DoubleSash): void;

  /**
   * Generates shape for fold sash (accordion style)
   * @param fold - Fold sash to render
   */
  protected foldShape(fold: Fold): void;

  /**
   * Generates shape for sliding sash with tracks
   * @param slide - Slide sash to render
   */
  protected slideShape(slide: Slide): void;

  /**
   * Creates basic sash shapes (profiles and center line)
   * @param sash - Sash to generate shapes for
   * @returns Array of shape tuples
   */
  protected sashShapes(sash: PushSash): ShapeTuple[];

  /**
   * Creates trapezoid sash shapes for vertical opening
   * @param sash - Sash to generate shapes for
   * @returns Array of shape tuples
   */
  protected sashShapesTrapezoid(sash: PushSash): ShapeTuple[];

  /**
   * Creates trapezoid shape for upward opening sash
   * @param sash - Sash opening upward
   * @returns Array of shape tuples
   */
  protected upSashTrapezoid(sash: PushSash): ShapeTuple[];

  /**
   * Creates trapezoid shape for downward opening sash
   * @param sash - Sash opening downward
   * @returns Array of shape tuples
   */
  protected downSashTrapezoid(sash: PushSash): ShapeTuple[];

  /**
   * Creates an arc shape
   * @param start - Start point
   * @param end - End point
   * @param through - Point arc passes through
   * @param strokeWidth - Line width (default: 15)
   * @param config - Additional shape configuration
   * @returns Shape tuple
   */
  protected arc(
    start: Point,
    end: Point,
    through: Point,
    strokeWidth?: number,
    config?: ShapeConfig
  ): ShapeTuple;

  /**
   * Reverses opening toward direction (inward ↔ outward)
   * @param toward - Original toward direction
   * @returns Reversed direction
   */
  protected reverseToward(toward: OpenToward): OpenToward;

  /**
   * Creates a straight line shape
   * @param start - Start point
   * @param end - End point
   * @param strokeWidth - Line width (default: 15)
   * @param config - Additional shape configuration
   * @returns Shape tuple
   */
  protected line(
    start: Point,
    end: Point,
    strokeWidth?: number,
    config?: ShapeConfig
  ): ShapeTuple;

  /**
   * Creates a dashed line shape
   * @param start - Start point
   * @param end - End point
   * @param strokeWidth - Line width (default: 15)
   * @returns Shape tuple
   */
  protected dashLine(start: Point, end: Point, strokeWidth?: number): ShapeTuple;

  /**
   * Creates a dashed arc shape
   * @param start - Start point
   * @param end - End point
   * @param through - Point arc passes through
   * @param strokeWidth - Line width (default: 15)
   * @returns Shape tuple
   */
  protected dashArc(
    start: Point,
    end: Point,
    through: Point,
    strokeWidth?: number
  ): ShapeTuple;

  /**
   * Creates a wave line (for screen sashes)
   * @param start - Start point
   * @param end - End point
   * @param strokeWidth - Line width (default: 10)
   * @returns Shape tuple
   */
  protected waveLine(start: Point, end: Point, strokeWidth?: number): ShapeTuple;

  /**
   * Creates a simple wave line with rotation
   * @param start - Start point
   * @param end - End point
   * @param strokeWidth - Line width (default: 10)
   * @returns Shape tuple
   */
  protected waveLineSimple(start: Point, end: Point, strokeWidth?: number): ShapeTuple;

  /**
   * Calculates bounding box of a group of shapes
   * @param shapes - Shape tuples to calculate bounds for
   * @returns Combined bounding box
   */
  protected groupBound(shapes: ShapeTuple[]): Box;

  /**
   * Calculates floating direction for sliding sash overlap
   * @param sash - Sash to check
   * @param slide - Parent slide configuration
   * @returns -1, 0, or 1 indicating float direction
   */
  protected float(sash: PushSash, slide: Slide): number;

  /**
   * Adds numbered label to a sash
   * @param sash - Sash to label
   * @param floatOffset - Floating offset multiplier (default: 0)
   * @param isHorizontal - Whether layout is horizontal
   * @param number - Number to display (default: -1 uses sash number)
   * @param yOffset - Vertical offset (default: 160)
   */
  protected sashNumber(
    sash: PushSash,
    floatOffset?: number,
    isHorizontal?: boolean,
    number?: number,
    yOffset?: number
  ): void;

  /**
   * Creates a number with circular border
   * @param number - Number to display
   * @param position - Center position
   */
  protected numberWithBorder(number: number, position: Point): void;

  /**
   * Gets the parent group shape for rendering hierarchy
   * @param view - View context
   * @returns Parent group shape
   */
  protected getParentGShape(view: unknown): unknown;

  /**
   * Gets transformation matrices from parent hierarchy
   * @returns Array of transformation matrices
   */
  protected getParentMatrices(): unknown[];
}