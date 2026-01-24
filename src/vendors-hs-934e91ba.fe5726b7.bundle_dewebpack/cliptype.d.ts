/**
 * ClipperLib TypeScript Type Definitions
 * 
 * A TypeScript wrapper for the Clipper polygon clipping library.
 * Provides boolean operations (union, difference, intersection, XOR) and offsetting
 * for 2D polygons with high precision.
 * 
 * @module ClipperLibWrapper
 */

/**
 * Represents the type of clipping operation to perform
 */
export enum ClipType {
  /** Union of polygons */
  Union = 0,
  /** Intersection of polygons */
  Intersection = 1,
  /** Difference between polygons */
  Difference = 2,
  /** Exclusive OR of polygons */
  Xor = 3
}

/**
 * Defines the type of line ending for offset operations
 */
export enum EndType {
  /** Closed polygon */
  ClosedPolygon = 0,
  /** Closed line (forms a loop) */
  ClosedLine = 1,
  /** Open line with butt ends */
  OpenButt = 2,
  /** Open line with square ends */
  OpenSquare = 3,
  /** Open line with round ends */
  OpenRound = 4
}

/**
 * Defines the type of corner joining for offset operations
 */
export enum JoinType {
  /** Square corners */
  Square = 0,
  /** Round corners */
  Round = 1,
  /** Mitered corners */
  Miter = 2
}

/**
 * Fill rule for determining inside/outside regions of polygons
 */
export enum PolyFillType {
  /** Even-odd fill rule */
  EvenOdd = 0,
  /** Non-zero winding fill rule */
  NonZero = 1,
  /** Positive winding fill rule */
  Positive = 2,
  /** Negative winding fill rule */
  Negative = 3
}

/**
 * Result of point-in-polygon test
 */
export enum PointInPolygonResult {
  /** Point is outside the polygon */
  Outside = 0,
  /** Point is on the polygon boundary */
  OnBoundary = 1,
  /** Point is inside the polygon */
  Inside = 2
}

/**
 * Format requested when loading the native clipper library
 */
export enum NativeClipperLibRequestedFormat {
  /** Prefer WebAssembly, fall back to asm.js if unavailable */
  WasmWithAsmJsFallback = 0,
  /** Use WebAssembly only */
  WasmOnly = 1,
  /** Use asm.js only */
  AsmJsOnly = 2
}

/**
 * Actual format loaded for the native clipper library
 */
export enum NativeClipperLibLoadedFormat {
  /** WebAssembly format */
  Wasm = 0,
  /** asm.js format */
  AsmJs = 1
}

/**
 * Represents a 2D point with integer coordinates
 */
export interface IntPoint {
  /** X coordinate */
  X: number;
  /** Y coordinate */
  Y: number;
}

/**
 * A path is an array of points forming a polygon or polyline
 */
export type Path = IntPoint[];

/**
 * A collection of paths
 */
export type Paths = Path[];

/**
 * Node in a polygon tree structure representing parent-child relationships
 */
export declare class PolyNode {
  /** The polygon contour of this node */
  readonly contour: Path;
  
  /** Child nodes (holes or nested polygons) */
  readonly children: PolyNode[];
  
  /** Parent node, or undefined if root */
  readonly parent?: PolyNode;
  
  /** Whether this node represents a hole */
  readonly isHole: boolean;
  
  /** Whether this node is an open path */
  readonly isOpen: boolean;
  
  /**
   * Gets the first child node
   */
  getFirst(): PolyNode | undefined;
  
  /**
   * Returns the number of child nodes
   */
  childCount(): number;
}

/**
 * Tree structure representing the hierarchical relationship of polygons
 * Useful for understanding polygon containment and holes
 */
export declare class PolyTree extends PolyNode {
  /**
   * Gets all child nodes (top-level polygons)
   */
  readonly children: PolyNode[];
  
  /**
   * Clears the tree
   */
  clear(): void;
  
  /**
   * Gets the total number of PolyNodes in the tree
   */
  total(): number;
}

/**
 * Parameters for clipping operations
 */
export interface ClipParams {
  /** Type of clipping operation */
  clipType: ClipType;
  
  /** Subject polygons */
  subjectInputs: Paths;
  
  /** Clip polygons */
  clipInputs?: Paths;
  
  /** Fill type for subject polygons */
  subjectFillType?: PolyFillType;
  
  /** Fill type for clip polygons */
  clipFillType?: PolyFillType;
  
  /** Whether to preserve colinear points */
  strictlySimple?: boolean;
}

/**
 * Parameters for offset operations
 */
export interface OffsetParams {
  /** Offset delta (positive for expansion, negative for contraction) */
  delta: number;
  
  /** Input paths to offset */
  offsetInputs: Paths;
  
  /** Type of corner joining */
  joinType?: JoinType;
  
  /** Type of line endings */
  endType?: EndType;
  
  /** Miter limit (for mitered joins) */
  miterLimit?: number;
  
  /** Arc tolerance (for rounded joins, lower = smoother) */
  arcTolerance?: number;
}

/**
 * Custom error class for Clipper operations
 */
export declare class ClipperError extends Error {
  constructor(message: string);
}

/**
 * Main wrapper class for the Clipper library
 * Provides methods for polygon clipping, offsetting, and utility functions
 */
export declare class ClipperLibWrapper {
  /** The loaded format of the native library */
  readonly format: NativeClipperLibLoadedFormat;
  
  /** Maximum coordinate value for high-precision mode */
  static readonly hiRange: number;
  
