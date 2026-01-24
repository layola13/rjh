import type { DiscreteParameter, Vector2, Matrix3, Box2, Plane, Vector3, Line2d, Arc2d, Loop, Polygon, Curve2d } from 'HSCore';
import type { Wall, WallFaceType } from './Wall';
import type { Layer } from './Layer';
import type { Slab } from './Slab';
import type { DOpening } from './DOpening';

/**
 * Configuration for high-precision curve discretization
 */
declare const HIGH_PRECISION_PARAMS: DiscreteParameter;

/**
 * Represents a curve with its associated identifier
 */
export interface CurveWithId {
  /** The geometric curve */
  curve: Curve2d;
  /** Unique identifier for the curve */
  id: number;
  /** Optional extra identifier for subdivided curves */
  extraId?: number;
}

/**
 * Represents a 2D path with outer boundary and holes
 */
export interface Path2D {
  /** Outer boundary curves */
  outer: CurveWithId[];
  /** Inner hole curves (array of loops) */
  holes: CurveWithId[][];
}

/**
 * Parameters for creating shell geometry from opening
 */
export interface ShellParams {
  /** Unique identifier for this shell */
  id: string;
  /** Reference surface plane */
  surface: Plane;
  /** Start offset from surface */
  start: number;
  /** End offset from surface */
  end: number;
  /** 2D path defining shell boundary */
  path: Path2D;
}

/**
 * Shell geometry information
 */
export interface ShellInfo {
  /** Shell parameters */
  params: ShellParams;
  /** Additional shell data */
  [key: string]: unknown;
}

/**
 * Wall face with surface information
 */
export interface WallFace {
  /** Surface object containing plane and direction */
  surfaceObj: {
    surface: Plane;
    sameDirWithSurface: boolean;
  };
  /** Additional face properties */
  [key: string]: unknown;
}

/**
 * Opening entity that can be hosted by walls or slabs
 */
export interface Opening {
  /** Unique identifier */
  id: string;
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
  /** Z coordinate (elevation) */
  z: number;
  /** Rotation angle in degrees */
  rotation: number;
  /** Width of opening */
  XSize: number;
  /** Depth of opening */
  YSize: number;
  /** Height of opening */
  ZSize: number;
  /** Actual horizontal dimension */
  XLength: number;
  /** Actual vertical dimension */
  ZLength: number;
  /** Wall/slab thickness at opening */
  thickness: number;
  /** Arch height for arched openings */
  archHeight: number;
  /** Door swing direction (0-3) */
  swing: number;
  /** Scale factor in X direction */
  XScale: number;
  /** Scale factor in Y direction */
  YScale: number;
  /** Scale factor in Z direction */
  ZScale: number;
  /** SVG path data for front profile */
  frontProfile: string;
  /** Computed bottom profile curves */
  bottomProfile: Curve2d[];
  /** Parent element hosting this opening */
  host: Wall | Slab;
  
  /** Get the host element (wall or slab) */
  getHost(): Wall | Slab | null;
  /** Get unique parent layer */
  getUniqueParent(): Layer | null;
  /** Get proxy object for dynamic openings */
  getProxyObject(): unknown;
  /** Check if opening supports parametric modeling */
  supportPM(): boolean;
}

/**
 * Opening value adjustments for dynamic openings
 */
export interface OpeningValue {
  /** Horizontal deduction */
  hDeduct: number;
  /** Vertical deduction */
  vDeduct: number;
  /** Depth world Z offset */
  dwzo: number;
  /** Horizontal offset */
  hOffset: number;
}

/**
 * Room region with path definition
 */
export interface RoomRegion {
  /** Region boundary path */
  path: {
    outer: Curve2d[];
    holes: Curve2d[][];
  };
}

/**
 * Helper class for opening geometry operations
 * Handles profile generation, validation, and shell creation for wall/slab openings
 */
export declare class OpeningHelper {
  private readonly _opening: Opening;

  /**
   * Creates an opening helper instance
   * @param opening - The opening entity to operate on
   */
  constructor(opening: Opening);

  /**
   * Get the active document's floor plan
   */
  private get fp(): unknown;

  /**
   * Parse SVG path data into 2D curves
   * @param svgPath - SVG path string (e.g., "M0,0 L100,0 L100,100 Z")
   * @returns Array of parsed curves, or empty array if invalid
   */
  static getCurvesBySvg(svgPath: string | null): Curve2d[];

