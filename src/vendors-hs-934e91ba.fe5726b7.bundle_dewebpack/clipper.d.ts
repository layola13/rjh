/**
 * Clipper - Advanced polygon clipping library
 * 
 * Performs boolean operations (union, intersection, difference, xor) on polygons.
 * Supports complex polygon operations with configurable behavior for edge cases.
 */

/**
 * Configuration options for initializing a Clipper instance
 */
export interface ClipperOptions {
  /**
   * When true, reverses the orientation of solution polygons
   * @default false
   */
  reverseSolutions?: boolean;

  /**
   * When true, ensures output polygons are strictly simple (no self-intersections)
   * @default false
   */
  strictlySimple?: boolean;

  /**
   * When true, preserves collinear points on polygon edges
   * @default false
   */
  preserveCollinear?: boolean;
}

/**
 * Represents a 2D point with integer coordinates
 */
export interface IntPoint {
  x: number;
  y: number;
}

/**
 * A path is an array of points forming a polygon or polyline
 */
export type Path = IntPoint[];

/**
 * Multiple paths (array of polygons/polylines)
 */
export type Paths = Path[];

/**
 * Type of polygon: subject or clip
 */
export enum PolyType {
  Subject = 'subject',
  Clip = 'clip'
}

/**
 * Type of boolean clipping operation
 */
export enum ClipType {
  Intersection = 'intersection',
  Union = 'union',
  Difference = 'difference',
  Xor = 'xor'
}

/**
 * Fill rule for determining polygon interiors
 */
export enum PolyFillType {
  EvenOdd = 'evenOdd',
  NonZero = 'nonZero',
  Positive = 'positive',
  Negative = 'negative'
}

/**
 * Rectangular bounds of a polygon set
 */
export interface IntRect {
  /** Left edge X coordinate */
  left: number;
  
  /** Right edge X coordinate */
  right: number;
  
  /** Top edge Y coordinate */
  top: number;
  
  /** Bottom edge Y coordinate */
  bottom: number;
}

/**
 * Native library interface (internal - platform-specific binding)
 */
export interface NativeClipperLib {
  Clipper: any;
  Paths: any;
  PolyTree: any;
  InitOptions: {
    ReverseSolution: { value: number };
    StrictlySimple: { value: number };
    PreserveCollinear: { value: number };
  };
  cleanPolygons(paths: any, distance: number): void;
}

/**
 * Hierarchical polygon tree structure
 */
export declare class PolyTree {
  /**
   * Creates a PolyTree from native representation
   * @internal
   */
  static fromNativePolyTree(nativeLib: NativeClipperLib, nativeTree: any, autoCleanup: boolean): PolyTree;
}

/**
 * Main Clipper class for performing polygon clipping operations
 * 
 * @example
 *