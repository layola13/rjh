/**
 * Collision detection module providing polygon clipping, offsetting, and simplification utilities.
 * Wraps the ClipperLib library for geometric operations.
 */

/**
 * Represents a 2D point with x and y coordinates.
 */
export interface Point {
  /** X-coordinate */
  x: number;
  /** Y-coordinate */
  y: number;
}

/**
 * Represents a polygon as an array of points.
 */
export type Polygon = Point[];

/**
 * Represents a polygon with outer boundary and optional holes.
 */
export interface ExPolygon {
  /** Outer boundary of the polygon */
  outer: Polygon;
  /** Array of holes within the polygon */
  holes?: Polygon[];
}

/**
 * Fill type for polygon operations.
 */
export enum PolyFillType {
  /** Even-odd fill rule */
  evenOdd = 0,
  /** Non-zero winding fill rule */
  nonZero = 1,
  /** Positive fill rule */
  positive = 2,
  /** Negative fill rule */
  negative = 3
}

/**
 * Clipping operation types.
 */
export enum ClipType {
  /** Union operation - combines polygons */
  union = 0,
  /** Difference operation - subtracts clip from subject */
  diff = 1,
  /** Intersection operation - keeps only overlapping areas */
  inter = 2,
  /** Exclusive OR operation - keeps non-overlapping areas */
  xor = 3
}

/**
 * Join type for offset operations.
 */
export enum JoinType {
  /** Miter join with sharp corners */
  miter = 0,
  /** Square join */
  square = 1,
  /** Round join with curved corners */
  round = 2
}

/**
 * End type for open path offset operations.
 */
export enum EndType {
  /** Closed polygon */
  closedPolygon = 0,
  /** Closed line */
  closedLine = 1,
  /** Open path with square ends */
  openSquare = 2,
  /** Open path with rounded ends */
  openRound = 3,
  /** Open path with butt ends */
  openButt = 4
}

/**
 * Options for polygon clipping operations.
 */
export interface ClipPolygonOptions {
  /** Whether the subject path is closed */
  closed?: boolean;
  /** Fill type for the subject polygon */
  subject_fillType?: PolyFillType;
  /** Fill type for the clip polygon */
  clip_fillType?: PolyFillType;
  /** Type of clipping operation to perform */
  operation?: ClipType;
  /** If true, only process first level of poly tree */
  onlyFirstLevel?: boolean;
}

/**
 * Options for polygon offset operations.
 */
export interface OffsetPolygonOptions {
  /** Miter limit for miter joins */
  miterLimit?: number;
  /** Tolerance for arc approximation */
  arcTolerance?: number;
  /** Join type for corners */
  joinType?: JoinType;
  /** End type for open paths */
  endType?: EndType;
}

/**
 * Collision detection utilities for polygon operations.
 * Provides polygon clipping, offsetting, simplification, and cleaning.
 */
export interface Collision {
  /** Polygon fill type enumeration */
  readonly PolyFillType: typeof PolyFillType;
  
  /** Clipping operation type enumeration */
  readonly ClipType: typeof ClipType;
  
  /** Join type enumeration for offset operations */
  readonly JoinType: typeof JoinType;
  
  /** End type enumeration for offset operations */
  readonly EndType: typeof EndType;

  /**
   * Clips subject polygon(s) against clip polygon(s), returning simple polygons.
   * @param subject - Subject polygon(s) to be clipped
   * @param clip - Clip polygon(s) to clip against
   * @param options - Optional clipping parameters
   * @returns Array of resulting polygons
   */
  ClipPolygon(subject: Polygon[], clip: Polygon[], options?: ClipPolygonOptions): Polygon[];

  /**
   * Clips subject polygon(s) against clip polygon(s), returning polygons with holes.
   * @param subject - Subject polygon(s) to be clipped
   * @param clip - Clip polygon(s) to clip against
   * @param options - Optional clipping parameters
   * @returns Array of resulting polygons with outer boundaries and holes
   */
  ClipPolygon2(subject: Polygon[], clip: Polygon[], options?: ClipPolygonOptions): ExPolygon[];