  /**
   * Performs a clipping operation and returns the result as paths
   * 
   * @param params - Clipping parameters
   * @returns Resulting paths after clipping
   */
  clipToPaths(params: ClipParams): Paths;
  
  /**
   * Performs a clipping operation and returns the result as a PolyTree
   * 
   * @param params - Clipping parameters
   * @returns PolyTree representing the hierarchical result
   */
  clipToPolyTree(params: ClipParams): PolyTree;
  
  /**
   * Performs an offset operation and returns the result as paths
   * 
   * @param params - Offset parameters
   * @returns Resulting paths after offsetting
   */
  offsetToPaths(params: OffsetParams): Paths;
  
  /**
   * Performs an offset operation and returns the result as a PolyTree
   * 
   * @param params - Offset parameters
   * @returns PolyTree representing the hierarchical result
   */
  offsetToPolyTree(params: OffsetParams): PolyTree;
  
  /**
   * Calculates the area of a polygon
   * Positive area indicates counter-clockwise orientation
   * 
   * @param path - Polygon path
   * @returns Signed area of the polygon
   */
  area(path: Path): number;
  
  /**
   * Removes unnecessary vertices from a polygon
   * 
   * @param path - Polygon to clean
   * @param distance - Minimum distance between vertices (default: 1.1415)
   * @returns Cleaned polygon
   */
  cleanPolygon(path: Path, distance?: number): Path;
  
  /**
   * Removes unnecessary vertices from multiple polygons
   * 
   * @param paths - Polygons to clean
   * @param distance - Minimum distance between vertices (default: 1.1415)
   * @returns Cleaned polygons
   */
  cleanPolygons(paths: Paths, distance?: number): Paths;
  
  /**
   * Extracts closed paths from a PolyTree
   * 
   * @param polyTree - Input PolyTree
   * @returns Array of closed paths
   */
  closedPathsFromPolyTree(polyTree: PolyTree): Paths;
  
  /**
   * Calculates Minkowski difference of two polygons
   * 
   * @param pattern - Pattern polygon
   * @param path - Path polygon
   * @returns Resulting paths
   */
  minkowskiDiff(pattern: Path, path: Path): Paths;
  
  /**
   * Calculates Minkowski sum of a pattern and a path
   * 
   * @param pattern - Pattern polygon
   * @param path - Path polygon
   * @param pathIsClosed - Whether the path is closed
   * @returns Resulting paths
   */
  minkowskiSumPath(pattern: Path, path: Path, pathIsClosed: boolean): Paths;
  
  /**
   * Calculates Minkowski sum of a pattern and multiple paths
   * 
   * @param pattern - Pattern polygon
   * @param paths - Multiple paths
   * @param pathIsClosed - Whether the paths are closed
   * @returns Resulting paths
   */
  minkowskiSumPaths(pattern: Path, paths: Paths, pathIsClosed: boolean): Paths;
  
  /**
   * Extracts open paths from a PolyTree
   * 
   * @param polyTree - Input PolyTree
   * @returns Array of open paths
   */
  openPathsFromPolyTree(polyTree: PolyTree): Paths;
  
  /**
   * Determines the orientation of a polygon
   * 
   * @param path - Polygon path
   * @returns True if counter-clockwise, false if clockwise
   */
  orientation(path: Path): boolean;
  
  /**
   * Tests whether a point is inside, outside, or on the boundary of a polygon
   * 
   * @param point - Point to test
   * @param path - Polygon path
   * @returns Point-in-polygon result
   */
  pointInPolygon(point: IntPoint, path: Path): PointInPolygonResult;
  
  /**
   * Converts a PolyTree to an array of paths
   * 
   * @param polyTree - Input PolyTree
   * @returns Array of paths
   */
  polyTreeToPaths(polyTree: PolyTree): Paths;
  
  /**
   * Reverses the order of vertices in a path (in-place)
   * 
   * @param path - Path to reverse
   */
  reversePath(path: Path): void;
  
  /**
   * Reverses the order of vertices in multiple paths (in-place)
   * 
   * @param paths - Paths to reverse
   */
  reversePaths(paths: Paths): void;
  
  /**
   * Simplifies a polygon by removing self-intersections
   * 
   * @param path - Polygon to simplify
   * @param fillType - Fill rule to use (default: EvenOdd)
   * @returns Simplified polygons
   */
  simplifyPolygon(path: Path, fillType?: PolyFillType): Paths;
  
  /**
   * Simplifies multiple polygons by removing self-intersections
   * 
   * @param paths - Polygons to simplify
   * @param fillType - Fill rule to use (default: EvenOdd)
   * @returns Simplified polygons
   */
  simplifyPolygons(paths: Paths, fillType?: PolyFillType): Paths;
  
  /**
   * Scales a path by a given factor
   * 
   * @param path - Path to scale
   * @param scale - Scale factor
   * @returns Scaled path
   */
  scalePath(path: Path, scale: number): Path;
  
  /**
   * Scales multiple paths by a given factor
   * 
   * @param paths - Paths to scale
   * @param scale - Scale factor
   * @returns Scaled paths
   */
  scalePaths(paths: Paths, scale: number): Paths;
}

/**
 * Asynchronously loads and initializes the native Clipper library
 * 
 * @param format - Requested library format (WebAssembly, asm.js, or auto)
 * @returns Promise resolving to a ClipperLibWrapper instance
 * @throws {ClipperError} If the library cannot be loaded in the requested format
 */
export declare function loadNativeClipperLibInstanceAsync(
  format: NativeClipperLibRequestedFormat
): Promise<ClipperLibWrapper>;