  /**
   * Convert curves to SVG path string
   * @param curves - Array of 2D curves
   * @param usePrecision - Whether to apply persistent precision formatting
   * @returns SVG path string
   */
  static getSvgByCurves(curves: Curve2d[], usePrecision?: boolean): string;

  /**
   * Simplify and fix meta profile data
   * @param svgPath - Original SVG path
   * @returns Simplified SVG path or undefined
   */
  static getFixMetaProfile(svgPath: string | null): string | undefined;

  /**
   * Validate opening rotation against host geometry
   * Checks if rotation is parallel to wall direction or arc tangent
   * @returns True if rotation is valid
   */
  validRotation(): boolean;

  /**
   * Validate opening position on host element
   * Checks if position is on wall centerline or within niche constraints
   * @returns True if position is valid
   */
  validPosition(): boolean;

  /**
   * Generate bottom profile curves for the opening
   * @param host - Optional host override (uses opening's host if not provided)
   * @returns Array of bottom profile curves
   */
  getBottomProfile(host?: Wall | Slab): Curve2d[];

  /**
   * Get front profile with transformations applied (scale, rotation, translation)
   * @param frontProfileCurves - Base front profile curves
   * @returns Transformed profile with curve IDs
   */
  getRealFrontProfile(frontProfileCurves: Curve2d[]): Path2D;

  /**
   * Get final front profile clipped to room boundaries
   * For slab openings, clips profile against room regions
   * @param frontProfileCurves - Base front profile curves
   * @returns Clipped profile or empty if invalid
   */
  getFinalFrontProfile(frontProfileCurves: Curve2d[]): Path2D;

  /**
   * Get front profile curves from SVG or generate arch profile
   * @param svgPath - SVG path data
   * @returns Array of front profile curves
   */
  getFrontProfile(svgPath: string): Curve2d[];

  /**
   * Generate shell parameters for 3D geometry creation
   * @returns Array of shell parameter objects
   */
  getShellParams(): ShellParams[];

  /**
   * Generate shell geometry information for rendering
   * @param context - Additional context for shell generation
   * @returns Array of shell info objects
   */
  getShellInfos(context: unknown): ShellInfo[];

  /**
   * Find the wall face that the opening cuts through
   * @param wall - Wall containing the opening
   * @returns Wall face or undefined if not found
   */
  getFrontFace(wall: Wall): WallFace | undefined;

  /**
   * Get adjusted opening XY coordinates
   * Applies offsets for dynamic openings
   * @param x - Raw X coordinate
   * @param y - Raw Y coordinate
   * @returns Adjusted coordinates
   */
  getOpeningXY(x: number, y: number): { x: number; y: number };

  /**
   * Generate bottom profile for arc wall opening
   * @param wall - Arc wall host
   * @returns Bottom profile curves
   */
  private _getBottomProfileByArcWall(wall: Wall): Curve2d[];

  /**
   * Expand bottom profile for arc wall with thickness
   * @param bottomProfile - Base bottom profile
   * @param center - Center point
   * @param thickness - Wall thickness
   * @param direction - Direction vector
   * @returns Expanded profile with dimensions
   */
  private _getExpandBottomProfileByArc(
    bottomProfile: Curve2d[],
    center: Vector2,
    thickness: number,
    direction: Vector2
  ): { path: Curve2d[]; width: number; height: number };

  /**
   * Calculate oriented bounding box in given direction
   * @param points - Array of points
   * @param direction - Direction vector
   * @returns Bounding box path and dimensions
   */
  private _getDirectionBBox(
    points: Vector2[],
    direction: Vector2
  ): { path: Curve2d[]; height: number; width: number };

  /**
   * Find room region containing the opening
   * @param regions - Available room regions
   * @returns Matching room region or undefined
   */
  private _getRoomRegion(regions: RoomRegion[]): RoomRegion | undefined;

  /**
   * Check if front profile IDs should be reversed based on swing direction
   * @param swing - Door swing value (0-3)
   * @returns True if profile should be mirrored
   */
  private _needChangeFrontProfileId(swing: number): boolean;
}

/**
 * Check if opening is not a child of the specified layer
 * @param opening - Opening to check
 * @param layer - Layer to compare against
 * @returns True if opening is not in the layer
 */
export declare function openingNotChildOfLayer(
  opening: Opening | null,
  layer: Layer | null
): boolean;