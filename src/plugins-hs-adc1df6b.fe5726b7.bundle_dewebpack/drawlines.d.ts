import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { Line2d, Vector2 } from './geometry';
import { Util, Styles, outdoorTolerance } from './utils';

/**
 * DrawLines Gizmo - A tool for drawing lines with snapping and inference capabilities
 * 
 * This gizmo extends DrawExLinesWithAngle to provide interactive line drawing
 * with automatic snapping to reference points and lines, intersection detection,
 * and automatic region generation when paths are closed.
 */
export declare class DrawLines extends HSApp.ExtraordinarySketch2d.Gizmo.DrawExLinesWithAngle {
  /**
   * Indicates whether the current drawing path is closed
   * (i.e., the last point connects back to the first point)
   */
  private _isPathClosed: boolean | undefined;

  /**
   * Point inference system for snapping behavior
   */
  protected inference: HSApp.View.SVG.PointInference;

  /**
   * Lines that are currently snapped to during drawing
   */
  protected snappedLines: Array<[Point2D, Point2D]>;

  /**
   * Current mouse/pointer position
   */
  protected pos: Point2D;

  /**
   * Reference to the parent command
   */
  protected cmd: Sketch2dCommand;

  /**
   * Reference to the parent command (alternative name)
   */
  protected _cmd: Sketch2dCommand;

  /**
   * Current drawing path (array of points)
   */
  protected _currentPath: Point2D[];

  /**
   * Indicates if currently in preview mode
   */
  protected _isPreview: boolean;

  /**
   * Active dimension being manipulated
   */
  protected _activeDimension: unknown;

  /**
   * Indicates if current stroke intersects with existing geometry
   */
  protected _isCurrentIntersect: boolean;

  /**
   * The drawing context
   */
  protected context: DrawingContext;

  /**
   * Gets the curves representing the current path as Line2d segments
   * Each consecutive pair of points in the path creates a Line2d
   */
  get currentPathCurves(): Line2d[];

  /**
   * Initializes the point inference system with snap pixel offset
   * @internal
   */
  protected _initInference(): void;

  /**
   * Gets the visual style for the pen indicator
   * Returns intersection style if currently intersecting, otherwise default style
   */
  getPenIndicatorStyle(): StyleDefinition;

  /**
   * Checks if the current stroke intersects with existing geometry
   * Returns true if intersecting or if point is inside root slab
   * @internal
   */
  protected _isCurrentStrokeIntersect(): boolean;

  /**
   * Updates the intersection path visualization
   * Override point for subclasses to implement custom intersection behavior
   */
  updateIntersectPath(): void;

  /**
   * Performs snapping calculations for the given point
   * 
   * @param point - The point to snap
   * @param snapData - Additional snapping configuration
   * @returns Snap result containing offset and indicated lines
   */
  doSnapping(point: Point2D, snapData: unknown): SnapResult;

  /**
   * Updates the inference system with current snap lines and points
   * @internal
   */
  protected _updateInference(): void;

  /**
   * Gets all reference points for snapping including:
   * - Sketch reference points
   * - Root slab reference points
   * @internal
   */
  protected _getSnapPoints(): Point2D[];

  /**
   * Gets all snap lines from various sources:
   * - Slab snap lines
   * - Outdoor layer slab snap lines
   * - Guild lines
   * - Current path snap lines
   * @internal
   */
  protected _getSnapLines(): Array<[Point2D, Point2D]>;

  /**
   * Gets guide lines from the sketch builder
   * @internal
   */
  protected _getGuildLines(): Array<[Point2D, Point2D]>;

  /**
   * Gets snap lines from root layer slabs
   * Extracts line segments from slab outer paths
   * @internal
   */
  protected _getSlabSnapLines(): Array<[Point2D, Point2D]>;

  /**
   * Gets snap lines from outdoor layer slab edges
   * Filters out zero-length edges based on outdoor tolerance
   * @internal
   */
  protected _getOutdoorLayerSlabSnapLines(): Array<[Point2D, Point2D]>;

  /**
   * Adds a point to the current drawing path
   * Triggers region generation attempt and updates inference
   * 
   * @param point - The point to add
   */
  addPoint(point: Point2D): void;

  /**
   * Attempts to generate a closed region from the current path
   * If successful, sends completion event and resets path
   * 
   * @returns True if region was generated, false otherwise
   */
  tryToGenerateRegion(): boolean;

  /**
   * Checks if the current path forms a closed loop
   * Updates _isPathClosed flag
   * 
   * @returns True if path is closed
   */
  isCurrentPathClosed(): boolean;

  /**
   * Completes and clears the current drawing path
   * @internal
   */
  protected _completeCurrentPath(): void;

  /**
   * Updates dimension display for picked point
   * Override point for subclasses
   */
  updatePickPointDimension(): void;

  /**
   * Gets the localization key for the normal tooltip
   * @internal
   */
  protected _getNormalTipKey(): string;

  /**
   * Marks the graph as dirty and triggers redraw
   */
  protected dirtyGraph(): void;
}

/**
 * 2D point with x and y coordinates
 */
interface Point2D {
  x: number;
  y: number;
  equals(other: Point2D, tolerance?: number): boolean;
}

/**
 * Result of a snapping operation
 */
interface SnapResult {
  /** Offset to apply to snap to target */
  offset?: Point2D;
  /** Lines to indicate snap targets */
  indicateLines?: Array<[Point2D, Point2D]>;
}

/**
 * Style definition for visual indicators
 */
interface StyleDefinition {
  [key: string]: unknown;
}

/**
 * Drawing context for rendering
 */
interface DrawingContext {
  [key: string]: unknown;
}

/**
 * Sketch 2D command interface
 */
interface Sketch2dCommand {
  sketch2dBuilder: {
    getSketch(): Sketch2D;
  };
  onReceive(event: string, data: unknown): void;
}

/**
 * Sketch 2D data structure
 */
interface Sketch2D {
  guidelines: Array<{
    fromAnchor: Point2D;
    endAnchor: Point2D;
  }>;
}