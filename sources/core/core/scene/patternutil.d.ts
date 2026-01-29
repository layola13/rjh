/**
 * Utility class for handling pattern-based polygon generation and manipulation.
 * Provides methods for creating paving patterns with anchor points and block outlines.
 */
declare module PatternUtil {
  import { Vector2 } from 'three';
  import { DiscretePolygon2d } from './DiscretePolygon2d';
  import { BoundingBox2D } from './BoundingBox2D';
  import { Logger } from './Logger';

  /**
   * Options for brick pattern configuration
   */
  interface BrickPatternOption {
    [key: string]: unknown;
  }

  /**
   * Paving options for block positioning and rotation
   */
  interface PavingOption {
    /** Position offset point */
    point?: Vector2;
    /** Default X-axis offset */
    defaultOffsetX?: number;
    /** Default Y-axis offset */
    defaultOffsetY?: number;
    /** Rotation angle in degrees */
    rotation?: number;
  }

  /**
   * Represents an anchor point in the pattern grid
   */
  interface AnchorPoint {
    /** Offset position of the anchor point */
    offsetPoint: Vector2;
    /** Vertical index in the grid */
    vIndex: number;
    /** Horizontal index in the grid */
    uIndex: number;
    /** Whether the point is inside the polygon boundary */
    isInside: boolean;
  }

  /**
   * Defines a point with x and y coordinates
   */
  interface Point {
    x: number;
    y: number;
  }

  /**
   * Configuration for anchor points in the pattern
   */
  interface AnchorPointsConfig {
    /** First anchor point */
    anchorPoint1: Point;
    /** First base point */
    basePoint1: Point;
    /** Second anchor point */
    anchorPoint2: Point;
    /** Second base point */
    basePoint2: Point;
  }

  /**
   * Seam configuration for pattern blocks
   */
  interface SeamConfig {
    /** Width of the seam between blocks */
    seamWidth?: number;
  }

  /**
   * Pattern definition with paths and anchor points
   */
  interface Pattern {
    /** Unique pattern identifier */
    id: string;
    /** Anchor points configuration */
    anchorPoints: AnchorPointsConfig;
    /** Collection of paths by product */
    pathsByProduct: PathByProduct[];
    /** Seam configuration */
    seam: SeamConfig;
  }

  /**
   * Represents a polygon with outer boundary and holes
   */
  interface Polygon {
    /** Outer boundary points */
    outer: Point[];
    /** Array of hole polygons */
    holes: Point[][];
  }

  /**
   * Path definition for a product in the pattern
   */
  interface PathByProduct {
    /** Outline points of the path */
    outline: Point[][];
    /** Brick pattern options */
    brickPatternOption?: BrickPatternOption;
    /** Rotation angle in degrees */
    rotation?: number;
    /** Generated sub-polygons for this path */
    subPolygons?: BlockOutline[];
  }

  /**
   * Options for creating block outlines
   */
  interface BlockOutlineOptions {
    /** Offset outline points */
    offsetOutline: Point[];
    /** Brick pattern configuration */
    brickPatternOption?: BrickPatternOption;
    /** Center point of the original path object */
    originalPathObjCenter: Vector2;
    /** Anchor point for positioning */
    anchorPoint: AnchorPoint;
    /** Block rotation angle in degrees */
    blockRotation: number;
    /** Pavement rotation angle in degrees */
    pavementRotationInDegree: number;
  }

  /**
   * Represents a complete block outline with all metadata
   */
  interface BlockOutline {
    /** Path points defining the block boundary */
    path: Vector2[];
    /** Holes within the block */
    holes: Point[][];
    /** Whether the block is unbroken (not clipped) */
    isUnbroken: boolean;
    /** Brick pattern options */
    brickPatternOption: BrickPatternOption;
    /** Index of the anchor point in the grid */
    anchorPointIndex: Vector2;
    /** Offset from the anchor point */
    anchorPointOffset: Vector2;
    /** Rotation angle of the block */
    blockRotation: number;
    /** Absolute mass center position */
    absoluteMass: Vector2;
    /** Paving options for placement */
    pavingOption: PavingOption;
    /** Unique key for the block */
    key?: Vector2;
  }

  /**
   * Options for paving operation
   */
  interface PavingOperationOptions {
    /** Center point for paving */
    point: Vector2;
    /** Rotation angle in degrees */
    rotation: number;
  }

  /**
   * Utility class for pattern operations
   */
  export class PatternUtil {
    /**
     * Creates a block outline from path points and configuration options.
     * 
     * @param pathPoints - Array of points defining the block path
     * @param holes - Array of hole polygons within the block
     * @param options - Configuration options for the block outline
     * @returns Complete block outline with metadata
     */
    private static _getBlockOutline(
      pathPoints: Point[],
      holes: Point[][],
      options: BlockOutlineOptions
    ): BlockOutline;

    /**
     * Generates all anchor points for a pattern within the given polygons.
     * Uses the pattern's anchor point configuration to create a grid of points
     * and filters them based on polygon boundaries.
     * 
     * @param pattern - Pattern definition with anchor point configuration
     * @param polygons - Array of polygons to fit the pattern into
     * @param options - Paving operation options (center point and rotation)
     * @returns Array of anchor points within the polygon boundaries
     */
    static getAnchorPoints(
      pattern: Pattern,
      polygons: Polygon[],
      options: PavingOperationOptions
    ): AnchorPoint[];

    /**
     * Creates pattern polygons by distributing the pattern across anchor points
     * and clipping them to the target polygons.
     * 
     * @param pattern - Pattern definition to apply
     * @param polygons - Target polygons to fill with the pattern
     * @param options - Paving operation options
     * @returns Array of path configurations with generated sub-polygons
     */
    static createPolygons(
      pattern: Pattern,
      polygons: Polygon[],
      options: PavingOperationOptions
    ): PathByProduct[];
  }
}