  /**
   * Internal implementation for polygon clipping.
   * @param subject - Subject polygon(s) to be clipped
   * @param clip - Clip polygon(s) to clip against
   * @param options - Optional clipping parameters
   * @param returnExPolygons - If true, returns ExPolygons; otherwise returns simple polygons
   * @returns Array of resulting polygons (format depends on returnExPolygons parameter)
   * @internal
   */
  _ClipPolygon(
    subject: Polygon[],
    clip: Polygon[],
    options?: ClipPolygonOptions,
    returnExPolygons?: boolean
  ): Polygon[] | ExPolygon[];

  /**
   * Offsets (inflates/deflates) multiple polygons by a specified delta.
   * @param polygons - Polygons to offset
   * @param delta - Offset distance (positive for inflation, negative for deflation)
   * @param options - Optional offset parameters
   * @returns Array of offset polygons
   */
  offsetPolygons(polygons: Polygon[], delta: number, options?: OffsetPolygonOptions): Polygon[];

  /**
   * Offsets (inflates/deflates) a single polygon by a specified delta.
   * @param polygon - Polygon to offset
   * @param delta - Offset distance (positive for inflation, negative for deflation)
   * @param options - Optional offset parameters
   * @returns Offset polygon, or empty array if operation fails
   */
  offsetPolygon(polygon: Polygon, delta: number, options?: OffsetPolygonOptions): Polygon;

  /**
   * Alias for offsetPolygons (legacy compatibility).
   * @param polygons - Polygons to offset
   * @param delta - Offset distance
   * @param options - Optional offset parameters
   * @returns Array of offset polygons
   */
  OffsetPolygon(polygons: Polygon[], delta: number, options?: OffsetPolygonOptions): Polygon[];

  /**
   * Simplifies polygons by removing self-intersections and merging overlapping areas.
   * @param polygons - Polygons to simplify
   * @returns Array of simplified polygons
   */
  SimplifyPolygons(polygons: Polygon[]): Polygon[];

  /**
   * Determines the orientation (clockwise or counter-clockwise) of a polygon.
   * @param polygon - Polygon to check
   * @returns True if counter-clockwise, false if clockwise
   */
  Orientation(polygon: Polygon): boolean;

  /**
   * Removes vertices that are too close together or create near-collinear edges.
   * @param polygons - Polygons to clean
   * @param distance - Minimum distance threshold for vertex removal
   * @returns Array of cleaned polygons
   */
  CleanPolygons(polygons: Polygon[], distance: number): Polygon[];

  /**
   * Adds an outer polygon node and its children to the ExPolygons collection.
   * @param node - Polygon tree node to process
   * @param exPolygons - Collection to add results to
   * @param onlyFirstLevel - If true, only process first level of children
   * @internal
   */
  AddOuterPolyNodeToExPolygons(
    node: unknown,
    exPolygons: ExPolygon[],
    onlyFirstLevel?: boolean
  ): void;

  /**
   * Converts a polygon tree structure to an array of ExPolygons.
   * @param polyTree - Polygon tree to convert
   * @param onlyFirstLevel - If true, only process first level of tree
   * @returns Array of ExPolygons
   * @internal
   */
  PolyTreeToExPolygons(polyTree: unknown, onlyFirstLevel?: boolean): ExPolygon[];

  /**
   * Reverses a single polygon path to fix incorrect orientation.
   * @param path - Polygon path to reverse
   * @internal
   */
  FixReversedPath(path: Polygon): void;

  /**
   * Reverses multiple polygon paths to fix incorrect orientation.
   * @param paths - Array of polygon paths to reverse
   * @internal
   */
  FixReversedPaths(paths: Polygon[]): void;

  /**
   * Combines multiple polygons using union operation.
   * Takes the last polygon and unions it with all others.
   * @param polygons - Array of polygons to combine (modified in place)
   * @returns Array of combined polygons as ExPolygons
   */
  CombinePolygons(polygons: Polygon[]): ExPolygon[];
}

/**
 * Singleton instance of collision detection utilities.
 */
export declare const Collision: Collision;